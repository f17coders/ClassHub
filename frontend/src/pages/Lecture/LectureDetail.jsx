import FavoriteIcon from '@mui/icons-material/Favorite'
import Rating from '@mui/material/Rating'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Container from '@mui/material/Container'
import { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import CheckIcon from '@mui/icons-material/Check';
import SellIcon from '@mui/icons-material/Sell'
import axios from 'axios'
import EastIcon from '@mui/icons-material/East'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person'
import { useParams, useNavigate } from 'react-router-dom'
import LectureDetailReviews from '../../components/Lecture/LectureDetailReviews'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import LectureHTML from '../../components/Lecture/LectureHTML'

import { Accordion, Icon, Tooltip, Button } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { updateLikeList } from './../../store/userSlice'

// 강의의 상세 내용이 들어가는 페이지 입니다.

function LectureDetail() {
	// 토큰
	let accessToken = useSelector((state) => state.accessToken)
	// id가져오기
	const { lectureId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	// 로그인 확인용
	let isLogin = useSelector((state) => state.isLogin)

	// 유저정보
	let user = useSelector((state) => state.user)

	// 강의 정보 저장할 변수
	const [lecture, setLecture] = useState(null)
	// 강의 정보 가져오기
	useEffect(() => {
		axios.get(`https://i10a810.p.ssafy.io/api/lectures/v0/details/${lectureId}`)
			.then((response) => {
				console.log(response)
				setLecture(response.data.result)
			})
			.catch((err) => console.log(err))
	}, [lectureId]);

	// 강의가 로드 되고나서, 찾기
	useEffect(() => {
		if (isLogin && lecture) {
			try {
				if (user.likeList.length > 0) {
					if (user.likeList.includes(lecture.lectureId)) {
						setLike(true)
					} else if (user.likeList.includes(parseInt(lectureId))) {
						setLike(true)
					}
				}
			} catch(err) {
				console.log(err)
			}
		}
	}, [lecture])

	// 강의 좋아요 + 로그인 확인
	const [like, setLike] = useState(false)

	const toggleLike = () => {
		if (isLogin == true) {
			if (like == false) {
				axios.post(`https://i10a810.p.ssafy.io/api/lectures/v1/likes/${lecture.lectureId}`, null, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
					.then((res) => {
						setLike(true)
						// 현재 있는 좋아요 리스트에 지금 아이디 추가해주자
						const temp = [...user.likeList, parseInt(lectureId)]
						dispatch(updateLikeList(temp))
					})
					.catch((err) => console.log(err))
				// 좋아요 해제
			} else {
				axios.delete(`https://i10a810.p.ssafy.io/api/lectures/v1/unlikes/${lecture.lectureId}`, {
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				})
					.then((res) => {
						setLike(false)
						const temp = user.likeList.filter((id) => id !== parseInt(lectureId))
						dispatch(updateLikeList(temp))
					})
					.catch((err) => console.log(err))
			}
		} else {
			Swal.fire({
				title: "로그인이 필요합니다!",
				icon: "warning",
				confirmButtonText: '로그인하러가기'
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login')
				}
			})
		}
	}

	// 내가 산 강의에 추가
	const addMyLecture = function () {
		if (isLogin == true) {
			axios.post(`https://i10a810.p.ssafy.io/api/lectures/v1/buy/${lecture.lectureId}`, null, {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			})
				.then((res) => {
					Swal.fire({
						title: "강의 추가 완료",
						icon: "success"
					}).then((res) => location.reload())
				})
				.catch((err) => {
					if (err.response.data.reason == '이미 구매한 강의.') {
						Swal.fire({
							title: "이미 구매한 강의입니다!",
							icon: "warning"
						})
					}
				});
		} else {
			Swal.fire({
				title: "로그인이 필요합니다!",
				icon: "warning",
				confirmButtonText: '로그인하러가기'
			}).then((result) => {
				if (result.isConfirmed) {
					navigate('/login')
				}
			})
		}

	}

	// 상세 내용 탭 제어 
	const [value2, setValue2] = useState(0)
	const handleChange2 = (event, newValue) => {
		setValue2(newValue)
	}


	// 할인 여부에 따라 가격 다르게 표시하는 함수
	const definePrice = function (price1, price2) {
		if (price2 == 0) {
			return (<p style={{ color: 'rgb(29, 35, 100)', fontWeight: '900' }}>무료강의</p>)
		} else if (price1 == price2) {
			return (<p>가격: <span style={{ color: 'grey' }}>{price1.toLocaleString()}</span>원</p>)
		} else {
			return (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
				<p style={{ textDecoration: 'line-through', margin: 0 }}>가격: <span style={{ color: 'grey' }}>{price1.toLocaleString()}</span></p>
				<EastIcon fontSize='small' />
				<p style={{ margin: 0, color: 'rgb(29, 35, 100)' }}>{price2.toLocaleString()}원</p>
			</div>)
		}
	}

	// GPT 리뷰 더보기
	const [load, setLoad] = useState(false)
	const addMore = function () {
		setLoad(true)
	}

	return (
		<div>
			{
				lecture == null ? null : (
					<div>
						<Container style={{ display: 'flex', padding: '20px' }}>
							<img src={lecture.image} alt="강의 이미지" style={{ width: '300px', height: '250px', marginTop: '20px', borderRadius: '5px' }} />
							<div style={{ padding: '10px', marginLeft: '30px', width: '60%' }}>
								<div style={{ height: '75%' }}>
									<p style={{ fontSize: '0.9em', margin: '0px' }}>{lecture.categoryName}</p>
									<p style={{ fontSize: '1.8em', fontWeight: 800 }}>{lecture.lectureName}</p>
									<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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

									<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
										<div style={{ marginRight: '15px' }}>
											{/* 좋아요버튼 */}
											<IconButton size='small' onClick={toggleLike}>
												{
													like ? (<FavoriteIcon />) : (<FavoriteBorderIcon />)
												}
											</IconButton>
											{like ? lecture.lectureLikeCount + 1 : lecture.lectureLikeCount}
										</div>
										<div>
											{/* 내가 산 강의에 추가 */}
											<Tooltip title='내가 산 강의에 추가하기'><IconButton size='small' onClick={addMyLecture}><AddShoppingCartIcon /></IconButton></Tooltip>
										</div>
									</div>
								</div>
							</div>
						</Container>
						<Divider sx={{ bgcolor: 'lightgrey' }} />

						{/* GPT강의요약 */}
						<Container sx={{ marginTop: '20px' }}>
							<h3 style={{ textAlign: 'center' }}>🤖GPT로 리뷰를 요약했어요</h3>
							<Box>
								<p style={{ height: '40px', marginTop: '20px', overflow: load ? 'auto' : 'hidden', whiteSpace: load ? 'normal' : 'nowrap' }}>{lecture.gptReview}</p>
								{
									load ? null : (
										<Divider>
											<Button onClick={addMore}>더 보기</Button>
										</Divider>
									)
								}
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
			axios.get(`${lecture.descriptionDetail}`)
				.then((res) => {
					setHtmlString(res.data)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	})

	// 모달
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const style = {
		position: 'absolute',
		backgroundColor: 'white',
		padding: '10px',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '85%',
		height: '80%',
		border: '2px solid #000',
		boxShadow: 24,
		overflowY: 'scroll',
		overflowX: 'hidden'
	};
	return (
		<div>
			<div>
				<h3>한 줄 소개</h3>
				{
					lecture.summary.length != 0 ? (
						<div>
							{
								lecture.summary.map((item, idx) => {
									return (
										<div key={idx} style={{ display: 'flex', alignItems: 'center' }}><CheckIcon />{item}</div>
									)
								})
							}
						</div>) : (<p>한 줄 소개가 없는 강의입니다.</p>)
				}
			</div>
			<div style={{ marginTop: '50px' }}>
				<h3>배울 내용 요약</h3>
				<p>{lecture.descriptionSummary}</p>
			</div>
			<div style={{ marginTop: '50px' }}>
				<h3>강의 상세 정보</h3>
				{
					htmlString != '' ? (<Button onClick={handleOpen}>상세 보기</Button>) : (<p>상세 정보를 제공하지 않는 강의입니다.</p>)
				}
			</div>
			<Modal open={open} onClose={handleClose}>
				<div style={style}>
					<LectureHTML htmlString={htmlString} />
				</div>
			</Modal>
		</div>
	)
}


// 커리큘럼
function Content2(props) {
	const lecture = props.lecture
	const curriculum = JSON.parse(lecture.curriculum)
	return (
		<Container>
			<h3>커리큘럼 (총 {lecture.totalTime}시간)</h3>
			{
				Object.entries(curriculum).map(([section, {item_count, time, items}]) => {
					return (
						<Accordion key={section}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								sx={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}
							>
								<p style={{ margin: '7px' }}><span style={{ fontSize: '1.1em' }}>{section}</span> ({item_count}개의 강의, 총 {time}시간)</p>
							</AccordionSummary>
							<AccordionDetails>
								{
									Object.entries(items).map(([section, {time}]) => {
										return (
											<div key={section} style={{ display: 'flex', justifyContent: 'space-between' }}>
												<p>{section}</p>
												<p>{time ? (<>{time}</>) : null}</p>
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

