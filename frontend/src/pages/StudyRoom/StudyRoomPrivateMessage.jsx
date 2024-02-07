import React, { useState, useEffect, useRef  } from 'react';
import { getPersonalChat, send } from "../../common/chat.js";
import {useParams} from 'react-router-dom'
import { useSelector } from "react-redux"
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import SendIcon from '@mui/icons-material/Send';
import { ListItem, Avatar, ListItemAvatar, ListItemText, Backdrop, Alert, Pagination, TextField, Button, Stack, Box, List, ListItemButton, Grid, Typography, Divider, IconButton, Tooltip } from '@mui/material'

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
    
        setIsLoading(true);
        let socket = new SockJS(serverURL);
        let client = new Client({ 
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            webSocketFactory: () => socket });

        client.onConnect = () => { // 연결이 성공하면 수행할 작업
            console.log("연결 성공")
            client.subscribe(`/sub/${personalChat.personalChatId}`, 
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
        chatPrivateConnect();
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [personalChat]);


    // 메시지 전송
    const sendMessage = () => {
        send(stompClient, personalChat.sender, newMessage, personalChat.personalChatId);
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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            // Enter 키가 눌렸고, Shift 키가 눌리지 않았을 때
            event.preventDefault(); // 기본 동작인 폼 제출 방지
            sendMessage();
        }
    };
    
    
    
    return(
        <Box sx={{ display: 'flex',  maxHeight: "80vh" }}>
            {/* 개인 채팅
            <Stack sx={{ width: "20%", direction: "column", justifyContent: "flex-start", alignItems: "center", border:"1px solid lightgray"}}>
                {/* 상대방 아이콘 */}
                {/* <Avatar sx={{width: "50%", height: "auto", mt: 5}}
                    alt={personalChatId == null ? "익명" : personalChat.receiver.nickname} 
                    src={personalChatId == null ? "익명" : personalChat.receiver.profileImage}>
                </Avatar>
                {/* 상대방 이름 */}
                {/* <Typography sx={{ width: "90%", display: 'flex', justifyContent: 'center', py: 3 }} variant='h6' fontWeight='bold'>
                    {personalChatId == null ? "익명" : personalChat.receiver.nickname}
                </Typography>
            </Stack> */} 
            {/* 채팅 내용 */}
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
                                                {message.text}
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
                    <Divider sx={{my: 2}}>채팅을 연결하는 중입니다. 잠시만 기다려주세요</Divider> : null}
                <Box sx={{ width:"100%", height:"10%", display: 'flex', justifyContent:'flex-start', alignItems: 'flex-start' }}>
                    <TextField
                        id="standard-multiline-static"
                        label="채팅을 작성해주세요"
                        multiline
                        rows={2}
                        sx={{flex: 9, marginLeft: 3}}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button sx={{mx: 2}} variant="contained" endIcon={<SendIcon />} onClick={sendMessage}></Button>
                </Box>
                
            </Stack>
            {/* <div className="chat-container">
            {/* <div className="memberId">{memberId}</div> */}
            {/* <div className="chat-messages">
                {recvList.map((message, index) => (
                    <div
                    key={index}
                >
                {getMessageText(message)}
                </div>
            ))}
            </div>
            <div className="chat-input">
                <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyUp={(e) => {
                if (e.key === 'Enter') sendMessage();
            }}
                placeholder="메세지를 입력하세요"
            ></textarea>
            <button type="button" onClick={sendMessage}>⏏︎</button>
            </div>
        </div> */}
        {/* </div> */}
        </Box>
    );
}
