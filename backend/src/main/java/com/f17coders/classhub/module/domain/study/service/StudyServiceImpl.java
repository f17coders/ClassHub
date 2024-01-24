package com.f17coders.classhub.module.domain.study.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListDetailRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.study.repository.StudyRepositoryCustom;
import com.f17coders.classhub.module.domain.studyMember.repository.StudyMemberRepository;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import com.f17coders.classhub.module.domain.studyTag.repository.StudyTagRepository;
import com.f17coders.classhub.module.domain.studyTag.repository.StudyTagRepositoryCustom;
import com.f17coders.classhub.module.domain.tag.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


import static com.f17coders.classhub.module.domain.lecture.QLecture.lecture;

@Log4j2
@Service
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {
    private final StudyRepository studyRepository;
    private final LectureRepository lectureRepository;
    private final StudyMemberRepository studyMemberRepository;
    private final StudyTagRepository studyTagRepository;

    @Override
    public int registerStudy(StudyRegisterReq studyRegisterReq, Member member) throws BaseExceptionHandler, IOException {
        String title = studyRegisterReq.title();
        int capacity = studyRegisterReq.capacity();
        int lectureId = studyRegisterReq.lectureId();
        boolean isPublic = studyRegisterReq.isPublic();
        String description = studyRegisterReq.description();


        Lecture lecture = null; // TODO: 강의 생기면 수정
//        Lecture lecture = lectureRepository.findByLectureId(lectureId);

        Study study = Study.createStudy(title, capacity, description, isPublic, lecture, null);

        studyRepository.save(study);
        return study.getStudyId();
    }

    @Override
    public StudyReadRes readStudy(int studyId) throws BaseExceptionHandler, IOException{
        Study study = studyRepository.findStudyByStudyIdFetchJoinLecture(studyId);

        StudyReadRes studyReadRes = StudyReadRes.builder()
                .studyId(studyId)
                .title(study.getTitle())
//                .currentMembers(currentMembers)
                .capacity(study.getCapacity())
                .description(study.getDescription())
                .isPublic(study.isPublic())
//                .tagList(study.getTag())
                .lecture(study.getLecture())
                .build();

//        int currentMembers = studyMemberRepository.countByStudy_StudyId(studyId);

        return studyReadRes;
    }

    @Override
    public StudyListRes getStudyList(Pageable pageable) throws BaseExceptionHandler, IOException {
        Page<Study> studyPage = studyRepository.findAll(pageable);

        List<StudyListDetailRes> studyListDetailResList = new ArrayList<>();

        for (Study study : studyPage) {
            int studyId = study.getStudyId();
            int currentMembers = studyMemberRepository.countByStudy_StudyId(studyId);
//            List<Tag> tagList = studyTagRepository.findTagsByStudyIdFetchJoinStudyTag(studyId);

            StudyListDetailRes studyListDetailRes = StudyListDetailRes.builder()
                    .studyId(studyId)
                    .title(study.getTitle())
                    .currentMembers(currentMembers)
                    .capacity(study.getCapacity())
                    .description(study.getDescription())
                    .isPublic(study.isPublic())
//                    .tagList(tagList)
                    .build();

            studyListDetailResList.add(studyListDetailRes);
        }
        return StudyListRes.builder()
                .studyList(studyListDetailResList)
                .totalPages(studyPage.getTotalPages())
                .build();
    }

    @Override
    public void updateStudy(StudyUpdateReq studyUpdateReq) throws BaseExceptionHandler, IOException {
        String title = studyUpdateReq.title();
        int capacity = studyUpdateReq.capacity();
        int lectureId = studyUpdateReq.lectureId();
        boolean isPublic = studyUpdateReq.isPublic();
        String description = studyUpdateReq.description();


        Lecture lecture = null; // TODO: 강의 생기면 수정
//        Lecture lecture = lectureRepository.findByLectureId(lectureId);
        Study study = studyRepository.findByStudyId(studyUpdateReq.studyId());

        study.setTitle(title);
        study.setCapacity(capacity);
        study.setLecture(lecture);
        study.setPublic(isPublic);
        study.setDescription(description);
//        study.setStudyMemberList();

        studyRepository.save(study);
    }

    @Override
    public void deleteStudy(int studyId) throws BaseExceptionHandler, IOException {
        Study study = studyRepository.findByStudyId(studyId);
        studyRepository.delete(study);
    }


}

