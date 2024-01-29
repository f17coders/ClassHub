package com.f17coders.classhub.module.domain.study.dto.response;

import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.dto.response.LectureBaseRes;
import com.f17coders.classhub.module.domain.tag.Dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.Tag;
import lombok.*;

import java.util.List;

@Builder
public record StudyReadRes(

    int studyId,
    String title,
    long currentMembers,
    int capacity,
    int studyReaderId,
    String description,
    boolean isPublic,
    LectureBaseRes lecture,
    TagRes tag

) {

}
