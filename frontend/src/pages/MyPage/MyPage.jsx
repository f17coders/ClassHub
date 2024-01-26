import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import profileImg from './../../assets/Profile.png'
import {useState} from 'react'
import { Outlet, Link } from 'react-router-dom'
import CompareButton from './../../components/CompareButton'
// 마이페이지 전체 틀

function MyPage() {

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

	const linkStyle = {
		textDecoration: 'none',
		color:'black',
		fontSize: '1.5em',
		fontWeight:'650',
		transition: 'font-size 0.3s ease'
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
				{/* 내 프로필 이미지, 이름, 목표직무가 들어가는 곳 */}
				<Grid item xs={5} md={3} sx={{ display: 'flex', justifyContent: 'center', padding: '30px', flexDirection: 'column' }}>
					<img style={{ width: '70%', borderRadius: '70%', margin:'auto' }} src={profileImg} alt="Profile Image" />
					<p style={{ marginTop:'10px', marginBottom:'5px', textAlign: 'center', fontWeight: '800', fontSize: '1.7em' }}>망글곰님<br />마이페이지</p>
					<p style={{ textAlign: 'center', fontWeight: '600', color: 'grey' }}>BackEnd</p>

					{/* 마이페이지 메뉴 */}
					<div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'10px',paddingTop:'20px', borderTop:'1px solid lightgray'}}>
						{
							tabItem.map((item, idx) => (
								<div key={idx} style={{margin: '10px 0px'}}>
									<Link to={item.link} 
										style={idx == activeIndex ? {...linkStyle, fontSize:'1.6em'} : (idx == selectedIndex ? {...linkStyle, color:'rgb(83, 96, 245)'} : linkStyle )} 
										onMouseEnter={() => handleMouseEnter(idx)} 
										onMouseLeave={handleMouseLeave}
										onClick={() => handleClick(idx)}
									>
										{item.name}
									</Link>
									{/* <hr style={{margin: '10px' }}/> */}
								</div>
							))
						}
					</div>
				</Grid>
				{/* 마이페이지 내용이 들어가는 곳  */}
				<Grid item xs={7} md={9} sx={{marginTop:'30px', padding:'20px'}}>
					<Outlet/>
				</Grid>
			</Grid>
			<CompareButton/>
		</Container>
	)
}

export default MyPage