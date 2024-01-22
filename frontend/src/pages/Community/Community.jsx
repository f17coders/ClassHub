import {Tooltip, Container, Stack, Button, TextField, Grid, Pagination, Chip} from '@mui/material';
import { useState } from 'react'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TodayIcon from '@mui/icons-material/Today';
import React from 'react';

function Community() {
    const navigate = useNavigate();

    const handleClick = () => {
      console.info('You clicked the Chip.');
    };

    return(
        <div>
            <Container>
              <Stack direction="row" spacing={1} sx={{ margin: 1, padding: 1, mt: 3 }}>
                  <TextField size="small" sx={{width:"90%"}} id="outlined-basic" label="궁금한 질문을 검색해보세요" variant="outlined" />
                  <Button variant="contained">🔍검색</Button>
              </Stack>
              
    
                <Stack useFlexGap flexWrap="wrap" alignItems="center"  justifyContent="flex-start" direction="row" spacing={1} sx={{ margin: 1, padding: 1 }}>
                    <Grid alignItems="center" justifyContent="center" sx={{mr:2}}>태그로 검색하기</Grid>
                    <Stack direction="row" spacing={1}>
                      <TextField size="small" id="outlined-basic" label="# 태그로 검색해보세요" variant="outlined"/>
                      <Button variant="contained">🔍검색</Button>
                    </Stack>

                    {/* 해시태그 */}
                    <Stack direction="row" spacing={1}>
                      <Button size="medium" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#Python</Button>
                      <Button size="medium" variant="outlined" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
                      <Button size="medium" variant="outlined" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#Spring Boot</Button>
                    </Stack>

                </Stack>

                <Stack sx={{ margin: 1, padding: 1 }} justifyContent="space-between" direction="row" >
                  <Stack direction="row" sx={{justifyContent: "flex-end"}}>
                    <Button startIcon={<ExpandMoreIcon/>}>최신순</Button>
                    <Button startIcon={<ExpandMoreIcon/>}>인기순</Button>
                  </Stack>
                  <Button variant="contained" onClick={() => { navigate(`/community/write`);}}>글 작성하기</Button>               
                </Stack>
              
                <hr/>

                {/* 글 목록 */}
                <Stack sx={{ margin: 1, padding: 1 }} gap={1}>

                  {/* 글 목록 한개 */}
                  <div onClick={() => { navigate(`/community/detail`); }}>
                    <h4>비주얼 스튜디오에 파이썬이 안들어갑니다.</h4>
                    <p>다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 
                    고수님들 도와주세요</p>
                    {/* 해시태그 */}
                    <Stack direction="row" spacing={1}>
                        <Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#Python</Button>
                        <Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
                    </Stack>

                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      {/* 작성자, 작성일자 부분 */}
                      <div style={{ display: 'flex' }}>
                        <div style={{marginRight: '1em'}}>
                          <Tooltip title="작성자">
                            <PersonIcon/> 김싸피
                          </Tooltip>
                        </div>
                        <div style={{marginRight: '1em'}}>
                          <Tooltip title="작성일자">
                            <TodayIcon/> 2024.01.12
                          </Tooltip>
                        </div>
                      </div>
                      {/* 좋아요, 댓글, 스크랩 부분 */}
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip title="좋아요">
                              <FavoriteBorderIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip sx={{marginRight: '1rem'}} title="댓글">
                              <ChatBubbleOutlineIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip sx={{marginRight: '1rem'}} title="스크랩">
                              <BookmarkBorderIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          
                        </div>
                      </div>
                    </div>

                    <hr/>
                  </div>

                  {/* 글 목록 한개 */}
                  <div onClick={() => { navigate(`/community/detail`); }}>
                    <h4>비주얼 스튜디오에 파이썬이 안들어갑니다.</h4>
                    <p>다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 
                    고수님들 도와주세요</p>
                    {/* 해시태그 */}
                    <div>
                        <Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#Python</Button>
                        <Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      {/* 작성자, 작성일자 부분 */}
                      <div style={{ display: 'flex' }}>
                        <div style={{marginRight: '1em'}}>
                          <Tooltip title="작성자">
                            <PersonIcon/> 김싸피
                          </Tooltip>
                        </div>
                        <div style={{marginRight: '1em'}}>
                          <Tooltip title="작성일자">
                            <TodayIcon/> 2024.01.12
                          </Tooltip>
                        </div>
                      </div>
                      {/* 좋아요, 댓글, 스크랩 부분 */}
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip title="좋아요">
                              <FavoriteBorderIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip sx={{marginRight: '1rem'}} title="댓글">
                              <ChatBubbleOutlineIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip sx={{marginRight: '1rem'}} title="스크랩">
                              <BookmarkBorderIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          
                        </div>
                      </div>
                    </div>

                    <hr/>
                  </div>

                  {/* 글 목록 한개 */}
                  <div onClick={() => { navigate(`/community/detail`); }}>
                    <h4>비주얼 스튜디오에 파이썬이 안들어갑니다.</h4>
                    <p>다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 
                    고수님들 도와주세요</p>
                    {/* 해시태그 */}
                    <div>
                        <Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#Python</Button>
                        <Button size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}}>#VSCode</Button>
                    </div>

                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      {/* 작성자, 작성일자 부분 */}
                      <div style={{ display: 'flex' }}>
                        <div style={{marginRight: '1em'}}>
                          <Tooltip title="작성자">
                            <PersonIcon/> 김싸피
                          </Tooltip>
                        </div>
                        <div style={{marginRight: '1em'}}>
                          <Tooltip title="작성일자">
                            <TodayIcon/> 2024.01.12
                          </Tooltip>
                        </div>
                      </div>
                      {/* 좋아요, 댓글, 스크랩 부분 */}
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip title="좋아요">
                              <FavoriteBorderIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip sx={{marginRight: '1rem'}} title="댓글">
                              <ChatBubbleOutlineIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <Tooltip sx={{marginRight: '1rem'}} title="스크랩">
                              <BookmarkBorderIcon/> <span>20</span>
                            </Tooltip>
                          </div>
                          
                        </div>
                      </div>
                    </div>

                    <hr/>
                  </div>
                </Stack>

                {/* 페이지네이션 */}
                <Stack spacing={2} alignItems="center">
                  <Pagination count={5} color="primary" />
                </Stack>

            </Container>
        </div>
    )
}

export default Community