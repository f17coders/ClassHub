import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Stack, FormControl, OutlinedInput, Button} from '@mui/material';

import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from "react-redux"


export default function StudyRoomChannelModify({channelId, studyId, channelModifyClose, editingChannelId, setEditingChannelId}){
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const [content, setContent] = useState(''); //수정될 채널명
  // 토큰
  let accessToken = useSelector((state) => state.accessToken)
  const [hasError, setHasError] = useState(false); // 입력값이 10자 이상인지 여부를 추적
  const [isNull, setIsNull] = useState(false); // 입력값이 null인지 여부를 추적

  // 입력값이 변경될 때마다 null 여부 업데이트
  useEffect(() => {
    setIsNull(!content); // content가 null이면 setIsNull을 true로 설정
    setIsNull(content.length === 0);
  }, [content]);

  useEffect(() => {
    setHasError(content.length > 10);
  }, [content]);

  // 취소 버튼 클릭 시 실행되는 함수
  const cancelModification = () => {
    // editingChannelId를 null로 변경하여 수정 모달이 닫힘을 알림
    setEditingChannelId(null);
    // 수정 모달 닫기
    // channelModifyClose();
  };
    
    
  // 채널 정보 수정
  const modifyChannel = (channelId) => {
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
              // 수정 완료 alert 띄우기
              handleModifyDialogOpen();
          })
          .catch((err) => console.log(err))
      
  }
  const enterKeyPress = (event, channelId) =>{
    //엔터키 눌렀을 때 등록 함수 호출
    if(event.key === 'Enter'){
      event.preventDefault(); //기본 동작 방지
      if(!isNull){
        modifyChannel(channelId);
      }
    }
  }
    
  // 수정 확인 Dialog용
  const handleModifyDialogOpen = () => {
    MySwal.fire({
      title: "수정 완료되었습니다!",
      text: "채널 정보가 수정되었습니다.",
      icon: "success",
    }).then(() => {
      window.location.reload();
    }
    )
  }

    return(
        <>
          {/* 채널 수정창 */}
          <div style={{ width: '100%', marginTop: '10px', marginBottom: '10px'}}>
            <Stack direction="row" spacing={1}>
              {
                hasError ? (
                  <TextField
                    error
                    id="outlined-error-helper-text"
                    size='small'
                    sx = {{width: '100%'}}
                    helperText="10자 이내로 입력하세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => enterKeyPress(e, channelId)}
                  />
                  ) : (
                      <TextField
                        required
                        id="outlined-required"
                        size='small'
                        sx = {{width: '100%'}}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => enterKeyPress(e, channelId)}
                      />
                  )
                }
                
                <Stack direction="row" spacing={1}>
                  <Button variant="contained"
                      size='small'
                      onClick={() => {modifyChannel(channelId); }}
                      disabled={hasError || isNull}>
                        수정
                    </Button>
                    <Button variant="contained"
                      size='small'
                      color='error'
                      onClick={cancelModification}
                      >
                        취소
                    </Button>
                </Stack>
            </Stack>
          </div>
        </>
    )
}