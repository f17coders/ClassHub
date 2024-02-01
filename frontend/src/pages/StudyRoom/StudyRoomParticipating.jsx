import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { Backdrop, Alert, Pagination, TextField, Button, Stack, Box, List, ListItemButton, Grid, Typography, Divider, IconButton, Tooltip } from '@mui/material'
import axios from 'axios'
import StudyRoomModifyModal from '../../components/StudyRoom/StudyRoomModifyModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
  
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

// 참여중인 스터디 상세 페이지
export default function StudyRoomParticipating(){
  const MySwal = withReactContent(Swal);
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');

  const [data, setData] = useState([])
  // 스터디룸 ID로 상세정보 가져오기
	useEffect(() => {
    axios.get(`http://i10a810.p.ssafy.io:4000/studies/v1/detail/${studyId}`)
    .then((response)=> {
        console.log(response.data.result)
        setData(response.data.result)
        // console.log(data)
    })
    .catch((err) => console.log(err))
  }, [studyId])

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // StudyRoomModifyModal이 열렸는지 여부를 관리하는 state
  const [studyModify, SetStudyModify] = useState(false);
  // 모달이 열리면서 등록 성공 여부를 받아올 state
  const [modifySuccess, setModifySuccess] = useState(false);

  // StudyRoomModifyModal이 열릴 때 실행되는 콜백 함수
  const studyModifyOpen = () => {
    console.log('수정 모달 오픈')
    SetStudyModify(true);
    setModifySuccess(false); //모달 열릴때마다 초기화
  };

  // 등록 성공 시 실행할 로직 또는 alert를 표시
  const onModifySuccess = () => {
    setModifySuccess(true);
    studyModifyClose(); // 등록이 성공하면 모달 닫기
    handleOpenSuccessAlert(); //성공 alert창 표시
  };

  // StudyRoomModifyModal이 닫힐 때 실행되는 콜백 함수
  const studyModifyClose = () => {
    SetStudyModify(false);
  };

  // 성공 alert창 용
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const handleCloseSuccessAlert = () => {
    setOpenSuccessAlert(false);
  };
  const handleOpenSuccessAlert = () => {
    setOpenSuccessAlert(true);
  };

  // 초대 코드용 Dialog
  const handleCopyInvitationCode = () =>{
    MySwal.fire({
      title: "해당 스터디룸의 초대코드는",
      text: inviteCode,
      confirmButtonText: "복사",
      cancelButtonText: "확인",
      showCancelButton: true,
      showCloseButton: true
    })
  }

  // 초대코드 요청
  useEffect(() => {
    axios.get(`http://i10a810.p.ssafy.io:4000/studies/v1/invitation-code/${studyId}`)
    .then((res) => {
      // console.log('초대코드 요청됨')
      // console.log(res.data.result)
      setInviteCode(res.data.result)
      // window.location.reload();
    })
    .catch((err) => console.log(err))
  },[]) 

  // 삭제 확인용 Dialog
  const handleDeleteDialogOpen = (studyId) => {
    MySwal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "스터디룸이 모두 삭제되며, 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네, 삭제할래요",
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonText: "아니오, 취소할게요",
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "삭제되었습니다!",
          text: "스터디룸 정보가 정상적으로 삭제되었습니다.",
          icon: "success"
        }).then(() =>{
          exitStudyRoom(studyId);
          navigate('/studyroom')
          // window.location.reload();
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        MySwal.fire({
          title: "취소되었습니다",
          text: "스터디룸 삭제가 취소되었습니다.",
          icon: "error"
        });
      }
    });
  };

  // 스터디룸 삭제
  const exitStudyRoom = (studyId) =>{
    axios.delete(`http://i10a810.p.ssafy.io:4000/studies/v1/${studyId}`, 
    {
      headers: {
        AUTHORIZATION: '9'
      }
    })
    .then((res) => {
      console.log(studyId + ' 삭제됨')
      console.log(res)
      window.location.reload();
    })
    .catch((err) => console.log(err))
  }

    return(
      <Box sx={{ display: 'flex',  height: '100%' }}>
      {/* 사이드바 메뉴 */}
      <List sx={{ width: "30%", justifyContent:'space-between', alignContent:'space-between', position: 'relative', display: 'flex', flexDirection: 'column' }} component="nav">
        <Stack>
          {/* 스터디 이름 */}
          <Typography sx={{ display: 'flex', justifyContent: 'center', py: 1 }} variant='h6' fontWeight='bold'>
            {data.title}
          </Typography>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
             공지사항
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            잡담방
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            학습인증
          </ListItemButton>
          {/* 메뉴 추가 */}
          <ListItemButton sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <AddCircleOutlineIcon/>
          </ListItemButton>
        </Stack>
        

        <Stack sx={{ width: "100%", bottom: 0 }}>
          <Button onClick={() => handleCopyInvitationCode()}>초대코드 복사</Button>
          <Button onClick={studyModifyOpen}>정보 수정</Button>
          <Button onClick={() => handleDeleteDialogOpen(studyId)} sx={{color: 'red'}}>삭제하기</Button>
        </Stack>
        
      </List>
      <Divider />

      {/* StudyRoomModifyModal 컴포넌트를 사용하여 모달을 렌더링 */}
      <StudyRoomModifyModal studyModify={studyModify} studyModifyClose={studyModifyClose} onModifySuccess={onModifySuccess} />

      {/* 스터디 목록 */}
      <Grid container sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

        <Grid item sx={{ width: '90%' }} >
          {/* 스터디 모집 공고 리스트 */}
          <Demo>
            {/* {
              data.length > 0 ? getCurrentItems() : null
            } */}
          </Demo>
         
        </Grid>

      </Grid>
    </Box>
    )
}