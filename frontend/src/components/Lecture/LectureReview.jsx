import { useState, useEffect } from 'react'
import { Avatar, Rating } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useSelector } from 'react-redux'
import LoginModal from './../LoginModal'
import cat from './../../assets/ProfileIamge/고양이.jpg'
import dog from './../../assets/ProfileIamge/강아지.jpg'
import bear from './../../assets/ProfileIamge/곰.jpg'
import racoon from './../../assets/ProfileIamge/너구리.jpg'
import lion from './../../assets/ProfileIamge/사자.jpg'
import monkey from './../../assets/ProfileIamge/원숭이.jpg'
import rabbit from './../../assets/ProfileIamge/토끼.jpg'
import elepent from './../../assets/ProfileIamge/코끼리.jpg'

// 리뷰 한개의 컴포넌트


function LectureReview({review, from }) {
  // 로그인 확인용
  let isLogin = useSelector((state) => state.isLogin)
  
  // check가 1이면 보이고, 2면 보인다
  // from이 1이면 우리 사이트 리뷰, 2면 다른 사이트 리뷰
  const [check, setCheck] = useState(1)
  // 안보이는 경우(2인경우) => 로그인 안함 + 우리사이트 일 떄
  useEffect(() => {
    if (isLogin == false) {
      if (from == 1) {
        setCheck(2)
      }
    } else {
      setCheck(1)
    }
  }, [isLogin])

  
  // 다른 사이트일 때, 랜덤으로 이름을 정해준다
  const randomName1 = ['귀여운', '신난', '춤추는', '즐거운', '활기찬', '유쾌한', '우아한'];
  const randomName2 = ['토끼', '곰', '너구리', '사자', '원숭이', '코끼리', '강아지', '고양이'];

  const adjective = randomName1[Math.floor(Math.random() * randomName1.length)]
  const animal = randomName2[Math.floor(Math.random() * randomName2.length)]
  const randomImage = {'토끼': rabbit, '곰': bear, '너구리': racoon, '사자': lion, 
  '원숭이': monkey, '코끼리': elepent, '강아지': dog, '고양이': cat }  
 
  // reviewUser와 reviewUserImg 값을 상태로 관리
  const [reviewUser, setReviewUser] = useState('')
  const [reviewUserImg, setReviewUserImg] = useState('')

 // 처음에 설정해 준 값만 들어가게 수정
  useEffect(() => {
    const reviewUser = from === 1 ? review.member.nickname : `${adjective} ${animal}`
    const reviewUserImg = from === 1 ? review.member.profileImage : randomImage[animal]
    // reviewUser와 reviewUserImg 값을 업데이트
    setReviewUser(reviewUser)
    setReviewUserImg(reviewUserImg)
  }, [])

  // 호버용 변수들
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  // 로그인 모달 여는 용
  const [toggleModal, setToggleModal] = useState(false)
	const ModalOpen = () => setToggleModal(true)
	const ModalClose = () => setToggleModal(false)

  // 전체 틀 스타일
  const divStyle = {
    width: '90%',
    height: 'inherit',
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
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
    cursor: isHover ? 'pointer' : 'none'
  }
  return (
    <div style={divStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {
        // 안보일때 = div창 하나로 가려줌
        check == 2 ? (
          <div style={divStyle2} onClick={ModalOpen}
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
        <Avatar src={reviewUserImg} alt="profileImg" sx={{ width: 50, height: 50 }} />
        <div style={{ display: 'flex', flexDirection: 'column', width: '75%' }}>
          {reviewUser}
          <div>
            <Rating name="read-only" value={review.score} readOnly size='small'/>
          </div>
          {/* api 수정 하면 살리기 */}
          {/* {review.date} */}
        </div>
      </div>
      <div style={{ padding: '10px' }}>
        {review.content}
      </div>
      <LoginModal open={toggleModal} onClose={ModalClose} />
    </div>
  )
}

export default LectureReview