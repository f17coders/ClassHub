import { Container, Stack, Button, TextField, Grid, Pagination, IconButton, Tooltip, Divider } from '@mui/material';
import { useState, useEffect } from 'react'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
import React from 'react';
import CommunityList from '../../components/Community/CommunityList';
import CommunitySearch from '../../components/Community/CommunitySearch';
import CommunityListAlignment from '../../components/Community/CommunityListAlignment';
import axios from 'axios';

const data = [
  { title: 'Maven과 Gradle의 차이가 뭔가요?', description: 'Spring Boot 실행 시 Maven과 Gradle의 차이점이 뭔가요?', hashtag: ['#SPRING BOOT', '#SPRING'], writer: '정싸피', regdate: '2024.01.23', likes: 50, comments: 2, bookmarks: 20 },
  { title: '비주얼 스튜디오에 파이썬이 안들어갑니다.', description: '다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 고수님들 도와주세요',
  hashtag: ['#PYTHON', '#VSCODE'], writer: '김싸피', regdate: '2024.01.23', likes: 20, comments: 2, bookmarks: 20 },
  { title: '비주얼 스튜디오에 파이썬이 안들어갑니다.', description: '다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 고수님들 도와주세요',
  hashtag: ['#PYTHON', '#VSCODE'], writer: '김싸피', regdate: '2024.01.23', likes: 40, comments: 2, bookmarks: 20 },
  { title: '비주얼 스튜디오에 파이썬이 안들어갑니다.', description: '다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 고수님들 도와주세요',
  hashtag: ['#PYTHON', '#VSCODE'], writer: '김싸피', regdate: '2024.01.23', likes: 1, comments: 2, bookmarks: 20 },
  { title: '비주얼 스튜디오에 파이썬이 안들어갑니다.', description: '다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 고수님들 도와주세요',
  hashtag: ['#PYTHON', '#VSCODE'], writer: '김싸피', regdate: '2024.01.23', likes: 0, comments: 2, bookmarks: 20 },
];

// async function getData() {
//   try {
//     //응답 성공
//     const response = await axios.get('http://i10a810.p.ssafy.io:4000/communities/v0?page=0&size=2&sort=createTime,desc');
//     console.log(response);
//   } catch (error) {
//     //응답 실패
//     console.error(error);
//   }
// }

function Community() {
  // useEffect(() => {
  //   async function fetchdata() {
  //     const { data } = await axios.get(
  //       '/communities/v0',
  //     );
  //     console.log(data);
  //   }
  //   fetchdata();
  // }, []);

    const navigate = useNavigate();

    // 현재 페이지를 나타내는 state
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 당 항목 수
    const itemsPerPage = 5;

    // 현재 페이지에 해당하는 항목만 가져오는 함수
    const getCurrentItems = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex).map((post, index) => (
        <CommunityList
          key={index}
          post={post}
        />
      ));
    };

    return(
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
        <Stack style={{width: "80%"}}>
          {/* 검색바 */}
          <CommunitySearch/>

          <Stack sx={{ mx: 3, px: 1 }} justifyContent="space-between" direction="row" >
            {/* 정렬 기능 컴포넌트 */}
            <CommunityListAlignment sx={{width:"90%"}}/>
            {/* 글 작성하기 버튼 */}
            <Tooltip title="게시물 작성하기">
              <IconButton style={{ margin: 5 }} onClick={() => { navigate(`/community/write`);}}>
                <CreateIcon/>
              </IconButton>
            </Tooltip>
            {/* <Button sx={{width:"10%"}} variant="contained" onClick={() => { navigate(`/community/write`);}}>글 작성하기</Button>                */}
          </Stack>

          {/* <hr/> */}
          {/* 글 목록 */}
          <Container sx={{ margin: 1, padding: 1 }} gap={1}>
            {getCurrentItems()}
          </Container>

          {/* 페이지네이션 */}
          <Stack sx={{
              mx: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'static', 
              bottom: 0, // 화면 하단에 고정
              backgroundColor: 'white',
              padding: 2, // 원하는 패딩값 지정
              zIndex: 1, // 다른 요소 위에 표시하기 위해 zIndex 사용
            }}>
            <Pagination
                count={Math.ceil(10 / itemsPerPage)} // 전체 페이지 수
                color="primary"
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
              />
          </Stack>
        </Stack>
      </Container>
    )
}

export default Community