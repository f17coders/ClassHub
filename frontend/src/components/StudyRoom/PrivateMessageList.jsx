import React, { useState, useEffect, useRef, useCallback } from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import { Box, Divider, ListItem, ListItemButton, ListItemText, ListItemAvatar,Avatar  } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import ImageIcon from '@mui/icons-material/Image';

// 사이드바 메뉴
const data = [
    { icon: <People />, label: 'Authentication', date: 'Jan 22, 2024' },
    { icon: <Dns />, label: 'Database', date: 'Jan 19, 2024' },
    { icon: <PermMedia />, label: 'Storage', date: 'Jan 12, 2024' },
    { icon: <Public />, label: 'Hosting', date: 'Jan 2, 2024' },
  ];

export default function PrivateMessageList(){
    // 사이드바 메뉴 열기
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    return(

        <Box
              sx={{
                bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
              }}
            >
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
                
              {open &&
                data.map((item) => (
                  <ListItemButton 
                    key={item.label} 
                    sx={{ width: '100%', maxWidth: 360 }}
                    onClick={() => {navigate('message')}}
                    >
                      <ListItem sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}>
                        <ListItemAvatar>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={item.label} secondary={item.date}
                        primaryTypographyProps={{ fontSize: 13, fontWeight: 'medium' }} />
                      </ListItem>
                      <Divider/>

                  </ListItemButton>
                ))}
            </Box>

    )
}