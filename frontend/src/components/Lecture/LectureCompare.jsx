import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useState } from 'react'
import LectureCompareModal from './LectureCompareModal'
import BalanceIcon from '@mui/icons-material/Balance'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux'
import {deleteElement} from './../../store/store.js'
// 강의 비교하는 컴포넌트

function LectureCompare() {
	// 모달 세팅용
	const [open, setOpen] = useState(false)
	const ModalOpen = () => setOpen(true)
	const ModalClose = () => setOpen(false)

	// 강의 비교 갯수 및 항목
	let compareLectures = useSelector((state) => state.compareLectures)
	let dispatch = useDispatch()

	return (
		<Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '10px' }}>
			<p>강의 비교</p>
			<div style={{ width: '100%', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					{compareLectures.map((item, idx) => (
						<div key={idx}  onClick={() => dispatch(deleteElement(idx))}>
							<CompareElement/>
						</div>	
					))}
					{Array(3 - compareLectures.length).fill().map((_, idx) => (
						<NoneElement key={idx} />
					))}
				</div>
				<Button onClick={ModalOpen}>비교하기</Button>
			</div>
			<LectureCompareModal open={open} onClose={ModalClose} />
		</Container>
	)
}


function CompareElement() {
	return (
		<div
		  style={{ 
				position: 'relative',
			}}
		>
			<div
				style={{
					width: '30px',
					height: '30px',
					margin: '10px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<IconButton>
					<BalanceIcon />
				</IconButton>
			</div>
		</div>
	)
}

function NoneElement() {
	return (
		<div
		  style={{ 
				position: 'relative',
			}}
		>
			<div
				style={{
					width: '30px',
					height: '30px',
					margin: '10px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}>
				<IconButton>
					<AddIcon />
				</IconButton>
			</div>
		</div>

	)
}

export default LectureCompare