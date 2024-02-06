import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import { useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import SellIcon from '@mui/icons-material/Sell'
import EastIcon from '@mui/icons-material/East';
import { useState } from 'react'
import img from './../../assets/Lecture/Lecture1.png'


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
			return (<p>무료강의</p>)
		} else if (price1 == price2) {
			return (<p>{price1.toLocaleString()}</p>)
		} else {
			return (<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
				<div style={{ padding:'5px' }}>
					<img src={img} style={{width:"100%"}} />
					<div style={{padding:'15px'}}>
						<p style={{ fontSize: '0.9em', margin: '0px' }}>{lecture.categoryName}</p>
						<p style={{ fontSize: '1.8em', fontWeight: 800 }}>{lecture.lectureName}</p>
						<div style={{ display: 'flex', flexDirection: 'row' }}>
							<SellIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>가격:</p>{definePrice(lecture.priceOriginal, lecture.priceSale)}
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
							<PersonIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>강의자:</p>{lecture.instructor}
						</div>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
							<PersonIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>사이트:</p>{lecture.siteType}
						</div>
						<Rating defaultValue={lecture.combinedRating} precision={0.5} readOnly sx={{ margin: '5px' }} />
					</div>
					
				</div>
		</Paper>
	)
}

export default CompareElement