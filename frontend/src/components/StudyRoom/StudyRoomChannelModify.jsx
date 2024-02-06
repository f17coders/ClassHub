import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { FormControl, OutlinedInput, Badge, Divider, List, ListItem,ListItemAvatar, Avatar,ListItemText, Button, Modal, Stack, TextField, Autocomplete, Box, Typography, Container, createFilterOptions, IconButton, Tooltip} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import VerifiedIcon from '@mui/icons-material/Verified';
import EditNoteIcon from '@mui/icons-material/EditNote';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
    maxHeight: '80vh', // 최대 높이
    overflowY: 'auto',  // 수직 스크롤 적용
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function StudyRoomChannelModify({channelId, studyRoomChannelModify,channelModifyClose}){
    const [content, setContent] = useState(''); //수정될 채널명
    const accessToken = localStorage.getItem('token');


    // 채널 정보 수정
    const modifyReply = (channelId) => {
            axios.put(`https://i10a810.p.ssafy.io/api/studies/v1/channels`,{
                "channelId": channelId,
                "name": content,
            }, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
            .then((response)=> {
                console.log(response.data.result)
                channelModifyClose();
                // window.location.reload(); //페이지 새로고침
            })
            .catch((err) => console.log(err))
        
    }

    return(
        <>
        {/* 채널 수정창 */}
        <div style={{ width: '100%', marginTop: '10px'}}>
                <form noValidate autoComplete="off">
                  <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <OutlinedInput 
                    sx={{width: "100%", marginRight: '10px'}} 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    // onKeyDown={(e) => enterKeyPress(e, comment.commentId)} //엔터키 눌렀을 때 이벤트 핸들링
                    />
                    <Tooltip title="수정">
                        <IconButton onClick={() => {modifyReply(channelId); }}>
                            <VerifiedIcon/>
                        </IconButton>
                    </Tooltip>
                  </FormControl>
                </form>
            </div>
        </>
    )
}