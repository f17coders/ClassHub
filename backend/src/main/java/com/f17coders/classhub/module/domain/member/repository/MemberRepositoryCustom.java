package com.f17coders.classhub.module.domain.member.repository;

import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import java.util.List;

public interface MemberRepositoryCustom {

    List<MemberStudyInfoRes> findMemberFetchJoinStudyMemberByStudyId(int studyId);
}
