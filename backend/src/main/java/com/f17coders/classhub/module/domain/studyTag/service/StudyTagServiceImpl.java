package com.f17coders.classhub.module.domain.studyTag.service;


import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import com.f17coders.classhub.module.domain.studyTag.repository.StudyTagRepository;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StudyTagServiceImpl implements StudyTagService {

    private final StudyRepository studyRepository;
    private final StudyTagRepository studyTagRepository;
    private final TagRepository tagRepository;

    @Override
    public void registerStudyTag(int studyId, List<Integer> tagList) {

        Study study = studyRepository.findByStudyId(studyId);

        for(int tagId : tagList) {
            Tag tag = tagRepository.findTagByTagId(tagId);

            StudyTag studyTag = StudyTag.createStudyTag(tag);
            studyTag.putStudy(study);

            studyTagRepository.save(studyTag);
        }
    }

    @Override
    public void removeStudyTag(int studyId, List<Tag> tagList) {

        for(Tag tag : tagList) {
            StudyTag studyTag = studyTagRepository.findByStudy_StudyIdAndTag_TagId(studyId,
                tag.getTagId());

            studyTagRepository.delete(studyTag);
        }

    }

    public void removeStudyTagAll(int studyId) {
        studyTagRepository.deleteStudyTagsByStudyId(studyId);
    }
}
