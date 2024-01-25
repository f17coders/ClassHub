import { useState, useEffect } from 'react'
import { Avatar, Rating } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import profileImg from './../../assets/Profile.png'
import { useSelector } from 'react-redux'

// 리뷰 한개의 컴포넌트

function LectureReview({review, from }) {
  // 로그인 확인용
  let isLogin = useSelector((state) => state.isLogin)
  // 로그인 여부와 우리 사이트 여부를 확인할 변수
  // 보임 == 1, 안보임 == 2

  const [check, setCheck] = useState(1)
  // 안보이는 경우(2인경우) => 로그인 안함 + 우리사이트 일 떄
  useEffect(() => {
    if (isLogin == false) {
      if (from == 1) {
        setCheck(2)
      }
    }
  }, [isLogin])

  // 호버용 변수들
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  // 전체 틀 스타일
  const divStyle = {
    width: '90%',
    height: 'inherit',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    borderRadius: '2%',
    padding: '10px',
    boxShadow: isHover ? '0 0 5px rgba(0, 0, 0, 0.1)' : 'none',
    position: 'relative'
  }
  // 가리는 용 스타일
  const divStyle2 = {
    position:'absolute', 
    top:0, 
    left:0, 
    width: '100%', 
    height:'100%',  
    backgroundColor:'grey', 
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    zIndex:999,
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    transform: isHover ? 'scale(1.03)' : 'none',
    transition: 'transform 0.5s ease',
  }
  return (
    <div style={divStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {
        // 안보일때 = div창 하나로 가려줌
        check == 2 ? (
          <div style={divStyle2}
          >
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <LockPersonIcon sx={{color:'white'}} fontSize='large'/>
              <p style={{textAlign:'center', color:'white', fontSize:'1.4em'}}>로그인이 필요합니다</p>
            </div>
          </div>
        ) : null
      }
      {/* 보일 때 */}
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0px' }}>
        <Avatar src={profileImg} alt="profileImg" sx={{ width: 70, height: 70 }} />
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          {review.user}
          <div>
            <Rating name="read-only" value={review.rating} readOnly />
          </div>
          {review.date}
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        {review.content}
      </div>
    </div>
  )
}

export default LectureReview