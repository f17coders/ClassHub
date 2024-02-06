package com.f17coders.classhub.module.domain.personalChat.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import com.f17coders.classhub.module.domain.personalChat.dto.reponse.PersonalChatListRes;
import com.f17coders.classhub.module.domain.personalChat.dto.reponse.PersonalChatRes;
import com.f17coders.classhub.module.domain.personalChat.repository.PersonalChatRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PersonalChatServiceImpl implements PersonalChatService {

    final private PersonalChatRepository personalChatRepository;
    final private MemberRepository memberRepository;

    @Override
    public String registerPersonalChat(int receiver, int sender)
        throws BaseExceptionHandler, IOException {
        PersonalChat personalChat = PersonalChat.createPersonalChat(receiver, sender,
            new ArrayList<>());

        personalChatRepository.save(personalChat);

        return personalChat.getPersonalChatId();
    }

    @Override
    public List<PersonalChatRes> getPersonalChatList(int sender)
        throws BaseExceptionHandler, IOException {

        List<PersonalChat> personalChatList = personalChatRepository.findBySenderOrReceiver(sender, sender);

        List<PersonalChatRes> personalChatResList = new ArrayList<>();

        for (PersonalChat personalChat : personalChatList) {

            MemberStudyInfoRes memberStudyInfoRes = memberRepository.findMemberStudyInfoResByMemberId(
                personalChat.getReceiver());

            PersonalChatRes personalChatRes = PersonalChatRes.builder()
                .personalChatId(personalChat.getPersonalChatId())
                .receiver(memberStudyInfoRes).build();

            personalChatResList.add(personalChatRes);
        }

        return personalChatResList;
    }

    public PersonalChat readPersonalChat(String personalChatId)
        throws BaseExceptionHandler, IOException {
        return personalChatRepository.findById(personalChatId).get();
    }

    @Override
    public PersonalChat readPersonalChatByRecevier(int receiver, int sender)
        throws BaseExceptionHandler, IOException {

        PersonalChat personalChat = personalChatRepository.findByReceiverAndSender(receiver,
            sender);

        return personalChat;
    }
}
