import { Container, Row } from "react-bootstrap";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

export default function CommunityWrite(){

    return(
        <div>
            <Container className="p-4">
                <h1>글 작성</h1>
                <Container className="mb-4" style={{width: '80%'}}>
                    <Row className="justify-content-start mb-4">
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p>제목</p>
                                <p >30자 이내로 작성하세요</p>
                           </div>
                            <TextField
                              required
                              id="outlined-required"
                              label="제목을 입력하세요"
                              sx = {{width: '100%'}}
                            /> 
                        </div>
                    </Row>

                    <Row className="justify-content-start mb-4">
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p>내용</p>
                                <p>제한없음</p>
                            </div>
                            <TextField
                              required
                              multiline
                              rows={4}
                              id="outlined-required"
                              label="내용을 입력하세요"
                              sx = {{width: '100%'}}
                            />
                        </div>
                    </Row>

                    <Row className="justify-content-start mb-4">
                        <p>해시태그</p>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          defaultValue={[top100Films[1]]}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="해시태그"
                            />
                          )}
                        />
                    </Row>

                    <Button variant="contained">등록</Button>
                </Container>
                
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