import { useState } from 'react'
import Appbar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import MainLogo from './../assets/MainLogo.png'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LoginModal from './LoginModal'
import { useSelector } from 'react-redux'
import profile from './../assets/Profile.png'

const pages = [
	{ name: 'Lecture', url: 'lecture' },
	{ name: 'Community', url: 'community' },
	{ name: 'Study Room', url: 'studyroom' }
]
// navbar

function NavbarComponent() {
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
		{link:'/lecture', name:'강의'},
		{link:'/community', name:'커뮤니티'},
		{link:'/studyroom', name:'스터디룸'},
	]
	const linkStyle = {
		textDecoration: 'none',
		color:'black',
		fontSize: '1.3em',
		fontWeight:'700',
		transition: 'font-size 0.3s ease'
	}


	return (
		<Appbar
			position='static'
			color='transparent'
			sx={{
				padding: '10px 0px'
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
									<div key={idx} style={{margin: '0px 15px'}}>
										<Link to={item.link} 
											style={idx == activeIndex ? {...linkStyle, color:'RGB(83, 96, 245)'} : linkStyle } 
											onMouseEnter={() => handleMouseEnter(idx)} 
											onMouseLeave={handleMouseLeave}
											onClick={() => handleClick(idx)}
										>
											{item.name}
										</Link>
									</div>
								))
							}
						{/* <Link to='/lecture'>
							<Button>Lecture</Button>
						</Link>
						<Link to='/community'>
							<Button>Community</Button>
						</Link>
						<Link to='/studyroom'>
							<Button>Study Room</Button>
						</Link> */}
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
							<img src={MainLogo} alt='HOME' style={{ width: '200px', marginRight: '20px' }}></img>
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
							{pages.map((page) => (
								<MenuItem key={page.url} onClick={handleCloseNavMenu}>
									<Link to={'/' + page.url}>
										<Button>{page.name}</Button>
									</Link>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Grid>
				<Grid item xs={1}>
					{
						isLogin == false ? (
							<Button onClick={ModalOpen}>Login</Button>
						) : ( 
							<Link to="/mypage">
								<IconButton>
									<img src={profile} alt="profile" style={{width: '40px', borderRadius:'70%'}} />
								</IconButton>
							</Link>
						)
					}
				</Grid>
			</Grid>
			<LoginModal open={open} onClose={ModalClose} />
		</Appbar>
	)
}
export default NavbarComponent



// 처음에 bootstrap 쓸 때

// import { Container, Nav, Navbar } from "react-bootstrap"
// import Button from 'react-bootstrap/Button'
// import MainLogo from './../assets/MainLogo.png'
// import { useState } from "react"
// import LoginModal from "./LoginModal"


// function NavbarComponent() {
// 	const [modalShow, setModalShow] = useState(false)

// 	return (
// 		<Navbar style={{backgroundColor:'white'}}>
// 			<Container>
// 				<Navbar.Brand href="/">
// 					<img
// 						src={MainLogo}
// 						width='170px'
// 						className="d-inline-block align-top"
// 					/>
// 				</Navbar.Brand>
// 				<Nav className="me-auto">
// 					<Nav.Link href="/lecture">Lecture</Nav.Link>
// 					<Nav.Link href="/community">Community</Nav.Link>
// 					<Nav.Link href="/studyroom">Study Room</Nav.Link>
// 				</Nav>
// 				<Button variant="light" onClick={() => setModalShow(true)}>Login</Button>
// 				<LoginModal show={modalShow} onHide={() => setModalShow(false)}/>
// 			</Container>
// 		</Navbar>
// 	)
// }
// export default NavbarComponent
