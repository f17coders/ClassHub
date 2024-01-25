package com.f17coders.classhub.module.domain.study.dto.response;

import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.tag.Tag;
import lombok.*;

import java.util.List;


//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class StudyReadRes{
//    private int studyId;
//    private String title;
////    private int currentMembers;
//    private int capacity;
//    private String description;
//    private boolean isPublic;
//
//    private final List<TagRes> tagResList = new ArrayList<>();
//    private Lecture lecture;

//    @QueryProjection
//    public StudyReadRes(Study study, List<TagRes> tagResList){
//        this.studyId = study.getStudyId();
//        this.title = study.getTitle();
//        this.capacity = study.getCapacity();
//        this.description = study.getDescription();
//        this.isPublic = study.isPublic();
//        this.lecture = study.getLecture();
//
//        tagResList.forEach(
//                tag -> this.tagResList.add(
//                        TagRes.builder()
//                                .tagId(tag.getTagId())
//                                .name(tag.getName())
//                                .build()
//                )
//        );
//    }
//}


@Builder
public record StudyReadRes (

    int studyId,
    String title,
    Integer currentMembers,
    Integer capacity,
    String description,
    boolean isPublic,

    List<Tag> tagList,
    Lecture lecture

){}
