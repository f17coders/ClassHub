import {Backdrop, Alert, Stack, Container, Button, Typography, TextField, Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Routes, Route, Link, useNavigate, Outlet, useParams, useLocation } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useSelector } from "react-redux"


export default function CommunityModify(){
  const MySwal = withReactContent(Swal);
  // 토큰
	let accessToken = useSelector((state) => state.accessToken)

  const [title, setTitle] = useState(''); //제목
  const [content, setContent] = useState(''); //내용
  const [tagList, setTagList] = useState([]); //해시태그
  const [tagListFromAPI, setTagListFromAPI] = useState([]); //API에서 가져온 스터디 태그 저장

  // 태그 리스트 가져오기
  useEffect(() => {
    axios.get(`https://i10a810.p.ssafy.io/api/tags/v0/communities`)
    .then((response)=> {
        console.log(response.data.result.tagList)
        setTagListFromAPI(response.data.result.tagList)
    })
    .catch((err) => console.log(err))
  }, [])

  // 유효성 검사 변수
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
  const [tagListError, setTagListError] = useState(false);


  // 제목 유효성 검사
  const handleTitleCheck = (event) => {
    const input = event.target.value;
    setTitle(input);

    //최대 30자까지만 입력 가능하도록 검사
    if(input.length > 30){
      setTitleError(true);
    } else{
      setTitleError(false);
    }
  }

  // 내용 유효성 검사
  const handleContentCheck = (event) => {
    const input = event.target.value;
    setContent(input);

    if( input.length === 0){
      setContentError(true);
    } else{
      setContentError(false);
    }
  }

  // 태그 유효성 검사
  const handleTagListCheck = (event, newValue) => {
    //newValue는 선택된 옵션을 나타냄
    const selectedTags = newValue.map((option) => option.tagId);
    console.log(selectedTags)
    //최대 10개 까지만 입력 가능하도록 검사
    if(selectedTags.length > 10){
      setTagListError(true);
    } else{
      setTagListError(false);
      //선택된 태그들을 state에 설정
      setTagList(selectedTags);
    }
  }


  // 모든 유효성 검사 결과 확인
  const hasErrors = titleError || contentError || tagListError || 
    title === '' || content === '' ||  tagList.length === 0;

  const navigate = useNavigate();

  const [detailData, setDetailData] = useState([]); //받아온 데이터 저장할 배열
  const { communityId } = useParams();
  useEffect(() => {
      axios.get(`https://i10a810.p.ssafy.io/api/communities/v0/details/${communityId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          // 받아온 데이터를 필요에 맞게 처리합니다.
          setDetailData(response.data.result);
          console.log(response.data.result)
        })
        .catch((err) => console.log(err));
    }, [communityId]);

  // 글 수정
  const CommunityPatch = () => {
  // const concatenatedTag = tagList.map(tag => tag.title).join(',');
  axios.patch(`https://i10a810.p.ssafy.io/api/communities/v1/${communityId}`,{
    "title": title,
    "content": content,
    "tagList": tagList
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  .then(()=> {
    console.log('게시물 수정완료')
    console.log('communityId' + communityId)
    console.log(title)
    console.log(content)
    navigate('/community') //글 등록 후 커뮤니티 페이지로 이
  })
  .catch((err) => console.log(err))
  };

  //수정 확인 Dialog용
  const handleCreateDialogOpen = () =>{
    MySwal.fire({
      title: "수정되었습니다!",
      text: "게시물이 정상적으로 수정되었습니다.",
      icon: "success"
    }).then(() =>{
      CommunityPatch();
      }
    )
  }
    return(
        <div>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '40px'}}>
                <Stack style={{width: "80%"}}>
                    <Typography variant="h4" fontWeight="bold">
                        글 수정하기
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
                            placeholder={detailData.title}
                            value={title}
                            onChange={handleTitleCheck}
                            id="outlined-error-helper-text"
                            helperText="30자 이내로 입력하세요"
                            sx = {{width: '100%'}}
                          /> 
                        ):(
                          <TextField
                            required
                            placeholder={detailData.title}
                            value={title}
                            onChange={handleTitleCheck}
                            id="outlined-required"
                            // label="제목을 입력하세요"
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
                            placeholder = {"수정할 내용을 입력하세요*"}
                            />
                    </div>

                    {/* 해시태그 */}
                    <div style={{ marginTop: '20px' }}>
                        <p>해시태그</p>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={tagListFromAPI}
                          getOptionLabel={(option) => option.name}
                          // value={tagList}
                          onChange={handleTagListCheck}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="해시태그"
                            />
                          )}
                        />
                    </div>

                    <Button 
                      onClick={handleCreateDialogOpen} 
                      style={{marginTop: '20px'}} variant="contained"
                      disabled={hasErrors}>수정</Button>
                </Stack>
            </Container>
        </div>
    )
}