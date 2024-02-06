import React, { useState, useEffect  } from 'react';
import { getPersonalChat, send } from "../../common/chat.js";
import {useParams} from 'react-router-dom'
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

const accessToken = localStorage.getItem('token');
// 스터디룸 개인 메시지
export default function StudyRoomPrivateMessage() {

    const [recvList, setRecvList] = useState([]);
    const { personalChatId } = useParams();
    const [stompClient, setStompClient] = useState(null);
    const [ newMessage, setNewMessage] = useState("");
    const [ personalChat, setPersonalChat ] = useState("");

    const chatPrivateConnect = () => {
        const serverURL = `http://localhost:8080/api/chat`;
    
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
        };
        client.activate(); // 클라이언트 활성화
        setStompClient(client);
    }
    // 연결

    useEffect(() =>  {
        const fetchData = async () => {
            try {
                const personalChat = await getPersonalChat(personalChatId);
                setPersonalChat(personalChat);
                setRecvList(personalChat.messageList);
            } catch (error) {
                console.error("Error fetching personal chat:", error);
            }
        };
        fetchData();
    }, [personalChatId]);

    useEffect(() => {
        console.log(personalChat)
        chatPrivateConnect();
    }, [personalChat]);



    // 메시지 전송
    const sendMessage = () => {
        send(stompClient, newMessage, personalChat.personalChatId);
        setNewMessage("");
    };

    const isLeftMessage = (message) => {
        return message.sender !== 10;
    };
    
    const getMessageText = (message) => {
        return isLeftMessage(message)
        ? `${message.sender}: ${message.text}`
        : `${message.text}`;
    };

    return(
        <div className="Wrapper">

            <div className="chat-container">
            {/* <div className="memberId">{memberId}</div> */}
            <div className="chat-messages">
                {recvList.map((message, index) => (
                    <div
                    key={index}
                    className={`message ${isLeftMessage(message) ? 'left' : 'right'}`}
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
        </div>
        </div>
    );
}
