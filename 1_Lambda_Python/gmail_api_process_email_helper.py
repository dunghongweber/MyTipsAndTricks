import os
import json
from datetime import datetime


from tp7_common.utils.s3_trace_utils import s3_download_file
from tp7_common.utils.s3_utils2 import s3_upload_file

TS_BUCKET_NAME = "tp7-pr-anesis-pr-dev2-output"
TS_BUCKET_PATH = "gmail_update_time/latest_update_time.json"
TS_TEMP_FOLDER = "/tmp"

# default set as 2024 Jan 1st, chane if needed
FIRST_RUN = datetime(2023, 11, 1, 0, 0, 0).timestamp()


def get_latest_update_time():
    local_path = f"{TS_TEMP_FOLDER}/latest_update_time.json"

    s3_download_file(
        bucket_name=TS_BUCKET_NAME,
        bucket_path=TS_BUCKET_PATH,
        file_path=local_path,
    )

    data = {}

    if os.path.exists(local_path):
        with open(local_path, "r") as file:
            data = json.load(file)
    else:
        # First Run
        first_run = FIRST_RUN
        time_int = int(first_run)
        return time_int

    ts_now = datetime.now().timestamp()
    res = int(ts_now)

    if data["last_update"]:
        res = data["last_update"]

    return res


def update_latest_update_time():
    time_complete = datetime.now().timestamp()
    time_int = int(time_complete)
    data_to_write = {"last_update": time_int}

    print(f"\n===Complete Time: {time_complete}")

    local_path = f"{TS_TEMP_FOLDER}/latest_update_time.json"

    with open(local_path, "w") as json_file:
        json.dump(data_to_write, json_file, indent=2)

    s3_upload_file(
        bucket_name=TS_BUCKET_NAME,
        bucket_path=TS_BUCKET_PATH,
        local_path=local_path,
    )
