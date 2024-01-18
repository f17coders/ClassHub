import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MainLogo from './../assets/MainLogo.png'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

function LoginModal(props) {
	
	return(
		<Modal
			{...props}
			aria-labelledby="modal-modal-title"
        	aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div style={{
					display:'flex', 
					padding: "70px 30px 100px 30px", 
					flexDirection:'column', 
					justifyContent:"center",
					alignItems:"center"
				}}>
					<img src={MainLogo} alt="MainLogo" style={{width:'80%'}}/>
					<div style={{marginTop:'20px', width:'70%'}}>
						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outlined">Log in with google</Button>
						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outlined">Log in with kakao</Button>
						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outlined">Log in with naver</Button>
					</div>
				</div>
			</Box>
		</Modal>
	)
}

export default LoginModal


// bootstrap 코드 

// import Modal from 'react-bootstrap/Modal'
// import MainLogo from './../assets/MainLogo.png'
// import Button from 'react-bootstrap/Button'

// function LoginModal(props) {
// 	return (
// 		<Modal
// 			{...props}
// 			aria-labelledby="login-modal"
// 			centered
// 		>
// 			<Modal.Header closeButton style={{margin: "0px 20px"}}>
// 				<Modal.Title id="login-modal">
// 					Login
// 				</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body>
// 				<div style={{
// 					display:'flex', 
// 					padding: "70px 30px 100px 30px", 
// 					flexDirection:'column', 
// 					justifyContent:"center",
// 					alignItems:"center"
// 				}}>
// 					<img src={MainLogo} alt="MainLogo" style={{width:'70%'}}/>
// 					<div style={{marginTop:'20px', width:'70%'}}>
// 						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outline-secondary">Log in with google</Button>
// 						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outline-warning">Log in with kakao</Button>
// 						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outline-success">Log in with naver</Button>
// 					</div>
// 				</div>
// 			</Modal.Body>
// 		</Modal>
// 	)
// }

// function NextModal(props) {
// 	return (
// 		<Modal
// 			{...props}
// 			aria-labelledby="login-modal"
// 			centered
// 		>
// 			<Modal.Header closeButton style={{margin: "0px 20px"}}>
// 				<Modal.Title id="login-modal">
// 					Login
// 				</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body>
// 				<div style={{
// 					display:'flex', 
// 					padding: "70px 30px 100px 30px", 
// 					flexDirection:'column', 
// 					justifyContent:"center",
// 					alignItems:"center"
// 				}}>
// 					<h2>추가 정보</h2>
// 					<div style={{marginTop:'20px', width:'70%'}}>
// 						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outline-secondary">Log in with google</Button>
// 						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outline-warning">Log in with kakao</Button>
// 						<Button style={{margin:'10px 0px', width:'100%', height:'50px'}} variant="outline-success">Log in with naver</Button>
// 					</div>
					
// 				</div>
// 			</Modal.Body>
// 		</Modal>
// 	)
// }

// export default LoginModal