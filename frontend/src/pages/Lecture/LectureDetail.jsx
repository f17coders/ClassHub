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
import EastIcon from '@mui/icons-material/East';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import LectureDetailReviews from '../../components/Lecture/LectureDetailReviews'
import { useSelector } from 'react-redux'
import LoginModal from '../../components/LoginModal';

// 강의의 상세 내용이 들어가는 페이지 입니다.

function LectureDetail() {
	// id가져오기
	const { lectureId } = useParams()

	// 로그인 확인용(좋아요 버튼)
	let isLogin = useSelector((state) => state.isLogin)
	// 로그인 모달용
	const [open, setOpen] = useState(false)
	const ModalOpen = () => setOpen(true)
	const ModalClose = () => setOpen(false)

	// 강의 정보 저장할 변수
	const [lecture, setLecture] = useState(null)
	// 강의 정보 가져오기
	useEffect(() => {
		axios.get(`http://i10a810.p.ssafy.io:4000/api/lectures/v0/details/${lectureId}`)
			.then((response) => {
				console.log(response.data.result)
				setLecture(response.data.result)
			})
			.catch((err) => console.log(err));
	}, [lectureId]);


	// 강의 좋아요 누르기
	const [like, setLike] = useState(false)
	const toggleLike = function(){
		if (isLogin) {
			setLike(!like)
		} else {
			ModalOpen()
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

	// 상세내용 HTML 띄우는 용
	const [htmlString, setHtmlString] = useState('')
	const fetchHtmlString = () => {
		axios.get('https://storage.googleapis.com/classhub/data/udemy/htmlFiles/1.html', {
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:5173'
			}
		})
			.then((res) => {
				console.log(res)
				setHtmlString(res.data)
				console.log(htmlString)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	// 강의 가격에 따라서 다르게 출력하는 함수
	const definePrice = function(price1, price2) {
		if (price2 == 0) {
			return (<p>무료강의</p>)
		} else if (price1 == price2) {
			return (<p>{price1.toLocaleString()}</p>)
		} else {
			return(<div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
				<p style={{textDecoration:'line-through', margin:0}}>{price2.toLocaleString()}</p>
				<EastIcon fontSize='small'/>
				<p style={{margin:0}}>{price1.toLocaleString()}</p>
				</div>)
		}
	}
	return (
		<div>
			{
				lecture == null ? null : (
					<div>
						<Container style={{ display: 'flex', padding: '20px' }}>
							<img src={img1} alt="강의 이미지" style={{ width: '300px', height: '250px' }} />
							<div style={{ padding: '10px', marginLeft:'30px', width: '60%' }}>
								<div style={{height:'80%', paddingTop:'30px'}}>
									<p style={{fontSize:'0.9em', margin:'0px'}}>{lecture.categoryName}</p>
									<p style={{fontSize:'1.8em', fontWeight:800}}>{lecture.lectureName}</p>
									<div style={{display:'flex', flexDirection:'row'}}>
										<SellIcon fontSize='small'/><p style={{margin:"0px 4px"}}>가격:</p>{definePrice(lecture.priceOriginal, lecture.priceSale)}
									</div>
									<div style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:'10px'}}>
										<PersonIcon fontSize='small'/><p style={{margin:"0px 4px"}}>강의자:</p>{lecture.instructor}
									</div>
								</div>
								<div style={{display:'flex', justifyContent:'space-between'}}>
									<div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
										<Rating defaultValue={lecture.combinedRating} precision={0.5} readOnly sx={{margin:0}}/>
										<p style={{margin:"0 4px"}}>{`(${lecture.combinedRating}) 총 ${lecture.combinedRatingCount}개의 수강평 `}</p>
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
							<p style={{fontSize:'1.2em', marginBottom:'10px'}}>🤖GPT로 리뷰를 한 줄 요약했어요</p>
							<Box sx={{ width: '100%'}}>
								<Tabs
									value={value}
									onChange={handleChange}
								>
									<Tab value={0} label="높은 평점 요약" sx={{fontSize:'1.2em'}}/>
									<Tab value={1} label="낮은 평점 요약" sx={{fontSize:'1.2em'}} />
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
										// 리뷰
										value2 == 2 ? (<LectureDetailReviews lecture={lecture} />) : null
									}
								</div>
							</Box>
						</Container>
					</div>
				)
			}
			<LoginModal open={open} onClose={ModalClose} />
		</div >
	)
}

function Content1(props) {
	const lecture = props.lecture
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
				<p>{lecture.descriptionDetail}</p>
			</div>
		</div>
	)
}

function Content2(props) {
	const lecture = props.lecture
	return (
		<div>
			<h3>커리큘럼</h3>
			<p>커리큘럼 내용이 들어갑니다</p>
			<p>{`커리큘럼 총 시간: ${lecture.totalTime}`}</p>
			<p>{`커리큘럼: ${lecture.curriculum}`}</p>
		</div>
	)
}

export default LectureDetail

