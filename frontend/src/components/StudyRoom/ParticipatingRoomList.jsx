import React, { useState, useEffect, useRef, useCallback } from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import { Box, Divider, ListItem, ListItemButton, ListItemText, ListItemAvatar,Avatar } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';

// 내가 참여중인 스터디 목록 조회(왼쪽 사이드메뉴에서)
export default function ParticipatingRoomList(){
  const [data, setData] = useState([]);


  // 참여중인 스터디 목록 데이터 -> API에서 받아올것!
  useEffect(() => {
    axios.get(`http://i10a810.p.ssafy.io:4000/members/v1/studies/participation`, {
      headers: {
        AUTHORIZATION: '9'
      }
    })
    .then((res) => {
      console.log(res.data.result)
      setData(res.data.result)
      // window.location.reload(); //페이지 새로고침
    })
    .catch((err) => console.log(err))
  },[]);

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
              key={item.studyId}
              sx={{ width: '100%', maxWidth: 360 }}
              onClick={() => {
                navigate(`participating/${item.studyId}`)
            }}
              >
                <ListItem sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.title}
                  primaryTypographyProps={{ fontSize: 12, fontWeight: 'medium' }} />
                </ListItem>
                <Divider/>
                  
            </ListItemButton>
          ))}
      </Box>

    )
}