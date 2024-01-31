package com.f17coders.classhub.module.domain.memberTag.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.f17coders.classhub.module.domain.memberTag.repository.MemberTagRepository;
import com.f17coders.classhub.module.domain.tag.Tag;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberTagServiceImpl implements MemberTagService {

    private final MemberTagRepository memberTagRepository;

    @Override
    public void registerMemberTag(Member member, Tag tag) throws BaseExceptionHandler, IOException {
        MemberTag memberTag = MemberTag.createMemberTag(member, tag);

        MemberTag saveMemberTag = memberTagRepository.save(memberTag);

    }
}
