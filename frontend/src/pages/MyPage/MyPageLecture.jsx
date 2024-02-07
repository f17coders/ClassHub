import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import LectureCard from './../../components/LectureCard'
import lectureImg from './../../assets/Lecture/Lecture3.png'
import axios from 'axios'

// 마이페이지 - 내가 수강하는 강의 보기 (API안댐)

function MyPageLecture() {
  const accessToken = useSelector((state) => state.accessToken)
  // 계정연동 여부 관련 변수
  const [connected, setConnected] = useState(false)
  const changeConnect = () => {
    setConnected(!connected)
  }

  const [page, setPage] = useState(0)
  const [lectures, setLectures] = useState([])
  useEffect(() => {
    if (connected) {
      axios.get(`https://i10a810.p.ssafy.io/api/members/v1/lectures/buy?size=8&page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setLectures(res.data.result.lectureList)
      })
    }
  }, [connected])
  return(
    <div style={{position:'relative'}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h2>내가 수강중인 강의</h2>
        <Button color="secondary" style={{marginRight:'50px', fontSize:'1.3em'}} onClick={() => changeConnect()} >연동하기</Button>
      </div>
      <div >
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