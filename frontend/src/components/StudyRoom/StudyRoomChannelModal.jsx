import React, { useState, useEffect } from 'react';
import { FormControl, OutlinedInput, Badge, Divider, List, ListItem,ListItemAvatar, Avatar,ListItemText, Button, Modal, Stack, TextField, Autocomplete, Box, Typography, Container, createFilterOptions, IconButton, Tooltip} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import VerifiedIcon from '@mui/icons-material/Verified';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import StudyRoomChannelModify from './StudyRoomChannelModify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from "react-redux"


const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
    height: "70%",
    maxHeight: '80vh', // 최대 높이
    overflowY: 'auto',  // 수직 스크롤 적용
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    // zIndex: 1, // 모달 창의 z-index를 설정합니다.
  };

export default function StudyRoomChannelModal({studyId, studyRoomChannel, channelModalClose}){
    const MySwal = withReactContent(Swal);
    const [channels, setChannels] = useState([]);
    const [content, setContent] = useState(''); //추가할 채널
    const [selectedChannelId, setSelectedChannelId] = useState(null);
    //setStudyRoomChannelModify 열렸는지 여부 관리하는 state
    const [studyRoomChannelModify, setStudyRoomChannelModify] = useState(false);
    const [editingChannelId, setEditingChannelId] = useState(null); // 수정 중인 채널의 ID를 저장
    // 토큰
	  let accessToken = useSelector((state) => state.accessToken)
    const [hasError, setHasError] = useState(false); // 입력값이 10자 이상인지 여부를 추적
    const [isNull, setIsNull] = useState(false); // 입력값이 null인지 여부를 추적

    // 입력값이 변경될 때마다 null 여부 업데이트
    useEffect(() => {
      setIsNull(!content); // content가 null이면 setIsNull을 true로 설정
      setIsNull(content.length === 0);
    }, [content]);

    useEffect(() => {
      setHasError(content.length > 10);
    }, [content]);

    // 모달 열릴때마다 모든 변수 값 초기화
    useEffect(() => {
      // 모달이 열릴 때 값 초기화
      if (studyRoomChannel) {
        setChannels([]);
        setContent('');
        setStudyRoomChannelModify(false);
        setEditingChannelId(null);
        setHasError(false);
      }
    }, [studyRoomChannel]);
    
    //수정 시 실행되는 콜백 함수
    const channelModifyOpen = (channelId) => {
      console.log('채널명 수정');
      setSelectedChannelId(channelId);
      setStudyRoomChannelModify(true);
    }
    //닫힐 때 실행되는 콜백 함수
    const channelModifyClose = () => {
        setStudyRoomChannelModify(false);
        channelModalClose(true);
    }
    // 채널 정보 가져오기
    useEffect(() => {
        if(studyRoomChannel){
            axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/channels/${studyId}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
            .then((response)=> {
                setChannels(response.data.result)
                // console.log(response.data.result)
            })
            .catch((err) => console.log(err))
        }
    }, [studyRoomChannel])

    // 채널 추가
    const createChannel = () =>{
      axios.post(`https://i10a810.p.ssafy.io/api/studies/v1/channels`, {
        "name" : content,
        "studyId" : studyId
      },{
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(()=> {
        handleCreateDialogOpen();
      })
      .catch((err) => console.log(err))
    }

    const enterKeyPress = (event) =>{
      //엔터키 눌렀을 때 등록 함수 호출
      if(event.key === 'Enter'){
        event.preventDefault(); //기본 동작 방지
        if(!isNull){
          createChannel();
        }
      }
    }
    
    // 채널 삭제
    const deleteChannel = (channelId) =>{
      axios.delete(`https://i10a810.p.ssafy.io/api/studies/v1/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(()=> {
        window.location.reload();
      })
      .catch((err) => console.log(err))
    }

    // 추가 확인 Dialog
    const handleCreateDialogOpen = () => {
      MySwal.fire({
        title: "추가되었습니다!",
        text: "채널 정보가 추가 완료되었습니다.",
        icon: "success",
      })
      .then(()=>{
        window.location.reload();
      })
    }

    // 삭제 확인 Dialog용
  const handleDeleteDialogOpen = (channelId) => {
    MySwal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "채널 정보가 완전히 삭제됩니다.",
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
          text: "채널이 정상적으로 삭제되었습니다.",
          icon: "success"
        })
        .then(() =>{
          deleteChannel(channelId);
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        MySwal.fire({
          title: "취소되었습니다",
          text: "채널 삭제가 취소되었습니다.",
          icon: "error"
        });
      }
    });
  };

    return(
        <Modal
            open={studyRoomChannel}
            onClose={channelModalClose}
            sx={{ zIndex: 1}}
        >
          <Container sx={style} style={{ display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
            <Stack style={{width: "80%", position: 'relative'}}>
              <Stack direction="row" sx={{justifyContent:"space-between"}}>
                <Typography variant="h5" fontWeight="bold" >
                    채널명 편집
                </Typography>
                <IconButton onClick={channelModalClose}>
                  <CloseIcon/>
                </IconButton>
              </Stack>
                
                

                <List sx={{ width: '100%', bgcolor: 'background.paper', justifyContent: "space-around" }}>
                    {channels.map((channel) => (
                      <React.Fragment key={channel.channelId}>
                          {editingChannelId === channel.channelId ? (
                              <StudyRoomChannelModify
                                  channelId={editingChannelId}
                                  studyId={studyId}
                                  channelModifyClose={channelModifyClose}
                                  editingChannelId={editingChannelId}
                                  setEditingChannelId={setEditingChannelId}
                              />
                          ) : (
                              <ListItem sx={{marginTop: '10px', marginBottom: '10px'}}>
                                  <ListItemText primary={channel.name} />
                                  {channel.isDelete && (
                                    <Stack direction="row" spacing={1}>
                                      <Button onClick={() => {
                                        setEditingChannelId(channel.channelId);
                                      }} 
                                        variant='outlined' 
                                        >
                                        수정
                                      </Button>
                                      <Button onClick={() => handleDeleteDialogOpen(channel.channelId)}
                                              variant='outlined' 
                                              color='error'
                                              >
                                        삭제
                                      </Button>
                                    </Stack>
                                  )}
                              </ListItem>
                          )}
                          <Divider/>
                      </React.Fragment>
                    ))}
                </List>
                
                <div style={{ position: 'absolute', bottom: 0, width: '100%'}}>
                  <Stack direction="row" spacing={1}>
                  {
                    hasError ? (
                      <TextField
                        error
                        id="outlined-error-helper-text"
                        size='small'
                        sx = {{width: '100%'}}
                        helperText="10자 이내로 입력하세요"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => enterKeyPress(e)}
                      />
                    ) : (
                      <TextField
                        required
                        id="outlined-required"
                        placeholder="추가할 채널명을 입력하세요"
                        size='small'
                        sx = {{width: '100%'}}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => enterKeyPress(e)}
                      />
                    )
                  }
                  <Button variant="contained" 
                        onClick={() => {createChannel(); }}
                        disabled={hasError || isNull}
                        >
                    추가
                  </Button>
                  </Stack>
                  
                    
                </div>
            </Stack>
            
          </Container>
        </Modal>
    )
}