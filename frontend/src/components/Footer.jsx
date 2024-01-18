import React from 'react'
import { AppBar } from '@mui/material'

function Footer() {
    return (
        <div>
            <AppBar position="static" style={{marginTop: "100px", backgroundColor:'#1d2364', height:'180px'}}>
                <div variant="body1" color="inherit" style={{marginTop:'20px'}}>
                    <p style={{fontWeight:800}}>Contact Us</p>
                    <p>f17Coders<br/>ssafy 10th A810</p>
                </div>
            </AppBar>
        </div>
    )
}

export default Footer