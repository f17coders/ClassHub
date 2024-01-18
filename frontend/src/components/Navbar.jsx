import Appbar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import MainLogo from './../assets/MainLogo.png'


function NavbarComponent() {
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
				<Grid item xs={8} sx={{ display: 'flex', alignItems:'center'}}>
					<Link to='/'>
						<img src={MainLogo} alt='HOME' style={{ width: '200px', marginRight: '20px' }}></img>
					</Link>
					<Box sx={{display: {xs:'none', md:'flex'}}}>
						<Link to='/lecture'>
							<Button>Lecture</Button>
						</Link>
						<Link to='/community'>
							<Button>Community</Button>
						</Link>
						<Link to='/studyroom'>
							<Button>Study Room</Button>
						</Link>
					</Box>
					
				</Grid>
				
			</Grid>
		</Appbar>
	)
}
export default NavbarComponent



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