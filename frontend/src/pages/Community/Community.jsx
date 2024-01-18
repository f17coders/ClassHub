import {Container, Stack, Button, ToggleButton, ToggleButtonGroup, TextField, Grid, Pagination} from '@mui/material';
import { useState } from 'react'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import TodayIcon from '@mui/icons-material/Today';
import React from 'react';

function Community() {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const [formats, setFormats] = useState(() => ['bold', 'italic']);

    const handleFormat = (event, newFormats) => {
      setFormats(newFormats);
    };

    return(
        <div>
            <Container>
              <Stack direction="row" spacing={2} sx={{ margin: 1, padding: 1 }}>
                  <TextField sx={{width:"90%"}} id="outlined-basic" label="궁금한 질문을 검색해보세요" variant="outlined" />
                  <Button variant="contained" sx={{width:"10%"}}>🔍검색</Button>
              </Stack>
              
    
                <Stack justifyContent="space-around" direction="row" spacing={2} sx={{ margin: 1, padding: 1 }}>
                    <Grid alignItems="center" justifyContent="center">태그로 검색하기</Grid>
                    <Grid>
                      <TextField id="outlined-basic" label="# 태그로 검색해보세요" variant="outlined"/>
                      <Button variant="contained">🔍검색</Button>
                    </Grid>
                    
              
                      <ToggleButtonGroup
                        value={formats}
                        onChange={handleFormat}
                        aria-label="text formatting"
                      >
                        <ToggleButton value="bold" aria-label="bold">
                          Vue.js
                        </ToggleButton>
                        <ToggleButton value="italic" aria-label="italic">
                          Spring Boot
                        </ToggleButton>
                        <ToggleButton value="underlined" aria-label="underlined">
                          Spring
                        </ToggleButton>
                      </ToggleButtonGroup>
                </Stack>

                <Stack justifyContent="space-between" direction="row" spacing={2} sx={{ margin: 1, padding: 1 }}>
                  <Grid>
                    <Button startIcon={<ExpandMoreIcon/>}>최신순</Button>
                    <Button startIcon={<ExpandMoreIcon/>}>인기순</Button>
                  </Grid>
                  <Grid>
                    <Button variant="contained" onClick={() => { navigate(`/community/write`);}}>글 작성하기</Button>                
                  </Grid>
                </Stack>

              
                <hr/>

                {/* 글 목록 */}
                <Stack gap={1}>

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

                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <div>
                        <span>
                        <InsertEmoticonIcon/>
                        </span>
                        <span>김싸피 </span>
                        <span>
                          <TodayIcon/>
                        </span>
                        <span>2024.01.12</span>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <div style={{marginRight: '1em'}}>
                            <FavoriteBorderIcon/>
                            <span>20</span>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <ChatBubbleOutlineIcon/>
                            <span>20</span>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <BookmarkBorderIcon/>
                            <span>20</span>
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

                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <div>
                        <span>
                        <InsertEmoticonIcon/>
                        </span>
                        <span>김싸피 </span>
                        <span>
                          <TodayIcon/>
                        </span>
                        <span>2024.01.12</span>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <div style={{marginRight: '1em'}}>
                            <FavoriteBorderIcon/>
                            <span>20</span>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <ChatBubbleOutlineIcon/>
                            <span>20</span>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <BookmarkBorderIcon/>
                            <span>20</span>
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

                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <div>
                        <span>
                        <InsertEmoticonIcon/>
                        </span>
                        <span>김싸피 </span>
                        <span>
                          <TodayIcon/>
                        </span>
                        <span>2024.01.12</span>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                          <div style={{marginRight: '1em'}}>
                            <FavoriteBorderIcon/>
                            <span>20</span>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <ChatBubbleOutlineIcon/>
                            <span>20</span>
                          </div>
                          <div style={{marginRight: '1em'}}>
                            <BookmarkBorderIcon/>
                            <span>20</span>
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