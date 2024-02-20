import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import SellIcon from '@mui/icons-material/Sell'
import WebIcon from '@mui/icons-material/Web';
import EastIcon from '@mui/icons-material/East';
import { useState } from 'react'


function CompareElement({ lecture }) {

	// 호버용 변수들
	const [isHover, setIsHover] = useState(false)
	const handleMouseEnter = () => {
		setIsHover(true)
	}
	const handleMouseLeave = () => {
		setIsHover(false)
	}

	// 전체 스타일
	const elementStyle = {
		height: '440px',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		padding: '10px',
		transition: 'transform 0.3s ease',
		transform: isHover ? 'scale(1.01)' : 'scale(1)',
		cursor: isHover ? 'pointer' : null
	}

	// 강의 가격에 따라서 다르게 출력하는 함수
	const definePrice = function (price1, price2) {
		if (price2 == 0) {
			return (<p style={{ margin: '0' }}>무료강의</p>)
		} else if (price1 == price2) {
			return (<p style={{ margin: '0' }}>{price1.toLocaleString()}</p>)
		} else {
			return (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '0' }}>
				<p style={{ textDecoration: 'line-through', margin: 0 }}>{price2.toLocaleString()}</p>
				<EastIcon fontSize='small' />
				<p style={{ margin: 0 }}>{price1.toLocaleString()}</p>
			</div>)
		}
	}

	const navigate = useNavigate()
	const goDetail = (lectureId) => {
		navigate(`/lecture/detail/${lectureId}`)
	}
	return (
		<Paper sx={elementStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => goDetail(lecture.lectureId)}>
			<div style={{ padding: '5px' }}>
				<img src={lecture.image} style={{ width: "100%" }} />
				<div style={{ padding: '5px' }}>
					<p style={{
						fontSize: '1.3em', fontWeight: 800,
						height: '110px',
						display: '-webkit-box',
						WebkitBoxOrient: 'vertical',
						WebkitLineClamp: 4,
						overflow: 'hidden',
						textOverflow: 'ellipsis'
					}}>{lecture.lectureName}</p>
					<div style={{height:'100px'}}>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<SellIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>가격:</p>{definePrice(lecture.priceOriginal, lecture.priceSale)}
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
							<PersonIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>강의자: {lecture.instructor}</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
							<WebIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>사이트:</p>{lecture.siteType}
						</div>
					</div>
					<Rating defaultValue={lecture.combinedRating} precision={0.5} readOnly sx={{ margin: '5px' }} />
				</div>

			</div>
		</Paper>
	)
}

export default CompareElement