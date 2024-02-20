import { Container, Stack, Button, TextField, Grid, Pagination } from '@mui/material';
import { useState, useEffect } from 'react'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

export default function CommunityListAlignment(){

    return(
        <Stack direction="row" sx={{justifyContent: "flex-end"}}>
            <Button onClick={() =>{setAlignList('createTime,desc')}} startIcon={<ExpandMoreIcon/>}>최신순</Button>
            <Button onClick={() => {setAlignList('likeCount,desc')}} startIcon={<ExpandMoreIcon/>}>인기순</Button>
        </Stack>
    )
}