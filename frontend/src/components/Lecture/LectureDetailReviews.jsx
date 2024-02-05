import { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { Avatar, Rating, TextField, Tooltip, IconButton, Button } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import SendIcon from '@mui/icons-material/Send'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import LectureReview from './LectureReview'
import { useSelector } from 'react-redux'
import profileImg from './../../assets/Profile.png'
import axios from 'axios'

// 강의 detail에서 리뷰 탭에 들어가는 컴포넌트

function LectureDetailReviews() {
  //정렬관련(우리사이트)
  const [sort1, setSort1] = useState('최신순')
  const handleSort1 = (event) => {
    setSort1(event.target.value)
  }
  //정렬관련(다른사이트)
  const [sort2, setSort2] = useState('최신순')
  const handleSort2 = (event) => {
    setSort2(event.target.value)
  }


  // 리뷰데이터(임시)
  // classhub에서 쓴 리뷰
  const [review1, setReview1] = useState([])
  const [page1, setPage1] = useState(0)
  const [totalPage1, setTotalPage1] = useState(null)
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/reviews/v0/1/classhub?page=${page1}&size=4`)
      .then((res) => {
        // console.log(res)
        setReview1(res.data.result.reviewResList)
        setTotalPage1(res.data.result.totalPages)
      })
      .catch((err) => console.log(err))
  }, [page1])
  const setNextPage1 = function () {
    let nextPage = page1 + 1
    setPage1(nextPage)
  } 

  // 다른 사이트의 리뷰
  const [review2, setReview2] = useState([])
  const [page2, setPage2] = useState(0)
  const [totalPage2, setTotalPage2] = useState(null)
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/reviews/v0/1/site?page=${page2}&size=4`)
      .then((res) => {
        console.log(res)
        setReview2(res.data.result.siteReviewResList)
        setTotalPage2(res.data.result.totalPages)
      })
      .catch((err) => console.log(err))
  }, [page2])
  const setNextPage2 = function () {
    let nextPage = page2 + 1
    setPage2(nextPage)
  } 

  // 로그인 했는지 확인하기
  // 로그인 확인용
  let isLogin = useSelector((state) => state.isLogin)

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
          <p style={{ fontSize: '1.4em', fontWeight: '700' }}>ClassHub의 리뷰</p>
          {/* 정렬용 */}
          <FormControl sx={{ minWidth: '170px' }} size='small'>
            <Select
              onChange={handleSort1}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ color: 'grey' }}
              value={sort1}
            >
              <MenuItem value='최신순'>최신순</MenuItem>
              <MenuItem value='평점높은순'>평점높은순</MenuItem>
              <MenuItem value='평점낮은순'>평점낮은순</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* 우리사이트 리뷰들어가는 곳 */}
        <div>
          {
            isLogin == true ? (
              <div>
                <CreateReview />
              </div>
            ) : null
          }
          {
            review1.map((item, idx) => (
              <div key={idx} style={{ margin: '15px 0px' }}>
                {/* 우리사이트에서 가는거는 from을 1로 설정해서 주기 -> 확인용 */}
                <LectureReview review={item} from={1} />
              </div>
            ))
          }
          {
            page1 + 1 == totalPage1 ? (null) : (<Button variant="outlined" onClick={setNextPage1} sx={{width:'90%'}}>더 보기</Button>)
          }
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
          <p style={{ fontSize: '1.4em', fontWeight: '700' }}>다른사이트의 리뷰</p>
          {/* 다른사이트 리뷰 정렬 */}
          <FormControl sx={{ minWidth: '170px' }} size='small'>
            <Select
              onChange={handleSort2}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ color: 'grey' }}
              value={sort2}
            >
              <MenuItem value='최신순'>최신순</MenuItem>
              <MenuItem value='평점높은순'>평점높은순</MenuItem>
              <MenuItem value='평점낮은순'>평점낮은순</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* 다른 사이트 리뷰들어가는 곳 */}
        <div>
          {review2 ? (<div>{
            review2.map((item, idx) => (
              <div key={idx} style={{ margin: '15px 0px' }}>
                {/* 다른사이트에서 가는거는 from을 2로 설정해서 주기 */}
                <LectureReview review={item} from={2} />
              </div>))
            }</div>) : null
          }
          {
            page1 + 1 == totalPage1 ? (null) : (<Button variant="outlined" onClick={setNextPage2} sx={{width:'90%'}}>더 보기</Button>)
          }
        </div>
      </div>
    </div>
  )
}



// 리뷰 작성 창
// 로그인 하면 보이고, 산 강의일 때만 작성이 가능함
function CreateReview() {
  const userName = '망글곰'
  // 산 강의인지 확인
  const [isMine, setIsMine] = useState(true)
  const [check, setCheck] = useState(1)

  // 안보이는 경우(2인경우) => 내 강의가 아닐 경우
  useEffect(() => {
    if (isMine == false) {
      setCheck(2)
    }
  }, [])

  // 호버용 변수들
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  // 별점용
  const [value, setValue] = useState(0)

  // 전체 틀 스타일
  const divStyle = {
    width: '90%',
    height: 'inherit',
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    borderRadius: '2%',
    padding: '10px',
    boxShadow: isHover ? '0 0 5px rgba(0, 0, 0, 0.1)' : 'none',
    position: 'relative'
  }
  // 가리는 용 스타일
  const divStyle2 = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    transform: isHover ? 'scale(1.03)' : 'none',
    transition: 'transform 0.5s ease',
  }
  return (
    <div style={divStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {
        // 내가 산 강의가 아니라면, 안보이게 해주기
        check == 2 ? (
          <div style={divStyle2}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <LockPersonIcon sx={{ color: 'white' }} fontSize='large' />
              <p style={{ textAlign: 'center', color: 'white', fontSize: '1.4em' }}>강의 구매 후 작성할 수 있습니다!</p>
            </div>
          </div>
        ) : null
      }
      {/* 리뷰작성하는 곳 */}
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10px 0px' }}>
        <Avatar src={profileImg} alt="profileImg" sx={{ width: 70, height: 70 }} />
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginTop: '10px' }}>
          {userName}
          <div>
            {/* 별점  */}
            <Rating
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
        </div>
      </div>
      {/* 리뷰 쓰는 곳 */}
      <div style={{ padding: '10px', position: 'relative' }}>
        <TextField
          label="리뷰작성하기"
          multiline
          rows={4}
          sx={{ width: '100%' }}
        />
        <IconButton aria-label="등록" sx={{ position: 'absolute', bottom: 20, right: 25 }}>
          <Tooltip title="리뷰 작성">
            <SendIcon />
          </Tooltip>
        </IconButton>
      </div>
    </div>
  )
}


export default LectureDetailReviews