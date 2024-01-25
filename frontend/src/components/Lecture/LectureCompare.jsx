import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useState } from 'react'
import LectureCompareModal from './LectureCompareModal'
import BalanceIcon from '@mui/icons-material/Balance'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { useSelector, useDispatch } from 'react-redux'
import { deleteElement } from './../../store/store.js'

// 강의 비교하는 컴포넌트

function LectureCompare() {
	// 모달 세팅용
	const [open, setOpen] = useState(false)
	const ModalOpen = () => setOpen(true)
	const ModalClose = () => setOpen(false)

	// 비교하고싶은 강의 store에서 불러오기
	let compareLectures = useSelector((state) => state.compareLectures)
	let dispatch = useDispatch()

	return (
		<Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', padding:'10px'}}>
			<p style={{fontSize:'1.2em', fontWeight:'600', marginBottom:'10px'}}>강의 비교</p>
			<div style={{ width: '100%', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					{compareLectures.map((item, idx) => (
						<div key={idx} onClick={() => dispatch(deleteElement(idx))}>
							<CompareElement title={item.title} />
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


function CompareElement(props) {
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
				<Tooltip placement="top" title={props.title}>
					<IconButton>
						<BalanceIcon />
					</IconButton>
				</Tooltip>
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