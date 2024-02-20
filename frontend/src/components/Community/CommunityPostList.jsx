import {Tooltip, Container, Stack, Button } from '@mui/material';
import { useState } from 'react'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import TodayIcon from '@mui/icons-material/Today';
import React from 'react';

export default function CommunityPostList({post}){
    const navigate = useNavigate();

    return(
        <div>
            {/* 글 목록 한개 */}
            <div onClick={() => { navigate(`/community/detail`); }}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            {/* 해시태그 */}
            <Stack direction="row" spacing={1}>
                {post.hashtag.map((tag, tagIndex) => (
                <Button key={tagIndex} label={tag} size="small" variant="contained" sx={{ borderRadius: '20px', marginRight: '0.5em'}} >
                    {tag}
                </Button>
                ))}
            </Stack>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              {/* 작성자, 작성일자 부분 */}
              <div style={{ display: 'flex' }}>
                <div style={{marginRight: '1em'}}>
                  <Tooltip title="작성자">
                    <PersonIcon/> {post.writer}
                  </Tooltip>
                </div>
                <div style={{marginRight: '1em'}}>
                  <Tooltip title="작성일자">
                    <TodayIcon/> {post.regdate}
                  </Tooltip>
                </div>
              </div>
              {/* 좋아요, 댓글, 스크랩 부분 */}
              <div style={{ marginLeft: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                  <div style={{marginRight: '1em'}}>
                    <Tooltip title="좋아요">
                      <FavoriteBorderIcon/> <span>{post.likes}</span>
                    </Tooltip>
                  </div>
                  <div style={{marginRight: '1em'}}>
                    <Tooltip sx={{marginRight: '1rem'}} title="댓글">
                      <ChatBubbleOutlineIcon/> <span>{post.comments}</span>
                    </Tooltip>
                  </div>
                  <div style={{marginRight: '1em'}}>
                    <Tooltip sx={{marginRight: '1rem'}} title="스크랩">
                      <BookmarkBorderIcon/> <span>{post.bookmarks}</span>
                    </Tooltip>
                  </div>
                  
                </div>
              </div>
            </div>
            <hr/>
          </div>
        </div>
    );
}