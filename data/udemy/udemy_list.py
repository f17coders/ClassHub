import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import json
import time
import random
import os
import logging
from datetime import datetime

def main_function():
    # 현재 시각
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    # 로그 메시지를 파일에 저장
    logging.basicConfig(filename=f"./{now}.log", level=logging.DEBUG)

    logging.debug('This message will be written to the log file')

    # json 파일을 불러와서 딕셔너리로 변환
    with open("./category.json", "r", encoding="utf-8") as f:
        dict_category = json.load(f)
    logging.info(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] json loaded")


    # 20번에 한번 세션 교체
    # 페이지마다 랜덤 sleep
    for key, value in dict_category.items():
        folder_path = f"./list/{key}/"
        if os.path.exists(folder_path):
            continue
        logging.info("------------------------")
        logging.info(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {key} start!!! ")
        items_dic = {}
        headers = {"User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"}
        code_error = False
        p = 1
        while (1):
            url = f"https://www.udemy.com/api-2.0/discovery-units/all_courses/?p={p}&page_size=60&sort=newest&subcategory_id={value}&source_page=subcategory_page&locale=ko_KR&currency=krw&navigation_locale=en_US&sos=ps&fl=scat"
            random_sec = random.uniform(3,5)
            time.sleep(random_sec)
            logging.info(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] page:{p} ing...")
            
            if p%20==1:
                # Session 객체 교체
                session = requests.Session()
                # Session 객체의 keep_alive 속성을 True로 설정하여 Keep-Alive 활성화
                session.keep_alive = True
                # 요청 시 Session 객체를 사용하여 요청을 보냄
                logging.debug(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 세션 교체")
                
            response = session.get(url,timeout=10,headers=headers)
            if (response.status_code==200):
                items_dic[p] = response.json()["unit"]
            elif (response.status_code==400 and response.json()["detail"]=="Invalid page size"):
                break
            else:
                logging.error(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {key}의 {p} 페이지에서 {response.status_code} 코드 발생 *********")
                code_error = True
                break
            p += 1
            
        if code_error:
            logging.error(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 비정상적인 코드에러가 발생하여 크롤링을 종료합니다.")
            logging.error(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 다시 진행해야 할 category:{key}, p:{p}")
            # temp save
            if p>1:
                print(f"category:{key} ~{p-1} 까지 를 저장합니다.")
                logging.error(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] category:{key} ~{p-1} 까지 를 저장합니다.")
                
                # 딕셔너리를 json 파일로 저장
                # 폴더 생성
                folder_path = f"./list/{key}/"
                if not os.path.exists(folder_path):
                    os.makedirs(folder_path)
                with open(f"{folder_path}data_{p-1}.json", "w", encoding="utf-8") as f:
                    json.dump(items_dic, f, ensure_ascii=False)
            break
        # save
        # 딕셔너리를 json 파일로 저장
        # 폴더 생성
        folder_path = f"./list/{key}/"
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
        with open(f"{folder_path}data.json", "w", encoding="utf-8") as f:
            json.dump(items_dic, f, ensure_ascii=False)
        logging.info(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 모든 페이지가 크롤링되어 category:{key}를 저장합니다.")
        logging.info(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {key} end!!! ")
        logging.info("------------------------")
                
 
    

if __name__ == "__main__":
    main_function()
