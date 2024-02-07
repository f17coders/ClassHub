package com.f17coders.classhub.module.domain.personalChat.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import com.f17coders.classhub.module.domain.personalChat.dto.reponse.PersonalChatListRes;
import com.f17coders.classhub.module.domain.personalChat.dto.reponse.PersonalChatRes;
import java.io.IOException;
import java.util.List;

public interface PersonalChatService {

    String registerPersonalChat(int receiverId, Member member) throws BaseExceptionHandler, IOException;

    List<PersonalChatRes> getPersonalChatList(int sender) throws BaseExceptionHandler, IOException;

    PersonalChat readPersonalChat(String personalChatId, Member member) throws BaseExceptionHandler, IOException;

    PersonalChat readPersonalChatByRecevier(int receiver, int sender) throws BaseExceptionHandler, IOException;
}
