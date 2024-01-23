import { Container, Stack, Button, TextField, Grid, Pagination } from '@mui/material';
import { useState } from 'react'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import CommunityPostList from '../../components/Community/CommunityPostList';

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

function Community() {
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
        <CommunityPostList
          key={index}
          post={post}
        />
      ));
    };

    return(
        <div>
            <Container>
              <Stack direction="row" spacing={1} sx={{ margin: 1, padding: 1, mt: 3 }}>
                  <TextField size="small" sx={{width:"90%"}} id="outlined-basic" label="궁금한 질문을 검색해보세요" variant="outlined" />
                  <Button variant="contained">🔍검색</Button>
              </Stack>
              
    
                <Stack useFlexGap flexWrap="wrap" alignItems="center"  justifyContent="flex-start" direction="row" spacing={1} sx={{ margin: 1, padding: 1 }}>
                    <Grid alignItems="center" justifyContent="center" sx={{mr:2}}>태그로 검색하기</Grid>
                    <Stack direction="row" spacing={1}>
                      <TextField size="small" id="outlined-basic" label="# 태그로 검색해보세요" variant="outlined"/>
                      <Button variant="contained">🔍검색</Button>
                    </Stack>

                    {/* 해시태그 */}
                    <Stack direction="row" spacing={1}>
                      <Button size="medium" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#Python</Button>
                      <Button size="medium" variant="outlined" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
                      <Button size="medium" variant="outlined" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#Spring Boot</Button>
                    </Stack>

                </Stack>

                <Stack sx={{ margin: 1, padding: 1 }} justifyContent="space-between" direction="row" >
                  <Stack direction="row" sx={{justifyContent: "flex-end"}}>
                    <Button startIcon={<ExpandMoreIcon/>}>최신순</Button>
                    <Button startIcon={<ExpandMoreIcon/>}>인기순</Button>
                  </Stack>
                  <Button variant="contained" onClick={() => { navigate(`/community/write`);}}>글 작성하기</Button>               
                </Stack>
              
                <hr/>

                {/* 글 목록 */}
                <Stack sx={{ margin: 1, padding: 1 }} gap={1}>
                  {getCurrentItems()}
                </Stack>

                {/* 페이지네이션 */}
                <Stack sx={{ mx: 'auto' }}>
                  <Pagination
                      count={Math.ceil(10 / itemsPerPage)} // 전체 페이지 수
                      color="primary"
                      page={currentPage}
                      onChange={(event, value) => setCurrentPage(value)}
                    />
                </Stack>

            </Container>
        </div>
    )
}

export default Community