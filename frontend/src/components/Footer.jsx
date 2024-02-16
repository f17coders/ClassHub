import React from 'react'
import { AppBar } from '@mui/material'
import Grid from '@mui/material/Grid'

// 푸터가 들어가는 페이지

function Footer() {
    return (
        <div style={{ height:'18vh', marginTop:'20vh'}}>
            <AppBar position="static" style={{ backgroundColor:'#1d2364'}}>
                <Grid container color="inherit" style={{marginTop:'30px'}}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={9}>
                        <p style={{fontWeight:800}}>Contact Us</p>
                        <p>f17Coders<br/>ssafy 10th A810</p>
                    </Grid>
                   <Grid item color='inherit' style={{marginTop:'80px'}}>
                        <a href="https://forms.gle/X7sNpw7re4AUWmhn9" style={{textDecoration:'none', color:'white'}}>문의하기</a>
                   </Grid>
                </Grid>
            </AppBar>
        </div>
    )
}

export default Footer