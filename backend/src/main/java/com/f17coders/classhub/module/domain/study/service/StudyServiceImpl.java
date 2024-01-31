package com.f17coders.classhub.module.domain.study.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.*;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.studyMember.repository.StudyMemberRepository;
import com.f17coders.classhub.module.domain.studyTag.repository.StudyTagRepository;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {

    private final StudyRepository studyRepository;
    private final LectureRepository lectureRepository;
    private final StudyMemberRepository studyMemberRepository;
    private final StudyTagRepository studyTagRepository;

    @Override
    public int registerStudy(StudyRegisterReq studyRegisterReq, Member member)
        throws BaseExceptionHandler, IOException {
        String title = studyRegisterReq.title();
        int capacity = studyRegisterReq.capacity();
        int lectureId = studyRegisterReq.lectureId();
        boolean isPublic = studyRegisterReq.isPublic();
        String description = studyRegisterReq.description();

        Lecture lecture = null; // TODO: 강의 생기면 수정
//        Lecture lecture = lectureRepository.findByLectureId(lectureId);

        // 스터디 등록
        Study study = Study.createStudy(title, capacity, description, isPublic, lecture, member);

        studyRepository.save(study);

        return study.getStudyId();
    }

    @Override
    public StudyReadTagRes readStudy(int studyId) throws BaseExceptionHandler, IOException {
        List<StudyReadRes> studyReadResLIst = studyRepository.findStudyByStudyIdFetchJoinLectureJoinTag(
            studyId);

        List<TagRes> tagList = new ArrayList<>();

        for (StudyReadRes study : studyReadResLIst) {
            TagRes tag = study.tag();

            tagList.add(tag);
        }

        StudyReadRes studyReadRes = studyReadResLIst.get(0);

        StudyReadTagRes studyReadTagRes = StudyReadTagRes.builder()
            .studyId(studyId)
            .title(studyReadRes.title())
            .currentMembers(studyReadRes.currentMembers())
            .capacity(studyReadRes.capacity())
            .studyReaderId(studyReadRes.studyReaderId())
            .description(studyReadRes.description())
            .isPublic(studyReadRes.isPublic())
            .tagList(tagList)
            .lecture(studyReadRes.lecture())
            .build();

        return studyReadTagRes;
    }

    @Override
    public StudyListRes getStudyList(String keyword, Pageable pageable)
        throws BaseExceptionHandler, IOException {

        List<StudyListDetailRes> studyListDetailResList = studyRepository.findStudyByStudyIdFetchJoinTag(
            keyword, pageable);
        int totalStudy = studyRepository.countStudyByKeyword(keyword); // 전체 목록 개수

        int totalPages = (int) Math.ceil((double) totalStudy / pageable.getPageSize());
        Map<Integer, List<TagRes>> studyTagMap = new HashMap<>();

        // 스터디 목록 조회 및 태그 리스트
        for (StudyListDetailRes study : studyListDetailResList) {
            int studyId = study.studyId();

            TagRes tag = study.tag();

            if (studyTagMap.containsKey(studyId)) {
                studyTagMap.get(studyId).add(tag);
            } else {
                List<TagRes> tags = new ArrayList<>();
                tags.add(tag);
                studyTagMap.put(studyId, tags);
            }
        }

        List<StudyListDetailTagRes> studyListDetailTagResList = new ArrayList<>();

        // 태그 매핑
        for (StudyListDetailRes study : studyListDetailResList) {

            int studyId = study.studyId();

            studyListDetailTagResList.add(
                StudyListDetailTagRes.builder()
                    .studyId(studyId)
                    .title(study.title())
                    .currentMembers(study.currentMembers())
                    .capacity(study.capacity())
                    .studyReaderId(study.studyReaderId())
                    .description(study.description())
                    .isPublic(study.isPublic())
                    .tagList(studyTagMap.get(studyId))
                    .build()
            );
        }

        // 중복제거
        studyListDetailTagResList = studyListDetailTagResList.stream()
            .distinct()
            .collect(Collectors.toList());

        return StudyListRes.builder()
            .studyList(studyListDetailTagResList)
            .totalPages(totalPages)
            .build();
    }

    @Override
    public void updateStudy(StudyUpdateReq studyUpdateReq)
        throws BaseExceptionHandler, IOException {
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

    @Override
    public int getEnterCode(int studyId) throws BaseExceptionHandler, IOException {
        return studyRepository.findEnterCodeByStudyId(studyId);
    }

}

