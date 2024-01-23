import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import {TextField, Button, Stack, Box,List,ListItemButton,Grid,Typography,Divider, Paper} from '@mui/material'


function generate(element) {
    return [0, 1, 2, 3, 4, 5,6 ,7].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

// 참여중인 스터디 상세 페이지
export default function StudyRoomParticipating(){
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };

    return(
        <Box sx={{ display: 'flex' }}>
        <List sx={{ maxWidth: 128, width: "100%"}} component="nav">
          <Typography sx={{display: 'flex', justifyContent: 'center', alignContent:'center', p:1}} variant='h6' fontWeight='bold'>
            자바의 신이 될거야
          </Typography>
          <ListItemButton
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              공지사항
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            학습인증
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            잡담방
          </ListItemButton>
        </List>
        <Divider />

        <Grid container sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start',height: '100vh' }}>

          <Grid item sx={{width: '90%'}} >
            {/* 검색기능 */}
            <Stack direction="row" spacing={1} margin={1} padding={1}>
              <TextField size="small" sx={{width:"70%"}} id="outlined-basic" label="원하는 스터디를 검색해보세요!" variant="outlined" />
              <Button variant="contained" >검색</Button>
              <Button variant="contained" color="success" sx={{width:"20%"}}>스터디 만들기</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    )
}