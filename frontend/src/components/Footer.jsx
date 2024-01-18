import React from 'react'
import { AppBar } from '@mui/material'
import Grid from '@mui/material/Grid'

function Footer() {
    return (
        <div>
            <AppBar position="static" style={{marginTop: "100px", backgroundColor:'#1d2364', height:'180px'}}>
                <Grid container color="inherit" style={{marginTop:'20px'}}>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={8}>
                        <p style={{fontWeight:800}}>Contact Us</p>
                        <p>f17Coders<br/>ssafy 10th A810</p>
                    </Grid>
                   
                </Grid>
            </AppBar>
        </div>
    )
}

export default Footer