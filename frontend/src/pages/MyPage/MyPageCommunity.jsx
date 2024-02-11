import CommunityPostList from '../../components/Community/CommunityList'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import { useSelector } from 'react-redux'

// 마이페이지 - 내 커뮤니티 창

function MyPageCommunity() {
  // 토큰 가져오기
  const accessToken = useSelector((state) => state.accessToken)
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

function MyArticle({accessToken}) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const handleChange = (event, value) => {
    setPage(value)
  }
  useEffect(() => {
    console.log(accessToken)
    axios.get(`https://i10a810.p.ssafy.io/api/members/v1/communities/my?page=${page}&size=5`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((res) => { 
        setArticles(res.data.result.communityList) 
        setTotalPages(res.data.result.totalPages)
      })
      .catch((err) => console.log(err))
  }, [page])
    
  return (
    <div>
      {
        articles.length ? (<div>
          {articles.map((article, idx) => {
            return (<CommunityPostList post={article} key={idx} />)
          })}
        </div>) : (<p>글이 없습니다!</p>)
      }
      {/* 페이지네이션 */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </div>
  )
}


function MyComments({ accessToken }) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const handleChange = (event, value) => {
    setPage(value)
  }
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/members/v1/communities/comments?page=${page}&size=5`, {
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
            return (<CommunityPostList post={article} key={idx} />)
          })}
        </div>) : (<p>글이 없습니다!</p>)
      }
      {/* 페이지네이션 */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </div>
  )
}

function MyScrap({ accessToken }) {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const handleChange = (event, value) => {
    setPage(value)
  }
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/members/v1/communities/scraps?page=${page}&size=5`, {
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
            return (<CommunityPostList post={article} key={idx} />)
          })}
        </div>) : (<p>글이 없습니다!</p>)
      }
      {/* 페이지네이션 */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={2}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </div>
  )
}

export default MyPageCommunity