import React, { useState, useEffect, useRef  } from 'react';
import { sendChannel } from "../../common/chat.js";
import { useSelector } from "react-redux"
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import SendIcon from '@mui/icons-material/Send';
import { ListItem, Avatar, ListItemAvatar, ListItemText, CircularProgress, Alert, TextField, Button, Stack, Box, List, ListItemButton, Grid, Typography, Divider, IconButton, Tooltip } from '@mui/material'

// 스터디룸 단체 메시지
export default function StudyRoomPrivateMessage({channel}) {
    // 토큰
	let accessToken = useSelector((state) => state.accessToken)

    const [isLoading, setIsLoading] = useState(true);
    const [recvList, setRecvList] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const [ newMessage, setNewMessage] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredRecvList, setFilteredRecvList] = useState([]); // 필터링된 결과를 담을 상태 추가

    // 스크롤바 조정
    const scrollContainerRef = useRef(null);
    
    // 검색어 입력 시 메시지 필터링 함수
    useEffect(() => {
        const filteredMessages = recvList.filter(message => message.text.includes(searchText));
        setFilteredRecvList(filteredMessages);
    }, [searchText, recvList]); 


    const chatConnect = () => {
        const serverURL = `https://i10a810.p.ssafy.io/api/chat`;
        // const serverURL = `http://localhost:8080/api/chat`;
    
        setIsLoading(true);

        let socket = new SockJS(serverURL);
        let client = new Client({ 
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            webSocketFactory: () => socket });

        client.onConnect = () => { // 연결이 성공하면 수행할 작업
            
            client.subscribe(`/sub/${channel.channelId}`, 
            (res) => {
                setRecvList(prevRecvList => [...prevRecvList, JSON.parse(res.body)]);
            });
            setIsLoading(false);
            console.log(`${channel.name} 연결 성공`)
        };

        client.activate(); // 클라이언트 활성화
        // 연결 오류 발생 시 처리
        client.onStompError = (frame) => {
            console.error('WebSocket 연결 오류:', frame);
            setTimeout(client.activate(), 5000); //
        };
        setStompClient(client);
    }
    // 연결

    useEffect(() =>  {
        if(channel != null) {
            chatConnect();
            setRecvList(channel.messageList);
        }
    }, [channel]);

    // 메시지 전송
    const sendMessage = () => {
        sendChannel(accessToken, stompClient, newMessage, channel.channelId);
        setNewMessage("");
    };

    const formattedDate = (time) =>{
        const createDate = new Date(time);
        return `${createDate.getFullYear()}-${(createDate.getMonth() + 1).toString().padStart(2, '0')}-${createDate.getDate().toString().padStart(2, '0')} ${createDate.getHours().toString().padStart(2, '0')}:${createDate.getMinutes().toString().padStart(2, '0')}`;
    }

    const formattedMessage = (message) => {
        const replacedMessage = message.replace(/\\n/g, '\n');
        return replacedMessage.split('\n').map((line, index) => (
            <Typography key={index} component="span" display="block">
                {line}
            </Typography>
        ));
    };

    useEffect(() => {
        // 새로운 채팅이 도착할 때마다 스크롤을 자동으로 올립니다.
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [filteredRecvList]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            // Enter 키가 눌렸고, Shift 키가 눌리지 않았을 때
            event.preventDefault(); // 기본 동작인 폼 제출 방지
            event.stopPropagation();
            sendMessage();
        }
    };
    
    return(
        <List sx={{ display: 'flex-row',  maxHeight: "80vh", width: "100%"}}>

            {/* 검색기능 */}
            <Stack sx={{ width:"100%", m:1, p: 1, height: "10%"}}>
                {/* <TextField size="small" sx={{ width: "100%" }} id="outlined-basic" label="내용을 검색해보세요!" variant="outlined" /> */}
                <TextField
                    size="small"
                    sx={{ width: "100%" }}
                    id="outlined-basic"
                    label="내용을 검색해보세요!"
                    variant="outlined"
                    onChange={(e) => setSearchText(e.target.value)} 
                />
            </Stack>
            
            {/* 채널에 대한 페이지 */}
            <Stack sx={{ width:"100%", maxHeight: "70%" , display:"flex", marginTop: 5}}>
                <Box 
                    ref={scrollContainerRef}
                    sx={{ height: "90%",
                    width:"100%",
                    position: 'relative',
                    overflow: 'auto',
                    // 스크롤바 숨기기
                    "msOverflowStyle": "none", /* IE and Edge */
                    "scrollbarWidth": "none", /* Firefox */
                    "&::-webkit-scrollbar": {
                    display: "none" /* Chrome, Safari, and Opera */,
                    },
                    // bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null, pb: open ? 2 : 0,
                }}>
                {
                    filteredRecvList.map((message, index) => (
                        <ListItem key={index}>
                            <React.Fragment>
                                <ListItemAvatar>
                                    <Avatar alt={message.sender.nickname} src={message.sender.profileImage} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            {message.sender.nickname}
                                            <Typography
                                                sx={{ fontSize: 'small', display: 'inline', mx: 1 }}
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {formattedDate(message.createTime)}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'block', my:1 }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {formattedMessage(message.text)}
                                            </Typography>
                                            <Divider varient="middle" />
                                        </React.Fragment>
                                    }
                                />
                            </React.Fragment>
                    </ListItem>
                )) }
                </Box>
                
            </Stack>  
            <Stack sx={{height: "20%"}}>
            {/* 채팅 작성 */}
                {isLoading ? 
                    <React.Fragment>
                        <CircularProgress sx={{ width:"100%", height:"10%", margin: "auto"}} />
                        {/* <Divider sx={{my: 2}}>채팅을 연결하는 중입니다. 잠시만 기다려주세요</Divider> */}
                    </React.Fragment>
                    : <Box sx={{ width:"100%", height:"10%", display: 'flex', justifyContent:'flex-start', alignItems: 'flex-start' }}>
                    <TextField
                        id="standard-multiline-static"
                        label="채팅을 작성해주세요"
                        multiline
                        rows={2}
                        sx={{flex: 9, marginLeft: 3}}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e)}
                    />
                    <Button sx={{mx: 2}} variant="contained" endIcon={<SendIcon />} onClick={sendMessage}></Button>
                </Box>
                }
            </Stack>       
        </List>
    );

}
