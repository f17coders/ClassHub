package com.f17coders.classhub.module.domain.personalChat.dto.reponse;

import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import lombok.Builder;

@Builder
public record PersonalChatRes(
    String personalChatId,

    MemberStudyInfoRes receiver
) {

}
