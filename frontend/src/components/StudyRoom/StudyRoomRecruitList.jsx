import React, {useState} from 'react';
import { ListItemButton, ListItem, Stack, Chip, Tooltip, Button, IconButton, Typography, Dialog, DialogActions, DialogTitle } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LinkIcon from '@mui/icons-material/Link';
import StudyRoomEnterCodeModal from './StudyRoomEnterCodeModal';
import { Link } from 'react-router-dom';

export default function StudyRoomRecruitList({study}){
    // 스터디 입장하기 모달 오픈
    const [studyEnter, SetStudyEnter] = useState(false);
    const studyEnterOpen = () => {
      SetStudyEnter(true);
    };
    const studyEnterClose = () => {
      SetStudyEnter(false);
    };

    //참여확인 dialog 오픈
    const [openDialog, setOpenDialog] = useState(false); //dialog 열림 여부
    const handleOpenDialog = () => {
      setOpenDialog(true);
    }
    const handleCloseDialog = () => {
      setOpenDialog(false);
    }


    const [status, setStatus] = useState(false) //방 공개여부
    return(
        <ListItemButton>
            <ListItem>
              <Stack sx={{width: '100%'}}>
                <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'space-around' }}>
                  <h5 style={{ fontWeight: "bold" }}>{study.title}</h5>
                  <Stack direction="row" spacing={1}>
                    {study.isPublic == false && (
                      <Tooltip title="참여코드 인증 필요">
                          <LockIcon/>
                      </Tooltip>
                    )}
                    {
                      study.capacity > study.currentMembers ? <Chip label='모집중' color="success" size='small' /> : <Chip label='모집완료' color="error" size='small' />
                    }

                    <Typography>{`${study.currentMembers}/${study.capacity}`}</Typography>
                  </Stack>
                </Stack>
                    
                <Stack direction="row" sx={{ marginTop: 1 }}>
                  <p>{study.description}</p>
                </Stack>

                <LinkIcon/>
                    
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'space-around' }}>
                  <Stack direction="row" spacing={1} my={1}>
                    { study.tagList ? (study.tagList.map((tag, tagIndex) => (
                      <Chip key={tagIndex} label={tag.name} color="primary" size='small' />
                    ))) : null
                  }
                  </Stack>
                    
                  <Stack direction="row">
                    <Tooltip title="1:1 대화하기">
                      <IconButton edge="end" aria-label="1:1 대화">
                        <ChatIcon />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="참여신청">
                      <IconButton edge="end" aria-label="참여신청" 
                        onClick={ 
                          study.isPublic? handleOpenDialog : studyEnterOpen
                          }>
                        <LoginIcon />
                      </IconButton>
                    </Tooltip>
                    
                    {/* 참여확인 Dialog창 */}
                    <Dialog open={openDialog}>
                      <DialogTitle>{"참여하시겠습니까?"}</DialogTitle>
                      <DialogActions>
                        <Button onClick={handleCloseDialog}>아니오</Button>
                        <Button onClick={() => {handleCloseDialog(); 
                        // 여기에 해당하는 스터디룸으로 입장하는 코드 추가
                        }} autoFocus>예</Button>
                      </DialogActions>
                    </Dialog>
                    
                    {/* StudyRoomEnterCodeModal 컴포넌트를 사용하여 모달을 렌더링 */}
                    <StudyRoomEnterCodeModal studyEnter={studyEnter} studyEnterClose={studyEnterClose} />
                  </Stack>
                </div>
              </Stack>
            </ListItem>
        </ListItemButton>
    )
}