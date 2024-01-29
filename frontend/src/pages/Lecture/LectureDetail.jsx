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
import Divider from '@mui/material/Divider';
import axios from 'axios'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import LectureDetailReviews from '../../components/Lecture/LectureDetailReviews'

// 강의의 상세 내용이 들어가는 페이지 입니다.

const reviews = ['강의 집중이 너무 잘되고, 프로그램 관점이 아닌 시스템~', '좀 별로네요']
function LectureDetail() {
	// id가져오기
	const { lectureId } = useParams()

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
	const toggleLike = () => setLike(!like)

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

	return (
		<div>
			{
				lecture == null ? null : (
					<div>
						<Container style={{ display: 'flex', padding: '20px' }}>
							<img src={img1} alt="강의 이미지" style={{ width: '300px', height: '250px' }} />
							<div style={{ padding: '30px', width: '50%' }}>
								<p>{lecture.lectureName}</p>
								<p>카테고리: {lecture.categoryName}<br />가격: {lecture.priceOriginal}<br />할인가격: {lecture.priceSale}<br />강사명: {lecture.instructor}</p>
								<div>
									<Rating defaultValue={lecture.combinedRating}  precision={0.5} readOnly/>
									<>{`(${lecture.combinedRatingCount})`}</>
								</div>
							</div>
							<div style={{ position: 'relative' }}>
								{/* 좋아요버튼 */}
								<IconButton size='small' onClick={toggleLike} sx={{ position: 'absolute', bottom: 20 }}>
									{
										like ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)
									}
								</IconButton>
							</div>
						</Container>
						<Divider sx={{ bgcolor: 'lightgrey' }} />

						{/* GPT강의요약 */}
						<Container sx={{ marginTop: '20px' }}>
							<p>🤖GPT로 리뷰를 한 줄로 요약했어요</p>
							<Box sx={{ width: '100%' }}>
								<Tabs
									value={value}
									onChange={handleChange}
								>
									<Tab value={0} label="높은 평점 요약" />
									<Tab value={1} label="낮은 평점 요약" />
								</Tabs>
								<div style={{ marginTop: "20px" }}>
									{reviews[value]}
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
										value2 == 0 ? (<Content1 />) : null
									}
									{
										// 커리큘럼
										value2 == 1 ? (<Content2 />) : null
									}
									{
										// 리뷰
										value2 == 2 ? (<LectureDetailReviews />) : null
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

function Content1() {
	return (
		<div>
			<div>
				<h3>한 줄 소개</h3>
				<p>백엔드 개발자를 위한 스프링 부트 끝판왕!</p>
			</div>
			<div>
				<h3>배울 내용 요약</h3>
				<p>요약 내용</p>
			</div>
			<div>
				<h3>강의 소개</h3>
				<p>스프링 부트를 코드를 통해 쉬우면서도 깊이있게 이해하고 싶은 백엔드 개발자 및 취업 준비행을 위한 강의입니다.</p>
			</div>
		</div>
	)
}

function Content2() {
	return (
		<div>
			<h3>커리큘럼</h3>
			<p>커리큘럼 내용이 들어갑니다</p>
		</div>
	)
}

export default LectureDetail

