import React, {useState} from 'react';
import { ListItemButton, ListItem, Stack, Chip, Tooltip, IconButton, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import StudyRoomEnterCodeModal from './StudyRoomEnterCodeModal';

export default function StudyRoomRecruitList({ study }){
    // 스터디 입장하기 모달 오픈
    const [studyEnter, SetStudyEnter] = useState(false);
    const studyEnterOpen = () => {
      SetStudyEnter(true);
    };
    const studyEnterClose = () => {
      SetStudyEnter(false);
    };

    const [status, setStatus] = useState(false) //방 공개여부

    return(
        <ListItemButton>
            <ListItem>
              <Stack>
                <Stack direction="row" spacing={1} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'space-around' }}>
                  <h5 style={{ fontWeight: "bold" }}>{study.title}</h5>
                  <Stack direction="row" spacing={1}>
                    {study.isPublic == false && (
                      <Tooltip title="참여코드 인증 필요">
                          <LockIcon/>
                      </Tooltip>
                    )}
                    {
                      study.state == '모집중'? <Chip label={study.state} color="success" size='small' /> : <Chip label={study.state} color="error" size='small' />
                    }

                    <Typography>{`${study.nowCount}/${study.totalCount}`}</Typography>
                  </Stack>
                </Stack>
                    
                <Stack direction="row" sx={{ marginTop: 1 }}>
                  <p>{study.description}</p>
                </Stack>
                    
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'space-around' }}>
                  <Stack direction="row" spacing={1} my={1}>
                    {study.hashtag.map((tag, tagIndex) => (
                      <Chip key={tagIndex} label={tag} color="primary" size='small' />
                    ))}
                  </Stack>
                    
                  <Stack direction="row">
                    <Tooltip title="1:1 대화하기">
                      <IconButton edge="end" aria-label="1:1 대화">
                        <ChatIcon />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="참여신청">
                      <IconButton edge="end" aria-label="참여신청" 
                        onClick={ study.isPublic? null : studyEnterOpen}>
                        <LoginIcon />
                      </IconButton>
                    </Tooltip>
                    
                    {/* StudyRoomEnterCodeModal 컴포넌트를 사용하여 모달을 렌더링 */}
                    <StudyRoomEnterCodeModal studyEnter={studyEnter} studyEnterClose={studyEnterClose} />
                  </Stack>
                </div>
              </Stack>
            </ListItem>
        </ListItemButton>
    )
}