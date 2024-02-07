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
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors'
import Fab from '@mui/material/Fab';

// 강의 detail에서 리뷰 탭에 들어가는 컴포넌트

function LectureDetailReviews({lecture}) {
  // 로그인 확인용
  let isLogin = useSelector((state) => state.isLogin)
  // 토큰
  let accessToken = useSelector((state) => state.accessToken)

  // 리뷰를 쓸 수 있는지 없는지 ? 
  // 쓸 수 있다면 1, 없다면 2
  const [check, setCheck] = useState(1)

  // // 만약 내 리뷰가 있다면, 가져오기
  // useEffect(() => {
  //   axios.get(`https://i10a810.p.ssafy.io/api/reviews/v1/1`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   })
  //     .then((res) => {
  //       // 만약 없다면 어떻게 뜨는지 모르겠다
  //       // 우선 가져와보고,
  //       console.log(res)
  //       setMyReview(res.data.result)
  //     })
  //     .catch((err) => console.log(err))
  // }, [])




  //정렬관련(우리사이트)
  const [sort1, setSort1] = useState('최신순')
  const [order1, setOrder1] = useState('latest')
  // 정렬이 바뀌면 처음부터 보자
  const handleSort1 = (event) => {
    setReview1([])
    setPage1(0)
    setSort1(event.target.value)
    if (event.target.value == '최신순') {
      setOrder1('latest')
    }
    if (event.target.value == '높은 평점순') {
      setOrder1('highest-ranking')
    }
    if (event.target.value == '낮은 평점순') {
      setOrder1('lowest-ranking')
    }
  }

  //정렬관련(다른사이트)
  const [sort2, setSort2] = useState('높은 평점순')
  const [order2, setOrder2] = useState('highest-ranking')
  const handleSort2 = (event) => {
    setReview2([])
    setPage2(0)
    setSort2(event.target.value)
    if (event.target.value == '높은 평점순') {
      setOrder2('highest-ranking')
    }
    if (event.target.value == '낮은 평점순') {
      setOrder2('lowest-ranking')
    }
  }

  // 리뷰데이터(임시)
  // classhub에서 쓴 리뷰
  const [review1, setReview1] = useState([])
  const [page1, setPage1] = useState(0)
  const [totalPage1, setTotalPage1] = useState(null)
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/reviews/v0/1/classhub?page=${page1}&size=4&order=${order1}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => {
        let nextReviews = [...review1, ...res.data.result.reviewResList]
        setReview1(nextReviews)
        setTotalPage1(res.data.result.totalPages)
      })
      .catch((err) => console.log(err))
  }, [page1, order1])
  const setNextPage1 = function () {
    let nextPage = page1 + 1
    setPage1(nextPage)
  }

  // 다른 사이트의 리뷰
  const [review2, setReview2] = useState([])
  const [page2, setPage2] = useState(0)
  const [totalPage2, setTotalPage2] = useState(null)
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/reviews/v0/1/site?page=${page2}&size=4&order=${order2}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => {
        let nextReviews = [...review2, ...res.data.result.siteReviewResList]
        setReview2(nextReviews)
        setTotalPage2(res.data.result.totalPages)
      })
      .catch((err) => console.log(err))
  }, [page2, order2])
  const setNextPage2 = function () {
    let nextPage = page2 + 1
    setPage2(nextPage)
  }

  // 위로가기 버튼
  const goTop = () => {
    window.scrollTo(0, 0)
    handleClose()
  }
  const fab = {
    color: 'inherit',
    sx: {
      position: 'fixed',
      bottom: 32,
      left: 32,
      color: 'common.white',
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[600],
      }
    },
    icon: <UpIcon />,
    label: 'Expand',
  }

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
              <MenuItem value='높은 평점순'>평점 높은순</MenuItem>
              <MenuItem value='낮은 평점순'>평점 낮은순</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* 우리사이트 리뷰들어가는 곳 */}
        <div>
          {
            isLogin == true ? (
              <div>
                <CreateReview check={check} lecture={lecture}/>
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
            page1 + 1 == totalPage1 ? (null) : (<Button variant="outlined" onClick={setNextPage1} sx={{ width: '90%' }}>더 보기</Button>)
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
              <MenuItem value='높은 평점순'>평점 높은순</MenuItem>
              <MenuItem value='낮은 평점순'>평점 낮은순</MenuItem>
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
            page2 + 1 == totalPage2 ? (null) : (<Button variant="outlined" onClick={setNextPage2} sx={{ width: '90%' }}>더 보기</Button>)
          }
        </div>
      </div>
      <Tooltip title='맨 위로'>
        <Fab sx={fab.sx} color={fab.color} onClick={goTop}>
          {fab.icon}
        </Fab>
      </Tooltip>
      
    </div>
  )
}



// 리뷰 작성 창
function CreateReview({check, lecture}) {
  // 유저 가져오기
  let user = useSelector((state) => state.user)
  // 토큰
  let accessToken = useSelector((state) => state.accessToken)

  const userName = '망글곰'

  // 호버용 변수들
  const [isHover, setIsHover] = useState(false)
  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  // 별점용
  const [rate, setRate] = useState(0)


  // 리뷰쓰는용
  const [review, setReview] =useState('')
  const makeReview = function (event) {
    const input = event.target.value
    setReview(input)
  }

  const submitReview = function() {
    axios.post(`https://i10a810.p.ssafy.io/api/reviews/v1/${lecture.lectureId}`,{
      headers: { Authorization: `Bearer ${accessToken}` }
    },{
      "score" : rate,
      "content" : review
    })
    .then((res) => console.log('리뷰작성완료'))
    .catch((err) => console.log(err))
  }

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
              value={rate}
              onChange={(event, newValue) => {
                setRate(newValue);
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
          onChange={makeReview}
        />
        <IconButton onClick={submitReview} aria-label="등록" sx={{ position: 'absolute', bottom: 20, right: 25 }}>
          <Tooltip title="리뷰 작성">
            <SendIcon />
          </Tooltip>
        </IconButton>
      </div>
    </div>
  )
}


export default LectureDetailReviews