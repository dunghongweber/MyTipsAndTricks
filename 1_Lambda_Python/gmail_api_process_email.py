import os
import base64
import json
import ast
from aws_lambda_powertools import Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext


from tp7_pr_rpa_trigger.rpa_metrics import get_rpa_metrics_logger
from tp7_common.utils.sqs_params_utils import sqs_params_or_direct
from tp7_common.utils.secret_manager_utils import get_secret
from tp7_common.utils.s3_utils2 import s3_upload_file


from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials

from tp7_gmail_download.s3_timestamp import (
    get_latest_update_time,
    update_latest_update_time,
)

tracer = Tracer()


# Here are the label ids for the folders we will download from:
# United Healthcare: Label_4974969626376348896
# Molina Medicaid: Label_8250548476957237220
# Other Medicaids: Label_2201697731120796102
# Unread emails label_id: UNREAD
ANESIS_FOLDER_LABELS = ["UNREAD", "Label_2201697731120796102"]  # Other Medicaids Folder
ANESIS_SCOPES = [
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.modify",
]


def get_secrets(secret_name: str):
    raw_secrets = get_secret(secret_name)

    res = {}
    try:
        res = json.loads(raw_secrets)
    except Exception:
        res = ast.literal_eval(raw_secrets)

    return res


@tracer.capture_lambda_handler()
def gmail_download(event: dict, context: LambdaContext):
    tracer.put_metadata("event", event)

    for params in sqs_params_or_direct(event):
        _gmail_download_anesis(record=params)


def _gmail_download_anesis(record):
    print(f"===Lambda Input: {record}")

    secrets = get_secrets(secret_name="ANESIS_GMAIL_SECRET")
    gmail_folder_labels = record["ANESIS_GMAIL_LABELS"]
    bucket_for_upload = record["ANESIS_BUCKET_UPLOAD"]

    print(f"===S3 Bucket: {bucket_for_upload} \t gmail_labels: {gmail_folder_labels}")

    # Create a Credentials object using the access token and refresh token
    credentials = Credentials(
        token=secrets["ANESIS_ACCESS_TOKEN"],
        refresh_token=secrets["ANESIS_REFRESH_TOKEN"],
        token_uri=secrets["ANESIS_TOKEN_URI"],
        client_id=secrets["ANESIS_CLIENT_ID"],
        client_secret=secrets["ANESIS_CLIENT_SECRET"],
        scopes=ANESIS_SCOPES,
    )

    # Refresh the access token if it's expired
    if credentials.expired or not credentials.valid:
        credentials.refresh(Request())

    try:
        tmp_folder = "/tmp"
        if not os.path.exists(tmp_folder):
            os.makedirs(tmp_folder)
        # Build the Gmail API service
        service = build("gmail", "v1", credentials=credentials)

        time_latest = get_latest_update_time()
        print(f"===Last update: {time_latest}")

        query_gmail = f"is:unread after:{time_latest}"

        results = (
            service.users()
            .messages()
            .list(userId="me", labelIds=gmail_folder_labels, q=query_gmail)
            .execute()
        )

        messages = results.get("messages", [])

        print("\n=== ....Downloading Gmail attachments....")
        for message in messages:
            current_message_id = message["id"]
            email = (
                service.users()
                .messages()
                .get(userId="me", id=current_message_id)
                .execute()
            )

            for part in email["payload"]["parts"]:
                if part["filename"]:
                    attachment_id = part["body"]["attachmentId"]
                    attachment = (
                        service.users()
                        .messages()
                        .attachments()
                        .get(
                            userId="me", messageId=current_message_id, id=attachment_id
                        )
                        .execute()
                    )

                    file_data = base64.urlsafe_b64decode(
                        attachment["data"].encode("UTF-8")
                    )

                    path = tmp_folder + "/" + part["filename"]

                    f = open(path, "wb")
                    f.write(file_data)
                    f.close()
                    print("===Downloaded attachment: " + part["filename"])

            # print(f"Message with ID {current_message_id} marked as read.")
            # service.users().messages().modify(
            #     userId="me", id=current_message_id, body={"removeLabelIds": ["UNREAD"]}
            # ).execute()

        # Loop through files in the folder
        print("\n=== ....Uploading files to S3 bucket....")
        for filename in os.listdir(tmp_folder):
            file_path = os.path.join(tmp_folder, filename)

            if os.path.isfile(file_path) and file_path.endswith(".pdf"):
                bucket_name = bucket_for_upload

                print(f"===Upload bucket: {bucket_name} \t Local file: {file_path}\n")
                s3_upload_file(
                    bucket_name=bucket_name,
                    bucket_path=filename,
                    local_path=file_path,
                )

        update_latest_update_time()

    except Exception as e:
        print(f"===error: {e}")

        raise
