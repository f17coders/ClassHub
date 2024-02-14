import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Modal, Box, Divider, ListItem, ListItemText, List, Typography, Button } from "@mui/material";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function AlarmModal({onOpen, onClose}) {
    // Modal창 스타일
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px',
        borderRadius: '2px',
        boxShadow: 24,
        p: 4,
    }
     // 토큰
	let accessToken = useSelector((state) => state.accessToken)

    const [privateAlarm, setPrivateAlarm] = useState([]);
    const [channelAlarm, setChannelAlarm] = useState([]);
    const navigate = useNavigate();
    const getPrivateAlarm = () => {
        axios.get("https://i10a810.p.ssafy.io/api/studies/v1/alarm/personalChat", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((res) => {
            setPrivateAlarm(res.data.result);
            // console.log(res.data.result)
        }).catch((err) => console.log(err))
        
    }
    const getChannelAlarm = () => {
        axios.get("https://i10a810.p.ssafy.io/api/studies/v1/alarm/channels", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }).then((res) => {
            setChannelAlarm(res.data.result);
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        if (onOpen == true) {
            getPrivateAlarm();
            getChannelAlarm();
        }
    }, [onOpen])

    const clickPrivateAlarm = (personalChatId) => {
        navigate(`/studyroom/message/${personalChatId}`);
        onClose();
    }

    const clickChannelAlarm = (studyId) => {
        navigate(`/studyroom/participating/${studyId}`);
        onClose();
    }

	return (
		<Modal
			open={onOpen}
			onClose={onClose}
		>
            <Box sx={style}>
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>🔔 알림 🔔</h2>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        개인 채팅 알람
                </Typography>
                <List>
                    { privateAlarm.length == 0 ?
                        <Typography sx={{ mx: 2 }} fontSize={16} component="div">
                            도착한 메시지가 없습니다.
                        </Typography> : 
                    (privateAlarm.map((item, itemIndex) => (
                        <div key={itemIndex}>
                        <ListItem sx={{ mx: 2, minHeight: 32, color: 'black' }}>
                            <ListItemText primary={item.text}
                                primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }} />
                            <Button 
                                sx={{width:"30%"}}
                                onClick={() => clickPrivateAlarm(item.personalChatId)}>
                                <Typography fontSize={16} component="div">
                                    채팅방 이동
                                </Typography> 
                                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                            </Button>
                        </ListItem>
                    </div>
                    )))}
                </List>
                <Divider sx={{my: 2}}></Divider>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        스터디 알림
                </Typography>
                <List>
                    { channelAlarm.length == 0 ? 
                    <Typography sx={{ mx: 2 }} fontSize={16} component="div">
                        도착한 메시지가 없습니다.
                    </Typography> : (channelAlarm.map((item, itemIndex) => (
                        <div key={itemIndex}>
                        <ListItem sx={{ mx: 2, minHeight: 32, color: 'black' }}>
                            <ListItemText primary={item.text}
                                primaryTypographyProps={{ fontSize: 16, fontWeight: 'medium' }} />
                            <Button 
                                sx={{width:"30%"}}
                                onClick={() => clickChannelAlarm(item.studyId)}>
                                <Typography fontSize={16} component="div">
                                    채팅방 이동
                                </Typography> 
                                <KeyboardDoubleArrowRightIcon></KeyboardDoubleArrowRightIcon>
                            </Button>
                        </ListItem>
                    </div>
                    )))}
                </List>
                

            </Box>   
		</Modal>
	)
}

export default AlarmModal