import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import {useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import BalanceIcon from '@mui/icons-material/Balance'

function LectureCard(props) {
	const [hover, setHover] = useState(false)
	const hoverStyle = {
		position:'relative',
		height: 340,
		cursor: hover ? 'pointer' : 'none',
		boxShadow: hover ? "0px 4px 8px 0px rgba(0, 0, 0, 0.2)" : 'none' ,
	}
	const [like, setLike] = useState(false)
	const toggleLike = () => setLike(!like)

	return (
		<Card 
			variant="outlined"
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
						<p style={{marginBottom: '5px'}}>강의자<br/><Rating value={4} readOnly></Rating></p>
					</div>
					<div>
						<Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
					</div>
				</div>
			</CardContent>
			{
				hover == true ? (
					<div
						style={{
							position:'absolute',
							top: 0, 
							backgroundColor:'rgba(29, 35, 100, 0.9)', 
							width:'100%', 
							height:'100%', 
							color:'white',
							padding:'15px',
							display:'flex',
							flexDirection:'column'
						}}
					>
						<p style={{fontWeight:'700', fontSize:'1.3em'}}>{props.title}</p>
						<div style={{height:'70%'}}>
							<p>수강기간<br/>한줄 설명<br/>강의 총 시간<br/>난이도</p>
						</div>
						<div style={{height:'20%'}}>
							<Button size="small" sx={{ backgroundColor:'RGB(83, 96, 245)', color:'white', borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
						</div>
						<div style={{marginLeft:'50%'}}>
							<IconButton size='small' onClick={toggleLike} sx={{color:'white'}}>
								{
									like ? (<FavoriteIcon/>) : (<FavoriteBorderIcon/>)
								}
							</IconButton>
							<IconButton size='small' sx={{color:'white'}}>
								<BalanceIcon/>
							</IconButton>
						</div>
					</div>
				) : null
			}
		</Card>
	)
}

export default LectureCard