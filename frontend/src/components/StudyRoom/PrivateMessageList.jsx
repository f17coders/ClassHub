import React, { useState, useEffect, useRef, useCallback } from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import { Box, Divider, ListItem, ListItemButton, ListItemText, ListItemAvatar, ListSubheader, Avatar  } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import { useSelector } from "react-redux"


export default function PrivateMessageList(){
    // 사이드바 메뉴 열기
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    // const [selectedIndex, setSelectedIndex] = useState(null);
    const [data, setData] = useState([]);
    const [personalChatId, setPersonalChatId] = useState();
    // const handleListItemClick = (event, index) => {
    //   setSelectedIndex(index);
    // };



    // 토큰
	  let accessToken = useSelector((state) => state.accessToken)

    // 현재 채팅한 멤버 목록 가져오기
    useEffect(() => {
      // axios.get(`http://localhost:8080/api/personal-chat/v1`, {
      axios.get(`https://i10a810.p.ssafy.io/api/personal-chat/v1`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      })
      .then((res) => {
        setData(res.data.result)
        console.log(res.data)
      })
      .catch((err) => console.log(err))
    },[])

    return(
      <Box sx={{
        backgroundColor: 'white',
        border: '3px solid rgba(25, 118, 210, 0.12)',
        borderRadius: '15px',
        margin: '1em',
        maxHeight: 250,
        // width:"100%",
        position: 'relative',
        overflow: 'auto',
      }}>
          <ListSubheader sx={{ margin: 0, padding: 0 }}>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: 0,
                width: "100%",
                color: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                }
              }}>
                <Divider/>
              <ListItemText
                primary="개인 메시지"
                primaryTypographyProps={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  lineHeight: '20px',
                  mb: '24px',
                  // width: "100%"
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDown
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                  transition: '0.2s',
                }}
              />
            </ListItemButton>
          </ListSubheader>
                
              {open &&
                data.map((item, itemIndex) => (
                  <ListItemButton 
                    key={itemIndex}
                    sx={{ 
                      width: '100%', 
                      minHeight:'60px',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      }
                     }}
                    // selected={selectedIndex === itemIndex}
                    onClick={(event) => {
                      // handleListItemClick(event, itemIndex);
                      navigate(`message/${item.personalChatId}`);
                    }}
                    >
                      <ListItem sx={{ 
                        py: 0, 
                        minHeight: 32, 
                        }}>
                        <Avatar sx={{width: 30, height: 30, marginRight: 2}} alt={item.receiver.nickname} src={item.receiver.profileImage}/>
                        <ListItemText primary={item.receiver.nickname}
                        primaryTypographyProps={{ 
                          fontSize: 14, 
                          fontWeight: 'medium' 
                        }} />
                      </ListItem>
                      <Divider/>

                  </ListItemButton>
                ))}
            </Box>
    )
}