package com.f17coders.classhub.module.domain.studyTag.service;


import com.f17coders.classhub.module.domain.tag.Tag;
import java.util.List;

public interface StudyTagService {

    void registerStudyTag(int studyId, List<Integer> tagId);

    void removeStudyTag(int studyId, List<Tag> tagList);

    void removeStudyTagAll(int studyId);
}
