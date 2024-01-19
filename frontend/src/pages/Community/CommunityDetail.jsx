import {Tooltip, Autocomplete, Typography, Stack, Container, Button, TextField, Grid, Pagination, FormGroup, FormControlLabel, Checkbox, FormControl} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatIcon from '@mui/icons-material/Chat';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import React, { useRef, useEffect } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';


export default function CommunityDetail(){

    const typographyRef = useRef(null);
    const text = `제가 비쥬얼 스튜디오에 파이썬 넣을라고 하거든요?
                            
    다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데
    이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 

    고수님들 Help me...
    `

    useEffect(() => {
      // 페이지 로드 후 Typography의 높이를 계산하여 설정
      if (typographyRef.current) {
        const height = typographyRef.current.clientHeight;
        // 여기에서 계산된 높이를 사용하여 필요한 작업 수행
        console.log('Typography의 높이:', height);
      }
    }, []);


    return(
        <div>
            
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '40px'}}>
                <Stack style={{width: "80%"}}>
                    <Typography variant="h4" fontWeight="bold">
                        비쥬얼 스튜디오에 파이썬이 안들어갑니다.
                    </Typography>
                    <Stack direction="row" style={{justifyContent: 'space-between', marginTop:'40px'}}>
                        <div>
                            <span style={{marginRight: '20px'}}>2024.01.19</span>
                            <Tooltip title="조회수">
                                <span><VisibilityIcon/> 6</span>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip title="작성자">
                                <PersonIcon/> 김싸피
                            </Tooltip>
                        </div>
                        
                    </Stack>
                    <hr/>

                    {/* 내용 */}
                    <div style={{ marginTop: '40px' }}>
                        <Typography ref={typographyRef} variant='body1' sx={{ whiteSpace: 'pre-line'}}>
                            {text}
                        </Typography>

                        <Stack style={{ marginTop: '40px' }} justifyContent="space-between" direction="row" >
                            {/* 해시태그 */}
                            <Stack direction="row">
                                <Button size="small" variant="contained" sx={{ height: '2rem', borderRadius: '20px', marginRight: '0.5em'}}>#Python</Button>
                                <Button size="small" variant="contained" sx={{ height: '2rem', borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
                            </Stack>

                            <Stack justifyContent="space-between" direction="row">
                                <div justifyContent="center">
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
                                    
                                </div>

                                <div justifyContent="center">
                                    <Button size="small">수정</Button>
                                    <Button size="small" style={{color: 'red'}}>삭제</Button>
                                </div>
                            </Stack>
                        </Stack>
                        
                        

                        <hr style={{ marginTop: '20px' }}/>
                    </div>

                    {/* 댓글 */}
                    <div>
                        <ChatIcon/> 댓글 2
                    </div>

                    {/* 댓글 입력창 */}
                    <div style={{ marginTop: '20px'}}>
                        <form noValidate autoComplete="off">
                          <FormControl size="small" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <OutlinedInput sx={{width: "100%", marginRight: '10px'}} placeholder="댓글을 입력하세요" />
                            <Button variant="contained">등록</Button>
                          </FormControl>
                        </form>
                    </div>

                    {/* 댓글 한 개 */}

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