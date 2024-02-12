package com.f17coders.classhub.module.domain.alarm.controller;

import com.f17coders.classhub.global.util.JWTUtil;
import com.f17coders.classhub.module.domain.alarm.PersonalChatAlarm;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.message.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.io.IOException;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowCredentials = "true")
@Slf4j
public class StompAlarmController {

    private final SimpMessagingTemplate template;
    private final JWTUtil jwtUtil;
    private final MemberRepository memberRepository;

    @MessageMapping(value = "/api/chat/alarm/{personalChatId}")
    public void sendMessage(@DestinationVariable String personalChatId)
            throws IOException {


        PersonalChatAlarm personalChatAlarm = PersonalChatAlarm.createPersonalChatAlarm();
        template.convertAndSend("/sub/" + personalChatId, message);
    }
}
