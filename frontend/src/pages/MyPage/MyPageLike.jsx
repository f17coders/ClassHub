import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import LectureCard from './../../components/LectureCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// 마이페이지 - 내가 찜한 강의 보기 (API안댐)

function MyPageLike() {
  const accessToken = useSelector((state) => state.accessToken)
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [lectures, setLectures] = useState([])
  useEffect(() => {
      axios.get(`https://i10a810.p.ssafy.io/api/members/v1/lectures/like?size=8&page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data)
        setLectures(res.data.result.lectureList)
      })
      .catch((err) => console.log(err))
  }, [])
  return(
    <div style={{position:'relative', height:'70%'}}>
      <h2>내가 찜한 강의</h2>
      <div>
        {
          lectures.length ? (<Grid container spacing={2} padding={3}>
            {
              lectures.map((lecture, idx) => {
                return (
                  <Grid item xs={4} key={idx}>
                    <LectureCard lecture={lecture}/>
                  </Grid>
                )
              })
            }
          </Grid>) :(<div style={{position:'absolute', top:'50%', left:'40%', display:'flex', flexDirection:'column',justifyContent:'center'}}>
            <p >찜한 강의가 없습니다!</p>
            <Button variant="outlined" onClick={() => navigate('/lecture')}>강의 둘러보러 가기</Button>
          </div>)
        }
      </div>
    </div>
  )
}

export default MyPageLike