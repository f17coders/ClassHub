import { Tooltip, Tabs, Tab, Box, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TodayIcon from '@mui/icons-material/Today'
import DOMPurify from "dompurify"



// 마이페이지 - 내 커뮤니티 창

function MyPageCommunity() {
  // 토큰 가져오기
  const accessToken = useSelector((state) => state.accessToken)
  // 어떤 메뉴 클릭했는지 확인용
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div>
      <h2>내 커뮤니티</h2>
      <Box sx={{ width: '100%', marginTop: '10px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab value={0} label="내가 쓴 글" />
          <Tab value={1} label="댓글단 글" />
          <Tab value={2} label="스크랩한 글" />
        </Tabs>
        <div style={{ marginTop: "20px" }}>
          {
            value == 0 ? (<MyArticle accessToken={accessToken} />) : null
          }
          {
            value == 1 ? (<MyComments accessToken={accessToken} />) : null
          }
          {
            value == 2 ? (<MyScrap accessToken={accessToken} />) : null
          }
        </div>
      </Box>
    </div>
  )
}


function Article({ post }) {
  const navigate = useNavigate()
  // HTML 태그를 제거하여 텍스트로 변환하는 함수
  const removeHTMLTags = (html) => {
    const purifiedText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
    return purifiedText;
  };


  const [hover, setHover] = useState(false)
  const handleMouseIn = () => { setHover(true) }
  const handleMouseOut = () => { setHover(false) }

  // 글 내용 길이 제한하여 보여주기
  const truncateContent = (content) => {
    if(content.length > 65) {
      return content.substring(0,65) + "...";
    }
    return content;
  }

  return (
    <Paper
      onClick={() => { navigate(`/community/detail/${post.communityId}`) }}
      onMouseEnter={handleMouseIn}
      onMouseLeave={handleMouseOut}
      style={{
        cursor: hover ? 'pointer' : null,
        backgroundColor: hover ? 'rgb(240,240,240)' : null,
        padding: '20px 10px',
        margin: '10px'
      }}
    >
      <h3 style={{ fontWeight: 'bold', margin: '0' }}>{post.title}</h3>
      <p>{truncateContent(removeHTMLTags(post.content))}</p>
      <div style={{ marginRight: '1em' }}>
        <Tooltip title="작성일자">
          <div style={{ display: 'flex', alignContent: 'center' }}>
            <TodayIcon /> <span style={{ margin: '0' }}>{post.createdAt}</span>
          </div>
        </Tooltip>
      </div>
    </Paper>
  )
}

function MyArticle({ accessToken }) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const handleChange = (event, value) => {
    setPage(value)
  }
  useEffect(() => {
    // console.log(accessToken)
    axios.get(`https://i10a810.p.ssafy.io/api/members/v1/communities/my?page=${page-1}&size=5`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => {
        // console.log(res.data.result)
        setArticles(res.data.result.communityList)
        setTotalPages(res.data.result.totalPages)
      })
      .catch((err) => console.log(err))
  }, [page])

  return (
    <div>
      {
        articles.length > 0 ? (<div>
          {articles.map((article, idx) => {
            return (<Article post={article} key={idx} />)
          })}
          {/* 페이지네이션 */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2}>
              <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Stack>
          </Box>
        </div>) : (<p>작성한 글이 없습니다!</p>)
      }

    </div>
  )
}


function MyComments({ accessToken }) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const handleChange = (event, value) => {
    setPage(value)
  }
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/members/v1/communities/comments?page=${page - 1}&size=5`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => {
        setArticles(res.data.result.communityList)
        setTotalPages(res.data.result.totalPages)
      }).catch((err) => console.log(err))
  }, [page])

  return (
    <div>
      {
        articles.length ? (<div>
          {articles.map((article, idx) => {
            return (<Article post={article} key={idx} />)
          })}
          {/* 페이지네이션 */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2}>
              <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Stack>
          </Box>
        </div>) : (<p>댓글 남긴 글이 없습니다!</p>)
      }

    </div>
  )
}

function MyScrap({ accessToken }) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const handleChange = (event, value) => {
    setPage(value)
  }
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/members/v1/communities/scraps?page=${page - 1}&size=5`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => {
        setArticles(res.data.result.communityList)
        setTotalPages(res.data.result.totalPages)
      }).catch((err) => console.log(err))
  }, [page])

  return (
    <div>
      {
        articles.length ? (<div>
          {articles.map((article, idx) => {
            return (<Article post={article} key={idx} />)
          })}
          {/* 페이지네이션 */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={2}>
              <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Stack>
          </Box>
        </div>) : (<p>스크랩한 글이 없습니다!</p>)
      }

    </div>
  )
}

export default MyPageCommunity