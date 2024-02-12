import React, { useState, useEffect, useRef, useCallback } from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import { Container, Grid, Box, Button, Hidden, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar,Avatar , Paper,IconButton,Tooltip, Typography  } from "@mui/material";
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Home from '@mui/icons-material/Home';
import { useSelector } from "react-redux"
import PrivateMessageList from "../../components/StudyRoom/PrivateMessageList";
import ParticipatingRoomList from "../../components/StudyRoom/ParticipatingRoomList";

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

// 스터디룸 홈페이지
export default function StudyRoom() {
    // 토큰
	  let accessToken = useSelector((state) => state.accessToken)
    // 로그인 여부
    let isLogin = useSelector((state) => state.isLogin)
    // const [open, setOpen] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (index) => {
      setSelectedIndex(index);
    };

    const handleWindowResize = useCallback((event) => {
      setWindowSize(window.innerWidth);
    }, []);

    useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
      windowSize >= 600 && setOpen(false);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, [windowSize]);

    // 사이드바 메뉴 열기
    const [open, setOpen] = React.useState(true);

    return(
        <Container>
          <Grid container sx={{width:"100%"}}>
            {/* <Hidden smUp>
            </Hidden> */}

            <Hidden smDown>
              <Box sx={{ display: 'flex' }}>
                <ThemeProvider
                  theme={createTheme({
                    components: {
                      MuiListItemButton: {
                        defaultProps: {
                          disableTouchRipple: true,
                        },
                      },
                    },
                    palette: {
                      mode: 'dark',
                      primary: { main: 'rgb(102, 157, 246)' },
                      background: { paper: 'rgb(5, 30, 52)' },
                    },
                  })}
                >
                <Paper elevation={0} sx={{ maxWidth: 256 }}>
                  <FireNav component="nav" disablePadding>
                    <ListItem component="div" disablePadding>

                      {/* 모집하기 버튼 */}
                      <ListItemButton selected={selectedIndex === 0}
                        onClick={(event) =>{
                          handleListItemClick(event, 0)
                          navigate('recruit');
                        }}
                        sx={{ height: 56,
                          backgroundColor: selectedIndex === 0 ? 'pink' : null,
                        }}>

                        <ListItemIcon>
                          <Home color="white"/>
                        </ListItemIcon>
                        <ListItemText
                          primary="모집하기"
                          primaryTypographyProps={{
                            color: 'white',
                            fontWeight: 'medium',
                            fontSize: '16px',
                            variant: 'body2',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                        
                    <Divider />
                    {/* 참여중인 스터디 목록 */}
                    <ParticipatingRoomList selected={selectedIndex} onClick={handleListItemClick}/>
                        
                    <Divider />
                    {/* 1:1 개인 메시지 */}
                    <PrivateMessageList selected={selectedIndex} onClick={handleListItemClick}/>
                        
                  </FireNav>
                </Paper>
              </ThemeProvider>
            </Box>
            </Hidden>
            

            
            {/* contentArea */}
            <Grid item backgroundColor="theme.palette.background.paper"  xs={12} sm>
            {
              isLogin? (
                <Outlet/>
              ) : (
                <Container sx={{backgroundColor: "gainsboro", width: "100%", height:"80vh", textAlign: "center", justifyContent:"center" ,alignContent:"center"}}>
                  <Typography variant="h5">
                    로그인 후 이용 가능합니다!
                  </Typography>
                </Container>
              )
            }
                
            </Grid>

          </Grid>
        </Container>
        
    )
}