import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import { useSelector, useDispatch } from 'react-redux'
import { deleteElement } from './../../store/store.js'
import { Grid } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import SellIcon from '@mui/icons-material/Sell'
import EastIcon from '@mui/icons-material/East';

// 강의 비교하는 컴포넌트

function LectureCompare() {
	// 비교하고싶은 강의 store에서 불러오기
	let compareLectures = useSelector((state) => state.compareLectures)
	let dispatch = useDispatch()

	return (
		<Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '5px' }}>
			<p style={{ fontSize: '1.5em', fontWeight: '600' }}>강의 비교</p>
			<Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
				{compareLectures.map((lecture, idx) => (
					<Grid item xs={4} key={idx}>
						<div style={{position:'relative'}}>
							<IconButton onClick={() => dispatch(deleteElement(idx))} sx={{ position: 'absolute', top: -15, right: -10 }}>
								<HighlightOffIcon />
							</IconButton>
							<CompareElement lecture={lecture} />
						</div>

					</Grid>

				))}
				{Array(3 - compareLectures.length).fill().map((_, idx) => (
					<Grid item xs={4} key={idx}>
						<NoneElement />
					</Grid>

				))}
			</Grid>
		</Container>
	)
}


function CompareElement({ lecture }) {

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
		<Paper sx={{ height: '500px', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '10px' }}>
			<Box sx={{ height: '350px' }}>
				<div style={{ height: '80%', paddingTop: '30px' }}>
					<p style={{ fontSize: '0.9em', margin: '0px' }}>{lecture.categoryName}</p>
					<p style={{ fontSize: '1.8em', fontWeight: 800 }}>{lecture.lectureName}</p>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<SellIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>가격:</p>{definePrice(lecture.priceOriginal, lecture.priceSale)}
					</div>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
						<PersonIcon fontSize='small' /><p style={{ margin: "0px 4px" }}>강의자:</p>{lecture.instructor}
					</div>
				</div>
			</Box>
			<Box sx={{ height: '50px' }}>
				<Button variant="outlined" onClick={() => goDetail(lecture.lectureId)}>강의 보러가기</Button>
			</Box>

		</Paper>
	)
}

function NoneElement() {

	const goTop = () => {
		window.scrollTo(0, 0);
	}

	return (
		<Paper sx={{ height: '500px', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '10px', justifyContent: 'center' }}>
			<Tooltip title="비교하고 싶은 강의를 추가해주세요!">
				<Link to='/lecture'>
					<IconButton onClick={goTop}>
						<AddCircleOutlineIcon fontSize='large' />
					</IconButton>
				</Link>
			</Tooltip>
		</Paper>
	)
}

export default LectureCompare