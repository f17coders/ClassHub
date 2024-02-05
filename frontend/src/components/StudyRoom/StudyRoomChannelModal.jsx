import React, { useState, useEffect } from 'react';
import { Badge, Divider, List, ListItem,ListItemAvatar, Avatar,ListItemText, Button, Modal, Stack, TextField, Autocomplete, Box, Typography, Container, createFilterOptions, IconButton, Tooltip} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import VerifiedIcon from '@mui/icons-material/Verified';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import StudyRoomChannelModify from './StudyRoomChannelModify';

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "25%",
    maxHeight: '80vh', // 최대 높이
    overflowY: 'auto',  // 수직 스크롤 적용
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function StudyRoomChannelModal({studyId, studyRoomChannel, channelModalClose}){
    const [channels, setChannels] = useState([]);
    const [selectedChannelId, setSelectedChannelId] = useState(null);
    //setStudyRoomChannelModify 열렸는지 여부 관리하는 state
    const [studyRoomChannelModify, setStudyRoomChannelModify] = useState(false);

    
    //모달 열릴 때 실행되는 콜백 함수
    const channelModifyOpen = (channelId) => {
      console.log('채널명 편집 모달 오픈');
      setSelectedChannelId(channelId);
      setStudyRoomChannelModify(true);
    }
    //닫힐 때 실행되는 콜백 함수
    const channelModifyClose = () => {
        setStudyRoomChannelModify(false);
    }

    // 채널 정보 가져오기
    useEffect(() => {
        if(studyRoomChannel){
            axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/channels/${studyId}`)
            .then((response)=> {
                setChannels(response.data.result)
                console.log(response.data.result)
            })
            .catch((err) => console.log(err))
        }
      }, [studyRoomChannel])

    return(
        <Modal
            open={studyRoomChannel}
            onClose={channelModalClose}
        >
          <Container sx={style} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '40px'}}>
            <Stack style={{width: "80%"}}>
                <Typography variant="h5" fontWeight="bold" >
                    채널 편집하기
                </Typography>

                <List sx={{ width: '100%', bgcolor: 'background.paper',
                            justifyContent:"space-between"}}>
                {
                    channels.map((channel, channelIndex) => (
                        <React.Fragment key={channel.channelId}>
                            <ListItem>
                                  <ListItemText
                                    primary={channel.name}
                                  />
                                  {
                                    channel.isDelete?
                                    <>
                                    <Tooltip title="수정하기">
                                        <IconButton onClick={channelModifyOpen} >
                                            <EditNoteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="삭제하기">
                                        <IconButton >
                                            <ClearIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    </>
                                    
                                    : null
                                  }
                                  
                            </ListItem>
                            {channelIndex < channels.length - 1 && <Divider sx={{border: "0.1px solid"}} />}
                        </React.Fragment>
                    ))
                }
                {/* <Divider sx={{border: "1px solid"}}/>   */}
                
                <StudyRoomChannelModify id={channels.channelId} studyRoomChannelModify={studyRoomChannelModify} channelModifyClose={channelModifyClose}/>
                    
                </List>

                

                {/* 확인 버튼 */}
                <Button style={{marginTop: '20px'}} variant="contained" onClick={channelModalClose}
                >확인</Button>
            </Stack>
            
          </Container>
        </Modal>
    )
}