import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import {TextField, Button, Chip, Stack, Box,List,ListItem,ListItemButton, ListItemText,ListItemIcon,ListItemSecondaryAction, IconButton,Avatar,Grid,Typography,Divider, FormGroup,FormControlLabel, Checkbox, Tooltip, Paper} from '@mui/material'

import FolderIcon from '@mui/icons-material/Folder';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import StudyRoomCreateModal from '../../components/StudyRoom/StudyRoomCreateModal';
import { fontWeight } from '@mui/system';


function generate(element) {
    return [0, 1, 2, 3, 4, 5,6 ,7, 8, 9, 10].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

// 스터디 모집하는 페이지
export default function StudyRoomRecruit(){
    const [secondary, setSecondary] = React.useState(false);

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <Box sx={{ display: 'flex' }}>
            <List sx={{ maxWidth: 128, width: "100%"}} component="nav">
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  전체
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                >
                  모집중
                </ListItemButton>
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                >
                  모집완료
                </ListItemButton>
            </List>
            <Divider />

        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          <Grid item width={"90%"} >
            {/* 검색기능 */}
            <Stack direction="row" spacing={1} sx={{ margin: 1, padding: 1, mt: 3 }}>
              <TextField size="small" sx={{width:"70%"}} id="outlined-basic" label="원하는 스터디를 검색해보세요!" variant="outlined" />
              <Button variant="contained" >검색</Button>
              <Button onClick={handleOpen} variant="contained" color="success" sx={{width:"20%"}}>스터디 만들기</Button>
            </Stack>
            
            {/* StudyRoomCreateModal 컴포넌트를 사용하여 모달을 렌더링 */}
            <StudyRoomCreateModal open={open} handleClose={handleClose} />

            <Demo>
              <List>
                {generate(
                    <ListItemButton>
                  <ListItem
                    // secondaryAction={
                    //     <ListItemSecondaryAction style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    //         <Tooltip title="1:1 대화하기">
                    //             <IconButton edge="end" aria-label="1:1 대화">
                    //                 <ChatIcon />
                    //             </IconButton>
                    //         </Tooltip>
                            
                    //         <Tooltip title="참여신청">
                    //             <IconButton edge="end" aria-label="참여신청">
                    //                 <LoginIcon />
                    //             </IconButton>
                    //         </Tooltip>
                    //     </ListItemSecondaryAction>
                        
                    // }
                  >

                    <div>
                        <Stack direction="row" spacing={1}>
                            <h5 style={{fontWeight: "bold"}}>JAVA 초급자 스터디 구해요</h5>
                            <Chip label="모집중" color="error" size='small'/>
                            <Tooltip title="참여코드 인증 필요">
                                <LockIcon/>
                            </Tooltip>
                            <Typography>3/10</Typography>
                            
                        </Stack>
                        <Stack  direction="row">
                        <p>안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
                        </Stack>
                        
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'space-around' }}>
                            <Stack direction="row" spacing={1} marginTop={1} marginBottom={1}>
                                <Chip label="#JAVA" color="primary" size='small'/>
                                <Chip label="#초급" color="primary" size='small' />
                            </Stack>

                            <Stack  direction="row">
                                <Tooltip title="1:1 대화하기">
                                    <IconButton edge="end" aria-label="1:1 대화">
                                        <ChatIcon />
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="참여신청">
                                    <IconButton edge="end" aria-label="참여신청">
                                        <LoginIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </div>
                        
                        
                    </div>
                        
                    
                        
                    
                    
                    </ListItem>
                </ListItemButton>
                  
                )}
              </List>
            </Demo>
            
          </Grid>
          
        </Grid>
        </Box>
    )
}