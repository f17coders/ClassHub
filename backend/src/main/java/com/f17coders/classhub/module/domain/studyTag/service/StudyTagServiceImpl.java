package com.f17coders.classhub.module.domain.studyTag.service;


import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import com.f17coders.classhub.module.domain.studyTag.repository.StudyTagRepository;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyTagServiceImpl implements StudyTagService {
    private final StudyRepository studyRepository;
    private final StudyTagRepository studyTagRepository;

    @Override
    public void registerStudyTag(int studyId, int tagId) {

        Study study = studyRepository.findByStudyId(studyId);
        // TODO: tag가 완료되면 수정
        Tag tag = null;

        StudyTag studyTag = StudyTag.createStudyTag(tag);
        studyTag.putStudy(study);

        studyTagRepository.save(studyTag);
    }

    @Override
    public void removeStudyTag(int studyId, Tag tag) {
        StudyTag studyTag = studyTagRepository.findByStudy_StudyIdAndTag_TagId(studyId, tag.getTagId());

        studyTagRepository.delete(studyTag);
    }
}
