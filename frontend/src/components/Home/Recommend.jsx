import LectureCard from "./../LectureCard"
import img1 from './../../assets/Lecture/Lecture1.png'


function Recommend() {
    return (
        <div style={{margin: "auto"}}>
            <div style={{textAlign:"center", margin: "10px"}}>
                <p style={{fontWeight: "800", fontSize:"2em"}}>스프링 강의 Best 5</p>
            </div>
            <div style={{display: 'flex', justifyContent:'space-around'}}>
                <LectureCard img={img1}/>
                <LectureCard img={img1}/>
                <LectureCard img={img1}/>
                <LectureCard img={img1}/>
                <LectureCard img={img1}/>
            </div> 
        </div>
    )
}

export default Recommend