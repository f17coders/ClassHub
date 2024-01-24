package com.f17coders.classhub.module.domain.studyTag.service;


import com.f17coders.classhub.module.domain.tag.Tag;

public interface StudyTagService {
    void registerStudyTag(int studyId, int tagId);
    void removeStudyTag(int studyId, Tag tag);
}
