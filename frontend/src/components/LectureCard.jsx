import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import {useState} from 'react'

function LectureCard(props) {
	const [hover, setHover] = useState(false)
	const hoverStyle = {
		height: 340,
		cursor: hover ? 'pointer' : 'none',
		boxShadow: hover ? "0px 4px 8px 0px rgba(0, 0, 0, 0.2)" : 'none' 
	}

	return (
		<Card 
			style={hoverStyle} 
			onClick={()=> console.log('상세페이지로!')}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<CardMedia
				sx={{ height: 140 }}
				image={props.img}
				title="lecture image"
			/>
			<CardContent style={{padding: '13px'}}>
				<div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
					<div style={{height: '70px'}}>
						<p style={{fontWeight:'700', fontSize:'1.1em'}}>{props.title}</p>
					</div>
					<div>
						<p style={{marginBottom: '5px'}}>강의자<br/>⭐⭐⭐⭐⭐</p>
					</div>
					<div>
						<Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
					</div>
					
				</div>
				{/* <Typography gutterBottom variant="h7" component="div">
					{props.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					강의 상세 정보가 들어가는 곳입니다
				</Typography> */}
			</CardContent>
			
		</Card>
	)
}

export default LectureCard