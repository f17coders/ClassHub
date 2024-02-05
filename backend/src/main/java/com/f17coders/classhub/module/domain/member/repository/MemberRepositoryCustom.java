package com.f17coders.classhub.module.domain.member.repository;

import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import java.util.List;
import java.util.Optional;

public interface MemberRepositoryCustom {

    Optional<Member> findByIdFetchJoinJob(int memberId);

    List<MemberStudyInfoRes> findMemberFetchJoinStudyMemberByStudyId(int studyId);
}
