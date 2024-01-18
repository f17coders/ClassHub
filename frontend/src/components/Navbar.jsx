import { Container, Nav, Navbar } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import MainLogo from './../assets/MainLogo.png'
import { useState } from "react"
import LoginModal from "./LoginModal"

function NavbarComponent() {
	const [modalShow, setModalShow] = useState(false)

	return (
		<Navbar style={{backgroundColor:'white'}}>
			<Container>
				<Navbar.Brand href="/">
					<img
						src={MainLogo}
						width='170px'
						className="d-inline-block align-top"
					/>
				</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/lecture">Lecture</Nav.Link>
					<Nav.Link href="/community">Community</Nav.Link>
					<Nav.Link href="/studyroom">Study Room</Nav.Link>
				</Nav>
			</Container>
			<Button onClick={() => setModalShow(true)}>Login</Button>
			<LoginModal show={modalShow} onHide={() => setModalShow(false)}/>
		</Navbar>
	)
}
export default NavbarComponent