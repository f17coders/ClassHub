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


udemy_cat_tag_df = pd.read_csv("../data-dump/udemy_lecture_cat_tags.csv")

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

json_list = open_json("./list/parted/list.json")

udemy_lectures = []
for pk in tqdm((html_files & json_files)):
    json_file = os.path.join(folder_path, f"{pk}.json")
    json_description = open_json(json_file)
    json_info = json_list.get(pk)
    
    lecture = {}

    lecture["site_lecture_id"] = f"u{pk}"

    if("headline" not in json_info):
        continue
    lecture["description_summary"] = json_info["headline"]
    udemy_lectures.append(lecture)


pd.DataFrame(udemy_lectures).to_csv("./udemy_lectures_desc_dummy.csv",
                                    index=False)
