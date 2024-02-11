import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import EditIcon from '@mui/icons-material/Edit';
import NearMeIcon from '@mui/icons-material/NearMe';
import { IconButton, Paper, Chip, Tooltip, Button } from '@mui/material'
import profileImg from './../../assets/Profile.png'
import { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import CompareButton from './../../components/CompareButton'
import { useSelector } from 'react-redux'
import LoginModal from '../../components/LoginModal'
import Swal from 'sweetalert2'
import axios from 'axios'
import AddBoxIcon from '@mui/icons-material/AddBox'

// 마이페이지 전체 틀

function MyPage() {
	// 로그인 확인용
	let isLogin = useSelector((state) => state.isLogin)

	// 토큰
	let accessToken = useSelector((state) => state.accessToken)
	let user = useSelector((state) => state.user)

	// 참여중인 스터디 목록도 가져오기
	const [studies, setStudies] = useState([])
	useEffect(() => {
		axios.get('https://i10a810.p.ssafy.io/api/members/v1/studies/participation', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		})
			.then((res) => {
				// console.log(res.data.result)
				setStudies(res.data.result)
			})
			.catch((err) => console.log(err))
	}, [])


	// 나에게 맞는 강의 추천
	const [recommendLectures, setRecommendLectures] = useState({})
	useEffect(() => {
		// 유저정보 수정후 돌아오면
		setSelectedIndex(null)
		// 우선 목표직무에 맞는 강의(여기 수정해야함)
		axios.get('https://i10a810.p.ssafy.io/api/lectures/v1/desired-job', {
			headers: {
				AUTHORIZATION: `Bearer ${accessToken}`
			}
		})
			.then((res) => {
				setRecommendLectures(res.data.result.lectureList)
			})
	}, [user])


	// 메뉴 + 호버링용 변수들
	const [activeIndex, setActiveIndex] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const handleMouseEnter = (index) => {
		setActiveIndex(index);
	}
	const handleMouseLeave = () => {
		setActiveIndex(null);
	}
	const handleClick = (index) => {
		setSelectedIndex(index)
	}

	// 로그인 안되었을 때 알림창용
	const needLogin = function () {
		Swal.fire({
			title: "로그인이 필요합니다!",
			icon: "warning",
			confirmButtonText: '로그인하러가기'
		}).then((result) => {
			if (result.isConfirmed) {
				ModalOpen()
			}
		})
	}

	// 이후에 열릴 로그인 모달용
	const [toggleModal, setToggleModal] = useState(false)
	const ModalOpen = () => setToggleModal(true)
	const ModalClose = () => setToggleModal(false)

	// 마이페이지 메뉴 스타일
	const linkStyle = {
		textDecoration: 'none',
		color: 'black',
		fontSize: '1.35em',
		transition: 'font-size 0.3s ease'
	}

	// 마이페이지 메뉴 요소들
	const tabItem = [
		{ link: '/mypage/lecture', name: '수강중인 강의' },
		{ link: '/mypage/like', name: '찜한 강의' },
		{ link: '/mypage/community', name: '내 커뮤니티' },
		{ link: '/mypage/edit', name: '내 정보 수정하기' }
	]


	return (
		<Container>
			{
				isLogin == true ? (<div>{
					user != null ? (
						<Grid container>
							<Grid item xs={5} md={3} sx={{ display: 'flex', justifyContent: 'center', padding: '30px', flexDirection: 'column' }}>
								<img style={{ width: '180px', height: '180px', borderRadius: '75%', margin: '30px auto', cursor: 'pointer' }} onClick={() => handleClick(null)} src={user.profileImage == null ? profileImg : user.profileImage} alt="Profile Image" />
								{/* <p style={{ marginTop: '20px', marginBottom: '5px', textAlign: 'center', fontWeight: '600', color: 'grey' }}><span style={{color:'black'}}>{user.job.name}</span>가 될</p> */}
								<p style={{ marginTop: '10px', textAlign: 'center', fontWeight: '800', fontSize: '1.6em', cursor: 'pointer' }} onClick={() => handleClick(null)}>{user.nickname}의<br />마이페이지</p>
								{/* 마이페이지 메뉴 */}
								<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', paddingTop: '20px', borderTop: '1px solid lightgray' }}>
									{
										tabItem.map((item, idx) => (
											<div key={idx} style={{ margin: '10px 0px' }}>
												<Link to={item.link}
													style={idx == activeIndex ? { ...linkStyle, fontSize: '1.4em' } : (idx == selectedIndex ? { ...linkStyle, color: 'rgb(83, 96, 245)' } : linkStyle)}
													onMouseEnter={() => handleMouseEnter(idx)}
													onMouseLeave={handleMouseLeave}
													onClick={() => handleClick(idx)}
												>
													{item.name}
												</Link>
											</div>
										))
									}
								</div>
							</Grid>

							{/* 메뉴 요소들이 들어갈 곳 */}
							<Grid item xs={7} md={9} sx={{ padding: '20px' }}>
								{
									selectedIndex != null ? (<Outlet />) : (
										<Grid container sx={{ padding: '20px' }}>
											<Grid item xs={6} style={{ height: '250px', padding: '10px' }}>
												<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
													<p style={{ fontSize: '1.4em', fontWeight: '700', margin: '0px' }}>목표 직무와 관심 기술</p>
													<Tooltip title="수정하러가기"><IconButton onClick={() => setSelectedIndex(3)}><EditIcon /></IconButton></Tooltip>
												</div>
												<Paper sx={{ padding: '10px', height: '180px', overflow: 'auto' }}>
													<p style={{ fontSize: '1.2em', marginTop: '0px' }}><span style={{ color: 'grey' }}>목표직무: </span>{user.job.name}</p>
													<p style={{ color: 'grey', fontSize: '1.2em', marginBottom: '2px' }}>관심 기술</p>
													<div>
														{
															user.tagList.map((tag, idx) => {
																return (
																	<Chip key={idx} size="small" label={`# ${tag.name}`} sx={{ margin: '5px' }}></Chip>
																)
															})
														}
													</div>
												</Paper>
											</Grid>
											<Grid item xs={6} style={{ height: '250px', padding: '10px' }}>
												<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
													<p style={{ fontSize: '1.4em', fontWeight: '700', margin: '0px' }}>참여중인 스터디 목록</p>
													<Tooltip title="더보러가기"><Link to='/studyroom'><IconButton><NearMeIcon /></IconButton></Link></Tooltip>
												</div>
												<Paper sx={{ padding: '10px', height: '180px', overflow: 'auto' }}>
													{
														studies.map((study, idx) => {
															return (
																<Button size='large' fullWidth href={`studyroom/participating/${study.studyId}`} key={idx} sx={{ color: 'black' }}>{study.title}</Button>
															)
														})
													}
												</Paper>
											</Grid>
											<Grid item xs={12} style={{ height: '250px', marginTop: '40px' }}>
												<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
													<p style={{ fontSize: '1.4em', fontWeight: '700', margin: '0px' }}>나에게 맞는 강의 추천</p>
													<Tooltip title="더보러가기"><Link to='/lecture'><IconButton><AddBoxIcon /></IconButton></Link></Tooltip>
												</div>
												<Paper sx={{ padding: '10px', height: '180px' }}>
													{
														recommendLectures.length >= 0 ? (<div style={{ display: 'flex' }}>{
															recommendLectures.map((lecture, idx) => {
																return (<div key={idx} style={{ margin: '20px' }}>
																	<MyPageLectureCard lecture={lecture} />
																</div>)
															})
														}</div>) : null
													}
												</Paper>
											</Grid>
										</Grid>

									)
								}
							</Grid>
						</Grid>
					) : (<div>로딩중</div>)}
				</div>) : needLogin()
			}
			<CompareButton />
			<LoginModal open={toggleModal} onClose={ModalClose} />
		</Container>
	)
}

