package com.f17coders.classhub.module.domain.channel.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.channel.Channel;
import com.f17coders.classhub.module.domain.channel.dto.request.ChannelRegisterReq;
import com.f17coders.classhub.module.domain.channel.dto.request.ChannelUpdateReq;
import com.f17coders.classhub.module.domain.channel.dto.response.ChannelDetailListRes;
import com.f17coders.classhub.module.domain.channel.repository.ChannelRepository;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.message.Message;

import java.util.ArrayList;
import java.util.List;

import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.studyMember.repository.StudyMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.f17coders.classhub.global.exception.code.ErrorCode.FORBIDDEN_ERROR_STUDY;

@Log4j2
@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;
    private final StudyRepository studyRepository;
    private final StudyMemberRepository studyMemberRepository;

    @Override
    @Transactional
    public String registerChannel(ChannelRegisterReq channelRegisterReq, int memberId) throws BaseExceptionHandler {

        String name = channelRegisterReq.name();
        int studyId = channelRegisterReq.studyId();

        studyException(studyId, memberId);
        memberException(studyId, memberId);

        List<Message> messageList = new ArrayList<>();

        Channel channel = Channel.createChannel(name, studyId, messageList, true);
        channelRepository.save(channel);

        return channel.getChannelId();
    }

    @Override
    public List<ChannelDetailListRes> getChannelList(int studyId, int memberId) throws BaseExceptionHandler {
        memberException(studyId, memberId);

        return channelRepository.findByStudyId(studyId);
    }

    @Override
    @Transactional
    public void updateChannel(ChannelUpdateReq channelUpdateReq, int memberId) throws BaseExceptionHandler {

        Channel channel = channelRepository.findChannelByChannelId(channelUpdateReq.channelId());

        if (channel == null) {
            throw new BaseExceptionHandler("존재하지 않는 채널입니다.", ErrorCode.NOT_FOUND_ERROR);
        }
        memberException(channel.getStudyId(), memberId);

        channel.setName(channelUpdateReq.name());
        channelRepository.save(channel);
    }

    @Override
    @Transactional
    public void deleteChannel(String channelId, int memberId) throws BaseExceptionHandler {

        Channel channel = channelRepository.findChannelByChannelId(channelId);

        if (channel == null) {
            throw new BaseExceptionHandler("존재하지 않는 채널입니다.", ErrorCode.NOT_FOUND_ERROR);
        }
        memberException(channel.getStudyId(), memberId);
        channelRepository.delete(channel);
    }

    @Override
    @Transactional
    public void deleteAllChannel(int studyId, int memberId) throws BaseExceptionHandler {
        memberException(studyId, memberId);
        channelRepository.deleteByStudyId(studyId);
    }

    private void studyException(int studyId, int memberId) {
        if (studyRepository.findByStudyId(studyId) == null) {
            throw new BaseExceptionHandler(ErrorCode.NOT_FOUND_STUDY_EXCEPTION);
        }
    }

    private void memberException(int studyId, int memberId) {
        if (studyMemberRepository.findByStudy_StudyIdAndMember_MemberId(studyId, memberId) == null) {
            throw new BaseExceptionHandler(FORBIDDEN_ERROR_STUDY);
        }
    }
}