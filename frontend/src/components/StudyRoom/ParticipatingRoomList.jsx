import React, { useState, useEffect, useRef, useCallback } from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import { Box, Divider, ListItem, ListItemButton, ListItemText, ListItemAvatar,Avatar } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import ImageIcon from '@mui/icons-material/Image';



// 사이드바 메뉴
const data = [
    { id: 1, icon: <People />, label: '자바의 신이 될거야', date: 'Jan 22, 2024' },
    { id: 2, icon: <Dns />, label: '스프링을 공부해봐요', date: 'Jan 19, 2024' },
    { id: 3, icon: <PermMedia />, label: 'CS 뿌시기', date: 'Jan 12, 2024' },
    { id: 4, icon: <Public />, label: '기술면접 준비방', date: 'Jan 2, 2024' },
  ];

export default function ParticipatingRoomList(){
        // 사이드바 메뉴 열기
        const [open, setOpen] = React.useState(true);
        const navigate = useNavigate();

    return(
        <Box sx={{ bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null, pb: open ? 2 : 0,}}>
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
          }}
        >
          <ListItemText
            primary="참여중인 스터디"
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

        {open &&
          data.map((item) => (
            <ListItemButton 
              key={item.label}
              sx={{ width: '100%', maxWidth: 360 }}
              onClick={() => {
                navigate('participating')
            }}
              >
                <ListItem sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.label} secondary={item.date}
                  primaryTypographyProps={{ fontSize: 12, fontWeight: 'medium' }} />
                </ListItem>
                <Divider/>
                  
            </ListItemButton>
          ))}
      </Box>

    )
}