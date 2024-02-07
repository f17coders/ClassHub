import React, { useState, useEffect } from 'react';
import { Badge, Divider, List, ListItem,ListItemAvatar, Avatar,ListItemText, Button, Modal, Stack, TextField, Autocomplete, Box, Typography, Container, createFilterOptions, IconButton, Tooltip} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import VerifiedIcon from '@mui/icons-material/Verified';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import {registPersonalChat} from "../../common/chat.js"
import {useNavigate} from 'react-router-dom'
const style = {
    position: 'absolute',
    top: '40%',
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

export default function ParticipatingMemberModal ({ studyId, participatingMember, participatingMemberClose }){
    const [leader, setLeader] = useState([]); //스터디장 정보
    const [leaderJob, setLeaderJob] = useState('');
    const [studyMembers, setStudyMembers] = useState([]); //스터디 멤버들 정보
    const accessToken = localStorage.getItem('token');

    const [personalChatId, setPersonalChatId] = useState();
    const navigate = useNavigate();
    
    const registChat = (receiver) => {
      registPersonalChat(receiver).then(personalChatId => {
        setPersonalChatId(personalChatId);
        navigate(`/studyroom/message/${personalChatId}`)
      });
    }

    // 멤버 정보 가져오기
    useEffect(() => {
        if(participatingMember){
          axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/members/${studyId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response)=> {
            //   console.log(response.data.result)
              setLeader(response.data.result.leader);
              setLeaderJob(response.data.result.leader.job.name);
              setStudyMembers(response.data.result.studyMemberList);
          })
          .catch((err) => console.log(err))
        }
      }, [participatingMember])

    return(
        <div>
            <Modal
                open={participatingMember}
                onClose={participatingMemberClose}
            >
              <Container sx={style} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '40px'}}>
                <Stack style={{width: "80%"}}>
                  <Stack direction="row" sx={{justifyContent:"space-between"}}>
                    <Typography variant="h5" fontWeight="bold" >
                        참여중인 멤버
                    </Typography>
                    <IconButton onClick={participatingMemberClose}>
                      <CloseIcon/>
                    </IconButton>
                  </Stack>

                    <List sx={{ width: '100%', bgcolor: 'background.paper',
                                justifyContent:"space-between"}}>
                        {/* 스터디장 */}
                        <ListItem>
                            <Tooltip title="스터디장">
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                    badgeContent={
                                      <VerifiedIcon />
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar alt={leader.nickname} src={leader.profileImage} />
                                    </ListItemAvatar>
                                </Badge>
                            </Tooltip>
                            <ListItemText
                                primary={leader.nickname}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {leaderJob}
                                    </Typography>
                                  </React.Fragment>
                                }
                            />
                            <Tooltip title="개인 메시지 보내기">
                                <IconButton onClick={() => {
                                            registChat(leader.memberId);
                                }}>
                                    <ChatIcon/>
                                </IconButton>
                            </Tooltip>
                        </ListItem>
                        
                        {/* 일반 멤버들 */}
                        {
                            studyMembers.map((member, memberIndex) => (
                              <>
                                <Divider/>                  
                                <ListItem key={member.memberId}>
                                  <ListItemAvatar>
                                    <Avatar alt={member.nickname} src={member.profileImage} />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={member.nickname}
                                    secondary={
                                      <React.Fragment>
                                        <Typography
                                          sx={{ display: 'inline' }}
                                          component="span"
                                          variant="body2"
                                          color="text.primary"
                                        >
                                          {member.job.name}
                                        </Typography>
                                      </React.Fragment>
                                    }
                                  />
                                    <Tooltip title="개인 메시지 보내기">
                                        <IconButton onClick={() => {
                                            registChat(member.memberId);
                                            // navigate(`/studyroom/message/${personalChatId}`);
                                          }}>
                                            <ChatIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                              </>
                            )) }
                        
                        
                    </List>
                  </Stack>
              </Container>
            </Modal>
        </div>
    )
}