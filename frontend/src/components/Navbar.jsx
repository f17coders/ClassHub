import { useState, useEffect } from 'react'
import Appbar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Tooltip } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import MainLogo from './../assets/MainLogo.png'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import { useSelector, useDispatch } from 'react-redux'
import LogoutIcon from '@mui/icons-material/Logout';
import { logout, deleteAccessToken } from './../store/store'
import { logoutUser } from './../store/userSlice'
import Swal from 'sweetalert2'

// navbar
function NavbarComponent() {
	// 로그인 체크용
	let isLogin = useSelector((state) => state.isLogin)
	// 유저정보 가져오기 용
	let user = useSelector((state) => state.user)
	const accessToken = useSelector((state) => state.accessToken)
	const dispatch = useDispatch()

	// 로그아웃(isLogin을 false로 바꾸고, 토큰 지우고, 유저정보 지우고)
	const handleLogout = () => {
		dispatch(logout())
		dispatch((logoutUser()))
		deleteAccessToken()
		Swal.fire({
			title: "로그아웃",
			icon: "success"
		})
		// axios.delete('https://i10a810.p.ssafy.io/api/members/v1', {
		// 	headers: {
		// 		Authorization: `Bearer ${accessToken}`
		// 	}
		// })
		// .then((res) => {
		// 	dispatch(logout())
		// 	dispatch((logoutUser()))
		// 	Swal.fire({
		// 		title: "로그아웃!",
		// 		icon: "success"
		// 	  })
		// })
		// .catch((err) => console.log(err))
	}
	// 화면 줄었을 때 리스트용(반응형)
	const [anchorElNav, setAnchorElNav] = useState(null)
	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

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
		fontWeight: '600',
		transition: 'font-size 0.3s ease'
	}
	const linkStyle2 = {
		textDecoration: 'none',
		color: 'black',
		fontSize: '1.2em',
		fontWeight: '600',
		transition: 'font-size 0.3s ease',
	}

	return (
		<Appbar
			position='static'
			color='transparent'
			sx={{
				height: '65px'
			}}
		>
			<Grid container>
				<Grid item xs={1}></Grid>
				<Grid item xs={8} sx={{ display: 'flex', alignItems: 'center', height:'65px' }}>
					<Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
						<Link to='/'>
							<img src={MainLogo} alt='HOME' style={{ width: '200px', marginRight: '20px' }}></img>
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

					<Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', height:'65px' }}>
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
							<img src={MainLogo} alt='HOME' style={{ width: '150px', marginRight: '20px'}}></img>
						</Link>
						<Menu
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
									<div key={idx} style={{ margin: '0px 15px' }}>
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
						</Menu>
					</Box>
				</Grid>

				<Grid item xs={2} sx={{ display:'flex', alignItems:'center'}}>
					{
						isLogin == false ? (
							<Link 
								to='/login'
								style={linkStyle}
							>
								Login
							</Link>
						) : (
							<div>
								<Link to="/mypage">
									<IconButton>
										<img src={user.profileImage} alt="profile" style={{ width: '40px', height: '40px', borderRadius: '70%' }} />
									</IconButton>
								</Link>
								<Tooltip title='Logout' sx={{display: {xs:'none', md:'inline-block'}}}>
									<IconButton onClick={handleLogout}>
										<LogoutIcon />
									</IconButton>
								</Tooltip>
							</div>
							
						)
					}
				</Grid>
			</Grid>
		</Appbar>
	)
}

export default NavbarComponent
