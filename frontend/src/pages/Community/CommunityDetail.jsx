import {Tooltip, Autocomplete, Typography, Stack, Container, Button, Backdrop, Alert, Dialog, DialogActions, DialogTitle} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import React, { useRef, useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Routes, Route, Link, useNavigate, Outlet, useParams} from 'react-router-dom'
import CommunityReply from '../../components/Community/CommunityReply';
import axios from 'axios';
import DOMPurify from "dompurify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CommunityDetail(){
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    // 좋아요용 변수
	const [like, setLike] = useState(false)
	const toggleLike = () => setLike(!like)

    // 북마크용 변수
	const [bookmark, setBookmark] = useState(false)
	const toggleBookmark = () => setBookmark(!bookmark)

    const [detailData, setDetailData] = useState([]); //받아온 데이터 저장할 배열
    const { communityId } = useParams();
    useEffect(() => {
        axios.get(`http://i10a810.p.ssafy.io:4000/communities/v0/details/${communityId}`)
          .then((response) => {
            // 받아온 데이터를 필요에 맞게 처리합니다.
            setDetailData(response.data.result);
            console.log(response.data.result)
          })
          .catch((err) => console.log(err));
      }, [communityId]);

    const deleteData = (communityId) =>{
        axios.delete(`http://i10a810.p.ssafy.io:4000/communities/v1/${communityId}`)
        .then((response) => {
            console.log('게시물 삭제 성공')
            navigate('/community'); //삭제 후 커뮤니티 홈으로 이동
            window.location.reload(); //페이지 새로고침
        })
        .catch((err) => console.log(err));
    } 

    // 삭제 확인 Dialog용
    const handleDeleteDialogOpen = (communityId) => {
      MySwal.fire({
        title: "정말 삭제하시겠습니까?",
        text: "게시물이 완전히 삭제됩니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네, 삭제할래요",
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonText: "아니오, 취소할게요",
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          MySwal.fire({
            title: "삭제되었습니다!",
            text: "게시물이 정상적으로 삭제되었습니다.",
            icon: "success"
          }).then(() =>{
              deleteData(communityId);
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire({
            title: "취소되었습니다",
            text: "게시물 삭제가 취소되었습니다.",
            icon: "error"
          });
        }
      });
    };

    return(
        <div>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '40px'}}>
                <Stack style={{width: "80%"}}>
                    <Typography variant="h4" fontWeight="bold">
                        {detailData.title}
                    </Typography>
                    <Stack direction="row" style={{justifyContent: 'space-between', marginTop:'40px'}}>
                        <div>
                            <span style={{marginRight: '20px'}}>{detailData.createdAt}</span>
                            <Tooltip title="조회수">
                                <VisibilityIcon/>
                            </Tooltip>
                            <span> {detailData.viewCount}</span>
                        </div>
                        <div>
                            <Tooltip title="작성자">
                                <PersonIcon/>
                            </Tooltip>
                             {detailData.memberNickname}
                        </div>
                        
                    </Stack>
                    <hr/>

                    {/* 내용 */}
                    <div style={{ marginTop: '40px' }}>
                        <div
                            style={{
                              width: "60vw",
                              whiteSpace: "normal",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(String(detailData?.content)),
                            }}
                        />

                        <Stack sx={{ marginTop: '40px', justifyContent: "space-between" }}  direction="row" >
                            {/* 해시태그 */}
                            <Stack direction="row">
                                {
                                    detailData.tagList && detailData.tagList.map((tag,index) => (
                                        <Button
                                            key={index}
                                            size="small" 
                                            variant="contained" 
                                            sx={{ height: '2rem', borderRadius: '20px', marginRight: '0.5em'}}
                                        >
                                            #{tag}
                                        </Button>
                                    ))
                                }
                                
                            </Stack>

                            <Stack sx={{justifyContent: "space-between"}} direction="row">
                                <div style={{justifyContent:"center"}}>
                                    {/* 좋아요 */}
                                    {
                                        like ? (
                                            <Tooltip title="좋아요 취소">
                                                <IconButton size='small' onClick={toggleLike}>
                                                    <FavoriteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="좋아요">
                                                <IconButton size='small' onClick={toggleLike} >
                                                    <FavoriteBorderIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )
                                    }
                                    {/* 스크랩 */}
                                    {
                                        bookmark ? (
                                            <Tooltip title="스크랩 취소">
                                                <IconButton size='small' onClick={toggleBookmark}>
                                                    <BookmarkIcon />
                                                </IconButton>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="스크랩">
                                                <IconButton size='small' onClick={toggleBookmark} >
                                                    <BookmarkBorderIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )
                                    }
                                    <Tooltip title="수정">
                                        <IconButton onClick={() => {navigate(`/community/modify/${communityId}` ); 
                                         } } aria-label="수정">
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="삭제">
                                        <IconButton onClick={() => {handleDeleteDialogOpen(communityId); }}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>

                                    {/* 삭제확인 Dialog창 */}
                                    {/* <Dialog open={open}>
                                        <DialogTitle>{"정말 삭제하시겠습니까?"}</DialogTitle>
                                        <DialogActions>
                                          <Button onClick={handleClose}>아니오</Button>
                                          <Button onClick={() => {handleClose(); handleOpenAlert();}} autoFocus>예</Button>
                                        </DialogActions>
                                    </Dialog> */}

                                    {/* 삭제 Alert창 */}
                                    {/* <Backdrop
                                      open={openAlert}
                                      onClick={() =>{handleCloseAlert(); deleteData();}}
                                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                      >
                                      <Alert severity="success" onClose={() => {}}>
                                        삭제되었습니다!
                                      </Alert>
                                    </Backdrop> */}
                                </div>
                            </Stack>
                        </Stack>
                        
                        <hr style={{ marginTop: '20px' }}/>
                    </div>

                    {/* 댓글 */}
                    <CommunityReply detailData={detailData}/>
                </Stack>
            </Container>
        </div>
    )
}


const top100Films = [
    { title: 'Spring Boot', id: 1 },
    { title: 'Vue.js', id: 2 },
    { title: 'React.js', id: 3 },
  ];