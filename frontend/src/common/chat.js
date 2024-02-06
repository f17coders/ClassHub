import axios from 'axios';

const accessToken = localStorage.getItem('token');
// 채팅방 얻기
const getPersonalChat = (personalChatId) => {

    return axios.get(`http://localhost:8080/api/personal-chat/v1/${personalChatId}`,{
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
    return axios.post(`http://localhost:8080/api/personal-chat/v1`,{
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

const send = (stompClient, message, personalChatId) => {
    if (stompClient && stompClient.connected) {

        const currentDate = new Date(); // 현재 날짜
        const currentDateString = currentDate.toISOString();

        let msg = {
            sender: 10,
            text: message,
            personalChatId: personalChatId
        };
        stompClient.publish({
            destination: "/pub/api/chat/send/" + personalChatId,
            body: JSON.stringify(message),
            headers: {
                "Authorization": "Bearer " + accessToken,
            }
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