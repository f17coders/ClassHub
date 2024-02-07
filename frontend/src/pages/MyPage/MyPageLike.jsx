import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import LectureCard from './../../components/LectureCard'
import axios from 'axios'

// 마이페이지 - 내가 찜한 강의 보기 (API안댐)

function MyPageLike() {
  const accessToken = useSelector((state) => state.accessToken)

  const [page, setPage] = useState(0)
  const [lectures, setLectures] = useState([])
  useEffect(() => {
      axios.get(`https://i10a810.p.ssafy.io/api/members/v1/lectures/like?size=8&page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setLectures(res.data.result.lectureList)
      })   
  }, [])
  return(
    <div style={{position:'relative'}}>
      <h2>내가 찜한 강의</h2>
      <div>
        {
          lectures.length ? (<Grid container spacing={2} padding={3}>
            {
              lectures.map((lecture, idx) => {
                return (
                  <LectureCard lecture={lecture}/>
                )
              })
            }
          </Grid>) : null
        }
      </div>
    </div>
  )
}

export default MyPageLike