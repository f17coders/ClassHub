import LectureCard from "../LectureCard"
import Grid from '@mui/material/Grid'
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from 'axios'

// 홈페이지에서 강의 추천 (직업)
// 여긴 갈아 엎어야함

function RecommendTag() {
    const isLogin = useSelector((state) => state.isLogin)
    const user = useSelector((state) => state.user)
    const accessToken = useSelector((state) => state.accessToken)

    const [lectures, setLectures] = useState([])

    const [job, setJob] = useState('')

    useEffect(() => {
        // 로그인한 유저라면, 
        if (isLogin) {
            axios.get('https://i10a810.p.ssafy.io/api/lectures/v1/desired-job', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then((res) => {
                    setLectures(res.data.result.lectureList)
                    setJob(res.data.result.job.name)
                    console.log(res.data.result)
                })
                .catch((err) => console.log(err))
        } else {
            axios.get('https://i10a810.p.ssafy.io/api/lectures/v0/desired-job')
                .then((res) => {
                    setLectures(res.data.result.lectureList)
                    setJob(res.data.result.job.name)
                })
                .catch((err) => console.log(err))
        }
    }, [])

    return (
        <div style={{ margin: "auto", width: "90%", marginTop: "50px" }}>
            {
                lectures.length != 0 ? (
                    <div>
                        <div style={{ textAlign: "center", margin: "10px" }}>
                            <p style={{ fontWeight: "800", fontSize: "2em" }}>{job} 직무 인기 강의 BEST 5</p>
                        </div>
                        <Grid container spacing={{ sm: 1, md: 2 }} justifyContent="center" alignItems="center">
                            {
                                lectures.map((lecture, idx) => (
                                    <Grid item xs={6} sm={4} md={3} lg={2} key={idx}>
                                        <LectureCard lecture={lecture} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                ) : null
            }

        </div>
    )
}

export default RecommendTag