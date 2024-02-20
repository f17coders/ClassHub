package com.f17coders.classhub.module.domain.memberTag.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.tag.Tag;
import java.io.IOException;

public interface MemberTagService {

    void registerMemberTag(Member member, Tag tag);
}
