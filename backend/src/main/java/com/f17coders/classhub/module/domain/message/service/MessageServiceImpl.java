package com.f17coders.classhub.module.domain.message.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.channel.Channel;
import com.f17coders.classhub.module.domain.channel.repository.ChannelRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.message.Message;
import com.f17coders.classhub.module.domain.message.dto.request.MessageReq;
import com.f17coders.classhub.module.domain.message.repository.MessageRepository;
import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import com.f17coders.classhub.module.domain.personalChat.repository.PersonalChatRepository;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final PersonalChatRepository personalChatRepository;
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;
    private final ChannelRepository channelRepository;
//    @Override
//    public List<Message> getPersonalMessageList(String messageId) throws BaseExceptionHandler, IOException {
//        return messageRepository.
//    }

    @Override
    public Message registerPersonalMessage(String personalChatId, Message messageReq)
            throws BaseExceptionHandler, IOException {

        Message message = Message.createMessage(messageReq.getSender(), messageReq.getText());
        PersonalChat personalChat = personalChatRepository.findById(personalChatId).get();

        messageRepository.save(message);
        personalChat.getMessageList().add(message);

        personalChatRepository.save(personalChat);

        return message;
    }

    @Override
    public Message registerChannelMessage(String channelId, Member member, String text) throws BaseExceptionHandler {

        Map<String, String> sender = new HashMap<>();

        sender.put("memberId", String.valueOf(member.getMemberId()));
        sender.put("nickname", member.getNickname());
        sender.put("profileImage", member.getProfileImage());

        Message message = Message.createMessage(sender, text);
        Channel channel = channelRepository.findChannelByChannelId(channelId);

        messageRepository.save(message);
        channel.getMessageList().add(message);

        channelRepository.save(channel);

        return message;
    }
}
