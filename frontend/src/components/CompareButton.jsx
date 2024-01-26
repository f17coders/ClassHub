import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { Tooltip, Button, Dialog, Slide } from '@mui/material'
import { useSelector } from 'react-redux'
import {useState, forwardRef} from 'react'
import DialogContent from '@mui/material/DialogContent'
import LectureCompare from './Lecture/LectureCompare'

// 모달(dialog) 트랜지션
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


// 강의 비교 버튼(화면 하단에 있는거)
function CompareButton() {
  // 비교하고싶은 강의 store에서 불러오기
	let compareLectures = useSelector((state) => state.compareLectures)

  // 창 열고 닫고 제어용
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={{position:'fixed', bottom:'30px', right:'30px'}}>
      <Tooltip title='강의 비교하기'>
        <Fab color="primary" onClick={handleClickOpen}>
          {
            // 강의가 들어있는 개수만큼 나오게, 없으면 +
            compareLectures.length == 0 ? (<AddIcon />) : compareLectures.length
          }
        </Fab>
      </Tooltip>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogContent sx={{width:'400px', height:'500px'}}>
          <LectureCompare/>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CompareButton