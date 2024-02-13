package com.f17coders.classhub.module.domain.study.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.channel.Channel;
import com.f17coders.classhub.module.domain.channel.dto.response.ChannelDetailListRes;
import com.f17coders.classhub.module.domain.channel.repository.ChannelRepository;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lecture.repository.LectureRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.response.MemberStudyInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.message.Message;
import com.f17coders.classhub.module.domain.message.repository.MessageRepository;
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
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.f17coders.classhub.global.exception.code.ErrorCode.*;

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
    private final MessageRepository messageRepository;

    @Override
    @Transactional
    public int registerStudy(StudyRegisterReq studyRegisterReq, Member member)
            throws BaseExceptionHandler {

        String title = studyRegisterReq.title();
        int capacity = studyRegisterReq.capacity();
        int lectureId = studyRegisterReq.lectureId();
        boolean isPublic = studyRegisterReq.isPublic();
        String description = studyRegisterReq.description();
        Lecture lecture = lectureRepository.findByLectureId(lectureId);

        // 스터디 등록
        Study study = Study.createStudy(title, capacity, description, isPublic, lecture, member);
        studyRepository.save(study);

        List<Tag> tagList = new ArrayList<>();
        // 태그 등록
        for (int tagId : studyRegisterReq.tagList()) {

            Tag tag = tagRepository.findTagByTagId(tagId);

            if (tag == null) {
                throw new BaseExceptionHandler("태그가 존재하지 않습니다.", NOT_FOUND_ERROR);
            }

            StudyTag studyTag = StudyTag.createStudyTag(tag);
            studyTag.putStudy(study);
            tagList.add(tag);

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

        String text = makeText(study, tagList, member, lecture);

        Map<String, String> sender = new HashMap<>();

        sender.put("memberId", null);
        sender.put("nickname", "공지봇");
        sender.put("profileImage", null);

        Message message = Message.createMessage(sender, text);

        messageRepository.save(message);

        for (int i = 0; i < BasicChannelName.length; i++) {

            List<Message> messageList = new ArrayList<>();

            if(i == 0) {
                messageList.add(message);
            }

            Channel channel = Channel.createChannel(BasicChannelName[i], study.getStudyId(),
                    messageList, isDeleteList[i]);

            channelRepository.save(channel);
        }

        return study.getStudyId();
    }

    @Override
    public StudyReadTagRes readStudy(int studyId) throws BaseExceptionHandler {
        StudyReadRes studyReadRes = studyRepository.findStudyByStudyIdFetchJoinLecture(
                studyId);

        if (studyReadRes == null) {
            throw new BaseExceptionHandler(NOT_FOUND_STUDY_EXCEPTION);
        }

        List<TagRes> tagList = tagRepository.findTagByStudyIdFetchJoinStudyTag(studyId);

        return StudyReadTagRes.builder()
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
    }

    @Override
    public StudyListRes getStudyList(String keyword, Pageable pageable)
            throws BaseExceptionHandler {

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
    @Transactional
    public void updateStudy(StudyUpdateReq studyUpdateReq, Member member)
            throws BaseExceptionHandler {

        int studyId = studyUpdateReq.studyId();
        String title = studyUpdateReq.title();
        int capacity = studyUpdateReq.capacity();
        int lectureId = studyUpdateReq.lectureId();
        boolean isPublic = studyUpdateReq.isPublic();
        String description = studyUpdateReq.description();
        List<Integer> tagList = studyUpdateReq.tagList();
        Lecture lecture = lectureRepository.findByLectureId(lectureId);

        Study study = studyRepository.findByStudyId(studyId);

        if (study == null) {
            throw new BaseExceptionHandler(NOT_FOUND_STUDY_EXCEPTION);
        }

        if (study.getStudyLeader().getMemberId() != member.getMemberId()) {
            throw new BaseExceptionHandler(FORBIDDEN_ERROR_LEADER);
        }

        study.setTitle(title);
        study.setCapacity(capacity);
        study.setLecture(lecture);

        // 공개방 -> 비공개방 전환시 참여코드 재생성
        if (!isPublic && study.isPublic()) {
            study.setEnterCode();
        }

        study.setPublic(isPublic);
        study.setDescription(description);

        // 스터디 태그 삭제
        studyTagRepository.deleteStudyTagsByStudyId(studyId);

        List<Tag> tags = new ArrayList<>();

        // 스터디 태그 등록
        for (int tagId : tagList) {
            Tag tag = tagRepository.findTagByTagId(tagId);

            StudyTag studyTag = StudyTag.createStudyTag(tag);
            studyTag.putStudy(study);

            tags.add(tag);
            studyTagRepository.save(studyTag);
        }

        studyRepository.save(study);

        String text = makeText(study, tags, member, lecture);

        Map<String, String> sender = new HashMap<>();

        sender.put("memberId", null);
        sender.put("nickname", "공지봇");
        sender.put("profileImage", null);

        Message message = Message.createMessage(sender, text);
        messageRepository.save(message);

        List<ChannelDetailListRes> channel = channelRepository.findByStudyId(studyId);

        for(ChannelDetailListRes channelDetailListRes: channel) {
            if(!channelDetailListRes.isDelete()) {
                Channel channel1 = channelRepository.findChannelByChannelId(channelDetailListRes.channelId());
                channel1.getMessageList().add(message);
                channelRepository.save(channel1);
                break;
            }
        }

    }

    @Override
    @Transactional
    public void deleteStudy(int studyId, int memberId) throws BaseExceptionHandler {

        Study study = studyRepository.findByStudyId(studyId);

        if (study == null) {
            throw new BaseExceptionHandler(NOT_FOUND_STUDY_EXCEPTION);
        }

        if (study.getStudyLeader().getMemberId() != memberId) {
            throw new BaseExceptionHandler(FORBIDDEN_ERROR_LEADER);
        }

        studyRepository.delete(study);
    }

    @Override
    public int getEnterCodeLeader(int studyId, int memberId) throws BaseExceptionHandler {

        Study study = studyRepository.findByStudyId(studyId);

        if (study == null) {
            throw new BaseExceptionHandler(NOT_FOUND_STUDY_EXCEPTION);
        }

        if (study.getStudyLeader().getMemberId() != memberId) {
            throw new BaseExceptionHandler(FORBIDDEN_ERROR_LEADER);
        }

        return study.getEnterCode();
    }

    @Override
    public boolean isValidEnterCode(int studyId, int enterCode) throws BaseExceptionHandler {

        Study study = studyRepository.findByStudyId(studyId);

        if (study == null) {
            throw new BaseExceptionHandler(NOT_FOUND_STUDY_EXCEPTION);
        }

        if (study.getEnterCode() != enterCode) {
            throw new BaseExceptionHandler(NOT_VALID_CODE);
        }

        return true;
    }

    @Override
    public StudyMemberListRes getStudyMemberList(int studyId)
            throws BaseExceptionHandler {

        Study study = studyRepository.findByStudyId(studyId);

        if (study == null) {
            throw new BaseExceptionHandler(NOT_FOUND_STUDY_EXCEPTION);
        }

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

    private String makeText(Study study, List<Tag> tagList, Member member, Lecture lecture) {
        String text = "<div style=\"margin-top: 1px; padding: 8px; border-radius: 1.5px; box-shadow: 0px 0px 5px lightgray;\">" +
                "<h2 style=\"margin-left: 5px; margin-bottom: 8px;\">"+ study.getTitle() +"</h2>" +
                "<h4 style=\"margin-left: 5px; margin-bottom: 8px;\">스터디장: "+ member.getNickname() +"</h4>" +
                "<h3 style=\"margin-left: 5px; margin-bottom: 8px;\">"+study.getDescription()+"</h3>" +
                "<div style=\"display: flex; flex-wrap: wrap; justify-content: flex-start;\">";

        for(Tag t : tagList ) {
            text += "<span style=\"margin: 5px; background-color: #1976d2; color: white; padding: 5px; border-radius: 3px; width: 20%;\">"+ t.getName()+"</span>";
        }
        text += "</div>" +
                "<a href=\"" + lecture.getSiteLink() + "\" style=\"color: #1976d2; margin-top: 8px; margin-bottom: 8px; display: block;\">" +
                lecture.getName() + " 바로가기" +
                "</a>" +
                "</div>";

        return text;
    }
}

