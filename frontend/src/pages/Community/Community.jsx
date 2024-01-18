import {Container, Row, Col, Stack, Pagination, Form, InputGroup, ToggleButton, ButtonGroup } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useState } from 'react'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import TodayIcon from '@mui/icons-material/Today';

function Community() {
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    return(
        <div>
            <Container className="p-4">
                <InputGroup className="mb-3 p-2">
                    <Form.Control
                      placeholder="궁금한 질문을 검색해보세요"
                      aria-label="질문 검색"
                      aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-primary">🔍검색</Button>
                </InputGroup>
                
                <Row className="d-flex align-items-center p-2">
                    <Col xs="auto">태그로 검색하기</Col>
                    <Col>
                        <InputGroup>
                            <Form.Control
                            placeholder="궁금한 질문을 검색해보세요"
                            aria-label="궁금한 질문을 검색해보세요"
                            aria-describedby="basic-addon2"
                            />
                            <Button variant="outline-primary">🔍검색</Button>
                        </InputGroup>
                    </Col>
                    <Col>
                        <ToggleButton
                            id="toggle-check"
                            type="checkbox"
                            variant="outline-primary"
                            checked={checked}
                            value="1"
                            onChange={(e) => setChecked(e.currentTarget.checked)}
                            >
                            Spring
                        </ToggleButton>
                    </Col>
                </Row>

                <Row>
                  <Col>
                    <Button startIcon={<ExpandMoreIcon/>}>최신순</Button>
                    <Button startIcon={<ExpandMoreIcon/>}>인기순</Button>
                  </Col>
                  <Col className="text-end">
                    <Button variant="contained">글 작성하기</Button>                
                  </Col>
                </Row>
                <hr/>

                {/* 글 목록 */}
                <Stack className="mt-3" gap={1}>

                  {/* 글 목록 한개 */}
                  <div className="px-4" onClick={() => { navigate(`/community/detail`); }}>
                    <h4>비주얼 스튜디오에 파이썬이 안들어갑니다.</h4>
                    <p>다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 
                    고수님들 도와주세요</p>
                    {/* 해시태그 */}
                    <div className='mb-3'>
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
                  <div className="px-4" onClick={() => { navigate(`/community/detail`); }}>
                    <h4>비주얼 스튜디오에 파이썬이 안들어갑니다.</h4>
                    <p>다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 
                    고수님들 도와주세요</p>
                    {/* 해시태그 */}
                    <div className='mb-3'>
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
                  <div className="px-4" onClick={() => { navigate(`/community/detail`); }}>
                    <h4>비주얼 스튜디오에 파이썬이 안들어갑니다.</h4>
                    <p>다른 강의에서 배웠던 건 자동으로 파이썬이 들어가있었는데 이번에 새로 파일을 만들 때마다 파이썬이 안들어갑니다. 
                    고수님들 도와주세요</p>
                    {/* 해시태그 */}
                    <div className='mb-3'>
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
                <Pagination className="d-flex justify-content-center">
                  <Pagination.First />
                  <Pagination.Prev />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Item>{2}</Pagination.Item>
                  <Pagination.Item>{3}</Pagination.Item>
                  <Pagination.Item>{4}</Pagination.Item>
                  <Pagination.Item>{5}</Pagination.Item>
                  <Pagination.Next />
                  <Pagination.Last />
                </Pagination>

            </Container>
        </div>
    )
}

export default Community