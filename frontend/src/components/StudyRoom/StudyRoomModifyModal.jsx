import React, { useState, useEffect } from 'react';
import { Alert, Backdrop,  ToggleButton, Button, Modal, Stack, TextField, Autocomplete, Box, Typography, Container, createFilterOptions} from '@mui/material';
import axios from 'axios';

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

export default function StudyRoomModifyModal({ studyModify, studyModifyClose, onModifySuccess }){
    const [value, setValue] = React.useState(null);
    const [selected1, setSelected1] = React.useState(true); //공개 버튼 선택
    const [selected2, setSelected2] = React.useState(false); //비공개 버튼 선택
    
    // const [studyId, setStudyId] = useState(0); //스터디 ID

    const [studyName, setStudyName] = useState(''); //스터디명
    const [studyPersonnel, setStudyPersonnel] = useState(10); //스터디 정원
    const [studyDescription, setStudyDescription] = useState(''); //스터디 설명
    const [studyTag, setStudyTag] = useState([]); //스터디 태그

    // const [studyPublic, setStudyPublic] = useState(true); //스터디 공개여부
    // const [studyMember, setStudyMember] = useState([]); //스터디 참여멤버

    // 유효성 검사 변수
    const [studyNameError, setStudyNameError] = useState(false);
    const [studyPersonnelError, setStudyPersonnelError] = useState(false);
    const [studyDescriptionError, setStudyDescriptionError] = useState(false);
    const [studyTagError, setStudyTagError] = useState(false);

    // 스터디룸 수정 함수
    const modifyStudyRoom = function() {
      axios.patch('http://i10a810.p.ssafy.io:4000/studies/v1',{
        'studyId': studyId,
        'title' : studyName,
        'capacity' : studyPersonnel,
        'lectureId': 1,
        'isPublic' : studyPublic,
        'description' : studyDescription,
        'tagList' : ['...studyTag'],
        'studyMember' : ['...studyMember']
      })
      .then((res) => {
        console.log(res)
        onRegisterSuccess()
      })
      .catch((err) => console.log(err))
    }
    
    // 스터디명 유효성 검사
    const handleStudyNameCheck = (event) => {
      const input = event.target.value;
      setStudyName(input);

      //최대 10자까지만 입력 가능하도록 검사
      if(input.length > 10 || input.length === 0){
        setStudyNameError(true);
      } else{
        setStudyNameError(false);
      }
    }

    // 스터디 정원 유효성 검사
    const handleStudyPersonnelCheck = (event) => {
      const input = event.target.value;
      setStudyPersonnel(input);

      //최소 1명, 최대 10명
      if(input < 1 || input > 10){
        setStudyPersonnelError(true);
      } else{
        setStudyPersonnelError(false);
      }
    }

    // 스터디 설명 유효성 검사
    const handleStudyDescriptionCheck = (event) => {
      const input = event.target.value;
      setStudyDescription(input);

      //최대 90자까지만 입력 가능하도록 검사
      if(input.length > 90){
        setStudyDescriptionError(true);
      } else{
        setStudyDescriptionError(false);
      }
    }

    // 스터디 태그 유효성 검사
    const handleStudyTagCheck = (event, newValue) => {
      //newValue는 선택된 옵션을 나타냄
      const selectedTags = newValue.map((option) => option.title);

      //최대 10개 까지만 입력 가능하도록 검사
      if(selectedTags.length > 10){
        setStudyTagError(true);
      } else{
        setStudyTagError(false);
        //선택된 태그들을 state에 설정
        setStudyTag(selectedTags);
      }
    }

    // 오류 alert창 용
	  const [openErrorAlert, setOpenErrorAlert] = React.useState(false);
    const handleCloseErrorAlert = () => {
      setOpenErrorAlert(false);
    };
    const handleOpenErrorAlert = () => {
      setOpenErrorAlert(true);
    };
    
    useEffect(() => {
      // 모달이 열릴 때 값 초기화
      if (studyCreate) {
        setValue(null);
        setSelected1(true);
        setSelected2(false);
        setStudyName('');
        setStudyPersonnel(10);
        setStudyDescription('');
        setStudyTag([]);
        setStudyNameError(false);
        setStudyPersonnelError(false);
        setStudyDescriptionError(false);
        setStudyTagError(false);
      }
    }, [studyCreate]);

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
                        스터디 수정
                    </Typography>

                    {/* 제목 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <p>스터디명</p>
                            <p>10자 이내</p>
                       </div>
                        
                        {
                          studyNameError ? (
                            <TextField
                              error
                              id="outlined-error-helper-text"
                              size='small'
                              sx = {{width: '100%'}}
                              helperText="10자 이내로 입력하세요"
                              value={studyName}
                              onChange={handleStudyNameCheck}
                            />
                          ) : (
                            <TextField
                              required
                              id="outlined-required"
                              placeholder="스터디명을 입력하세요*"
                              size='small'
                              sx = {{width: '100%'}}
                              value={studyName}
                              onChange={handleStudyNameCheck}
                            />
                          )
                        }
                    </div>

                    {/* 최대인원 */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                        <p>인원설정</p>
                        <p>최소 1명, 최대 10명</p>
                      </div>
                      {
                        studyPersonnelError ?(
                          <TextField
                            error
                            id="outlined-error-helper-text"
                            size='small'
                            type='number'
                            sx = {{width: '100%'}}
                            helperText="정확한 인원수를 설정하세요"
                            value={studyPersonnel}
                            onChange={handleStudyPersonnelCheck}
                            />
                        ) : (
                          <TextField
                            required
                            id="outlined-required"
                            placeholder="최대인원을 설정하세요*"
                            type='number'
                            size='small'
                            sx = {{width: '100%'}}
                            value={studyPersonnel}
                            onChange={handleStudyPersonnelCheck}
                          /> 
                        )
                      }
                        
                    </div>

                    {/* 설명 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px'  }}>
                            <p>설명</p>
                            <p>90자 이내</p>
                        </div>
                        {
                          studyDescriptionError ? (
                            <TextField
                              error
                              multiline
                              rows={3}
                              id="outlined-error-helper-text"
                              size='small'
                              sx = {{width: '100%'}}
                              helperText="90자 이내로 입력하세요"
                              value={studyDescription}
                              onChange={handleStudyDescriptionCheck}
                            />
                          ) : (
                            <TextField
                              required
                              multiline
                              rows={3}
                              id="outlined-required"
                              placeholder="설명을 입력하세요*"
                              size='small'
                              sx = {{width: '100%'}}
                              value={studyDescription}
                              onChange={handleStudyDescriptionCheck}
                            />
                          )
                        }
                        
                    </div>

                    {/* 해시태그 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <p>해시태그</p>
                            <p >최소 1개, 최대 10개</p>
                        </div>
                        {
                          studyTagError ? (
                          <Autocomplete
                            required
                            multiple
                            id="tags-outlined"
                            size='small'
                            options={top100Films}
                            value={studyTag.map((tag) => ({title: tag}))}
                            onChange={handleStudyTagCheck}
                            getOptionLabel={(option) => option.title}
                            filterSelectedOptions
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error
                                helperText="태그는 최대 10개까지 가능합니다"
                                placeholder="해시태그"
                              />
                            )}
                          />
                          ) : (
                          <Autocomplete
                            required
                            multiple
                            id="tags-outlined"
                            size='small'
                            options={top100Films}
                            value={studyTag.map((tag) => ({title: tag}))}
                            onChange={handleStudyTagCheck}
                            getOptionLabel={(option) => option.title}
                            filterSelectedOptions
                            isOptionEqualToValue={(option, value) => option.title === value.title}
                            renderInput={(value) => (
                              <TextField
                                {...value}
                                placeholder="해시태그"
                              />
                            )}
                          />
                          )
                        }
                        
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
                            sx={{borderRadius: '30px', width: '45%'}}
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
                        </Stack>
                    </div>

                    {/* 목표강의 연결 */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <p>목표강의 연결</p>
                            <p>선택</p>
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
                              <TextField {...params} placeholder="목표강의를 연결하세요"/>
                            )}
                        />
                    </div>

                    {/* 등록버튼 */}
                    <Button style={{marginTop: '20px'}} variant="contained" onClick={() => { 

                      // 모든 유효성 검사 결과 확인
                      const hasErrors = studyNameError || studyPersonnelError || studyDescriptionError || studyTagError
                        || studyName.length === 0 || studyDescription.length === 0 || studyTag.length === 0 
                        || (selected1 === false && selected2 === false)

                      // 유효성 검사 에러가 있을 경우
                      if (hasErrors) {
                        handleOpenErrorAlert();
                      } 
                      // 모든 유효성 검사에서 에러가 없을 경우
                      else {
                        createStudyRoom()
                        // onRegisterSuccess(); // 부모 컴포넌트에 등록 성공을 알림
                      }
                    }}>등록</Button>

                    
                </Stack>
                  {/* 에러 Alert창 */}
                  <Backdrop
                      open={openErrorAlert}
                      onClick={handleCloseErrorAlert}
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      >
                      <Alert severity="warning" onClose={() => {}}>
                        입력값을 확인하세요!
                      </Alert>
                  </Backdrop>
                
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