import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import { Tooltip, Button, Dialog, Slide, Container, Paper } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useState, forwardRef } from 'react'
import DialogContent from '@mui/material/DialogContent'
import CompareElement from './Lecture/CompareElement.jsx'

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import { deleteElement } from './../store/store.js'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import help1 from './../assets/Help/help1.png'


// 모달(dialog) 트랜지션용
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});


// 강의 비교 버튼(화면 하단에 있는거)
function CompareButton() {
  // 비교하고싶은 강의 store에서 불러오기
  let compareLectures = useSelector((state) => state.compareLectures)
  let dispatch = useDispatch()


  // 강의 추가하기 버튼 누르면 강의 페이지 제일 위로
  const goTop = () => {
    window.scrollTo(0, 0)
    handleClose()
  }


  // 창 열고 닫고 제어용
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // 안내문
  const openHelp = function() {
    Swal.fire({
      html: "강의카드에서 '강의 비교하기'를 클릭해서<br/>한 눈에 비교할 수 있어요",
      imageUrl: help1,
      imageWidth: 300,
      imageHeight: 250,
      imageAlt: "안내 이미지",
      customClass: {
        container: 'my-swal'
      }
    });
  }
  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px' }}>
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
        fullWidth
        maxWidth='md'
      >
        <DialogContent sx={{overflowY:'hidden'}}>
          <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{display:'flex', alignItems: 'center', marginTop: '20px'}}>
              <p style={{ fontSize: '1.7em', fontWeight: '600', margin:0 }}>강의 비교</p>
              <Tooltip title='강의 비교란?' placement='top'><IconButton onClick={openHelp}><HelpOutlineIcon /></IconButton></Tooltip>
            </div>
            <p sytle={{ marginTop:'5px', marginBottom: '40px'}}>비교하고 싶은 강의를 추가해서 한 눈에 비교해보세요!</p>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
              {compareLectures.map((lecture, idx) => (
                <Grid item xs={4} key={idx}>
                  <div style={{ position: 'relative' }}>
                    <IconButton onClick={() => dispatch(deleteElement(idx))} sx={{ position: 'absolute', top: -15, right: -20, zIndex: '100' }}>
                      <HighlightOffIcon />
                    </IconButton>
                    <CompareElement lecture={lecture} />
                  </div>

                </Grid>

              ))}
              {Array(3 - compareLectures.length).fill().map((_, idx) => (
                <Grid item xs={4} key={idx}>
                  <Paper sx={{ height: '430px', display: 'flex', alignItems: 'center', flexDirection: 'column', padding: '10px', justifyContent: 'center' }}>
                    <Tooltip title="비교하고 싶은 강의를 추가해주세요!">
                      <Link to='/lecture'>
                        <IconButton onClick={goTop}>
                          <AddCircleOutlineIcon fontSize='large' />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CompareButton