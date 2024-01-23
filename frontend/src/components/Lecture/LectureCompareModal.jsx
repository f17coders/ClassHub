import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// 강의 비교 Modal창

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 800,
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
    display: 'flex',
    justifyContent: 'space-between'
}

function LectureCompareModalElement() {
    return(
        <div>
            <div>
                <p>강의명</p>
                <p>평점</p>
            </div>
            <div>
                <p>강사명</p>
                <p>가격</p>
                <div>
                    <p>인원, 하트수, 리뷰요약, 해시태그</p>
                </div>
            </div>
            <div>
                <p>커리큘럼</p>
            </div>
            <Button>바로가기</Button>
        </div>
    )
}


function LectureCompareModal(props) {
    return(
        <Modal
            {...props}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <LectureCompareModalElement/>
                <LectureCompareModalElement/>
                <LectureCompareModalElement/>
            </Box>
        </Modal>
    )
}

export default LectureCompareModal