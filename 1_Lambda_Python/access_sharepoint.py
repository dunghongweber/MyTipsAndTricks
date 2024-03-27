from office365.runtime.auth.authentication_context import AuthenticationContext
from office365.sharepoint.client_context import ClientContext
from office365.runtime.http.http_method import HttpMethod
from office365.sharepoint.files.file import File
from datetime import datetime, timedelta
import os

# SharePoint site URL and credentials
TP7_SECRET = {
    "site_url": "https://asuicc.sharepoint.com/sites/ASUI2",
    "username": "addai@asui.org",
    "password": "Zuv83790",
    "folder_server_relative_url": "/sites/ASUI2/Shared Documents/INBOUND FAXES/REFERRALS/",
}


def test_local_sharepoint():
    site_url = TP7_SECRET.get("site_url")
    username = TP7_SECRET.get("username")
    password = TP7_SECRET.get("password")
    folder_server_relative_url = TP7_SECRET.get("folder_server_relative_url")

    try:
        # Authenticate with SharePoint
        ctx_auth = AuthenticationContext(site_url)
        if ctx_auth.acquire_token_for_user(username, password):
            ctx = ClientContext(site_url, ctx_auth)
            print("===Successfully authenticated with SharePoint")

            # Retrieve all files in the folder
            folder = ctx.web.get_folder_by_server_relative_url(
                folder_server_relative_url
            )
            files = folder.files
            ctx.load(files)
            ctx.execute_query()

            # Filter PDF files modified in the last 1 day
            today = datetime.today()
            three_days_ago = today - timedelta(days=1)
            currentDir = os.path.dirname(os.path.abspath(__file__))

            file_count = 0
            for file in files:
                file_name = file.properties["Name"]
                file_modified = file.properties["TimeLastModified"]
                filze_size = int(file.properties["Length"])
                file_url = file.properties["ServerRelativeUrl"]

                if (
                    file_name.endswith(".pdf")
                    and file_modified >= three_days_ago
                    and filze_size > 0
                ):

                    test_path = currentDir + "/test_save/" + file_name
                    with open(test_path, "wb") as local_file:
                        file = (
                            ctx.web.get_file_by_server_relative_path(file_url)
                            .download(local_file)
                            .execute_query()
                        )

                        print(f"Downloaded")
                        print(f"File Name: {file_name}")
                        print(f"Time Last Modified: {file_modified}")
                        print(f"File Size: {filze_size}\n")
                        file_count += 1
            print(f"===Download total {file_count} files")
        else:
            print("===Failed to acquire token for user.")
    except Exception as e:
        print("===An error occurred:")
        print(repr(e))


# run test
test_local_sharepoint()
