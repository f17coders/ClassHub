import React from 'react';
import {ToggleButton, Button, Modal, Stack, TextField, Autocomplete, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, createFilterOptions} from '@mui/material';
import { styled } from '@mui/material/styles';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: '80vh', // 최대 높이
    overflowY: 'auto',  // 수직 스크롤 적용
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const enterButton = {
    '&:hover': {
      backgroundColor: "green",
    },
    marginTop: '20px', 
    borderRadius: '20px', 
    width: '45%'
  }
  const closeButton = {
    '&:hover': {
      backgroundColor: "red",
    },
    marginTop: '20px', 
    borderRadius: '20px', 
    width: '45%'
  }

//스터디룸 입장 모달
export default function StudyRoomEnterCodeModal({ studyEnter, studyEnterClose }){

    const [value, setValue] = React.useState(null);

    return(
        <div>
            <Modal
                open={studyEnter}
                onClose={studyEnterClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Container sx={style} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '40px'}}>
                <Stack style={{width: "80%"}}>
                    <Typography variant="h5" fontWeight="bold" >
                        스터디 입장하기
                    </Typography>

                    {/* 참여코드 */}
                    <div>
                        <TextField
                          required
                          id="outlined-required"
                          label="참여코드를 입력하세요"
                          size='small'
                          sx = {{width: '100%', marginTop: '20px' }}
                        /> 
                    </div>

                    <Stack direction="row" justifyContent="space-around">
                        {/* 취소버튼 */}
                        <Button variant="contained" sx={closeButton} onClick={studyEnterClose}>취소</Button>
                        {/* 입장버튼 */}
                        <Button variant="contained" sx={enterButton}>입장</Button>
                    </Stack>
                    
                </Stack>
            </Container>
            </Modal>
        </div>
    )
}