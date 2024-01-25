import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating'
import { useSelector, useDispatch } from 'react-redux'
import { deleteElement } from './../../store/store.js'



// 강의 비교 Modal창
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
    width:'900px',
    height:'600px',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4,
    display: 'flex',
    justifyContent: 'space-between'
}


function LectureCompareModal(props) {
    // 비교하고싶은 강의 store에서 불러오기
	let compareLectures = useSelector((state) => state.compareLectures)
	let dispatch = useDispatch()

    return(
        <Modal
            {...props}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {
                    compareLectures.length > 0 ? (
                        compareLectures.map((item, idx) => (
                            <LectureCompareModalElement lec={item} key={idx}/>
                        ))
                    ) : (<div><p>비교할 강의를 넣어주세요</p></div>)
                }
            </Box>
        </Modal>
    )
}


// 각각 강의의 정보 띄우는 컴포넌트
function LectureCompareModalElement(props) {
    return(
        <div style={{margin:'5px', border:'1px solid grey', width:'260px', padding:'10px', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{textAlign:'center', fontSize:'1.5em', height:'17%'}}>{props.lec.title}</div>
            <Rating
                readOnly
                value={3}
                sx={{}}
            />
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


export default LectureCompareModal