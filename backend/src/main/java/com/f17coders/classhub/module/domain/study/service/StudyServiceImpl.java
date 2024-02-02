package com.f17coders.classhub.module.domain.study.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.channel.Channel;
import com.f17coders.classhub.module.domain.channel.repository.ChannelRepository;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.*;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.studyMember.StudyMember;
import com.f17coders.classhub.module.domain.studyMember.repository.StudyMemberRepository;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import com.f17coders.classhub.module.domain.studyTag.repository.StudyTagRepository;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {

    private final StudyRepository studyRepository;
    private final LectureRepository lectureRepository;
    private final MemberRepository memberRepository;
    private final StudyMemberRepository studyMemberRepository;
    private final TagRepository tagRepository;
    private final StudyTagRepository studyTagRepository;
    private final ChannelRepository channelRepository;

    @Override
    public int registerStudy(StudyRegisterReq studyRegisterReq, Member member)
        throws BaseExceptionHandler, IOException {

        String title = studyRegisterReq.title();
        int capacity = studyRegisterReq.capacity();
        int lectureId = studyRegisterReq.lectureId();
        boolean isPublic = studyRegisterReq.isPublic();
        String description = studyRegisterReq.description();
        Lecture lecture = lectureRepository.findByLectureId(lectureId);

        // 스터디 등록
        Study study = Study.createStudy(title, capacity, description, isPublic, lecture, member);
        studyRepository.save(study);

        // 태그 등록
        for (int tagId : studyRegisterReq.tagList()) {

            Tag tag = tagRepository.findTagByTagId(tagId);

            StudyTag studyTag = StudyTag.createStudyTag(tag);
            studyTag.putStudy(study);

            studyTagRepository.save(studyTag);
        }

        // 스터디장의 스터디 입장
        StudyMember studyMember = StudyMember.createStudyMember();

        studyMember.putMember(member);
        studyMember.putStudy(study);

        studyMemberRepository.save(studyMember);

        // 스터디 생성시 기본 채널 3개 생성
        String[] BasicChannelName = {"공지사항", "학습 인증", "잡담방"};
        boolean[] isDeleteList = {false, true, true};

        for (int i = 0; i < BasicChannelName.length; i++) {
            Channel channel = Channel.createChannel(BasicChannelName[i], study.getStudyId(),
                new ArrayList<>(), isDeleteList[i]);
            channelRepository.save(channel);
        }

        return study.getStudyId();
    }

    @Override
    public StudyReadTagRes readStudy(int studyId) throws BaseExceptionHandler, IOException {
        StudyReadRes studyReadRes = studyRepository.findStudyByStudyIdFetchJoinLecture(
            studyId);

        List<TagRes> tagList = tagRepository.findTagByStudyIdFetchJoinStudyTag(studyId);

        StudyReadTagRes studyReadTagRes = StudyReadTagRes.builder()
            .studyId(studyId)
            .title(studyReadRes.title())
            .currentMembers(studyReadRes.currentMembers())
            .capacity(studyReadRes.capacity())
            .studyLeaderId(studyReadRes.studyLeaderId())
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

        List<StudyReadRes> studyReadResList = studyRepository.findStudyByKeywordFetchJoinLecture(
            keyword, pageable);
        int totalStudy = studyRepository.countStudyByKeyword(keyword); // 전체 목록 개수

        int totalPages = (int) Math.ceil((double) totalStudy / pageable.getPageSize());

        List<StudyReadTagRes> studyReadTagResList = new ArrayList<>();

        // 태그 매핑
        for (StudyReadRes study : studyReadResList) {

            int studyId = study.studyId();

            studyReadTagResList.add(
                StudyReadTagRes.builder()
                    .studyId(studyId)
                    .title(study.title())
                    .currentMembers(study.currentMembers())
                    .capacity(study.capacity())
                    .studyLeaderId(study.studyLeaderId())
                    .description(study.description())
                    .isPublic(study.isPublic())
                    .lecture(study.lecture())
                    .tagList(tagRepository.findTagByStudyIdFetchJoinStudyTag(studyId))
                    .build()
            );
        }

        return StudyListRes.builder()
            .studyList(studyReadTagResList)
            .totalPages(totalPages)
            .build();
    }

    @Override
    public void updateStudy(StudyUpdateReq studyUpdateReq)
        throws BaseExceptionHandler, IOException {

        int studyId = studyUpdateReq.studyId();
        String title = studyUpdateReq.title();
        int capacity = studyUpdateReq.capacity();
        int lectureId = studyUpdateReq.lectureId();
        boolean isPublic = studyUpdateReq.isPublic();
        String description = studyUpdateReq.description();
        List<Integer> tagList = studyUpdateReq.tagList();
        Lecture lecture = lectureRepository.findByLectureId(lectureId);

        Study study = studyRepository.findByStudyId(studyId);

        study.setTitle(title);
        study.setCapacity(capacity);
        study.setLecture(lecture);
        study.setPublic(isPublic);
        study.setDescription(description);

        // 스터디 태그 삭제
        studyTagRepository.deleteStudyTagsByStudyId(studyId);

        // 스터디 태그 등록
        for (int tagId : tagList) {
            Tag tag = tagRepository.findTagByTagId(tagId);

            StudyTag studyTag = StudyTag.createStudyTag(tag);
            studyTag.putStudy(study);

            studyTagRepository.save(studyTag);
        }

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

    @Override
    public StudyMemberListRes getStudyMemberList(int studyId)
        throws BaseExceptionHandler, IOException {

        Study study = studyRepository.findByStudyId(studyId);

        Member leader = study.getStudyLeader();

        List<MemberStudyInfoRes> memberStudyInfoResList = memberRepository.findMemberFetchJoinStudyMemberByStudyId(
            studyId);

        MemberStudyInfoRes studyLeader = null;

        for (MemberStudyInfoRes memberStudyInfoRes : memberStudyInfoResList) {
            if (memberStudyInfoRes.memberId() == leader.getMemberId()) {
                studyLeader = memberStudyInfoRes;
                break;
            }
        }
        memberStudyInfoResList.remove(studyLeader);

        return StudyMemberListRes.builder()
            .leader(studyLeader)
            .studyMemberList(memberStudyInfoResList).build();
    }

}

