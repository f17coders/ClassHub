import img1 from './../../assets/Lecture/Lecture3.png'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Container from '@mui/material/Container'
import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import SellIcon from '@mui/icons-material/Sell'
import axios from 'axios'
import EastIcon from '@mui/icons-material/East'
import PersonIcon from '@mui/icons-material/Person'
import { useParams } from 'react-router-dom'
import LectureDetailReviews from '../../components/Lecture/LectureDetailReviews'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import DOMPurify from "dompurify"

import { Accordion } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// 강의의 상세 내용이 들어가는 페이지 입니다.

function LectureDetail() {
	// 토큰
	let accessToken = useSelector((state) => state.accessToken)
	// id가져오기
	const { lectureId } = useParams()

	// 로그인 확인용
	let isLogin = useSelector((state) => state.isLogin)

	// 강의 정보 저장할 변수
	const [lecture, setLecture] = useState(null)
	// 강의 정보 가져오기
	useEffect(() => {
		axios.get(`https://i10a810.p.ssafy.io/api/lectures/v0/details/${lectureId}`)
			.then((response) => {
				// console.log(response.data.result)
				setLecture(response.data.result)
			})
			.catch((err) => console.log(err));
	}, [lectureId]);


	// 강의 좋아요 + 로그인 확인
	const [like, setLike] = useState(false)
	const toggleLike = () => {
		console.log(accessToken)
		if (isLogin == true) {
			if (like == false) {
				axios.post(`https://i10a810.p.ssafy.io/api/lectures/v1/likes/${lecture.lectureId}`, null, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
					.then((res) => console.log('좋아요를 눌렀어요'))
					.catch((err) => console.log(err));
				setLike(true)
			} else {
				axios.delete(`https://i10a810.p.ssafy.io/api/lectures/v1/unlikes/${lecture.lectureId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
					.then((res) => console.log('좋아요 취소'))
					.catch((err) => console.log(err))
				setLike(false)
			}
		} else {
			Swal.fire({
				title: "로그인이 필요합니다!",
				icon: "warning",
				confirmButtonText: '로그인하러가기'
			}).then((result) => {
				if (result.isConfirmed) {
					navigator('/login')
				}
			})
		}
	}

	// 리뷰 요약 탭 제어
	const [value, setValue] = useState(0)
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	// 상세 내용 탭 제어 
	const [value2, setValue2] = useState(0)
	const handleChange2 = (event, newValue) => {
		setValue2(newValue)
	}


	// 할인 여부에 따라 가격 다르게 표시하는 함수
	const definePrice = function (price1, price2) {
		if (price2 == 0) {
			return (<p style={{color:'rgb(29, 35, 100)', fontWeight:'900'}}>무료강의</p>)
		} else if (price1 == price2) {
			return (<p>가격: <span style={{ color:'grey'}}>{price1.toLocaleString()}</span>원</p>)
		} else {
			return (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop:'10px' }}>
				<p style={{ textDecoration: 'line-through', margin: 0 }}>가격: <span style={{color:'grey'}}>{price2.toLocaleString()}</span></p>
				<EastIcon fontSize='small' />
				<p style={{ margin: 0, color:'rgb(29, 35, 100)' }}>{price1.toLocaleString()}원</p>
			</div>)
		}
	}

	return (
		<div>
			{
				lecture == null ? null : (
					<div>
						<Container style={{ display: 'flex', padding: '20px' }}>
							<img src={lecture.image} alt="강의 이미지" style={{ width: '300px', height: '250px' }} />
							<div style={{ padding: '10px', marginLeft: '30px', width: '60%' }}>
								<div style={{ height: '80%', paddingTop: '30px' }}>
									<p style={{ fontSize: '0.9em', margin: '0px' }}>{lecture.categoryName}</p>
									<p style={{ fontSize: '1.8em', fontWeight: 800 }}>{lecture.lectureName}</p>
									<div style={{ display: 'flex', flexDirection: 'row' , alignItems:'center'}}>
										<SellIcon fontSize='small' />{definePrice(lecture.priceOriginal, lecture.priceSale)}
									</div>
									<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
										<PersonIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>강의자:</p>{lecture.instructor}
									</div>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
										<Rating defaultValue={lecture.combinedRating} precision={0.5} readOnly sx={{ margin: 0 }} />
										<p style={{ margin: "0 4px" }}>{`(${lecture.combinedRating}) 총 ${lecture.combinedRatingCount}개의 수강평 `}</p>
									</div>

									<div>
										{/* 좋아요버튼 */}
										<IconButton size='small' onClick={toggleLike}>
											{
												like ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)
											}
										</IconButton>
										{like ? lecture.lectureLikeCount + 1 : lecture.lectureLikeCount}
									</div>
								</div>
							</div>
						</Container>
						<Divider sx={{ bgcolor: 'lightgrey' }} />

						{/* GPT강의요약 */}
						<Container sx={{ marginTop: '20px' }}>
							<p style={{ fontSize: '1.2em', marginBottom: '10px' }}>🤖GPT로 리뷰를 한 줄 요약했어요</p>
							<Box sx={{ width: '100%' }}>
								<Tabs
									value={value}
									onChange={handleChange}
								>
									<Tab value={0} label="높은 평점 요약" sx={{ fontSize: '1.2em' }} />
									<Tab value={1} label="낮은 평점 요약" sx={{ fontSize: '1.2em' }} />
								</Tabs>
								<div style={{ marginTop: "20px" }}>
									{
										value == 0 ? lecture.gptReviewGood : lecture.gptReviewBad
									}
								</div>
							</Box>
						</Container>
						<Divider variant="middle" sx={{ bgcolor: 'lightgrey', marginTop: '40px' }} />
						{/* 강의 상세내용 */}
						<Container>
							<Box sx={{ width: '100%', marginTop: '10px' }}>
								<Tabs
									value={value2}
									onChange={handleChange2}
								>
									<Tab value={0} label="강의소개" />
									<Tab value={1} label="커리큘럼" />
									<Tab value={2} label="리뷰" />
								</Tabs>
								<div style={{ marginTop: "20px" }}>
									{
										// 상세내용
										value2 == 0 ? (<Content1 lecture={lecture} />) : null
									}
									{
										// 커리큘럼
										value2 == 1 ? (<Content2 lecture={lecture} />) : null
									}
									{
										// 리뷰(컴포넌트로 뺌)
										value2 == 2 ? (<LectureDetailReviews lecture={lecture} />) : null
									}
								</div>
							</Box>
						</Container>
					</div>
				)
			}
		</div >
	)
}

// 상세내용
function Content1(props) {
	const lecture = props.lecture

	// 상세내용 HTML 띄우는 용
	const [htmlString, setHtmlString] = useState('')
	useEffect(() => {
		if (htmlString == '') {
			// axios.get(lecture.descriptionDetail)
			axios.get('https://storage.googleapis.com/classhub/data/udemy/htmlFiles/1.html')
				.then((res) => {
					setHtmlString(res.data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	})
	return (
		<div>
			<div>
				<h3>한 줄 소개</h3>
				<p>{lecture.summary}</p>
			</div>
			<div>
				<h3>배울 내용 요약</h3>
				<p>{lecture.descriptionSummary}</p>
			</div>
			<div>
				<h3>강의 상세 정보</h3>
				{
					htmlString != '' ? (<div
						style={{ overflow: 'scroll', width: '100%' }}
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(htmlString),
						}}
					/>) : null
				}
			</div>
		</div>
	)
}


// 커리큘럼
function Content2(props) {
	const lecture = props.lecture
	const curriculum = JSON.parse(lecture.curriculum).curriculum
	return (
		<Container>
			<h3>커리큘럼 (총 {lecture.totalTime}시간)</h3>
			{
				curriculum.map((theme, idx) => {
					return (
						<Accordion key={idx}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								sx={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}
							>
								<p style={{ margin: '7px' }}><span style={{ fontSize: '1.2em' }}>{theme.title}</span> ({theme.item_count}개의 강의, 총 {theme.time}시간)</p>
							</AccordionSummary>
							<AccordionDetails>
								{
									theme.items.map((item, idx) => {
										return (
											<div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
												<p>{item.title}</p>
												<p>{item.time ? (<>{item.time}</>) : null}</p>
											</div>
										)
									})
								}
							</AccordionDetails>
						</Accordion>
					)
				})
			}
		</Container>
	)
}

export default LectureDetail

