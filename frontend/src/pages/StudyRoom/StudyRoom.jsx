import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Grid,  IconButton, Box, Button, Hidden } from "@mui/material";

export default function StudyRoom() {
    const [open, setOpen] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const handleWindowResize = useCallback((event) => {
      setWindowSize(window.innerWidth);
    }, []);

    useEffect(() => {
      window.addEventListener("resize", handleWindowResize);
      windowSize >= 600 && setOpen(false);
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, [windowSize]);

    return(
        <Container>
        <Grid container height="100vh" width="100%">
            {/* <Hidden smUp>

            </Hidden> */}

            <Hidden smDown>
              <Grid item width="180px" height={"100vh"} backgroundColor={"orange"}>
                
                <Button variant="contained">모집하기</Button>
                <Grid container sx={{backgroundColor: "pink"}}>
                    <p>여기는 스터디룸 컨테이너</p>
                    <p>여기는 스터디룸 컨테이너</p>
                    <p>여기는 스터디룸 컨테이너</p>
                    <p>여기는 스터디룸 컨테이너</p>
                    <p>여기는 스터디룸 컨테이너</p>
                </Grid>

                <Grid container sx={{backgroundColor: "yellow"}}>
                    <p>여기는 1:1 대화 컨테이너</p>
                    <p>여기는 1:1 대화 컨테이너</p>
                    <p>여기는 1:1 대화 컨테이너</p>
                    <p>여기는 1:1 대화 컨테이너</p>
                    <p>여기는 1:1 대화 컨테이너</p>
                </Grid>
              </Grid>
            </Hidden>

            <Grid item backgroundColor="tomato" height="100vh" xs={12} sm>
                contentArea
            </Grid>

        </Grid>
        </Container>
        
    )
}