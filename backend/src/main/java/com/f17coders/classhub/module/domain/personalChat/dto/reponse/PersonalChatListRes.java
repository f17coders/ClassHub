package com.f17coders.classhub.module.domain.personalChat.dto.reponse;

import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import com.f17coders.classhub.module.domain.message.Message;
import java.util.List;

public record PersonalChatListRes(
    String personalChatId,

    MemberStudyInfoRes receiver,

    MemberStudyInfoRes sender,
    List<Message> messageList
) {

}
