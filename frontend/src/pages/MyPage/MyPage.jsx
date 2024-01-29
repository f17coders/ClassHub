import Grid from '@mui/material/Grid'
import Backdrop from '@mui/material/Backdrop'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'
import profileImg from './../../assets/Profile.png'
import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import CompareButton from './../../components/CompareButton'
import { useSelector } from 'react-redux'
import LoginModal from '../../components/LoginModal'
// 마이페이지 전체 틀

function MyPage() {
	// 로그인 확인용
	let isLogin = useSelector((state) => state.isLogin)

	// 메뉴 + 호버링용 변수들
	const [activeIndex, setActiveIndex] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
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
	const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false)
		ModalOpen()
  }

	// 이후에 열릴 로그인 모달용
	const [toggleModal, setToggleModal] = useState(false)
	const ModalOpen = () => setToggleModal(true)
	const ModalClose = () => setToggleModal(false)

	// 마이페이지 메뉴 스타일
	const linkStyle = {
		textDecoration: 'none',
		color: 'black',
		fontSize: '1.5em',
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
				isLogin == true ? (
					<Grid container>
						<Grid item xs={5} md={3} sx={{ display: 'flex', justifyContent: 'center', padding: '30px', flexDirection: 'column' }}>
							{/* 회원 이미지 및 정보 */}
							<img style={{ width: '70%', borderRadius: '70%', margin: 'auto' }} src={profileImg} alt="Profile Image" />
							<p style={{ marginTop: '10px', marginBottom: '5px', textAlign: 'center', fontWeight: '800', fontSize: '1.7em' }}>망글곰님<br />마이페이지</p>
							<p style={{ textAlign: 'center', fontWeight: '600', color: 'grey' }}>BackEnd</p>

							{/* 마이페이지 메뉴 */}
							<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', paddingTop: '20px', borderTop: '1px solid lightgray' }}>
								{
									tabItem.map((item, idx) => (
										<div key={idx} style={{ margin: '10px 0px' }}>
											<Link to={item.link}
												style={idx == activeIndex ? { ...linkStyle, fontSize: '1.55em' } : (idx == selectedIndex ? { ...linkStyle, color: 'rgb(83, 96, 245)' } : linkStyle)}
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
						<Grid item xs={7} md={9} sx={{ marginTop: '30px', padding: '20px' }}>
							<Outlet />
						</Grid>
					</Grid>

				) : (<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={open}
					onClick={handleClose}
				>
					<Alert severity="success" color="warning">
						로그인이 필요합니다
					</Alert>
				</Backdrop>)
			}
			<CompareButton />
			<LoginModal open={toggleModal} onClose={ModalClose} />
		</Container>
	)
}

export default MyPage