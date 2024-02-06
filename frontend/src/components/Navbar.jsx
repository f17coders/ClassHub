import { useState, useEffect } from 'react'
import Appbar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link, useNavigate } from 'react-router-dom'
import MainLogo from './../assets/MainLogo.png'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import LoginModal from './LoginModal'
import { useSelector, useDispatch } from 'react-redux'
import profile from './../assets/Profile.png'
import Switch from '@mui/material/Switch'
import { toggleLogin } from '../store/store'
import Lecture from './../pages/Lecture/Lecture'

const pages = [
	{ name: 'Lecture', url: 'lecture' },
	{ name: 'Community', url: 'community' },
	{ name: 'Study Room', url: 'studyroom' }
]
// navbar

function NavbarComponent() {
	const navigate = useNavigate();
	const dispatch = useDispatch()
	// 로그인 체크용
	let isLogin = useSelector((state) => state.isLogin)

	// 화면 줄었을 때 리스트용
	const [anchorElNav, setAnchorElNav] = useState(null)
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	// 로그인 모달용
	const [open, setOpen] = useState(false)
	const ModalOpen = () => setOpen(true)
	const ModalClose = () => setOpen(false)

	// 메뉴 + 호버링용 변수들
	const [activeIndex, setActiveIndex] = useState(null);
	const handleMouseEnter = (index) => {
		setActiveIndex(index);
	}
	const handleMouseLeave = () => {
		setActiveIndex(null);
	}
	const navItem = [
		{ link: '/lecture', name: '강의' },
		{ link: '/community', name: '커뮤니티' },
		{ link: '/studyroom', name: '스터디룸' },
	]
	const linkStyle = {
		textDecoration: 'none',
		color: 'black',
		fontSize: '1.3em',
		fontWeight: '550',
		transition: 'font-size 0.3s ease'
	}
	const linkStyle2 = {
		textDecoration: 'none',
		color: 'black',
		fontSize: '1.2em',
		fontWeight: '550',
		transition: 'font-size 0.3s ease',
	}

	const [accessToken, setAccessToken] = useState(null);
	// const getAccessTokenFromRedirectURL = () => {
	// 	const urlParams = new URLSearchParams(window.location.search);
	// 	return urlParams.get("Authorization")
	// };



	const handleLoginClick = () => {
		// window.location.href = 'https://i10a810.p.ssafy.io/login/oauth2/code/kakao';
		setAccessToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDk3ODI4NzcsImlhdCI6MTcwNzE5MDg3Nywicm9sZXMiOlsiUk9MRSJdLCJtZW1iZXJJZCI6IjE4In0.JmmSWf6hDYcpHR96txb6Lt03xrEmMxNIMbW04_pgPz0")

	  };

	  useEffect(() => {
		try {
		  // 컴포넌트가 마운트되면서 리다이렉트된 URL에서 AccessToken을 처리
		//   const token = getAccessTokenFromRedirectURL();
		// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MDk3Nzc3MzEsImlhdCI6MTcwNzE4NTczMSwicm9sZXMiOlsiUk9MRSJdLCJtZW1iZXJJZCI6IjE2In0.azeezniWcI2m35YuTKq9oyO7b3n81Z-Yi4XeSsQ0C5Y";
		  if (accessToken) {
			// setAccessToken(token);
			console.log(accessToken);
			// console.log(token);
			localStorage.setItem("token", accessToken);
			// loadUserInfo(token);
			// history.push('/main');  // 원하는 페이지로 리다이렉트
			navigate('/'); //메인 페이지로 리다이렉트
		  } else {
			throw new Error('Missing access token');
		  }
		} catch (error) {
		  console.error("카카오 로그인 에러:", error);
		//   history.push("/");
		}
	  }, [accessToken]);

		return (
			<Appbar
				position='static'
				color='transparent'
				sx={{
					padding: '10px 0px',
					height: '75px'
				}}
			>
				<Grid container alignItems="center">
					<Grid item xs={1}></Grid>
					<Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
						<Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
							<Link to='/'>
								<img src={MainLogo} alt='HOME' style={{ width: '220px', marginRight: '20px' }}></img>
							</Link>
							{
								navItem.map((item, idx) => (
									<div key={idx} style={{ margin: '0px 15px' }}>
										<Link to={item.link}
											style={idx == activeIndex ? { ...linkStyle, color: 'RGB(83, 96, 245)' } : linkStyle}
											onMouseEnter={() => handleMouseEnter(idx)}
											onMouseLeave={handleMouseLeave}
											onClick={() => handleClick(idx)}
										>
											{item.name}
										</Link>
									</div>
								))
							}
						</Box>

						<Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							>
								<MenuIcon />
							</IconButton>
							<Link to='/' >
								<img src={MainLogo} alt='HOME' style={{ width: '150px', marginRight: '20px', paddingTop: '10px' }}></img>
							</Link>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{
									navItem.map((item, idx) => (
										<div key={idx} style={{ margin: '10px 15px' }}>
											<Link to={item.link}
												style={idx == activeIndex ? { ...linkStyle2, color: 'RGB(83, 96, 245)' } : linkStyle2}
												onMouseEnter={() => handleMouseEnter(idx)}
												onMouseLeave={handleMouseLeave}
												onClick={() => handleClick(idx)}
											>
												{item.name}
											</Link>
										</div>
									))
								}

								{/* {pages.map((page) => (
								<MenuItem key={page.url} onClick={handleCloseNavMenu}>
									<Link to={'/' + page.url}>
										<Button sx={{color:'black'}}>{page.name}</Button>
									</Link>
								</MenuItem>
							))} */}
							</Menu>
						</Box>

						{/* 테스트용 로그인 토글 스위치 */}
						<Box><Switch onChange={() => dispatch(toggleLogin())} /></Box>

					</Grid>

					<Grid item xs={1}>
						{
							isLogin == false ? (
								<Button onClick={ModalOpen}>Login</Button>
							) : (
								<Link to="/mypage">
									<IconButton>
										<img src={profile} alt="profile" style={{ width: '40px', borderRadius: '70%' }} />
									</IconButton>
								</Link>
							)
						}
						{/* <Button onClick={handleLoginClick}>
							로그인
						</Button> */}
					</Grid>
				</Grid>
				<LoginModal open={open} onClose={ModalClose} />
			</Appbar>
		)
	}

	export default NavbarComponent
