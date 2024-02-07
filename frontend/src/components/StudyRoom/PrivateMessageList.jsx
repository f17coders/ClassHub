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

export default function PrivateMessageList(){
    // 사이드바 메뉴 열기
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [data, setData] = useState([]);
    const [personalChatId, setPersonalChatId] = useState();
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };



    const accessToken = localStorage.getItem('token');

    // 현재 채팅한 멤버 목록 가져오기
    useEffect(() => {
      axios.get(`http://localhost:8080/api/personal-chat/v1`, {
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
          maxHeight: 360,
          width:"100%",
          position: 'relative',
          overflow: 'auto',
          // 스크롤바 숨기기
          "-ms-overflow-style": "none", /* IE and Edge */
          "scrollbar-width": "none", /* Firefox */
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari, and Opera */,
          },
          bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
          pb: open ? 2 : 0,
          }}>
          <ListSubheader>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpen(!open)}
              sx={{
                px: 3,
                pt: 2.5,
                pb: open ? 0 : 2.5,
                width: "100%",
                minWidth: 360,
                '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
              }}>
              <ListItemText
                primary="개인 메시지"
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 'medium',
                  lineHeight: '20px',
                  mb: '24px',
                  width: "100%"
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
                    sx={{ width: '100%', minHeight:'60px' }}
                    selected={selectedIndex === itemIndex}
                    onClick={(event) => {
                      handleListItemClick(event, itemIndex);
                      navigate(`message/${item.personalChatId}`);
                    }}
                    >
                      <ListItem sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                        <ListItemAvatar>
                          <Avatar  alt={item.receiver.nickname} src={item.receiver.profileImage} >
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.receiver.nickname}
                        primaryTypographyProps={{ fontSize: 12, fontWeight: 'medium' }} />
                      </ListItem>
                      <Divider/>

                  </ListItemButton>
                ))}
            </Box>

    )
}