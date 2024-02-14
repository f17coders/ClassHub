import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Backdrop, Alert, Pagination, TextField, Button, Stack, Box, List, ListItemButton, Grid, Typography, Divider, IconButton, Tooltip } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SearchIcon from '@mui/icons-material/Search'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import StudyRoomCreateModal from '../../components/StudyRoom/StudyRoomCreateModal';
import StudyRoomRecruitList from '../../components/StudyRoom/StudyRoomRecruitList';
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from "react-redux"

// 스터디 모집하는 페이지
export default function StudyRoomRecruit() {
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 인덱스 상태 관리
  const [searchWord, setSearchWord] = useState('');
  // 토큰
  let accessToken = useSelector((state) => state.accessToken)

  // 현재 페이지를 나타내는 state
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지 당 항목 수
  const itemsPerPage = 3;
  //전체 페이지 수
  const [totalPages, setTotalPages] = useState(1);

  // 처음에 axios 요청으로 전체 목록 가져오기
	useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/studies/v1?page=${currentPage-1}&size=${itemsPerPage}&keyword=${searchWord}&recruitment=${selectedIndex}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response)=> {
        // console.log(response.data.result.studyList)
        setData(response.data.result.studyList)
        // console.log("현재페이지: "+currentPage)
        setCurrentPage(currentPage)

        let totalPages = response.data.result.totalPages;
        // console.log("전체페이지 수: "+totalPages)
        setTotalPages(totalPages)

        // console.log("페이지 당 항목 수: " + itemsPerPage)
    })
    .catch((err) => console.log(err))
  }, [currentPage, selectedIndex])

  // 검색 함수
  const searchStudyroom = () =>{
    axios.get(`https://i10a810.p.ssafy.io/api/studies/v1?page=${currentPage-1}&size=${itemsPerPage}&keyword=${searchWord}&recruitment=${selectedIndex}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response)=> {
        // console.log(response.data.result.studyList)
        setData(response.data.result.studyList)
        // console.log("현재페이지: "+currentPage)
        setCurrentPage(currentPage)
        // console.log("전체페이지 수: "+totalPages)
        setTotalPages(response.data.result.totalPages)

        // console.log("페이지 당 항목 수: " + itemsPerPage)
    })
    .catch((err) => console.log(err))
  }

  // const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // StudyRoomCreateModal이 열렸는지 여부를 관리하는 state
  const [studyCreate, SetStudyCreate] = useState(false);
  // 모달이 열리면서 등록 성공 여부를 받아올 state
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // StudyRoomCreateModal이 열릴 때 실행되는 콜백 함수
  const studyCreateOpen = () => {
    SetStudyCreate(true);
    setRegisterSuccess(false); //모달 열릴때마다 초기화
  };

  // 등록 성공 시 실행할 로직 또는 alert를 표시
  const onRegisterSuccess = () => {
    setRegisterSuccess(true);
    studyCreateClose(); // 등록이 성공하면 모달 닫기
    handleCreateDialogOpen();
  };

  // 등록 확인용 Dialog
  const handleCreateDialogOpen = () => {
    MySwal.fire({
      title: "스터디 등록이 완료되었습니다!",
      text: "좌측의 참여중인 스터디 목록에서 확인 가능합니다.",
      icon: "success",
    }).then(() =>{
      window.location.reload();
    })
  };


  // StudyRoomCreateModal이 닫힐 때 실행되는 콜백 함수
  const studyCreateClose = () => {
    SetStudyCreate(false);
  };

  // 현재 페이지에 해당하는 항목만 가져오는 함수
  const getCurrentItems = () => {

  // 선택된 인덱스에 따라 모집 상태를 필터링
  const filteredData = data.filter((study) => {
    if (selectedIndex === 1) {
      return study.capacity > study.currentMembers;
    } else if (selectedIndex === 2) {
      return study.capacity <= study.currentMembers;
    } else {
      return true; // 모든 데이터를 보여줌
    }
  });
  
    return filteredData.map((study, index) => 
    (
      <StudyRoomRecruitList
        key={index}
        study={study}
      />
    )
    );
  };

  const enterKeyPress = (event) => {
		//엔터키 눌렀을 때 등록 함수 호출
		if (event.key === 'Enter') {
			event.preventDefault() //기본 동작 방지
      searchStudyroom();
		}
	}

  return (
    <Box sx={{ display: 'flex' }}>
      {/* 사이드바 메뉴 */}
      <List sx={{ width: "30%" }} component="nav">
        <Typography sx={{ display: 'flex', justifyContent: 'center', py: 1 }} variant='h6' fontWeight='bold'>
          스터디 모집
        </Typography>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          전체
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          모집중
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          모집완료
        </ListItemButton>
      </List>
      <Divider />

      {/* 스터디 목록 */}
      <Grid container sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

        <Grid item sx={{ width: '90%' }} >
          {/* 검색기능 */}
          <Stack direction="row" spacing={1} margin={1} padding={1}>
            <TextField 
              value={searchWord} 
              onChange={(e) => setSearchWord(e.target.value)} 
              onKeyDown={enterKeyPress}
              size="small" 
              sx={{ width: "80%" }} 
              id="outlined-basic" 
              label="원하는 스터디를 검색해보세요!" 
              variant="outlined" />

            {/* 검색 버튼 */}
            {/* <Tooltip title="검색">
              <IconButton
                onClick={() => {searchStudyroom()}} 
                sx={{ margin: 2 }}>
                <SearchIcon fontSize='medium' />
              </IconButton>
            </Tooltip> */}

            {/* 스터디 만들기 버튼 */}
            <Button 
              // startIcon={<GroupAddIcon/>}
              sx={{ margin: 2 }} 
              onClick={studyCreateOpen}
              variant='outlined'
            >
              스터디 만들기
            </Button>
          </Stack>

          {/* StudyRoomCreateModal 컴포넌트를 사용하여 모달을 렌더링 */}
          <StudyRoomCreateModal studyCreate={studyCreate} studyCreateClose={studyCreateClose} onRegisterSuccess={onRegisterSuccess} />

          {/* 스터디 모집 공고 리스트 */}
          <div>
            {
              data.length > 0 ? 
              getCurrentItems() 
              :
              <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
                검색 결과가 없습니다
              </Typography>
            }
          </div>
          {/* 페이지네이션 */}
          <Stack sx={{
            mx: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'static',
            bottom: 0, // 화면 하단에 고정
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
        </Grid>

      </Grid>
    </Box>
  )
}