import {Alert, Tooltip, Typography, List, ListItem, Backdrop, Button, ListItemText, ListItemAvatar,Avatar, FormControl, Dialog, DialogActions, DialogTitle} from '@mui/material';
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CommunityReplyModify from './CommunityReplyModify';
import { useSelector } from "react-redux"


export default function CommunityReply({detailData}){
  // 토큰
  let accessToken = useSelector((state) => state.accessToken)
  // 로그인 여부
  let isLogin = useSelector((state) => state.isLogin)
  let user = useSelector((state) => state.user)
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const MySwal = withReactContent(Swal);
  const [editingCommentId, setEditingCommentId] = useState(null); // 수정 중인 댓글의 ID를 저장

  // 삭제 확인 Dialog용
  const handleDeleteDialogOpen = (commentId) => {
    MySwal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "댓글 정보가 완전히 삭제됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네, 삭제할래요",
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonText: "아니오, 취소할게요",
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteReply(commentId);        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        MySwal.fire({
          title: "취소되었습니다",
          text: "댓글 삭제가 취소되었습니다.",
          icon: "error"
        });
      }
    });
  };

// 댓글 생성 함수
  const createReply = () => {
    {
      isLogin?
      //로그인 되어있다면
      (
        axios.post(`https://i10a810.p.ssafy.io/api/comments/v1/${detailData.communityId}`,
        {
          "communityId": detailData.communityId,
          "content": content,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res)
          console.log(profileImage)
          // 등록 확인 dialog
          MySwal.fire({
            title: "등록되었습니다!",
            text: "댓글이 정상적으로 등록되었습니다.",
            icon: "success"
          })
          .then(() => {
            navigate(`/community/detail/${detailData.communityId}`)
            window.location.reload(); //페이지 새로고침
          })
        })
        .catch((err) => console.log(err))
      ) : (
        MySwal.fire({
          title: "로그인 필요",
          text: "로그인 후 댓글을 작성하실 수 있습니다.",
          icon: "warning"
        })
        .then(()=>{
          //로그인 페이지로 이동시키기
          navigate('/login')
        })
      )
    }
  }

  const deleteReply = (commentId) => {
    // 댓글 삭제 함수
      axios.delete(`https://i10a810.p.ssafy.io/api/comments/v1/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res)
        MySwal.fire({
          title: "삭제되었습니다!",
          text: "댓글이 정상적으로 삭제되었습니다.",
          icon: "success"
        })
        .then(() =>{
          navigate(`/community/detail/${detailData.communityId}`)
          window.location.reload(); //페이지 새로고침
        })
      })
      .catch((err) => {
        console.log(err)
        MySwal.fire({
          title: "댓글 삭제 실패",
          text: "댓글 삭제 중 오류가 발생했습니다.",
          icon: "error"
        })
      })
    
  }

  const enterKeyPress = (event) =>{
    //엔터키 눌렀을 때 등록 함수 호출
    if(event.key === 'Enter'){
      event.preventDefault(); //기본 동작 방지
      createReply();
    }
  }
  
    return(
        <div>
            {/* 댓글 */}
            <div style={{display:'flex', alignItems:'center'}}>
                <ChatIcon sx={{marginRight: '4px'}}/> 댓글 {detailData.commentCount}
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
                    onKeyDown={enterKeyPress} //엔터키 눌렀을 때 이벤트 핸들링
                    />
                    <Tooltip title="등록">
                        <IconButton onClick={() => {createReply()}}>
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
                      <Avatar src={user.profileImage} />
                    </ListItemAvatar> 
                    
                    {/* 수정 모드인 경우 */}
                    {editingCommentId === singleComment.commentId ? (
                      <CommunityReplyModify
                        comment={singleComment}
                        // onCancelEdit={() => setEditingCommentId(null)}
                        // onSaveEdit={() => {
                        //   setEditingCommentId(null);
                        // }}
                      />
                      ) : (
                      <>
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
                        <Tooltip title="수정">
                              <IconButton onClick={() => {
                                isLogin? (
                                  setEditingCommentId(singleComment.commentId)
                                ) : (
                                  MySwal.fire({
                                    title: "로그인 필요",
                                    text: "로그인 후 이용해주세요.",
                                    icon: "warning",
                                  })
                                )
                                }}>
                                  <EditIcon/>
                              </IconButton>
                          </Tooltip>
                          <Tooltip title="삭제">
                              <IconButton onClick={() => {
                                isLogin? (
                                  handleDeleteDialogOpen(singleComment.commentId)
                                ) : (
                                  MySwal.fire({
                                    title: "로그인 필요",
                                    text: "로그인 후 이용해주세요.",
                                    icon: "warning",
                                  })
                                )
                                }}>
                                  <DeleteIcon/>
                              </IconButton>
                          </Tooltip> 
                      </>
                    )}
                  </ListItem>
                ))
              }
               
            </List>
        </div>
    )
}