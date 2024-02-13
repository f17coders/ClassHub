package com.f17coders.classhub.module.domain.message.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.alarm.ChannelAlarm;
import com.f17coders.classhub.module.domain.alarm.PersonalChatAlarm;
import com.f17coders.classhub.module.domain.alarm.repository.ChannelAlarmRepository;
import com.f17coders.classhub.module.domain.alarm.repository.PersonalChatAlarmRepository;
import com.f17coders.classhub.module.domain.alarm.service.AlarmService;
import com.f17coders.classhub.module.domain.channel.Channel;
import com.f17coders.classhub.module.domain.channel.repository.ChannelRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.message.Message;
import com.f17coders.classhub.module.domain.message.dto.request.MessageReq;
import com.f17coders.classhub.module.domain.message.repository.MessageRepository;
import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import com.f17coders.classhub.module.domain.personalChat.repository.PersonalChatRepository;

import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.studyMember.StudyMember;
import com.f17coders.classhub.module.domain.studyMember.repository.StudyMemberRepository;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final PersonalChatRepository personalChatRepository;
    private final MessageRepository messageRepository;
    private final StudyMemberRepository studyMemberRepository;
    private final ChannelRepository channelRepository;
    private final AlarmService alarmService;
    private final StudyRepository studyRepository;

    @Override
    public Message registerPersonalMessage(String personalChatId, Message messageReq)
            throws BaseExceptionHandler, IOException {

        Message message = Message.createMessage(messageReq.getSender(), messageReq.getText());
        PersonalChat personalChat = personalChatRepository.findById(personalChatId).get();

        messageRepository.save(message);
        personalChat.getMessageList().add(message);

        personalChatRepository.save(personalChat);

        int targetId;
        String text = "";

        if(messageReq.getSender().get("memberId").equals(personalChat.getSender().get("memberId"))) {
            targetId = Integer.parseInt(personalChat.getReceiver().get("memberId"));
            text = personalChat.getSender().get("nickname") + "님으로부터 새로운 채팅이 도착했습니다.";
        } else {
            targetId = Integer.parseInt(personalChat.getSender().get("memberId"));
            text = personalChat.getReceiver().get("nickname") + "님으로부터 새로운 채팅이 도착했습니다.";
        }

        alarmService.registPersonalChatAlarm(personalChatId, targetId, text);

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

        List<StudyMember> studyMemberList = studyMemberRepository.findStudyMembersByStudy_StudyId(
            channel.getStudyId());

        Study study = studyRepository.findByStudyId(channel.getStudyId());
        String content = "[ " +study.getTitle() +" ] " + channel.getName() +"에 새로운 채팅이 도착했습니다.";
        for(StudyMember studyMember : studyMemberList) {
            if (member.getMemberId() != studyMember.getMember().getMemberId()) {
                alarmService.registchannelAlarm(channel.getStudyId(), channelId, studyMember.getMember().getMemberId(), content);
            }
        }

        return message;
    }
}
