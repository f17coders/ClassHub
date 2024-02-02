import Grid from '@mui/material/Grid'
import LectureCard from './../../components/LectureCard'
import lectureImg from './../../assets/Lecture/Lecture2.png'

function MyPageLike() {
  return(
    <div>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h2>내가 찜한 강의</h2>
      </div>
      <Grid container spacing={2} padding={3}>
        {/* <Grid item xs={3}><LectureCard img={lectureImg} title='찜한 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='찜한 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='찜한 강의'/></Grid>
        <Grid item xs={3}><LectureCard img={lectureImg} title='찜한 강의'/></Grid> */}
        
      </Grid>
      
    </div>

  )
}

export default MyPageLike