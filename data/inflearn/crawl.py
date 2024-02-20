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
import re
import requests
from requests.exceptions import Timeout
from requests.exceptions import RequestException

def getTime():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def send_alert_to_mattermost(message):
    webhook_url = "https://meeting.ssafy.com/hooks/9hazw4j4pirpi8qdcftmobocjy"
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
    logging.basicConfig(filename=f"./{now}.log", level=logging.DEBUG)

    logging.debug('This message will be written to the log file')

    target_categories = set([
            "웹 개발", "프론트엔드", "백엔드", "풀스택", "모바일 앱 개발",
            "프로그래밍 언어", "알고리즘 · 자료구조", "데이터베이스",
            "데브옵스 · 인프라", "자격증 (개발 · 프로그래밍)", "개발 도구", "웹 퍼블리싱",
            "VR/AR", "데스크톱 앱 개발", "게임 개발", "데이터 사이언스", "기타 (개발 · 프로그래밍)",
            "컴퓨터 구조", "임베디드 · IoT", "반도체", "로봇공학", "모빌리티", "자격증 (하드웨어)", "기타 (하드웨어)",
            "게임 프로그래밍", "게임 기획", "게임 아트 · 그래픽", "기타 (게임 개발)",
            "데이터 분석", "인공지능", "데이터 시각화", "데이터 수집 · 처리", "자격증 (데이터 사이언스)",
            "기타 (데이터 사이언스)", "보안", "네트워크", "시스템", "클라우드", "블록체인", "자격증 (보안 · 네트워크)", "기타 (보안 · 네트워크)"
        ]
    )

    headers = {
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
        "Accept-Language" : "ko,en;q=0.9,en-US;q=0.8"
    }

    session = requests.session()
    p = 1
    crashed = set()
    list_dic = {}
    while (p<=135):
        url = f"https://www.inflearn.com/courses?order=recent&page={p}&types=ONLINE"
        if (p%10 == 0):
            session = requests.session()
        random_sec = random.uniform(3,5)
        time.sleep(random_sec)
        response = session.get(url, headers=headers, timeout=10)
        if response.status_code != 200:
            raise Exception
        soup = BeautifulSoup(response.text, 'html.parser')
        container = soup.find("div",class_="courses_container")
        items = container.find_all(class_=['card', 'course', 'course_card_item'])
        temp = {}
        logging.info(f'page {p} start!!!')

        for item in items:
            card_back = item.find("div","course_card_back")
            categories = card_back.find("div",class_="course_categories").text.strip().split(",")

            is_target = False
            for c in categories:
                if c in target_categories:
                    is_target = True
                    break
            if not is_target:
                continue
                
            lecture_id = item.get("data-productid")
            if lecture_id in list_dic:
                # 중복
                continue

            try:
                a = item.a
                img = item.img.get('data-src')
                url = "https://inflearn.com"+a.get('href')
                course_name = a.find('div',class_='course_title').text
                instructor = a.find('div',class_='instructor').text

                summary = card_back.find("p",class_="course_description").text
                level = card_back.find("div",class_="course_level").text.strip()
                tags = card_back.find("div",class_="course_skills").text.strip().split(",")
                price = item.find("div","price")

                if (price.find("del")):
                    # 세일중
                    # print(int(re.sub(r'[₩,]', '', price.find("del").text)))
                    # print(int(re.sub(r'[₩,]', '', price.span.text)))
    
                    price = {
                        "is_free" : False,
                        "is_sale" : True,
                        "data" : {
                            "original_price" : int(re.sub(r'[₩,]', '', price.find("del").text)),
                            "sale_price" : int(re.sub(r'[₩,]', '', price.span.text))
                        }
                    }
                else:
                    if (price.text.strip()=="무료"):
                        price = {
                            "is_free" : True,
                            "is_sale" : False,
                            "data" : {
                                "original_price" : 0,
                                "sale_price" : 0
                            }
                        }
                    else:
                        price = {
                            "is_free" : False,
                            "is_sale" : False,
                            "data" : {
                                "original_price" : int(re.sub(r'[₩,]', '', price.text)),
                                "sale_price" : int(re.sub(r'[₩,]', '', price.text))
                            }
                        }

                data_json = {
                    "lecture_id" : lecture_id,
                    "url" : url,
                    "lecture_name" : course_name,
                    "summary" : summary,
                    "price" : price,
                    "instructor" : instructor,
                    "categories" : categories,
                    "tags" : tags,
                    "level" : level,
                    "img" : img,
                }
                temp[lecture_id] = data_json        
            except Exception as e:
                print(lecture_id)
                crashed.add(lecture_id)


        # 전송
        list_dic.update(temp)
        p += 1
    with open(f'./inflearn_crashed_{datetime.now().strftime("%Y_%m_%d_%H_%M")}.json', 'w') as file:
        json.dump(list(crashed), file)
        logging.info('crashed 파일 저장완료..')


    if not os.path.exists("./list/"):
        os.makedirs("./list/")
    with open("./list/list_data.json", "w", encoding="utf-8") as f:
        json.dump(list_dic, f, ensure_ascii=False)
    # done message
        


if __name__ == "__main__":
    main_function()
    send_alert_to_mattermost("완료!!!")
