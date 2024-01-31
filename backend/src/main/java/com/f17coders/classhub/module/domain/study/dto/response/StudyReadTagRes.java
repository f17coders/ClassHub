package com.f17coders.classhub.module.domain.study.dto.response;

import com.f17coders.classhub.module.domain.lecture.dto.response.LectureBaseRes;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import lombok.Builder;

import java.util.List;

@Builder
public record StudyReadTagRes(

    int studyId,
    String title,
    long currentMembers,
    int capacity,
    int studyReaderId,
    String description,
    boolean isPublic,

    List<TagRes> tagList,
    LectureBaseRes lecture

) {

}
