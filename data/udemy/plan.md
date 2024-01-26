웹개발 최신순
대충 160개*60 강의수 정도임

https://www.udemy.com/api-2.0/discovery-units/all_courses/?p=1&page_size=1&sort=newest&subcategory_id=8&source_page=subcategory_page&locale=ko_KR&currency=krw&navigation_locale=en_US&sos=ps&fl=scat

### subcategory_id
웹 개발 8
데이터 과학 558
모바일 개발 10
프로그래밍 언어 12
게임 개발 14
데이터베이스 설계 및 개발 16
소프트웨어 테스팅 18
소프트웨어 엔지니어링 20
소프트웨어 개발 도구 362
노코드 개발 575
IT 인증 132
네트워크 및 보안 134
하드웨어 136
운영 체제 및 서버 138
기타 IT 및 소프트웨어 140

페이지 넘어가면 400 코드
{
    "detail": "Invalid page size"
}

### unit
items : 강의 리스트,
source_obejct : subcategory(웹 개발, 8)


### item:items
id 강의의 유니크 아이디
title 강의제목
url 강의상세페이지
is_paid 유무료 boolean
visible_instructors 강사
image_... 이미지링크(사이즈별로 제공됨)
headline 한줄소개
num_subscribers 강의 수강자 수
caption_locales 제공되는 자막들(하나당 딕셔너리 하나)
avg_rating
avg_rating_recent
rating ->
num_reviews 리뷰수 -> 상세페이지 크롤링 시점과 달라 사용하면 안됨.
num_published_lectures 커리큘럼내 강의개수
caption_languages 제공되는 자막들(문자열로 구성됨)
created 등록된 날짜
published_time
instructional_level 난이도(모든 수준, 중급자..)
objectives_summary 배울내용 3개만 보여줌(왜냐면 상세강의페이지가 아니기때문)
content_info 총 ??시간
content_info_short ??시간
context_info : {"category": {"title":"개발"}, "label": {"title" : "파이썬"}}

## 상세페이지
https://www.udemy.com/api-2.0/course-landing-components/4297574/me/?components=price_text,curriculum_context,slider_menu

slider_menu,discount_expiration,price_text,purchase
price_text : 원래가격, 할인가격, 아껴지는금액, 할인율

curriculum_context->data = {'sections', 'estimated_content_length_text', 'estimated_content_length_in_seconds', 'is_for_practice_test_course', 'num_of_published_lectures', 'is_limited_consumption_trial', 'url', 'tracking_id'}

sections : [섹션]
리스트 요소 하나가 섹션임
- 섹션
    content_length_text : 섹션 하나의 총 길이(분)
    content_length : 섹션 하나의 총 길이(초,소숫점 두자리)
    index : 섹션 순서 (1부터 시작)
    lecture_count : 세부강의수
    title : 섹션 이름
    items : [item]
    item :
        content_summary : 세부강의 길이 분:초
        title : 세부강의 이름
        object_index : 세부강의 순서 (1부터 시작)

estimated_content_length_text : 커리큘럼 소요 시간 시:분:초
estimated_content_length_in_seconds : 커리큘럼 소요 시간 초로계산
num_of_published_lectures : 커리큘럼 내 총 세부강의수

https://www.udemy.com/api-2.0/pricing/?course_ids=4297574,4298905,4367336&fields[pricing_result]=price,discount_price,list_price,price_detail,price_serve_tracking_id
가격조회, 복수강의 한번에 가능

url = "https://www.udemy.com/api-2.0/courses/4297574/reviews/?page=1&page_size=1812"
headers = {
  "Accept": "application/json, text/plain, */*",
  "Authorization": "Basic QlljUTI2VUZkNXFWWnJwMnRiOW9EYlc4Mkl3aUVKb3dHY2Q1MFpiZTpPMEpQM2JRellJNG1ac3pwRVljMllWWjV3UDJQSHRGYzR0T0dnbmdSekJpN0pmVTVMaExuY0Z4QVFLRTFtNUgzM1R2VFhtMXFpUVpnNjBXMHlib2l0aVdjSmNqdm9LUEoyTldRcFhVd3BPWHpZaGV0cE5RNGo4em9wTE9kYUVMTw==",
  "Content-Type": "application/json"
}
리뷰 조회 : 가장 많은 리뷰를 가진 강의도 한번에 됨, 2178(5000으로 고정 요청하면 될듯)

https://www.udemy.com/course/best-100-days-python/

배울내용
landing_page = soup.find("div",class_="paid-course-landing-page__body")
what_you_learn = landing_page.find("ul",class_=[
    "ud-unstyled-list",
    "ud-block-list",
    "what-you-will-learn--objectives-list--eiLce",
    "what-you-will-learn--objectives-list-two-column-layout--rZLJy"
])
wyl = what_you_learn.find_all("li")
list(map(lambda x:x.span.text, wyl))

요구 사항
landing_page = soup.find("div",class_="paid-course-landing-page__body")
req_ul = landing_page.find(string="요구 사항").find_next("ul").find_all("li")
list(map(lambda x:x.text,req_ul))

설명
desc_ul = landing_page.find(string="설명").find_next("ul").find_all("li")
list(map(lambda x:x.text,desc_ul))

이외의 설명
ps = landing_page.find(string="설명").find_next("ul").find_next_siblings("p")

