import { Container, Nav, Navbar } from "react-bootstrap"
import MainLogo from './../assets/MainLogo.png'

function NavbarComponent() {
	return (
		<Navbar bg="light" variant="light">
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
		</Navbar>
	)
}
export default NavbarComponent