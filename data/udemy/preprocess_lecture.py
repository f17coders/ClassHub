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



udemy_cat_tag_df = pd.read_csv("./udemy_lecture_cat_tags.csv")

# 폴더 경로
folder_path = "./page/" # 실제 폴더 경로로 변경해주세요.

html_files = {f[:-5] for f in os.listdir(folder_path) if f.endswith('.html')}
json_files = {f[:-5] for f in os.listdir(folder_path) if f.endswith('.json')}

def open_json(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
def open_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        contents = f.read()
    return BeautifulSoup(contents, 'html.parser')

str2level = {
    "초급자" : "BEGINNER",
    "중급자" : "INTERMEDIATE",
    "전문가" : "EXPERT",
    "모든 수준" : "ALL",
}
currency2won = {
    "CAD" : 996.94,
    "USD" : 1339.35
}

json_list = open_json("./list/list.json")

def get_lecture_dic(pk):
    html_file = os.path.join(folder_path, f"{pk}.html")
    json_file = os.path.join(folder_path, f"{pk}.json")
    json_description = open_json(json_file)
    json_info = json_list.get(pk)
    html_soup = open_html(html_file)
    
    lecture = {}

    sections = json_description["curriculum_context"]["data"]["sections"]
    total_time = 0
    for section in sections:
        total_time += section["content_length"]

    what_you_learn = list(map(lambda x:x.text, html_soup.find_all(class_="objective--objective-item--AHk7S")))


    curriculum = {}
    curriculum["curriculum"] = []
    for section in sections:
        temp = {}
        temp["time"] = int(section["content_length"]//60)
        temp["item_count"] = section["lecture_count"]
        temp["title"] = section["title"]
        items = []
        for item in section["items"]:
            items.append({
                "title" : item["title"],
                "time" : item["content_summary"]
            })
        temp["items"] = items
        curriculum["curriculum"].append(temp)

    price_dic = json_description["price_text"]["data"]["pricing_result"]["price"]
    sale_price_dic = json_description["price_text"]["data"]["pricing_result"]["list_price"]
    # int(currency2won.get(price_dic["currency"])*price_dic["amount"])//5000*5000
    # int(currency2won.get(sale_price_dic["currency"])*sale_price_dic["amount"])//5000*5000

    # lecture["lecture_id"] = 1
    lecture["site_lecture_id"] = f"u{json_info['id']}"
    lecture["name"] = json_info["title"]
    lecture["image"] = json_info["image_750x422"]
    lecture["category_name"] = udemy_cat_tag_df[udemy_cat_tag_df["id"]==json_info["id"]]["category"].item()
    # 을 넣어놓으면 조인해서 id받아올수있다. 
    # lecture["category_id"]
    lecture["price_original"] = int(currency2won.get(price_dic["currency"])*price_dic["amount"])//5000*5000
    lecture["price_sale"] = int(currency2won.get(sale_price_dic["currency"])*sale_price_dic["amount"])//5000*5000
    lecture["level"] = str2level[json_info["instructional_level_simple"]]
    lecture["summary"] = "||".join(list(map(lambda x:x, what_you_learn)))
    lecture["description_summary"] = json_info["headline"]
    # lecture["description_detail"] html이라 일단 더미
    lecture["site_review_rating"] = json_description["slider_menu"]["data"]["rating"]
    lecture["site_review_count"] = json_description["slider_menu"]["data"]["num_reviews"]
    lecture["site_student_count"] = json_description["slider_menu"]["data"]["num_students"]
    lecture["review_sum"] = 0
    lecture["review_count"] = 0
    lecture["total_time"] = int(total_time//60)
    lecture["curriculum"] = curriculum
    lecture["instructor"] = json_info["visible_instructors"][0]["title"]
    lecture["site_type"] = "UDEMY"
    lecture["site_link"] = f"https://udemy.com{json_info['url']}"
    # lecture["gpt_review_good"] = 
    # lecture["gpt_review_bad"] = 
    # lecture["create_time"] = 
    # lecture["update_time"] = 

    return lecture

udemy_lectures = []
send_alert_to_mattermost("udemy lectures 시작")
for pk in tqdm((html_files & json_files)):
    try:
        udemy_lectures.append(get_lecture_dic(pk))
    except Exception as e:
        continue

pd.DataFrame(udemy_lectures).to_csv("./udemy_lectures_dummy.csv",
                                    index=False)
send_alert_to_mattermost("udemy lectures 끝")
