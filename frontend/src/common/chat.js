import axios from 'axios';


// 채팅방 얻기
const getPersonalChat = (accessToken, personalChatId) => {
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
const registPersonalChat = (accessToken, receiver) => {
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

const sendChannel = (accessToken, stompClient, message, channelId) => {
    if (stompClient && stompClient.connected) {

        stompClient.publish({
            destination: "/pub/api/chat/channel/send/" + channelId,
            headers: {
                token: accessToken
            },
            body: JSON.stringify(message)
        });
    } else {
        alert("서버 오류로 인해 메시지 전송이 실패하였습니다!");
    }
};

export {
    registPersonalChat,
    getPersonalChat,
    send,
    sendChannel
}