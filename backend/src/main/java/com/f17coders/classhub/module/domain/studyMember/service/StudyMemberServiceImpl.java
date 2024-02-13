package com.f17coders.classhub.module.domain.studyMember.service;


import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.channel.Channel;
import com.f17coders.classhub.module.domain.channel.dto.response.ChannelDetailListRes;
import com.f17coders.classhub.module.domain.channel.repository.ChannelRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.message.Message;
import com.f17coders.classhub.module.domain.message.repository.MessageRepository;
import com.f17coders.classhub.module.domain.study.Study;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.studyMember.StudyMember;
import com.f17coders.classhub.module.domain.studyMember.repository.StudyMemberRepository;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.f17coders.classhub.global.exception.code.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class StudyMemberServiceImpl implements StudyMemberService {

    private final StudyRepository studyRepository;
    private final StudyMemberRepository studyMemberRepository;
    private final MessageRepository messageRepository;
    private final ChannelRepository channelRepository;

    @Override
    @Transactional
    public void enterStudy(int studyId, Member member) {

        Study study = studyRepository.findByStudyId(studyId);

        StudyMember existMember = studyMemberRepository.findByStudy_StudyIdAndMember_MemberId(
                studyId, member.getMemberId());

        if (study == null) {
            throw new BaseExceptionHandler(NOT_FOUND_STUDY_EXCEPTION);
        }

        if (study.getCapacity() <= studyMemberRepository.countByStudy_StudyId(studyId)) {
            throw new BaseExceptionHandler(LIMIT_EXCEEDED);
        }

        if (existMember != null) {
            throw new BaseExceptionHandler(PARTICIPATE_FAILED_ALREADY_EXISTS);
        }

        StudyMember studyMember = StudyMember.createStudyMember();
        studyMember.putMember(member);
        studyMember.putStudy(study);

        studyMemberRepository.save(studyMember);

        String text = member.getNickname() + "님이 스터디에 입장하였습니다.";

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
    public void exitStudy(int studyId, Member member) {
        StudyMember studyMember = studyMemberRepository.findByStudy_StudyIdAndMember_MemberId(
                studyId, member.getMemberId());

        Study study = studyRepository.findByStudyId(studyId);

        if (study == null) {
            throw new BaseExceptionHandler(NOT_FOUND_STUDY_EXCEPTION);
        }

        if (studyMember == null) {
            throw new BaseExceptionHandler(NOT_EXISTS_VALUE);
        }

        if (study.getStudyLeader().getMemberId() == member.getMemberId()) {
            throw new BaseExceptionHandler("스터디장은 스터디를 나갈 수 없습니다.", FORBIDDEN_ERROR);
        }

        String text = member.getNickname() + "님이 스터디에서 퇴장하였습니다.";

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

        studyMemberRepository.delete(studyMember);
    }
}
