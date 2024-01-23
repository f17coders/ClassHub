import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {useState} from 'react'
import LectureCard from './../../components/LectureCard'
import lectureImg from './../../assets/Lecture/Lecture3.png'

function MyPageLecture() {
  const [connected, setConnected] = useState(false)
  const changeConnect = () => {
    setConnected(!connected)
  }
  return(
    <div style={{position:'relative'}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h1>내가 수강중인 강의</h1>
        <Button color="secondary" style={{marginRight:'50px', fontSize:'1.3em'}} onClick={() => changeConnect()} >연동하기</Button>
      </div>
      <Grid container spacing={2} padding={3}>
        <Grid item xs={3}><LectureCard img={lectureImg} title='갖고있는 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='갖고있는 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='갖고있는 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='갖고있는 강의'/></Grid>
        
      </Grid>
      {
        connected === false ? (
        <div style={{backgroundColor: 'rgba(128, 128, 128, 0.9)', position:'absolute', top:70, width:'100%', height:'100%'}}>
          <p style={{marginTop:'20%', textAlign:'center', color:'white', fontSize:'3em'}}>계정을 연동해주세요</p>
        </div>
        ) : null
      } 
    </div>
  )
}

export default MyPageLecture