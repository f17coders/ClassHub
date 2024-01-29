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
import { Link } from 'react-router-dom'

// 강의 비교하는 컴포넌트

function LectureCompare() {
	// 비교하고싶은 강의 store에서 불러오기
	let compareLectures = useSelector((state) => state.compareLectures)
	let dispatch = useDispatch()

	return (
		<Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '5px' }}>
			<p style={{ fontSize: '1.5em', fontWeight: '600' }}>강의 비교</p>
			<Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-between' }}>
				{compareLectures.map((item, idx) => (
					<Grid item xs={4} key={idx}>
						<div style={{ position: 'relative' }}>
							<IconButton onClick={() => dispatch(deleteElement(idx))} sx={{ position: 'absolute', top: -15, right: -10 }}>
								<HighlightOffIcon />
							</IconButton>
							<CompareElement title={item.title} />
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


function CompareElement(props) {
	return (
		<Paper sx={{ height: '500px', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '10px' }}>
			<Box sx={{ height: '100px' }}>
				<p>{props.title}</p>
			</Box>
			<Box sx={{ height: '350px' }}>
				<p>내용이 들어감</p>
			</Box>
			<Box sx={{ height: '50px' }}>
			<Button variant="outlined">강의 보러가기</Button>
			</Box>

		</Paper>
	)
}

function NoneElement() {
	return (
		<Paper sx={{ height: '500px', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '10px', justifyContent:'center' }}>
			<Tooltip title="비교하고 싶은 강의를 추가해주세요!">
				<Link to='/lecture'>
					<IconButton>
						<AddCircleOutlineIcon fontSize='large' />
					</IconButton>
				</Link>
			</Tooltip>
		</Paper>
	)
}

export default LectureCompare