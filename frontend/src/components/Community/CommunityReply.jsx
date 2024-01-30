import {Tooltip, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar,Avatar,  FormControl} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import React, { useRef, useEffect, useState } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios';

export default function CommunityReply({detailData}){
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const createReply = () => {
    // 댓글 생성 함수
      axios.post(`http://i10a810.p.ssafy.io:4000/comments/v1/${detailData.communityId}`,
      {
        "communityId": detailData.communityId,
        "content": content,
      })
      .then((res) => {
        console.log(res)
        navigate(`/community/detail/${detailData.communityId}`)
        window.location.reload(); //페이지 새로고침
      })
      .catch((err) => console.log(err))
    
  }

  const deleteReply = () => {
    // 댓글 삭제 함수
      axios.delete(`http://i10a810.p.ssafy.io:4000/comments/v1/${commentId}`,
      {
        "commentId": commentId,
      })
      .then((res) => {
        console.log(res)
        navigate(`/community/detail/${detailData.communityId}`)
        window.location.reload(); //페이지 새로고침
      })
      .catch((err) => console.log(err))
    
  }
    

    return(
        <div>
            {/* 댓글 */}
            <div>
                <ChatIcon/> 댓글 {detailData.commentCount}
            </div>

            {/* 댓글 입력창 */}
            <div style={{ marginTop: '20px'}}>
                <form noValidate autoComplete="off">
                  <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <OutlinedInput 
                    sx={{width: "100%", marginRight: '10px'}} 
                    placeholder="댓글을 입력하세요" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                    <Tooltip title="등록">
                        <IconButton onClick={() => {createReply(); }}>
                            <SendIcon/>
                        </IconButton>
                    </Tooltip>
                  </FormControl>
                </form>
            </div>

            {/* 댓글 리스트 */}
            <List id="commentList" sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {
                detailData.commentList && detailData.commentList.map((singleComment, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar> 

                    <ListItemText
                    primary={singleComment.content}
                    secondary={
                      <React.Fragment>
                        <Typography
                        //   sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {singleComment.memberNickname}
                        </Typography>
                         — {singleComment.createdAt}
                      </React.Fragment>
                    }
                  />
                    <Tooltip title="삭제">
                        <IconButton onClick={() => {deleteReply(); }}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                  </ListItem>
                ))
              }
               
            </List>
        </div>
    )
}