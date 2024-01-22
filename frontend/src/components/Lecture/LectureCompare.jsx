import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import CompareElement from './CompareElement'
import { useState } from 'react'
import LectureCompareModal from './LectureCompareModal'



function LectureCompare() {
	const compareList = [{title: '얍'}, {}, {}]
	const [open, setOpen] = useState(false)
	const ModalOpen = () => setOpen(true)
	const ModalClose = () => setOpen(false)

	return (
		<Container sx={{ display: 'flex', alignItems: 'center',flexDirection:'column', padding:'10px'}}>
			<p>강의 비교</p>
			<div style={{width: '100%', height:'100px', display:'flex',flexDirection:'column', alignItems:'center'}}>
				<div style={{display:'flex', justifyContent:'space-between'}}>
					<CompareElement/>
					<CompareElement/>
					<CompareElement/>
				</div>
			<Button onClick={ModalOpen}>비교하기</Button>
			</div>
			<LectureCompareModal open={open} onClose={ModalClose} />
		</Container>
	)
}

export default LectureCompare