import Grid from '@mui/material/Grid'

function MyPageCommunity() {
  return(
    <div>
      <h1>내 커뮤니티</h1>
      <Grid container style={{width:'90%', marginTop:'30px'}}>
        <Grid item xs={4}>
          <h2>내가 쓴 글</h2>
        </Grid>
        <Grid item xs={4}>
          <h2>댓글 단 글</h2>
        </Grid>
        <Grid item xs={4}>
          <h2>스크랩한 글</h2>
        </Grid>

      </Grid>
    </div>
  )
}

export default MyPageCommunity