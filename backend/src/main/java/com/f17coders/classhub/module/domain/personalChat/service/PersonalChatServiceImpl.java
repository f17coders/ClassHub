package com.f17coders.classhub.module.domain.personalChat.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.response.MemberNickNameImageRes;
import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import com.f17coders.classhub.module.domain.personalChat.dto.reponse.PersonalChatListRes;
import com.f17coders.classhub.module.domain.personalChat.dto.reponse.PersonalChatRes;
import com.f17coders.classhub.module.domain.personalChat.repository.PersonalChatRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PersonalChatServiceImpl implements PersonalChatService {

    final private PersonalChatRepository personalChatRepository;
    final private MemberRepository memberRepository;

    @Override
    public String registerPersonalChat(int receiverId, Member member)
        throws BaseExceptionHandler, IOException {

        Member recevierMember = memberRepository.findById(receiverId).get();

        Map<String, String> receiver = new HashMap<>();

        receiver.put("memberId", String.valueOf(receiverId));
        receiver.put("nickname", recevierMember.getNickname());
        receiver.put("profileImage", recevierMember.getProfileImage());

        Map<String, String> sender = new HashMap<>();

        sender.put("memberId", String.valueOf(member.getMemberId()));
        sender.put("nickname", member.getNickname());
        sender.put("profileImage", member.getProfileImage());

        PersonalChat personalChat = PersonalChat.createPersonalChat(receiver, sender,
            new ArrayList<>());

        personalChatRepository.save(personalChat);

        return personalChat.getPersonalChatId();
    }

    @Override
    public List<PersonalChatRes> getPersonalChatList(int sender)
        throws BaseExceptionHandler, IOException {

        List<PersonalChat> personalChatList = personalChatRepository.findListBySenderOrReceiver(
            String.valueOf(sender));

        List<PersonalChatRes> personalChatResList = new ArrayList<>();

        for (PersonalChat personalChat : personalChatList) {

            int senderId = Integer.parseInt(personalChat.getSender().get("memberId"));
            int receiverId = Integer.parseInt(personalChat.getReceiver().get("memberId"));

            int other = (sender == senderId) ? receiverId : senderId;

            MemberStudyInfoRes memberStudyInfoRes = memberRepository.findMemberStudyInfoResByMemberId(
                    other);

            if(memberStudyInfoRes == null) {
                memberStudyInfoRes = MemberStudyInfoRes.builder().nickname("탈퇴한 사용자").build();
            }

            PersonalChatRes personalChatRes = PersonalChatRes.builder()
                .personalChatId(personalChat.getPersonalChatId())
                .receiver(memberStudyInfoRes).build();

            personalChatResList.add(personalChatRes);
        }

        return personalChatResList;
    }

    public PersonalChat readPersonalChat(String personalChatId, Member member)
        throws BaseExceptionHandler, IOException {

        PersonalChat personalChat = personalChatRepository.findById(personalChatId).get();

        Map<String, String> sender = personalChat.getSender();

        if(member.getMemberId() != Integer.parseInt(sender.get("memberId"))){
            personalChat.setSender(personalChat.getReceiver());
            personalChat.setReceiver(sender);
        }

        int receiverId = Integer.parseInt(personalChat.getReceiver().get("memberId"));

        if(memberRepository.findMemberStudyInfoResByMemberId(receiverId) == null) {
            Map<String, String> receiver = new HashMap<>();

            receiver.put("receiverId", null);
            receiver.put("nickname", "탈퇴한 사용자");
            receiver.put("profileImage", null);
            personalChat.setReceiver(receiver);
        }

        return personalChat;
    }

    @Override
    public PersonalChat readPersonalChatByRecevier(int receiver, int sender)
        throws BaseExceptionHandler, IOException {

        PersonalChat personalChat = personalChatRepository.findBySenderOrReceiver(String.valueOf(receiver),
            String.valueOf(sender));

        return personalChat;
    }
}
