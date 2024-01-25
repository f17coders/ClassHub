import {Tooltip, Autocomplete, Typography, Stack, Container, Button, TextField, Grid, Pagination,
    List, ListItem, Divider, ListItemText, ListItemAvatar,Avatar,  FormControl} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import React, { useRef, useEffect, useState } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'


export default function CommunityReply(){

    //댓글 개수 담을 상태 변수
    const [commentCount, setCommentCount] = useState(0);

    //컴포넌트가 렌더링될 때 한번만 실행
    useEffect(() => {
        const listElement = document.getElementById('commentList');

        //List의 자식 요소 개수를 이용하여 댓글 개수 업데이트
        if(listElement){
            setCommentCount(listElement.children.length);
        }
    }, []); //렌더링 시 한 번만 실행되도록 빈 배열 전달


    return(
        <div>
            {/* 댓글 */}
            <div>
                <ChatIcon/> 댓글 {commentCount}
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
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다."
                    secondary={
                      <React.Fragment>
                        <Typography
                        //   sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          정싸피
                        </Typography>
                         — {"2024.01.25 13:00"}
                      </React.Fragment>
                    }
                  />
                    <Tooltip title="삭제">
                        <IconButton aria-label="삭제">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>

                    {/* <Divider variant="inset" component="li" /> */}
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다."
                    secondary={
                      <React.Fragment>
                        <Typography
                        //   sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          정싸피
                        </Typography>
                         — {"2024.01.25 13:00"}
                      </React.Fragment>
                    }
                  />
                    <Tooltip title="삭제">
                        <IconButton aria-label="삭제">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                    {/* <Divider /> */}
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다."
                    secondary={
                      <React.Fragment>
                        <Typography
                        //   sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          정싸피
                        </Typography>
                         — {"2024.01.25 13:00"}
                      </React.Fragment>
                    }
                    />
                    <Tooltip title="삭제">
                        <IconButton aria-label="삭제">
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </ListItem>
            </List>
        </div>
    )
}