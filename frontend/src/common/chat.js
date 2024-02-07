import axios from 'axios';
import { useSelector } from "react-redux"


// 채팅방 얻기
const getPersonalChat = (personalChatId) => {
    let accessToken = useSelector((state) => state.accessToken)
    return axios.get(`https://i10a810.p.ssafy.io/api/personal-chat/v1/${personalChatId}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then((res) => {
        return res.data.result;
    })
    .catch((err) => {
        console.log(err)
        throw err
    })
}

// 채팅방 얻기, 없으면 생성
const registPersonalChat = (receiver) => {
    let accessToken = useSelector((state) => state.accessToken)
    return axios.post(`https://i10a810.p.ssafy.io/api/personal-chat/v1`,{
        "receiver": receiver,
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    .then((res) => {
        return res.data.result;
    })
    .catch((err) => {
        console.log(err)
        throw err
    })
}

const send = (stompClient, sender,message, personalChatId) => {
    if (stompClient && stompClient.connected) {
        let msg = {
            sender: sender,
            text: message,
            personalChatId: personalChatId
        };
        stompClient.publish({
            destination: "/pub/api/chat/send/" + personalChatId,
            body: JSON.stringify(msg)
        });

    } else {
        alert("서버 오류로 인해 메시지 전송이 실패하였습니다!");
    }
};

export {
    registPersonalChat,
    getPersonalChat,
    send
}