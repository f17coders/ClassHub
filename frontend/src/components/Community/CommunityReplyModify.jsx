import {Alert, Tooltip, Typography, List, ListItem, Backdrop, Button, ListItemText, ListItemAvatar,Avatar, FormControl, Dialog, DialogActions, DialogTitle} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import React, { useRef, useEffect, useState } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CommunityReplyModify({comment}){
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const MySwal = withReactContent(Swal);
  
  // 수정 확인 Dialog용
  const handleModifyDialogOpen = (commentId) => {
    MySwal.fire({
      title: "수정하시겠습니까?",
      text: "댓글 정보를 수정합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "네, 수정할래요",
      confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
      cancelButtonText: "아니오, 취소할게요",
      cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "수정되었습니다!",
          text: "댓글 수정이 정상적으로 완료되었습니다.",
          icon: "success"
        }).then(() =>{
            modifyReply(commentId);
        });
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        MySwal.fire({
          title: "취소되었습니다",
          text: "댓글 수정이 정상적으로 취소되었습니다.",
          icon: "error"
        });
      }
    });
  };

  const modifyReply = (commentId) => {
    // 댓글 수정 함수
      axios.put(`https://i10a810.p.ssafy.io/api/comments/v1/${commentId}`,
      {
        "commentId": commentId,
        "content": content,
      })
      .then((res) => {
        console.log(res)
        window.location.reload(); //페이지 새로고침
      })
      .catch((err) => console.log(err))
    
  }

  const enterKeyPress = (event, commentId) =>{
    //엔터키 눌렀을 때 등록 함수 호출
    if(event.key === 'Enter'){
      event.preventDefault(); //기본 동작 방지
      handleModifyDialogOpen(commentId);
    }
  }
    

    return(
        <>
        {/* 댓글 수정창 */}
        <div style={{ width: '100%', marginTop: '10px'}}>
                <form noValidate autoComplete="off">
                  <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <OutlinedInput 
                    sx={{width: "100%", marginRight: '10px'}} 
                    placeholder={comment.content}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => enterKeyPress(e, comment.commentId)} //엔터키 눌렀을 때 이벤트 핸들링
                    />
                    <Tooltip title="수정">
                        <IconButton onClick={() => {handleModifyDialogOpen(comment.commentId); }}>
                            <CheckIcon/>
                        </IconButton>
                    </Tooltip>
                  </FormControl>
                </form>
            </div>
        
        </>
            
    )
}