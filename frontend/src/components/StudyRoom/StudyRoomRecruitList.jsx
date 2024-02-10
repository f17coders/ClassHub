import React, {useState, useEffect} from 'react';
import { ListItemButton, ListItem, Stack, Chip, Tooltip, Button, IconButton, Typography, Dialog, DialogActions, DialogTitle } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LinkIcon from '@mui/icons-material/Link';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import {registPersonalChat} from "../../common/chat.js"
import {useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux"


export default function StudyRoomRecruitList({study}){
  const MySwal = withReactContent(Swal);
  // 토큰
  let accessToken = useSelector((state) => state.accessToken)
  const [studyId, setStudyId] = useState('');
  const [status, setStatus] = useState(false) //방 공개여부
  const [inviteCode, setInviteCode] = useState(''); //초대코드
  const [inputValue, setInputValue] = useState(''); //입력한 초대코드
  const [personalChatId, setPersonalChatId] = useState();
  const navigate = useNavigate();
  
  const registChat = (receiver) => {
    registPersonalChat(accessToken, receiver).then(personalChatId => {
      setPersonalChatId(personalChatId);
      navigate(`/studyroom/message/${personalChatId}`)
    });
  }

  //입장 확인 Dialog용
  const handleEnterDialogOpen = (studyId) =>{
    //공개방일 경우
    if(study.isPublic){
      MySwal.fire({
        title: "입장하시겠습니까?",
        text: "해당 스터디룸은 공개상태이므로 참여가 가능합니다.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "네, 참여할래요",
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonText: "아니오, 취소할게요",
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        reverseButtons: true
      })
      .then((result) => {
        //입장 시
        if(result.isConfirmed){
          enterStudyRoom(studyId);
          // .then(() => {
          //   MySwal.fire({
          //     title: "참여 완료되었습니다!",
          //     text: "참여중인 스터디 목록에서 확인 가능합니다.",
          //     icon: "success"
          //   })
          // })
          // .catch((err) =>{
          //   console.log(err.response.data)
          // })
        } 
        //입장 취소시
        else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire({
            title: "취소되었습니다",
            text: "스터디룸 입장이 취소되었습니다.",
            icon: "error"
            });
          }
      })
      .catch(() => {
        MySwal.fire({
          title: "오류 발생",
          text: "스터디 참여중 오류가 발생했습니다.",
          icon: "error"
        })
      })
    } 
    //비공개 방일 경우
    else if(!study.isPublic){

      MySwal.fire({
        title: "입장하시겠습니까?",
        text: "해당 스터디룸은 비공개상태이므로 참여코드가 필요합니다.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "네, 참여할래요",
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonText: "아니오, 취소할게요",
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        reverseButtons: true
      })
      .then((result) => {
        if(result.isConfirmed){
          // 버튼 클릭 시에만 초대코드 요청
          axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/invitation-code/${studyId}`,{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((result) => {
            setInviteCode(result.data.result);
            console.log(result.data.result);
          }).catch((err) => console.log(err))

          //참여코드 입력 후 입장 가능
          MySwal.fire({
            title: "참여코드를 입력하세요.",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            
          }).then((result) => {
          if (result.isConfirmed) {
            console.log(result.value)
            setInputValue(result.value)

            axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/invitation-code/valid/${studyId}?enterCode=${result.value}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            })
            .then((res)=>{
              console.log(res)
              const status = res.data.status;
              if(status === 200){
                MySwal.fire({
                  title: '참여 완료되었습니다!',
                  icon: "success"})
                  .then(() =>{
                    enterStudyRoom(studyId);
                });
              }
            })
            .catch((error) => {
              console.log(error.response.data.code)
              const code = error.response.data.code;
              if(code === 'B301'){
                alert('이미 가입되어 있습니다.')
              } else if(code === 'B303'){
                alert('코드가 일치하지 않습니다.')
              }else{
                alert('알수없는 오류. 관리자에게 문의바람')
              }
            })
            

            
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            MySwal.fire({
              title: "취소되었습니다",
              text: "스터디룸 입장이 취소되었습니다.",
              icon: "error"
            });
          }
        });

        }else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire({
            title: "취소되었습니다",
            text: "스터디룸 입장이 취소되었습니다.",
            icon: "error"
          });
        }
      })
    }
  }

    // 스터디룸 입장
    const enterStudyRoom = (studyId) => {
      axios.post(`https://i10a810.p.ssafy.io/api/studies/v1/entrance/${studyId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    .then((res) => {
        console.log('입장 성공')
        console.log(res)
        alert('입장 성공')
        // handleEnterDialogOpen(studyId);
        window.location.reload(); //페이지 새로고침
    })
    .catch((err) => {
      console.log(err.response.data.code)
      const code = err.response.data.code;
      if(code === 'B301'){
        alert('이미 가입되어 있습니다.')
      } else if(code === 'B303'){
        alert('코드가 일치하지 않습니다.')
      }
    })
    }

    // 초대코드 일치여부
    const isEnterCodeSame = (enterCode) => {
      axios.get(`https://i10a810.p.ssafy.io/api/studies/v1/invitation-code/valid/${studyId}?enterCode=${enterCode}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => console.log(err));
    }

    return(
        <ListItemButton>
            <ListItem>
              <Stack sx={{width: '100%'}}>
                <Stack direction="row" spacing={1} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'space-around' }}>
                  <h3 style={{ fontWeight: "bold" }}>{study.title}</h3>
                  <Stack direction="row" spacing={1}>
                    {study.isPublic == false && (
                      <Tooltip title="참여코드 인증 필요">
                          <LockIcon/>
                      </Tooltip>
                    )}
                    {
                      study.capacity > study.currentMembers ? <Chip label='모집중' color="success" size='small' /> : <Chip label='모집완료' color="error" size='small' />
                    }

                    <Typography>{`${study.currentMembers}/${study.capacity}`}</Typography>
                  </Stack>
                </Stack>
                    
                <Stack direction="row" sx={{ marginTop: 1 }}>
                  <p>{study.description}</p>
                </Stack>
                
                <Stack direction="row" spacing={1}>
                  <Tooltip title="연결된 강의">
                    <LinkIcon/>
                  </Tooltip>
                  {
                    study.lecture.name? (
                      <p>{study.lecture.name}</p>

                    ):(
                      <p>연결된 강의 없음</p>
                    )
                  }
                </Stack>
                    
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'space-around' }}>
                  <Stack direction="row" spacing={1} my={1}>
                    { study.tagList ? (study.tagList.map((tag, tagIndex) => (
                      <Chip key={tag.tagId} label={tag.name} color="primary" size='small' />
                    ))) : null
                  }
                  </Stack>
                    
                  <Stack direction="row">
                    <Tooltip title="1:1 대화하기">
                      <IconButton edge="end" aria-label="1:1 대화"  
                        onClick={() => {registChat(study.studyLeaderId);}}>
                        <ChatIcon />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="참여신청">
                      <IconButton edge="end" aria-label="참여신청" 
                        onClick={() => {handleEnterDialogOpen(study.studyId)}}>
                        <LoginIcon />
                      </IconButton>
                    </Tooltip>
                    
                  </Stack>
                </div>
              </Stack>
            </ListItem>
        </ListItemButton>
    )
}