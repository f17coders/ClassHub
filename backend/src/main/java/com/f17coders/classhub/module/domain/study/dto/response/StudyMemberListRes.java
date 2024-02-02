package com.f17coders.classhub.module.domain.study.dto.response;

import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import java.util.List;
import lombok.Builder;

@Builder
public record StudyMemberListRes(

    MemberStudyInfoRes leader,

    List<MemberStudyInfoRes> studyMemberList
) {

}
