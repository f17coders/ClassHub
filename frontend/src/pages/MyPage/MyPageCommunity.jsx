import Grid from '@mui/material/Grid'
import CommunityPostList from '../../components/Community/CommunityList'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import {useState} from 'react'

// 마이페이지 - 내 커뮤니티 창

const data = [
  
];

function MyPageCommunity() {
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
            value == 0 ? (<MyArticle />) : null
          }
          {
            value == 1 ? (<MyComments />) : null
          }
          {
            value == 2 ? (<MyScrap />) : null
          }
        </div>
      </Box>
    </div>
  )
}

function MyArticle() {
  const data = [
    {communityId: 7, title: '내가 쓴 글 예시', content: '내용 예시', memberNickname: 'Nickname', tagList:['Tag1', 'Tag2'], commentCount: 2, likeCount: 0, scrapCount: 3, createdAt: '2024-01-24'}
  ]
  return (
    <div>
      
      <CommunityPostList post={data[0]} />
    </div>
  )
}

function MyComments() {
  const data = [
    {communityId: 7, title: '내가 댓글 단 글 예시', content: '내용 예시', memberNickname: 'Nickname', tagList:['Tag1', 'Tag2'], commentCount: 2, likeCount: 0, scrapCount: 3, createdAt: '2024-01-24'}
  ]
  return (
    <div>
      <CommunityPostList post={data[0]} />
    </div>
  )
}

function MyScrap() {
  const data = [
    {communityId: 7, title: '내가 스크랩한 글 예시', content: '내용 예시', memberNickname: 'Nickname', tagList:['Tag1', 'Tag2'], commentCount: 2, likeCount: 0, scrapCount: 3, createdAt: '2024-01-24'}
  ]
  return (
    <div>
      <CommunityPostList post={data[0]} />
    </div>
  )
}

export default MyPageCommunity