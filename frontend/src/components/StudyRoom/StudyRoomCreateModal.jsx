import React from 'react';
import {ToggleButton, Button, Modal, Stack, TextField, Autocomplete, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, createFilterOptions} from '@mui/material';


const filter = createFilterOptions();

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxHeight: '80vh', // 최대 높이
    overflowY: 'auto',  // 수직 스크롤 적용
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function StudyRoomCreateModal({ studyCreate, studyCreateClose }){
    const [value, setValue] = React.useState(null);
    const [selected1, setSelected1] = React.useState(false); //공개 버튼 선택
    const [selected2, setSelected2] = React.useState(false); //비공개 버튼 선택

    return(
        <div>
            <Modal
                open={studyCreate}
                onClose={studyCreateClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
              <Container sx={style} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '40px'}}>
                <Stack style={{width: "80%"}}>
                    <Typography variant="h5" fontWeight="bold" >
                        스터디 만들기
                    </Typography>

                    {/* 제목 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <p>스터디명</p>
                            <p>10자 이내로 작성하세요</p>
                       </div>
                        <TextField
                          required
                          id="outlined-required"
                          label="스터디명을 입력하세요"
                          size='small'
                          sx = {{width: '100%'}}
                        /> 
                    </div>

                    {/* 최대인원 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <p>인원설정</p>
                       </div>
                        <TextField
                          required
                          id="outlined-required"
                          label="최대인원을 설정하세요"
                          size='small'
                          sx = {{width: '100%'}}
                        /> 
                    </div>

                    {/* 설명 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'  }}>
                            <p>설명</p>
                            <p>90자 이내로 작성하세요</p>
                        </div>
                        <TextField
                          required
                          multiline
                          rows={2}
                          id="outlined-required"
                          label="설명을 입력하세요"
                          size='small'
                          sx = {{width: '100%'}}
                        />
                    </div>

                    {/* 해시태그 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <p>해시태그</p>
                            <p >최소 1개, 최대 10개</p>
                        </div>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          size='small'
                          options={top100Films}
                          getOptionLabel={(option) => option.title}
                          // defaultValue={[top100Films[1]]}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="해시태그"
                            />
                          )}
                        />
                    </div>

                    {/* 공개여부 */}
                    <div>
                        <p style={{ marginTop: '20px'}}>공개여부</p>
                        <Stack direction="row" justifyContent="space-around">
                          <ToggleButton
                            color="primary"
                            value="public-room"
                            selected={selected1}
                            onChange={() => {
                              setSelected1(!selected1);
                              setSelected2(false); // 비공개 버튼을 선택해제
                            }}
                            sx={{borderRadius: '20px', width: '45%'}}
                          >
                            공개
                          </ToggleButton>

                          <ToggleButton
                            color="primary"
                            value="private-room"
                            selected={selected2}
                            onChange={() => {
                              setSelected2(!selected2);
                              setSelected1(false); // 공개 버튼을 선택해제
                            }}
                            sx={{borderRadius: '20px', width: '45%'}}
                          >
                            비공개
                          </ToggleButton>

                            {/* <Button sx={{borderRadius: '20px', width: '45%'}} variant="outlined">공개</Button> */}
                            {/* <Button sx={{borderRadius: '20px', width: '45%'}} variant="outlined">비공개</Button> */}
                        </Stack>
                        
                    </div>

                    {/* 목표강의 연결 */}
                    <div>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <p>목표강의 연결</p>
                        </div>
                        
                        <Autocomplete
                            size='small'
                            value={value}
                            onChange={(event, newValue) => {
                              if (typeof newValue === 'string') {
                                setValue({
                                  title: newValue,
                                });
                              } else if (newValue && newValue.inputValue) {
                                // Create a new value from the user input
                                setValue({
                                  title: newValue.inputValue,
                                });
                              } else {
                                setValue(newValue);
                              }
                            }}
                            filterOptions={(options, params) => {
                              const filtered = filter(options, params);
                            
                              const { inputValue } = params;
                              // Suggest the creation of a new value
                              const isExisting = options.some((option) => inputValue === option.title);
                              if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                  inputValue,
                                  title: `Add "${inputValue}"`,
                                });
                              }
                          
                              return filtered;
                            }}
                            selectOnFocus
                            clearOnBlur
                            handleHomeEndKeys
                            id="free-solo-with-text-demo"
                            options={top100Films}
                            getOptionLabel={(option) => {
                              // Value selected with enter, right from the input
                              if (typeof option === 'string') {
                                return option;
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValue) {
                                return option.inputValue;
                              }
                              // Regular option
                              return option.title;
                            }}
                            renderOption={(props, option) => <li {...props}>{option.title}</li>}
                            freeSolo
                            renderInput={(params) => (
                              <TextField {...params} label="목표강의를 연결하세요"/>
                            )}
                        />
                    </div>
                    

                    {/* 등록버튼 */}
                    <Button style={{marginTop: '20px'}} variant="contained">등록</Button>
                </Stack>
              </Container>
            </Modal>
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
    
  ];