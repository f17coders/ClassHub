import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {useState} from 'react'
import LectureCard from './../../components/LectureCard'
import lectureImg from './../../assets/Lecture/Lecture3.png'

// 마이페이지 - 내가 수강하는 강의 보기 

function MyPageLecture() {
  // 계정연동 여부 관련 변수
  const [connected, setConnected] = useState(false)
  const changeConnect = () => {
    setConnected(!connected)
  }
  return(
    <div style={{position:'relative'}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h2>내가 수강중인 강의</h2>
        <Button color="secondary" style={{marginRight:'50px', fontSize:'1.3em'}} onClick={() => changeConnect()} >연동하기</Button>
      </div>
      <Grid container spacing={2} padding={3}>
        <Grid item xs={3}><LectureCard img={lectureImg} title='갖고있는 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='갖고있는 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='갖고있는 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='갖고있는 강의'/></Grid>
        
      </Grid>
      {
        // 만약 연동되어있지 않다면, 가려주자
        connected === false ? (
        <div style={{backgroundColor: 'rgba(128, 128, 128, 0.95)', position:'absolute', top:70, width:'100%', height:'100%'}}>
          <p style={{marginTop:'20%', textAlign:'center', color:'white', fontSize:'2em'}}>계정을 연동해주세요</p>
        </div>
        ) : null
      } 
    </div>
  )
}

export default MyPageLecture