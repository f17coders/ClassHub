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


export default function CommunityReply({detailData}){

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
                    <OutlinedInput sx={{width: "100%", marginRight: '10px'}} placeholder="댓글을 입력하세요" />
                    <Tooltip title="등록">
                        <IconButton aria-label="등록">
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
                        <IconButton aria-label="삭제">
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