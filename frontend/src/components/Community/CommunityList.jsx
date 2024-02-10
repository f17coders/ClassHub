import {Tooltip, Container, Stack, Button, Divider } from '@mui/material';
import { useState } from 'react'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TodayIcon from '@mui/icons-material/Today';
import React from 'react';
import DOMPurify from "dompurify";

export default function CommunityPostList({post}){
    const navigate = useNavigate();

    // HTML 태그를 제거하여 텍스트로 변환하는 함수
    const removeHTMLTags = (html) => {
      const purifiedText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
      return purifiedText;
    };

    return(
        <>
            {/* 글 목록 한개 */}
            <div onClick={() => { navigate(`/community/detail/${post.communityId}`); }}>
              <h3 style={{fontWeight: 'bold'}}>{post.title}</h3>
              <p>{removeHTMLTags(post.content)}</p>
              {/* 해시태그 */}
              <Stack direction="row" spacing={1}>
                  {post.tagList.map((tag, tagIndex) => (
                  <Button key={tagIndex} label={tag} size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}} >
                      #{tag.name}
                  </Button>
                  ))}
              </Stack>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                {/* 작성자, 작성일자 부분 */}
                <div style={{ display: 'flex' }}>
                  <div style={{marginRight: '1em'}}>
                    <Tooltip title="작성자">
                      <div>
                        <PersonIcon/>
                        {post.memberNickname}
                      </div>
                    </Tooltip>
                  </div>
                  <div style={{marginRight: '1em'}}>
                    <Tooltip title="작성일자">
                      <div>
                        <TodayIcon/> {post.createdAt}
                      </div>
                    </Tooltip>
                  </div>
                </div>
                {/* 좋아요, 댓글, 스크랩 부분 */}
                <div style={{ marginLeft: 'auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <div style={{marginRight: '1em'}}>
                      <Tooltip title="좋아요">
                        <div style={{display:'flex', alignItems:'center'}}>
                          <FavoriteBorderIcon/> <span>{post.likeCount}</span>
                        </div>
                      </Tooltip>
                    </div>
                    <div style={{marginRight: '1em'}}>
                      <Tooltip sx={{marginRight: '1rem'}} title="댓글">
                        <div style={{display:'flex', alignItems:'center'}}>
                          <ChatBubbleOutlineIcon/> <span>{post.commentCount}</span>
                        </div>
                      </Tooltip>
                    </div>
                    <div style={{marginRight: '1em'}}>
                      <Tooltip sx={{marginRight: '1rem'}} title="스크랩">
                        <div style={{display:'flex', alignItems:'center'}}>
                          <BookmarkBorderIcon/> <span>{post.scrapCount}</span>
                        </div>
                      </Tooltip>
                    </div>
                    
                  </div>
                </div>
              </div>
              <hr/>
            </div>
        </>
    );
}