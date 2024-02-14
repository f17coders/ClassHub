import React, { useState, useEffect, useRef, useCallback } from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import { Box, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, ListSubheader, Avatar } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import { useSelector } from "react-redux"
import cat from './../../assets/ProfileIamge/고양이.jpg'
import dog from './../../assets/ProfileIamge/강아지.jpg'
import bear from './../../assets/ProfileIamge/곰.jpg'
import raccoon from './../../assets/ProfileIamge/너구리.jpg'
import lion from './../../assets/ProfileIamge/사자.jpg'
import monkey from './../../assets/ProfileIamge/원숭이.jpg'
import rabbit from './../../assets/ProfileIamge/토끼.jpg'
import elephant from './../../assets/ProfileIamge/코끼리.jpg'

// 랜덤 이미지 파일 경로 배열
const imagePaths = [cat, dog, bear, raccoon, lion, monkey, rabbit, elephant];

// 내가 참여중인 스터디 목록 조회(왼쪽 사이드메뉴에서)
export default function ParticipatingRoomList({studyId}){
  const [data, setData] = useState([]);
  // const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [imageIndex, setImageIndex] = useState(0); // 무작위 이미지 인덱스 상태 추가
  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  // 토큰
  let accessToken = useSelector((state) => state.accessToken)

  // 로그인 여부
  let isLogin = useSelector((state) => state.isLogin)

  useEffect(() => {
    isLogin? (null) : (navigate('/login'))
  }, [])

  // 참여중인 스터디 목록 데이터 -> API에서 받아올것!
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/members/v1/studies/participation`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      // console.log(res.data.result)
      setData(res.data.result)
      // window.location.reload(); //페이지 새로고침
    })
    .catch((err) => console.log(err))
  },[studyId]);

  // 사이드바 메뉴 열기
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  // 이미지 무작위 선택 효과를 위한 이미지 인덱스 설정
  useEffect(() => {
    setImageIndex(Math.floor(Math.random() * imagePaths.length));
  }, [data]);

    return(
        <Box sx={{maxHeight: 360,
                width:"100%",
                position: 'relative',
                overflow: 'auto',
                // 스크롤바 숨기기
                "msOverflowStyle": "none", /* IE and Edge */
                "scrollbarWidth": "none", /* Firefox */
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
              pb: 0,
              width: "100%",
              minWidth: 360,
              color: 'black',
            }}
          >
          <ListItemText
            primary="참여중인 스터디"
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
                 minHeight:'60px'
              }}
              // selected={selectedIndex === itemIndex && open}
              onClick={(event) => {
                // handleListItemClick(event, itemIndex);
                navigate(`participating/${item.studyId}`);
              }}
              >
                <ListItem 
                sx={{ 
                  py: 0, 
                  minHeight: 32,
                  }}
                >
                  <Avatar sx={{
                    width: 30, 
                    height: 30, 
                    marginRight: 2
                    }} 
                    src={imagePaths[itemIndex]}
                  />
                  <ListItemText primary={item.title}
                  primaryTypographyProps={{ fontSize: 12, fontWeight: 'medium' }} />
                </ListItem>
                <Divider/>
                  
            </ListItemButton>
          ))}
      </Box>

    )
}