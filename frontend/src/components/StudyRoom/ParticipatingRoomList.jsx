import React, { useState, useEffect, useRef, useCallback } from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import { Box, Divider, ListItem, ListItemButton, ListItemText, ListItemAvatar, ListSubheader, Avatar } from "@mui/material";
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

  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const accessToken = localStorage.getItem('token');

  // 참여중인 스터디 목록 데이터 -> API에서 받아올것!
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/members/v1/studies/participation`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
        <Box sx={{maxHeight: 360,
                width:"100%",
                position: 'relative',
                overflow: 'auto',
                // 스크롤바 숨기기
                "-ms-overflow-style": "none", /* IE and Edge */
                "scrollbar-width": "none", /* Firefox */
                "&::-webkit-scrollbar": {
                  display: "none" /* Chrome, Safari, and Opera */,
                },
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null, pb: open ? 2 : 0,
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
              // minWidth: 360,
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
        </ListSubheader>

        {open &&
          data.map((item, itemIndex) => (
            <ListItemButton 
              key={itemIndex}
              sx={{ width: '100%', minHeight:'60px' }}
              selected={selectedIndex === itemIndex}
              onClick={(event) => {
                handleListItemClick(event, itemIndex);
                navigate(`participating/${item.studyId}`);
              }}
            //   onClick={() => {
            //     navigate(`participating/${item.studyId}`)
            // }}
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