export default MyPage


function MyPageLectureCard({ lecture }) {
	const [hover, setHover] = useState(false)

	const goDetail = function () {
		navigate(`/lecture/detail/${lecture.lectureId}`)
	}

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			style={{ position: 'relative' }}
		>
			<img
				src={lecture.image} alt="강의 이미지"
				style={{ width: '200px', height:'120px', borderRadius:'7px' }} />
			{hover ? (
				<div
					style={{
						position: 'absolute',
						top: 0,
						backgroundColor: 'rgba(29, 35, 100, 0.9)',
						color: 'white',
						padding: '15px',
						display: 'flex',
						width:'170px',
						flexDirection: 'column', 
						borderRadius:'7px'
					}}
				>
					<div style={{ height: '50px' }} onClick={goDetail}>
						<p style={{
							fontWeight: '700', fontSize: '0.9em', margin: 0, display: '-webkit-box',
							WebkitBoxOrient: 'vertical',
							WebkitLineClamp: 2,
							overflow: 'hidden',
							textOverflow: 'ellipsis'
						}}>{lecture.lectureName}</p>
					</div>

					<div style={{ height: '40px' }} onClick={goDetail}>
						<p style={{fontSize:'0.7em'}}>총 {lecture.totalTime}시간<br />{lecture.level}</p>
					</div>
				</div>
			) : null
			}
		</div>
	)
}

