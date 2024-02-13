import React, { useState, useEffect, useRef  } from 'react';
import { getPersonalChat, send, readPersonalChat } from "../../common/chat.js";
import {useParams} from 'react-router-dom'
import { useSelector } from "react-redux"
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import SendIcon from '@mui/icons-material/Send';
import { ListItem, Avatar, ListItemAvatar, ListItemText, CircularProgress, Alert, TextField, Button, Stack, Box, List, ListItemButton, Grid, Typography, Divider, IconButton, Tooltip } from '@mui/material'

// 스터디룸 개인 메시지
export default function StudyRoomPrivateMessage() {
    // 토큰
	let accessToken = useSelector((state) => state.accessToken)

    const [isLoading, setIsLoading] = useState(true);
    const [recvList, setRecvList] = useState([]);
    const { personalChatId } = useParams();
    const [stompClient, setStompClient] = useState(null);
    const [ newMessage, setNewMessage] = useState("");
    const [ personalChat, setPersonalChat ] = useState({
        personalChatId: null,
        receiver: {
            memberId: null,
            nickname: null,
            profileImage: null
        },
        sender: {
            memberId: null,
            nickname: null,
            profileImage: null
        },
        messageList: []
    });

    // 스크롤바 조정
    const scrollContainerRef = useRef(null);
    

    const chatPrivateConnect = () => {
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
            console.log("연결 성공")
            client.subscribe(`/sub/${personalChatId}`, 
            (res) => {
                setRecvList(prevRecvList => [...prevRecvList, JSON.parse(res.body)]);
            });
            setIsLoading(false);
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
        if(personalChatId != null) {
            chatPrivateConnect();
        }

        const fetchData = async () => {
            try {
                const personalChat = await getPersonalChat(accessToken, personalChatId);
                setPersonalChat(personalChat);
                setRecvList(personalChat.messageList);
            } catch (error) {
                console.error("Error fetching personal chat:", error);
            }
        };
        fetchData();
    }, [personalChatId]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [personalChat]);


    // 메시지 전송
    const sendMessage = () => {
        send(stompClient, personalChat.sender, newMessage, personalChat.personalChatId);
        readPersonalChat(accessToken, personalChat.personalChatId);
        setNewMessage("");
    };

    const formattedDate = (time) =>{
        const createDate = new Date(time);
        return `${createDate.getFullYear()}-${(createDate.getMonth() + 1).toString().padStart(2, '0')}-${createDate.getDate().toString().padStart(2, '0')} ${createDate.getHours().toString().padStart(2, '0')}:${createDate.getMinutes().toString().padStart(2, '0')}`;
    }

    const formattedMessage = (message) => {
        return message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    }
    useEffect(() => {
        // 새로운 채팅이 도착할 때마다 스크롤을 자동으로 올립니다.
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [recvList]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            console.log(event);
            // Enter 키가 눌렸고, Shift 키가 눌리지 않았을 때
            event.preventDefault(); // 기본 동작인 폼 제출 방지
            event.stopPropagation();
            sendMessage();
        }
    };
    
    return(
        <List sx={{ display: 'flex',  maxHeight: "80vh" }}>
            <Stack sx={{ width:"100%", maxHeight: "80vh" , display:"flex", marginTop: 5}}>
                <Box 
                    ref={scrollContainerRef}
                    sx={{ height: "90%",
                    width:"100%",
                    position: 'relative',
                    overflow: 'auto',
                    // 스크롤바 숨기기
                    "-ms-overflow-style": "none", /* IE and Edge */
                    "scrollbar-width": "none", /* Firefox */
                    "&::-webkit-scrollbar": {
                    display: "none" /* Chrome, Safari, and Opera */,
                    },
                    // bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null, pb: open ? 2 : 0,
                }}>
                    <Divider>{personalChatId == null ? "익명" : personalChat.receiver.nickname} 님과의 채팅을 시작하였습니다.</Divider>
                {
                    recvList.map((message, index) => (
                        <ListItem key={index}>
                            {message.sender.memberId ===  personalChat.sender.memberId ? (
                            <React.Fragment>
                                <ListItemText sx={{textAlign:"right", mx: 2}}
                                    primary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ fontSize: 'small', display: 'inline', mx: 1 }}
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                {formattedDate(message.createTime)}
                                            </Typography>
                                            {message.sender.nickname}
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
                                <ListItemAvatar>
                                    <Avatar alt={message.sender.nickname} src={message.sender.profileImage} />
                                </ListItemAvatar>
                            </React.Fragment>
                            
                        ) : (
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
                        )}
                    </ListItem>
                )) }
                </Box>
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
