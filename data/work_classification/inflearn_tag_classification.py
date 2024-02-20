import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import json
import time
import random
import os
import logging
from datetime import datetime
import os
import sys
import requests
import pandas as pd


def getTime():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def open_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
def open_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        contents = f.read()
    return BeautifulSoup(contents, 'html.parser')

def send_alert_to_mattermost(message):
    webhook_url = "https://meeting.ssafy.com/hooks/ro9xkennxbrhpdh639re3w9jha"
     # 여기에 Mattermost에서 얻은 Webhook URL을 입력해주세요

    payload = {
        "text": message
    }

    response = requests.post(webhook_url, json=payload)
    if response.status_code == 200:
        logging.info(f'{getTime()} Alert가 성공적으로 전송되었습니다.')
    else:
        logging.info(f'{getTime()} Alert가 실패했습니다.')

def main_function():
    # 현재 시각
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    # 로그 메시지를 파일에 저장
    logging.basicConfig(filename=f"./inflearn_tag_{now}.log", level=logging.DEBUG)

    # 폴더 경로
    folder_path = "../inflearn/page/" # 실제 폴더 경로로 변경해주세요.

    html_files = {f[:-5] for f in os.listdir(folder_path) if f.endswith('.html')}
    json_files = {f[:-5] for f in os.listdir(folder_path) if f.endswith('.json')}

    list_for_df = []
    try:
        for pk in tqdm((html_files & json_files)):
            html_file = os.path.join(folder_path, f"{pk}.html")
            html_soup = open_html(html_file)

            category = html_soup.find(class_="cd-header__breadcrumb").find_all(class_="cd-header__breadcrumb-el")[-1].text.strip()
            tags = '||'.join(list(map(lambda x:x.text.strip(), html_soup.find(class_="cd-header__tags cd-header__sub-row").find_all("a"))))

            temp = {}
            temp["id"] = pk
            temp["isAccess"] = True
            temp["category"] = category
            temp["tags"] = tags
            list_for_df.append(temp)
    except Exception as e:
        send_alert_to_mattermost(f"inflearn tag classify error")



    pd.DataFrame(list_for_df).to_csv("./tags/inflearn_tags.csv",index=False)
    send_alert_to_mattermost(f"inflearn tag classify done")



if __name__ == "__main__":
    main_function()