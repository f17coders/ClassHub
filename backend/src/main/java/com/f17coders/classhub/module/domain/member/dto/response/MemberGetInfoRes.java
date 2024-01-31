package com.f17coders.classhub.module.domain.member.dto.response;

import com.f17coders.classhub.module.domain.job.dto.response.JobRes;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import java.util.List;
import lombok.Builder;

@Builder
public record MemberGetInfoRes(
    String nickname,
    String profileImage,
    List<TagRes> tagList,
    JobRes job
) {

}
