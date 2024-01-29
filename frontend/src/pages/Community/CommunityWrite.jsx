import {Alert, Backdrop, Stack, Container, Button, Typography, TextField, Autocomplete } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import {Routes, Route, Link, useNavigate, Outlet, useParams} from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CommunityWrite(){
  const [title, setTitle] = useState(''); //제목
  const [content, setContent] = useState(''); //내용
  const [tagList, setTagList] = useState([]);

  // 유효성 검사 변수
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  // 제목 유효성 검사
  const handleTitleCheck = (event) => {
    const input = event.target.value;
    setTitle(input);

    //최대 30자까지만 입력 가능하도록 검사
    if(input.length > 30 || input.length === 0){
      setTitleError(true);
    } else{
      setTitleError(false);
    }
  }

  // 내용 유효성 검사
  const handleContentCheck = (event) => {
    const input = event.target.value;
    setContent(input);

    //최대 30자까지만 입력 가능하도록 검사
    if( input.length === 0){
      setContentError(true);
    } else{
      setContentError(false);
    }
  }

  // 모든 유효성 검사 결과 확인
  const hasErrors = titleError || contentError || tagList.length === 0

  // 오류 alert창 용
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const handleCloseErrorAlert = () => {
    setOpenErrorAlert(false);
  };
  const handleOpenErrorAlert = () => {
    setOpenErrorAlert(true);
  };

  // 등록 alert창 용
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const navigate = useNavigate();

    // 글 등록
    const CommunityPost = () => {
    const concatenatedTag = tagList.map(tag => tag.title).join(',');

      axios.post(`http://i10a810.p.ssafy.io:4000/communities/v1`,{
        "title": title,
        "content": content,
        "tagList": concatenatedTag
      })
      .then(()=> {
        console.log('게시물 등록완료')
        console.log(concatenatedTag)
        navigate('/community') //글 등록 후 커뮤니티 페이지로 이동

      })
      .catch((err) => console.log(err))
    };

    return(
        <div>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '40px'}}>
                <Stack style={{width: "80%"}}>
                    <Typography variant="h4" fontWeight="bold">
                        글 작성하기
                    </Typography>

                    {/* 제목 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <p>제목</p>
                            <p >30자 이내로 작성하세요</p>
                       </div>
                       {
                        titleError?(
                          <TextField
                            error
                            value={title}
                            onChange={handleTitleCheck}
                            id="outlined-error-helper-text"
                            helperText="30자 이내로 입력하세요"
                            sx = {{width: '100%'}}
                          /> 
                        ):(
                          <TextField
                            required
                            value={title}
                            onChange={handleTitleCheck}
                            id="outlined-required"
                            label="제목을 입력하세요"
                            sx = {{width: '100%'}}
                          /> 
                        )
                       }
                        
                    </div>

                    {/* 내용 */}
                    <div style={{height: '400px'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'  }}>
                            <p>내용</p>
                            <p>제한없음</p>
                        </div>
                          <ReactQuill 
                            style={{height: '300px'}}
                            theme="snow" 
                            value={content} 
                            onChange={setContent} 
                            placeholder = "내용을 입력하세요*"
                            />
                    </div>

                    {/* 해시태그 */}
                    <div style={{ marginTop: '20px' }}>
                        <p>해시태그</p>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          value={tagList}
                          onChange={(event, newValue) => setTagList(newValue)}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="해시태그"
                            />
                          )}
                        />
                    </div>
                      <Button onClick={() =>{
                        // 유효성 검사 에러가 있을 경우
                        if (hasErrors) {
                          handleOpenErrorAlert();
                        } 
                        // 모든 유효성 검사에서 에러가 없을 경우
                        else {
                          handleOpenAlert()
                        }
                      }} 
                      style={{marginTop: '20px'}} 
                      variant="contained"
                      disabled={hasErrors}
                      >등록</Button>
                    
                    {/* 등록 Alert창 */}
                    <Backdrop
                      open={openAlert}
                      onClick={() =>{handleCloseAlert(); CommunityPost();}}
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      >
                      <Alert severity="success" onClose={() => {}}>
                        등록되었습니다!
                      </Alert>
                    </Backdrop>
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