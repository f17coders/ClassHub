import Grid from '@mui/material/Grid'
import profileImg from './../../assets/Profile.png'
import {useState} from 'react'
import { Outlet, Link } from 'react-router-dom'


function MyPage() {
	const linkStyle = {
		textDecoration: 'none',
		fontSize:'1.7em', 
		color:'black'
	}

	const tabItem = [
		{link:'/mypage/lecture', name:'수강중인 강의'},
		{link:'/mypage/like', name:'찜한 강의'},
		{link:'/mypage/community', name:'내 커뮤니티'},
		{link:'/mypage/edit', name:'내 정보 수정하기'}
	]

	return (
		<Grid container sx={{ width: '90%', margin: 'auto' }}>
			<Grid item xs={5} md={3} sx={{ display: 'flex', justifyContent: 'center', padding: '30px', flexDirection: 'column' }}>
				<img style={{ width: '90%', borderRadius: '70%' }} src={profileImg} alt="Profile Image" />
				<p style={{ margin: '10px 0', textAlign: 'center', fontWeight: '800', fontSize: '2em' }}>망글곰님<br />마이페이지</p>
				<p style={{ textAlign: 'center', fontWeight: '600', color: 'grey' }}>BackEnd</p>
				<div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'50px'}}>
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
	)
}

export default MyPage