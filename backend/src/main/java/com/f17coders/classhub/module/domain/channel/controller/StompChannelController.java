package com.f17coders.classhub.module.domain.channel.controller;

import com.f17coders.classhub.global.util.JWTUtil;
import com.f17coders.classhub.module.domain.channel.service.ChannelService;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.message.Message;
import com.f17coders.classhub.module.domain.message.service.MessageService;
import com.f17coders.classhub.module.security.APIUserDetailsService;
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
public class StompChannelController {
    private final SimpMessagingTemplate template;
    private final ChannelService channelService;
    private final MessageService messageService;

    private final JWTUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final APIUserDetailsService apiUserDetailsService;

    // 채팅방 입장 -> 스터디 생성시 입장하도록 설정
    @MessageMapping(value = "/api/chat/channel/enter/{channelId}")
    public void enter(@DestinationVariable String channelId, @Header("token") String token) throws IOException {

        Map<String, Object> payload = jwtUtil.validateToken(token);

        int memberId = Integer.parseInt((String) payload.get("memberId"));

        Member sender = Member.createMember("공지봇", "");
        Member receiver = memberRepository.findById(memberId).get();

        String text = receiver.getNickname() + "님이 스터디 방에 입장하였습니다.";

        Message message = messageService.registerChannelMessage(channelId, sender, text);

        template.convertAndSend("/sub/chat/room/" + channelId, message);
    }

    // 메시지 전송
    @MessageMapping(value = "/api/chat/channel/send/{channelId}")
    public void sendMessage(@DestinationVariable String channelId, String text, @Header("token") String token)
            throws IOException {
        Map<String, Object> payload = jwtUtil.validateToken(token);

        int memberId = Integer.parseInt((String) payload.get("memberId"));
        String text2 = text.replace("\"", "");
        Member member = memberRepository.findById(memberId).get();

        Message message = messageService.registerChannelMessage(channelId, member, text2);

        template.convertAndSend("/sub/" + channelId, message);
    }
}
