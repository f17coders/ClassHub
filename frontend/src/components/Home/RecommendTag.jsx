import LectureCard from "../LectureCard"
import Grid from '@mui/material/Grid'
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import axios from 'axios'
import { motion } from 'framer-motion'

// 홈페이지에서 강의 추천 (직업)

function RecommendTag({tag}) {
    const isLogin = useSelector((state) => state.isLogin)
    const user = useSelector((state) => state.user)
    const accessToken = useSelector((state) => state.accessToken)
    const [lectures, setLectures] = useState([])

    useEffect(() => {
        console.log(tag)
        axios.get(`https://i10a810.p.ssafy.io/api/lectures/v0/interest-skills?tagId=${tag.tagId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            // 왜 비었지...
            console.log(res.data.result.lectureList)
            setLectures(res.data.result.lectureList)
        })
        .catch((err) => console.log(err))
    }, [user])

    return (
        <div style={{ margin: "auto", width: "90%", marginTop: "50px" }}>
            {
                lectures.length != 0 ? (
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{
                                type: "spring",
                                duration: 1.5,
                                bounce: 0.2
                                // ease: "linear",
                                // duration: 2,
                                // y: { duration: 2 },
                            }}
                            style={{ textAlign: "center", margin: "10px" }}
                        >
                            {
                                isLogin ? (<p style={{ marginBottom: 0 }}>{user.nickname}님의 관심 기술</p>) : null
                            }
                            <p style={{ fontWeight: "800", fontSize: "2em", marginTop: '0' }}>{tag.name} 분야 인기강의</p>
                            </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{
                                type: "spring",
                                duration: 1.5,
                                bounce: 0.2
                            }}
                        >
                        <Grid container spacing={{ sm: 1, md: 2 }} justifyContent="center" alignItems="center">
                            {
                                lectures.map((lecture, idx) => (
                                    <Grid item xs={6} sm={4} md={2} key={idx}>
                                        <LectureCard lecture={lecture} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        </motion.div>
                   </div>
                ) : null
            }

        </div>
    )
}

export default RecommendTag