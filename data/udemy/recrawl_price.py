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

def crawl_json(session, lecture_id, key_string, subcategory_id):
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
    url = f"https://www.udemy.com/api-2.0/course-landing-components/{lecture_id}/me/?components=price_text"
    headers = {
        "Accept": "application/json, text/plain, */*",
        "X-Udemy-Cache-Price-Country" : "KR",
        "Authorization": "Basic QlljUTI2VUZkNXFWWnJwMnRiOW9EYlc4Mkl3aUVKb3dHY2Q1MFpiZTpPMEpQM2JRellJNG1ac3pwRVljMllWWjV3UDJQSHRGYzR0T0dnbmdSekJpN0pmVTVMaExuY0Z4QVFLRTFtNUgzM1R2VFhtMXFpUVpnNjBXMHlib2l0aVdjSmNqdm9LUEoyTldRcFhVd3BPWHpZaGV0cE5RNGo4em9wTE9kYUVMTw==",
        "Content-Type": "application/json"
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

    data = response.json()
    json_dic.update(data)

    json_dic["subcategory"] = {
        "title": key_string,
        "subcategory_id": subcategory_id
    }

    return json_dic

    

def main_function(vm_id):
    # 현재 시각
    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    # 로그 메시지를 파일에 저장
    logging.basicConfig(filename=f"./{now}.log", level=logging.DEBUG)

    logging.debug('This message will be written to the log file')

    
    # json 파일을 불러와서 딕셔너리로 변환
    with open(f"./list/parted/list_parted_{vm_id}.json", "r", encoding="utf-8") as f:
        list_dic = json.load(f)

    # 딕셔너리를 리스트로 변환하고 앞에서 3개의 항목을 가져옴
    # list_dic = list(list_dic.items())[:3]

    # 리스트로부터 다시 딕셔너리로 변환
    # list_dic = dict(list_dic)
        
    with open('./udemy_price_crashed_2024_01_23_13_58.json', 'r') as f:
        crashed_json = json.load(f)
    crashed_json = set(crashed_json)

    if not os.path.exists("./page/"):
        os.makedirs("./page/")

    session = requests.Session()

    crashed = set()
    dic_len = len(list_dic)
    # 매 강의마다 랜덤 휴식
    # 10번마다 세션 교체
    for idx, (lecture_id, item) in tqdm(enumerate(list_dic.items())):
        if (idx % 60 == 0) :
            logging.info(f'{getTime()} vm{vm_id} {idx}/{dic_len} 돌파....')
            send_alert_to_mattermost(f"vm{vm_id} {idx}/{dic_len} 돌파....")
        if (idx % 10 == 0) :
            session = requests.Session()
        if lecture_id in crashed_json:
            send_alert_to_mattermost(f"vm{vm_id} {lecture_id} 재크롤....")
        else:
            continue

        random_sec = random.uniform(3,5)
        time.sleep(random_sec)
        url = "https://udemy.com" + item["url"]
        subcategory_id = item["subcategory_id"]
        key_string = item["subcategory"]
        while (1):
            try:
                data_dic = crawl_json(session,lecture_id,key_string,subcategory_id)
                if (data_dic==-1):
                    raise Exception

                with open(f"./page/p_{lecture_id}.json", "w", encoding="utf-8") as f:
                    json.dump(data_dic, f, ensure_ascii=False)
                
                logging.info(f'{getTime()} {lecture_id} 정상저장')


                break
            except ShortRestException as e:
                send_alert_to_mattermost(f"vm{vm_id} {lecture_id} 5초 쉽니다.. e_msg:{str(e)}")
                logging.error(f'{getTime()} vm{vm_id} {lecture_id} e_msg: {str(e)}')
                time.sleep(5)
                session = requests.Session()
                send_alert_to_mattermost(f"vm{vm_id} {lecture_id} 다시 시작해볼게요.")
                

            except LongRestException as e:
                send_alert_to_mattermost(f"vm{vm_id} {lecture_id} 15분 쉽니다.. e_msg:{str(e)}")
                logging.error(f'{getTime()} vm{vm_id} {lecture_id} e_msg: {str(e)}')
                time.sleep(15*60)
                session = requests.Session()
                send_alert_to_mattermost(f"vm{vm_id} {lecture_id} 다시 시작해볼게요.")

            except (Exception, Timeout, RequestException) as e:
                # crashed에 lecture_id 넣고 break
                crashed.add(lecture_id)
                logging.info(f'{getTime()} {lecture_id} 크롤링 실패')
                session = requests.Session()
                send_alert_to_mattermost(f"vm{vm_id} {lecture_id} 크롤링 실패")

                break

    with open(f'./udemy_price_crashed_{datetime.now().strftime("%Y_%m_%d_%H_%M")}.json', 'w') as file:
        json.dump(list(crashed), file)
        logging.info(f'{getTime()} vm{vm_id} crashed 파일 저장완료..')





if __name__ == "__main__":
    main_function(sys.argv[1])