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
import re

def getTime():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

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

def open_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
def open_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        contents = f.read()
    return BeautifulSoup(contents, 'html.parser')

def main_function():
    json_list = open_json("./list/parted/list.json")
    crashed = set()

    # 폴더 경로
    folder_path = "./page/" # 실제 폴더 경로로 변경해주세요.
    html_files = {f[:-5] for f in os.listdir(folder_path) if f.endswith('.html')}
    json_files = {f[:-5] for f in os.listdir(folder_path) if f.endswith('.json')}

    for idx, pk in tqdm(enumerate((html_files & json_files))):
        if (idx % 200 == 0) :
            send_alert_to_mattermost(f"{idx} 돌파....")
        html_file = os.path.join(folder_path, f"{pk}.html")
        json_file = os.path.join(folder_path, f"{pk}.json")
        # json_description = open_json(json_file)
        # json_info = json_list.get(pk)
        html_soup = open_html(html_file)

        try:
            base_html = open_html("./udemy_base.html")
            if (html_soup.find(string="요구 사항")):
                prerequisites = html_soup.find(string="요구 사항").find_previous('div', {'class': 'component-margin'})
                prerequisites.find("svg").decompose()
                prerequisites.find("span")["data-checked"] = "checked"
                base_html.find("div", class_="course-landing-page__main-content").append(prerequisites)
            if (html_soup.find(string="설명")):
                descriptions = html_soup.find(string="설명").find_previous("div")
                descriptions.find("span")["data-checked"] = "checked"
                descriptions.find("svg").decompose()
                descriptions.find("button",{"aria-label":"설명 더 보기"}).decompose()
                base_html.find("div", class_="course-landing-page__main-content").append(descriptions)

            # "\\"을 "\\\\"로 변경
            modified_str = re.sub(r"\\", r"\\\\", str(base_html))
            # 변경된 문자열을 다시 뷰티풀숲 객체로 파싱
            modified_soup = BeautifulSoup(modified_str, 'html.parser')
            with open(f"./html_files/{pk}.html", "w", encoding="utf-8") as f:
                f.write(str(modified_soup))
        except Exception as e:
            crashed.add(pk)
            send_alert_to_mattermost(f"{pk} html 만들기 실패 {str(e)}")

    with open(f'./udemy_html_crashed_{datetime.now().strftime("%Y_%m_%d_%H_%M")}.json', 'w') as file:
        json.dump(list(crashed), file)
        logging.info(f'{getTime()} crashed html 파일 저장완료..')

    send_alert_to_mattermost("html만들기 종료")
        


if __name__ == "__main__":
    main_function()