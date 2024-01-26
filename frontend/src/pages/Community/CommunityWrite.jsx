import {Stack, Container, Button, Typography, TextField, Autocomplete } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function CommunityWrite(){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagList, setTagList] = useState([]);


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
                        <TextField
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          id="outlined-required"
                          label="제목을 입력하세요"
                          sx = {{width: '100%'}}
                        /> 
                    </div>

                    {/* 내용 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'  }}>
                            <p>내용</p>
                            <p>제한없음</p>
                        </div>
                        <TextField
                          required
                          multiline
                          rows={4}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          id="outlined-required"
                          label="내용을 입력하세요"
                          sx = {{width: '100%'}}
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
                          value={tagList.title}
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
                    <Button onClick={CommunityPost} style={{marginTop: '20px'}} variant="contained">등록</Button>
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