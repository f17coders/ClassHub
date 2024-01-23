import LectureCard from "./../LectureCard"
import Grid from '@mui/material/Grid'
import img1 from './../../assets/Lecture/Lecture1.png'

// 홈페이지에서 강의 추천

const lectureTitle = [
    '배워서 바로 쓰는 SQL 쿼리', 
    'Arm 아키텍쳐: 가상화',
    '두가지 DB를 활용한 서버개발을 통해 백엔드 취업하기',
    '1/31 김영한님 온라인 밋업 Live',
    '딥러닝 이론 + PyTorch 실무 완전 정복'
]

function Recommend(props) {
    return (
        <div style={{margin: "auto", width: "90%", marginTop: "50px"}}>
            <div style={{textAlign:"center", margin: "10px"}}>
                <p style={{fontWeight: "800", fontSize:"2em"}}>{props.title}</p>
            </div>
            <Grid container spacing={{ sm:1, md:2 }} justifyContent="center" alignItems="center">
                {
                    lectureTitle.map((item, i) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                            <LectureCard img={img1} title={item} />
                        </Grid>
                    ))
                }
            </Grid> 
        </div>
    )
}

export default Recommend