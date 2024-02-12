import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { styled } from '@mui/material/styles';
import { Menu, MenuItem, Avatar, ListItemIcon, Backdrop, Alert, Pagination, TextField, Button, Stack, Box, List, ListItemButton, Grid, Typography, Divider, IconButton, Tooltip, CircularProgress } from '@mui/material'
import axios from 'axios'
import StudyRoomModifyModal from '../../components/StudyRoom/StudyRoomModifyModal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ParticipatingMemberModal from '../../components/StudyRoom/ParticipatingMemberModal';
import StudyRoomChannelModal from '../../components/StudyRoom/StudyRoomChannelModal';
import ParticipatingRoomList from '../../components/StudyRoom/ParticipatingRoomList';
import StudyRoomChannelChat from '../../components/StudyRoom/StudyRoomChannelChat';

// 참여중인 스터디 상세 페이지
export default function StudyRoomParticipating(){
  // 토큰
  let accessToken = useSelector((state) => state.accessToken)
  const MySwal = withReactContent(Swal);
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [channels, setChannels] = useState([]);

  const [leader, setLeader] = useState([]);

  const [selectIdx, setSelectIdx] = useState();
  const [selectChannel, setSelectChannel] = useState(null);
  const [isSelect, setIsSelect] = useState(false);

    // 스터디룸 채널정보 가져오기
	useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/channels/${studyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response)=> {
        console.log(response.data.result)
        setChannels(response.data.result)
        readChannel(response.data.result[0].channelId);
    })
    .catch((err) => console.log(err))
  },[studyId])

  const [data, setData] = useState([])
  // 스터디룸 ID로 상세정보 가져오기
	useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/detail/${studyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response)=> {
        console.log(response.data.result)
        setData(response.data.result)
    })
    .catch((err) => console.log(err))
  }, [studyId])

  const readChannel = (channelId) => {
    axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/channels/details/${channelId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response.data.result)
      setSelectChannel(response.data.result);
    })
  }

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleListItemClick = (event, index, channelId) => {
    setSelectedIndex(index);
    readChannel(channelId);
    console.log(channelId);
  };

  //StudyRoomChannelModal이 열렸는지 여부 관리하는 state
  const [studyRoomChannel, setStudyRoomChannel] = useState(false);

  //모달 열릴 때 실행되는 콜백 함수
  const channelModalOpen = () => {
    console.log('채널명 편집 모달 오픈');
    setStudyRoomChannel(true);
  }
  //닫힐 때 실행되는 콜백 함수
  const channelModalClose = () => {
    setStudyRoomChannel(false);
  }

  //ParticipatingMemberModal이 열렸는지 여부 관리하는 state
  const [participatingMember, setParticipatingMember] = useState(false);
  // 모달 열릴 때 실행되는 콜백 함수
  const participatingMemberOpen = () => {
    console.log('참여중인 멤버 보기 오픈');
    setParticipatingMember(true);
  }
  // ParticipatingMemberModal이 닫힐 때 실행되는 콜백 함수
  const participatingMemberClose = () => {
    setParticipatingMember(false);
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

  // 수정 성공 시 실행할 로직 또는 alert를 표시
  const onModifySuccess = () => {
    setModifySuccess(true);
    studyModifyClose(); // 등록이 성공하면 모달 닫기
    handleOpenSuccessAlert(); //성공 alert창 표시
  };

    // 수정 확인용 Dialog
    const handleOpenSuccessAlert = () => {
      MySwal.fire({
        title: "스터디 수정이 완료되었습니다!",
        text: "입력하신 내용으로 스터디 정보가 수정되었습니다.",
        icon: "success",
      }).then(() =>{
        window.location.reload();
      })
    };

  // StudyRoomModifyModal이 닫힐 때 실행되는 콜백 함수
  const studyModifyClose = () => {
    SetStudyModify(false);
  };


  // 초대 코드용 Dialog
  const handleCopyInvitationCode = async () =>{
    //공개방이면
    if(data.isPublic){
      MySwal.fire({
        title: "해당 스터디룸은 공개상태입니다.",
        text: "초대코드 없이 입장 가능합니다.",
        icon: "success"
      })
    }
    //비공개방이면
    else{
      try {
        const res = await axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/invitation-code/${studyId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const inviteCode = res.data.result;
        await navigator.clipboard.writeText(inviteCode);
        // 복사되었습니다!
        MySwal.fire({
          title: "복사되었습니다!",
          text: "초대코드가 클립보드에 복사되었습니다.",
          icon: "success"
        });
        console.log(inviteCode);
      } catch (err) {
        console.log(err.response.data.code)
        const code = err.response.data.code;
        if(code === 'B303'){
          MySwal.fire({
            title: "스터디장 권한 필요",
            text: "초대코드 복사는 스터디장만 가능합니다.",
            icon: "warning"
          })
        } else{
          alert('알 수 없는 오류. 관리자에게 문의 바람.')
        }
        
      }
    }
    
  }

  // 나가기 확인용 Dialog
  const handleExitDialogOpen = (studyId) => {
    MySwal.fire({
      title: "정말 나가시겠습니까?",
      text: "스터디룸에 대한 정보는 남아있으며, 재참여 가능합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네, 나갈래요",
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonText: "아니오, 취소할게요",
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        studyLeave(studyId);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        MySwal.fire({
          title: "취소되었습니다",
          text: "스터디룸 나가기가 취소되었습니다.",
          icon: "error"
        });
      }
    });
  };

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
        exitStudyRoom(studyId);
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

  <ParticipatingRoomList studyId={studyId}/>

  //스터디룸 나가기
  const studyLeave = (studyId) => {
    axios.delete(`https://i10a810.p.ssafy.io/api/studies/v1/exit/${studyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      //나가기 성공 alert 띄우기
      MySwal.fire({
        title: "나가기 완료",
        text: "스터디룸에서 정상적으로 퇴장하셨습니다.",
        icon: "success"
      })
      .then((result) => {
        if (result.isConfirmed) {
          //스터디룸 홈으로 navigate
          navigate('/studyroom');
          window.location.reload();
        } 
      })
    })
    .catch((err) => {
      const code = err.response.data.code;
      if(code === 'G008'){
        MySwal.fire({
          title: "경고",
          text: "스터디장은 스터디를 나갈 수 없습니다.",
          icon: "warning"
        })
      }else{
        alert('알수없는 오류. 관리자에게 문의바람.')
      }
    })
  }

  // 스터디룸 삭제
  const exitStudyRoom = (studyId) =>{
    axios.delete(`https://i10a810.p.ssafy.io/api/studies/v1/${studyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      //스터디룸 삭제 확인 dialog
      MySwal.fire({
        title: "삭제되었습니다!",
        text: "스터디룸 정보가 정상적으로 삭제되었습니다.",
        icon: "success"
      })
      .then((result) => {
        if (result.isConfirmed) {
          //스터디룸 홈으로 navigate
          navigate('/studyroom');
          window.location.reload();
        } 
      })
    })
    .catch((err) => {
      console.log(err.response.data.code)
      const code = err.response.data.code;
      if(code === 'B303'){
        MySwal.fire({
          title: "경고",
          text: "스터디 삭제는 스터디장만 가능합니다.",
          icon: "warning"
        })
      } else{
        alert('알 수 없는 오류. 관리자에게 문의바람.')
      }
    })
  }

  //더보기 메뉴 관련
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    return(
      <Box sx={{ display: 'flex',  height: '100%' }}>
      {/* 사이드바 메뉴 */}
      <List sx={{ width: "30%", justifyContent:'space-between', alignContent:'space-between', position: 'relative', display: 'flex', flexDirection: 'column' }} component="nav">
        <Stack>
          <Stack direction="row">
            {/* 스터디 이름 */}
            <Typography sx={{ width: "90%", display: 'flex', justifyContent: 'center', py: 1 }} variant='h6' fontWeight='bold'>
              {data.title}
            </Typography>
              {/* 더보기 버튼 */}
            <Tooltip title="더보기">
              <IconButton 
                onClick={handleClick}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                style={{ margin: 2 }}>
                <MenuIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
            <MenuItem onClick={participatingMemberOpen}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>참여중인 멤버
            </MenuItem>
            <MenuItem onClick={() => {channelModalOpen();}}>
              <ListItemIcon>
                <EditIcon  />
              </ListItemIcon>
              채널명 편집
            </MenuItem>
            
            <Divider />
            
            <MenuItem onClick={() => { handleCopyInvitationCode();}}>
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              초대코드 복사
            </MenuItem>
            <MenuItem onClick={studyModifyOpen}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              스터디룸 정보 수정
            </MenuItem>
            <MenuItem onClick={() => handleExitDialogOpen(studyId)}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              스터디룸 나가기
            </MenuItem>
            <MenuItem onClick={() => handleDeleteDialogOpen(studyId)}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              스터디룸 삭제
            </MenuItem>
          </Menu>
          
          {/* 채널명 조회 */}
          {
            channels.map((channel, channelIndex) => (
              <ListItemButton
              key={channelIndex}
                selected={selectedIndex === channelIndex}
                onClick={(event) => handleListItemClick(event, channelIndex, channel.channelId)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                 {channel.name}
              </ListItemButton>
            ))
          }
        </Stack>
        
      </List>
      <Divider />

      {/* StudyRoomModifyModal 컴포넌트를 사용하여 모달을 렌더링 */}
      <StudyRoomModifyModal data={data} studyModify={studyModify} studyModifyClose={studyModifyClose} onModifySuccess={onModifySuccess} />

      {/* 참여중인 멤버 보기 모달 렌더링 */}
      <ParticipatingMemberModal studyId={studyId} participatingMember={participatingMember} participatingMemberClose={participatingMemberClose} leader={leader}/>

      {/* 채널명 편집 모달 렌더링 */}
      <StudyRoomChannelModal studyId={studyId} studyRoomChannel={studyRoomChannel} channelModalClose={channelModalClose}/>

      { selectChannel ? (
        <StudyRoomChannelChat studyId={studyId} channel={selectChannel} />
      ) : "데이터가 없습니다."
      }
      
    </Box>
    )
}