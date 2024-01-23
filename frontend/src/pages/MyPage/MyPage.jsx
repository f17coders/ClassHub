import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import profileImg from './../../assets/Profile.png'
import {useState} from 'react'
import { Outlet, Link } from 'react-router-dom'


function MyPage() {
	const linkStyle = {
		textDecoration: 'none',
		fontSize:'1.5em', 
		color:'black'
	}

	const tabItem = [
		{link:'/mypage/lecture', name:'수강중인 강의'},
		{link:'/mypage/like', name:'찜한 강의'},
		{link:'/mypage/community', name:'내 커뮤니티'},
		{link:'/mypage/edit', name:'내 정보 수정하기'}
	]

	return (
		<Container>
			<Grid container>
				<Grid item xs={5} md={3} sx={{ display: 'flex', justifyContent: 'center', padding: '30px', flexDirection: 'column' }}>
					<img style={{ width: '70%', borderRadius: '70%', margin:'auto' }} src={profileImg} alt="Profile Image" />
					<p style={{ marginTop:'10px', marginBottom:'5px', textAlign: 'center', fontWeight: '800', fontSize: '1.7em' }}>망글곰님<br />마이페이지</p>
					<p style={{ textAlign: 'center', fontWeight: '600', color: 'grey' }}>BackEnd</p>
					<div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'30px'}}>
						{
							tabItem.map((item, idx) => (
								<div key={idx} style={{margin: '10px 0px'}}><Link to={item.link} style={linkStyle}>{item.name}</Link></div>
							))
						}
					</div>
				</Grid>
				<Grid item xs={7} md={9} sx={{marginTop:'30px', padding:'20px'}}>
					<Outlet/>
				</Grid>
			</Grid>
		</Container>
	)
}

export default MyPage