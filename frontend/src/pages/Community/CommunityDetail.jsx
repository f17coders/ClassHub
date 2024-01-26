import {Tooltip, Autocomplete, Typography, Stack, Container, Button, TextField, Grid, Pagination, FormGroup, FormControlLabel, Checkbox, FormControl} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import React, { useRef, useEffect, useState } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import {Routes, Route, Link, useNavigate, Outlet, useParams} from 'react-router-dom'
import CommunityReply from '../../components/Community/CommunityReply';
import axios from 'axios';

export default function CommunityDetail(){
    const navigate = useNavigate();

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

    // const typographyRef = useRef(null);

    // useEffect(() => {
    //   // 페이지 로드 후 Typography의 높이를 계산하여 설정
    //   if (typographyRef.current) {
    //     const height = typographyRef.current.clientHeight;
    //     // 여기에서 계산된 높이를 사용하여 필요한 작업 수행
    //     console.log('Typography의 높이:', height);
    //   }
    // }, []);


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
                        <Typography 
                        // ref={typographyRef} 
                        variant='body1' 
                        sx={{ whiteSpace: 'pre-line'}}
                        >
                            {detailData.content}
                        </Typography>

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
                                    <Tooltip title="좋아요">
                                        <IconButton aria-label="좋아요">
                                            <FavoriteBorderIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="스크랩">
                                        <IconButton aria-label="스크랩">
                                            <BookmarkBorderIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="수정">
                                        <IconButton onClick={() => {navigate(`/community/modify`);}} aria-label="수정">
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="삭제">
                                        <IconButton aria-label="삭제">
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    
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
    { title: 'Spring Boot' },
    { title: 'Vue.js' },
    { title: 'React.js' },
    { title: 'VSCode' },
    { title: 'IntelliJ' },
    { title: 'Git' },
    { title: 'Spring Boot' },
    { title: 'Vue.js' },
    { title: 'React.js' },
    { title: 'VSCode' },
    { title: 'IntelliJ' },
    { title: 'Git' },
    { title: 'Spring Boot' },
    { title: 'Vue.js' },
    { title: 'React.js' },
    { title: 'VSCode' },
    { title: 'IntelliJ' },
    { title: 'Git' },
    { title: 'Spring Boot' },
    { title: 'Vue.js' },
    { title: 'React.js' },
    { title: 'VSCode' },
    { title: 'IntelliJ' },
    { title: 'Git' },
    { title: 'Spring Boot' },
    { title: 'Vue.js' },
    { title: 'React.js' },
    { title: 'VSCode' },
    { title: 'IntelliJ' },
    { title: 'Git' },
  ];