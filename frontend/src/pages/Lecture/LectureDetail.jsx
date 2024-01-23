import img1 from './../../assets/Lecture/Lecture3.png'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Container from '@mui/material/Container'
import {useState} from 'react'
import IconButton from '@mui/material/IconButton'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import axios from 'axios'
import { Button } from '@mui/material'

axios.defaults.withCredentials = true;


const reviews = ['강의 집중이 너무 잘되고, 프로그램 관점이 아닌 시스템~', '좀 별로네요']

function LectureDetail() {
	const [like, setLike] = useState(false)
	const toggleLike = () => setLike(!like)
	const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
	const [value2, setValue2] = useState(0)
	const handleChange2 = (event, newValue) => {
    setValue2(newValue)
  }
	const [htmlString, setHtmlString] = useState(``)
	return (
		<div>
			<Container style={{display:'flex', padding:'20px'}}>
				<img src={img1} alt="강의 이미지" style={{width:'300px', height:'250px'}}/>
				<div style={{padding:'30px', width:'50%'}}>
					{/* 가져와지긴하는데 html형식으로만 나옴 */}
					{/* <div dangerouslySetInnerHTML={{ __html: htmlString }}></div> */}
					<p>카테고리<br/>강의명<br/>가격 할인률<br/>평점<br/>강사명<br/>해시태그<br/>바로가기 링크</p>
					<Button onClick={() => {
                axios.get('/classhub/data/udemy/htmlFiles/1.html?authuser=2')
                .then((data)=> {
										setHtmlString(data.data)
                    console.log(typeof htmlString)
                })
            }}>더보기</Button>
					
				</div>
				<div style={{ position: 'relative' }}>
					<IconButton size='small' onClick={toggleLike} sx={{position: 'absolute', bottom: 20 }}>
						{
							like ? (<FavoriteIcon/>) : (<FavoriteBorderIcon/>)
						}
					</IconButton>
				</div>
			</Container>
			<Divider sx={{bgcolor:'lightgrey'}} />

			<Container sx={{marginTop: '20px'}}>
				<p>🤖GPT로 리뷰를 한 줄로 요약했어요</p>
				<Box sx={{ width: '100%' }}>
					<Tabs
						value={value}
						onChange={handleChange}
					>
						<Tab value={0} label="높은 평점 요약" />
						<Tab value={1} label="낮은 평점 요약" />
					</Tabs>
					<div style={{marginTop:"20px"}}>
						{reviews[value]}
					</div>
    		</Box>
			</Container>
			<Divider variant="middle" sx={{bgcolor:'lightgrey', marginTop:'40px'}}/>
			<Container>
				<Box sx={{ width: '100%', marginTop:'10px' }}>
					<Tabs
						value={value2}
						onChange={handleChange2}
					>
						<Tab value={0} label="강의소개" />
						<Tab value={1} label="커리큘럼" />
						<Tab value={2} label="리뷰" />
					</Tabs>
					<div style={{marginTop:"20px"}}>
						{
							value2 == 0 ? (<Content1/>) : null
						}
						{
							value2 == 1 ? (<Content2/>) : null
						}
						{
							value2 == 2 ? (<Content3/>) : null
						}
					</div>
    		</Box>
			</Container>
		</div>
	)
}

function Content1() {
	return (
		<div>
			<div>
				<h3>한 줄 소개</h3>
				<p>백엔드 개발자를 위한 스프링 부트 끝판왕!</p>
			</div>
			<div>
				<h3>배울 내용 요약</h3>
				<p>요약 내용</p>
			</div>
			<div>
				<h3>강의 소개</h3>
				<p>스프링 부트를 코드를 통해 쉬우면서도 깊이있게 이해하고 싶은 백엔드 개발자 및 취업 준비행을 위한 강의입니다.</p>
			</div>
		</div>
	)
}

function Content2() {
	return (
		<div>
			<h3>커리큘럼</h3>
			<p>커리큘럼 내용이 들어갑니다</p>
		</div>
	)
}

function Content3() {
	return (
		<div>
			<p>리뷰들이 들어갑니다</p>
		</div>
	)
}

export default LectureDetail

