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
import { useSelector } from "react-redux"

function Community() {
  // 토큰
  let accessToken = useSelector((state) => state.accessToken)
  // 전체 글
  const [articles, setArticles] = useState([])
  // 현재 페이지를 나타내는 state
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지 당 항목 수
  const itemsPerPage = 4;
  //전체 페이지 수
  const [totalPages, setTotalPages] = useState(1);
  // 정렬 기준
  const [alignList, setAlignList] = useState('createTime,desc');

  // 전체 글 조회
	useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/communities/v0?page=${currentPage-1}&size=${itemsPerPage}&sort=${alignList}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response)=> {
        console.log(response.data.result.communityList)
        // let copy = [...articles, ...response.data.result.communityList]
        setArticles(response.data.result.communityList)   // 조회한 글 저장

        console.log("현재페이지: "+currentPage)
        setCurrentPage(currentPage)

        let totalPages = response.data.result.totalPages;
        console.log("전체페이지 수: "+totalPages)
        setTotalPages(totalPages)

        console.log("페이지 당 항목 수: " + itemsPerPage)
        
        setAlignList(alignList)
        console.log(alignList)
    })
    .catch((err) => console.log(err))
  }, [currentPage, alignList]) //현재 페이지가 변경되거나 정렬조건 바꼈을 때 실행

    const navigate = useNavigate();

    

    // 현재 페이지에 해당하는 항목만 가져오는 함수
    const getCurrentItems = () => {
      return articles.map((post, index) => (
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

          <Stack sx={{ mx: 3, px: 1, justifyContent: "space-between" }}  direction="row" >
            {/* 정렬 기능 컴포넌트 */}
            <Stack direction="row" sx={{width:"90%"}}>
              <Button onClick={() => {console.log("최신순 clicked"); setAlignList("createTime,desc")}} startIcon={<ExpandMoreIcon/>}>최신순</Button>
              <Button onClick={() => {console.log("인기순 clicked");setAlignList("likeCount,desc")}} startIcon={<ExpandMoreIcon/>}>인기순</Button>
            </Stack>
            {/* <CommunityListAlignment sx={{width:"90%"}}/> */}
            {/* 글 작성하기 버튼 */}
            <Tooltip title="게시물 작성하기">
              <IconButton style={{ margin: 5 }} onClick={() => { navigate(`/community/write`);}}>
                <CreateIcon/>
              </IconButton>
            </Tooltip>
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
                count={totalPages} // 전체 페이지 수
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