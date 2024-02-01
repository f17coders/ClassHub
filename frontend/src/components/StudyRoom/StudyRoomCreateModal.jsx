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

export default function StudyRoomCreateModal({ studyCreate, studyCreateClose, onRegisterSuccess }){
    const [value, setValue] = React.useState(null);
    const [selected1, setSelected1] = React.useState(true); //공개 버튼 선택
    const [selected2, setSelected2] = React.useState(false); //비공개 버튼 선택
    // 상위 컴포넌트에서 선택된 목표 강의를 관리하기 위한 상태 추가
    const [selectedLecture, setSelectedLecture] = useState(null);
    
    const [title, setTitle] = useState(''); //스터디명
    const [capacity, setCapacity] = useState(10); //스터디 정원
    const [lectureId, setLectureId] = useState(0); //목표 강의ID
    const [isPublic, setIsPublic] = useState(true); //공개여부
    const [description, setDescription] = useState(''); //스터디 설명
    const [tagList, setTagList] = useState([]); //스터디 태그
    const [tagListFromAPI, setTagListFromAPI] = useState([]); //API에서 가져온 스터디 태그 저장
    const [lectureFromAPI, setLectureFromAPI] = useState([]); //API에서 가져온 목표강의 리스트 저장

    // 유효성 검사 변수
    const [titleError, setTitleError] = useState(false);
    const [capacityError, setCapacityError] = useState(false);
    const [lectureIdError, setLectureIdError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [tagListError, setTagListError] = useState(false);

    // 생성 함수
    const createStudyRoom = function() {
      console.log(lectureId)
      axios.post('https://i10a810.p.ssafy.io/api/studies/v1',
      {
        "title": title,
        "capacity": capacity,
        "isPublic": isPublic,
        "description": description,
        "tagList": tagList,
        "lectureId": lectureId
      }, {
        headers: {
          AUTHORIZATION : 9
        }
      })
      .then((res) => {
        console.log(res)
        onRegisterSuccess()
        // window.location.reload(); //페이지 새로고침
      })
      .catch((err) => console.log(err))
    }

    // 태그 리스트 가져오기
	  useEffect(() => {
      if(studyCreate){
        axios.get(`https://i10a810.p.ssafy.io/api/tags/v0/lectures`)
        .then((response)=> {
            console.log(response.data.result.tagList)
            setTagListFromAPI(response.data.result.tagList)
        })
        .catch((err) => console.log(err))
      }
    }, [studyCreate])

    // 목표강의 리스트 가져오기
	  useEffect(() => {
      if(studyCreate){
        axios.get(`https://i10a810.p.ssafy.io/api/lectures/v0?category&tags&keyword&level&site&order&page=0&size=16&sort=string`)
        .then((response)=> {
            console.log(response.data.result.lectureList)
            setLectureFromAPI(response.data.result.lectureList)
        })
        .catch((err) => console.log(err))
      }
    }, [studyCreate])
    
    // 스터디명 유효성 검사
    const handleTitleCheck = (event) => {
      const input = event.target.value;
      setTitle(input);

      //최대 10자까지만 입력 가능하도록 검사
      if(input.length > 10 || input.length === 0){
        setTitleError(true);
      } else{
        setTitleError(false);
      }
    }

    // 스터디 정원 유효성 검사
    const handleCapacityCheck = (event) => {
      const input = event.target.value;
      setCapacity(input);

      //최소 1명, 최대 10명
      if(input < 1 || input > 10){
        setCapacityError(true);
      } else{
        setCapacityError(false);
      }
    }

    // 스터디 설명 유효성 검사
    const handleDescriptionCheck = (event) => {
      const input = event.target.value;
      setDescription(input);

      //최대 90자까지만 입력 가능하도록 검사
      if(input.length > 90){
        setDescriptionError(true);
      } else{
        setDescriptionError(false);
      }
    }

    // 스터디 태그 유효성 검사
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

    
    // 스터디 목표강의 유효성 검사
    const handleLectureIdCheck = (event, newLecture) => {
      //newValue는 선택된 옵션을 나타냄
      const selectedLecture = newLecture.lectureId;
      console.log(selectedLecture)

      if(selectedLecture.length === 0){
        setLectureIdError(true);
      } else{
        setLectureIdError(false);
        setLectureId(selectedLecture);
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
        setTitle('');
        setCapacity(10);
        setDescription('');
        setTagList([]);
        setTitleError(false);
        setCapacityError(false);
        setDescriptionError(false);
        setTagListError(false);
        setLectureIdError(false);
      }
    }, [studyCreate]);

    // 모든 유효성 검사 결과 확인
    const hasErrors = titleError || capacityError || descriptionError || tagListError || lectureIdError
    || title.length === 0 || description.length === 0 || tagList.length === 0 
    || (selected1 === false && selected2 === false)
    
    return(
        <div>
            <Modal
                open={studyCreate}
                onClose={studyCreateClose}
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
                            <p>10자 이내</p>
                       </div>
                        
                        {
                          titleError ? (
                            <TextField
                              error
                              id="outlined-error-helper-text"
                              size='small'
                              sx = {{width: '100%'}}
                              helperText="10자 이내로 입력하세요"
                              value={title}
                              onChange={handleTitleCheck}
                            />
                          ) : (
                            <TextField
                              required
                              id="outlined-required"
                              placeholder="스터디명을 입력하세요*"
                              size='small'
                              sx = {{width: '100%'}}
                              value={title}
                              onChange={handleTitleCheck}
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
                        capacityError ?(
                          <TextField
                            error
                            id="outlined-error-helper-text"
                            size='small'
                            type='number'
                            sx = {{width: '100%'}}
                            helperText="정확한 인원수를 설정하세요"
                            value={capacity}
                            onChange={handleCapacityCheck}
                            />
                        ) : (
                          <TextField
                            required
                            id="outlined-required"
                            placeholder="최대인원을 설정하세요*"
                            type='number'
                            size='small'
                            sx = {{width: '100%'}}
                            value={capacity}
                            onChange={handleCapacityCheck}
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
                          descriptionError ? (
                            <TextField
                              error
                              multiline
                              rows={3}
                              id="outlined-error-helper-text"
                              size='small'
                              sx = {{width: '100%'}}
                              helperText="90자 이내로 입력하세요"
                              value={description}
                              onChange={handleDescriptionCheck}
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
                              value={description}
                              onChange={handleDescriptionCheck}
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
                          tagListError ? (
                          <Autocomplete
                            required
                            multiple
                            id="tags-outlined"
                            size='small'
                            options={tagListFromAPI}
                            onChange={handleTagListCheck}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
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
                            options={tagListFromAPI}
                            onChange={handleTagListCheck}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
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
                              setIsPublic(true);
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
                              setIsPublic(false);
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
                            <p>필수</p>
                        </div>
                        
                          <Autocomplete
                            size='small'
                            value={selectedLecture}
                            onChange={(event, newLecture) => {
                              setSelectedLecture(newLecture);
                              handleLectureIdCheck(event, newLecture);
                            }}
                            options={lectureFromAPI}
                            getOptionKey={(option) => option.lectureId}
                            getOptionLabel={(option) => option.lectureName}
                            filterSelectedOptions
                            renderInput={(value) => (
                              <TextField
                                {...value}
                                placeholder="목표강의를 연결하세요"
                              />
                            )}
                            freeSolo
                          />
                          
                        
                        
                    </div>

                    {/* 등록버튼 */}
                    <Button style={{marginTop: '20px'}} variant="contained" onClick={() => { 
                      // 유효성 검사 에러가 있을 경우
                      if (hasErrors) {
                        handleOpenErrorAlert();
                      } 
                      // 모든 유효성 검사에서 에러가 없을 경우
                      else {
                        createStudyRoom()
                        // onRegisterSuccess(); // 부모 컴포넌트에 등록 성공을 알림
                      }
                    }}
                    disabled={hasErrors}
                    >등록</Button>

                    
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



