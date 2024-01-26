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
from requests.exceptions import Timeout
from requests.exceptions import RequestException

class ShortRestException(Exception):
    pass
class LongRestException(Exception):
    pass

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
def crawl_html(session, url):
    """
        url주소에서 json을 가져와 파일을 저장합니다.
        :session: 세션
        :url: 불러오고자 하는 url
        :return:
    """
    headers = {
        "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
        "Accept-Language" : "ko,en;q=0.9,en-US;q=0.8"
    }

    response = session.get(url,timeout=10,headers=headers)
    if (response.status_code==200):
        pass
    elif (response.status_code==408):
        raise ShortRestException(response.status_code)
    elif (response.status_code in [429,500]):
        raise LongRestException(response.status_code)
    else:
        return -1

    soup = BeautifulSoup(response.text, 'html.parser')
    return str(soup)

def crawl_json(session, lecture_id):
    """
    url주소에서 json을 가져와 파일을 저장합니다.
    :session: 세션
    :lecture_id: 불러올 강의 id
    :key_String:대분류이름
    :subcategory_id:대분류id
    :folder_path:저장될폴더주소
    :return: -1 실패, 성공시 데이터 dictionary 반환
    """
    json_dic = {}
    # 가격 및 커리큘럼
    url = f"https://www.inflearn.com/api/v2/review/course/{lecture_id}?pageSize=10000&pageNumber=1&isNew=true"
    # headers = {
    #     "Accept": "application/json, text/plain, */*",
    #     "Authorization": "Basic QlljUTI2VUZkNXFWWnJwMnRiOW9EYlc4Mkl3aUVKb3dHY2Q1MFpiZTpPMEpQM2JRellJNG1ac3pwRVljMllWWjV3UDJQSHRGYzR0T0dnbmdSekJpN0pmVTVMaExuY0Z4QVFLRTFtNUgzM1R2VFhtMXFpUVpnNjBXMHlib2l0aVdjSmNqdm9LUEoyTldRcFhVd3BPWHpZaGV0cE5RNGo4em9wTE9kYUVMTw==",
    #     "Content-Type": "application/json"
    # }
    
    response = session.get(url,timeout=10)
    if (response.status_code==200):
        pass
    elif (response.status_code==408):
        raise ShortRestException(response.status_code)
    elif (response.status_code in [429,500]):
        raise LongRestException(response.status_code)
    else:
        return -1

    data = response.json()
    json_dic.update(data)

    return json_dic
    

def main_function():
    # 현재 시각
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    # 로그 메시지를 파일에 저장
    logging.basicConfig(filename=f"./{now}.log", level=logging.DEBUG)

    logging.debug('This message will be written to the log file')

# json 파일을 불러와서 딕셔너리로 변환
with open("./list/list_data.json", "r", encoding="utf-8") as f:
    list_dic = json.load(f)

    if not os.path.exists("./page/"):
        os.makedirs("./page/")

    session = requests.Session()

    crashed = set()
    dic_len = len(list_dic)
    # 매 강의마다 랜덤 휴식
    # 10번마다 세션 교체
    for idx, (lecture_id, item) in tqdm(enumerate(list_dic.items())):
        if (idx % 60 == 0) :
            logging.info(f'{getTime()} {idx}/{dic_len} 돌파....')
            send_alert_to_mattermost(f"{idx}/{dic_len} 돌파....")
        if (idx % 10 == 0) :
            session = requests.Session()
        random_sec = random.uniform(3,5)
        time.sleep(random_sec)
        url = item["url"]
        while (1):
            try:
                data_dic = crawl_json(session, lecture_id)
                if (data_dic==-1):
                    raise Exception
                data_html = crawl_html(session, url)
                if (data_html==-1):
                    raise Exception

                with open(f"./page/{lecture_id}.json", "w", encoding="utf-8") as f:
                    json.dump(data_dic, f, ensure_ascii=False)
                with open(f"./page/{lecture_id}.html", "w", encoding="utf-8") as f:
                    f.write(data_html)
                
                logging.info(f'{getTime()} {lecture_id} 정상저장')

                break
            except ShortRestException as e:
                send_alert_to_mattermost(f" {lecture_id} 5초 쉽니다.. e_msg:{str(e)}")
                logging.error(f'{getTime()} {lecture_id} e_msg: {str(e)}')
                time.sleep(5)
                session = requests.Session()
                send_alert_to_mattermost(f" {lecture_id} 다시 시작해볼게요.")
                

            except LongRestException as e:
                send_alert_to_mattermost(f" {lecture_id} 15분 쉽니다.. e_msg:{str(e)}")
                logging.error(f'{getTime()} {lecture_id} e_msg: {str(e)}')
                time.sleep(15*60)
                session = requests.Session()
                send_alert_to_mattermost(f" {lecture_id} 다시 시작해볼게요.")

            except (Exception, Timeout, RequestException) as e:
                # crashed에 lecture_id 넣고 break
                crashed.add(lecture_id)
                logging.info(f'{getTime()} {lecture_id} 크롤링 실패')
                session = requests.Session()
                send_alert_to_mattermost(f" {lecture_id} 크롤링 실패")

                break

    with open(f'./inflearn_page_crashed_{datetime.now().strftime("%Y_%m_%d_%H_%M")}.json', 'w') as file:
        json.dump(list(crashed), file)
        logging.info(f'{getTime()} crashed 파일 저장완료..')





if __name__ == "__main__":
    main_function()
