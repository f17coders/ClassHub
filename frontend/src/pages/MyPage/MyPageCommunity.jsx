import Grid from '@mui/material/Grid'
import CommunityPostList from '../../components/Community/CommunityPostList'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import {useState} from 'react'

const data = [
  { title: 'Maven과 Gradle의 차이가 뭔가요?', description: 'Spring Boot 실행 시 Maven과 Gradle의 차이점이 뭔가요?', hashtag: ['#SPRING BOOT', '#SPRING'], writer: '정싸피', regdate: '2024.01.23', likes: 50, comments: 2, bookmarks: 20 },
  {
    title: '비주얼 스튜디오에 파이썬이 안들어갑니다.', description: '다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 고수님들 도와주세요',
    hashtag: ['#PYTHON', '#VSCODE'], writer: '김싸피', regdate: '2024.01.23', likes: 20, comments: 2, bookmarks: 20
  },
  {
    title: '비주얼 스튜디오에 파이썬이 안들어갑니다.', description: '다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 고수님들 도와주세요',
    hashtag: ['#PYTHON', '#VSCODE'], writer: '김싸피', regdate: '2024.01.23', likes: 40, comments: 2, bookmarks: 20
  },
  {
    title: '비주얼 스튜디오에 파이썬이 안들어갑니다.', description: '다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 고수님들 도와주세요',
    hashtag: ['#PYTHON', '#VSCODE'], writer: '김싸피', regdate: '2024.01.23', likes: 1, comments: 2, bookmarks: 20
  },
  {
    title: '비주얼 스튜디오에 파이썬이 안들어갑니다.', description: '다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 고수님들 도와주세요',
    hashtag: ['#PYTHON', '#VSCODE'], writer: '김싸피', regdate: '2024.01.23', likes: 0, comments: 2, bookmarks: 20
  },
];

function MyPageCommunity() {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <h1>내 커뮤니티</h1>
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
    { title: '이것은 내가 쓴 글', description: 'Spring Boot 실행 시 Maven과 Gradle의 차이점이 뭔가요?', hashtag: ['#SPRING BOOT', '#SPRING'], writer: '정싸피', regdate: '2024.01.23', likes: 50, comments: 2, bookmarks: 20 },
  ];
  return (
    <div>
      <CommunityPostList post={data[0]} />
    </div>
  )
}

function MyComments() {
  const data = [
    { title: '이건 내가 댓글단 글', description: 'Spring Boot 실행 시 Maven과 Gradle의 차이점이 뭔가요?', hashtag: ['#SPRING BOOT', '#SPRING'], writer: '정싸피', regdate: '2024.01.23', likes: 50, comments: 2, bookmarks: 20 },
    
  ];
  return (
    <div>
      <CommunityPostList post={data[0]} />
    </div>
  )
}

function MyScrap() {
  const data = [
    { title: '이건 내가 스크랩한 글', description: 'Spring Boot 실행 시 Maven과 Gradle의 차이점이 뭔가요?', hashtag: ['#SPRING BOOT', '#SPRING'], writer: '정싸피', regdate: '2024.01.23', likes: 50, comments: 2, bookmarks: 20 },
    
  ];
  return (
    <div>
      <CommunityPostList post={data[0]} />
    </div>
  )
}

export default MyPageCommunity