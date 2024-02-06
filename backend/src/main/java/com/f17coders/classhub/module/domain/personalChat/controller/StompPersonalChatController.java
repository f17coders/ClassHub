package com.f17coders.classhub.module.domain.personalChat.controller;

import com.f17coders.classhub.module.domain.member.service.MemberService;
import com.f17coders.classhub.module.domain.message.Message;
import com.f17coders.classhub.module.domain.message.service.MessageService;
import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import com.f17coders.classhub.module.domain.personalChat.service.PersonalChatService;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;


@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowCredentials = "true")
@Slf4j
public class StompPersonalChatController {

    //특정 Broker 에게 메시지를 전달
    private final SimpMessagingTemplate template;
    private final PersonalChatService personalChatService;
    private final MessageService messageService;
    private final MemberService memberService;

    @MessageMapping(value = "/api/chat/enter")
    public void enter(int receiver,  @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {

        PersonalChat personalChat = personalChatService.readPersonalChatByRecevier(receiver, memberSecurityDTO.getMemberId());
        template.convertAndSend("/sub/chat/room/" + personalChat.getPersonalChatId(),  "채팅방에 입장하였습니다.");
    }

    // 개인 메시지 전송
    @MessageMapping(value = "/api/chat/send/{personalChatId}")
    public void sendMessage(@DestinationVariable String personalChatId, Message messageInput)
        throws IOException {
        Message message = Message.createMessage(messageInput.getSender(), messageInput.getText());

        log.debug("[StompChatController - sendMessage]: message = {}, to room id = {}", message,
            personalChatId);
        messageService.registerPersonalMessage(personalChatId, message);

        template.convertAndSend("/sub/" + personalChatId, message);
    }
}
