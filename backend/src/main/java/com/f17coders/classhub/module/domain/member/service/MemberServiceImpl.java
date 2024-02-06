package com.f17coders.classhub.module.domain.member.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.job.Job;
import com.f17coders.classhub.module.domain.job.dto.response.JobRes;
import com.f17coders.classhub.module.domain.job.repository.JobRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.request.MemberAddInfoReq;
import com.f17coders.classhub.module.domain.member.dto.request.MemberUpdateInfoReq;
import com.f17coders.classhub.module.domain.member.dto.response.MemberGetInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.f17coders.classhub.module.domain.memberTag.repository.MemberTagRepository;
import com.f17coders.classhub.module.domain.memberTag.service.MemberTagService;
import com.f17coders.classhub.module.domain.study.dto.response.StudyBaseRes;
import com.f17coders.classhub.module.domain.study.repository.StudyRepository;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final JobRepository jobRepository;
    private final TagRepository tagRepository;
    private final MemberTagRepository memberTagRepository;
    private final MemberTagService memberTagService;
    private final StudyRepository studyRepository;

    @Override
    public MemberGetInfoRes getInformation(Member member)
        throws BaseExceptionHandler, IOException {    // TODO : 최적화 고려 (쿼리 횟수)
        // 멤버와 직업 정보 가져오기
        Member memberWithJob = memberRepository.findByIdFetchJoinJob(member.getMemberId())
            .orElseThrow(() -> new BaseExceptionHandler(
                ErrorCode.NOT_FOUND_ERROR));

        JobRes jobRes = null;
        if (memberWithJob.getJob() != null) {
            jobRes = JobRes.builder()
                .name(memberWithJob.getJob().getName())
                .jobId(memberWithJob.getJob().getJobId())
                .build();
        }

        // 멤버와 태그 정보 가져오기
        List<MemberTag> memberTagList = memberTagRepository.findByIdFetchJoinMemberAndTag(
            member.getMemberId());

        List<TagRes> tagResList = memberTagList.stream()    // TODO : stream 추후 추가 학습
            .map(memberTag -> TagRes.builder()
                .tagId(memberTag.getTag().getTagId())
                .name(memberTag.getTag().getName())
                .build())
            .collect(Collectors.toList());

        // MemberGetInfoRes 생성
        return MemberGetInfoRes.builder()
            .nickname(member.getNickname())
            .profileImage(member.getProfileImage())
            .tagList(tagResList)
            .job(jobRes)
            .build();
    }

    @Override
    public void addInformation(MemberAddInfoReq memberAddInfoReq, Member member)
        throws BaseExceptionHandler, IOException {

        // 희망 직무 설젇
        Job job = jobRepository.findById(memberAddInfoReq.jobId())
            .orElseThrow(() -> new BaseExceptionHandler(
                ErrorCode.NOT_FOUND_ERROR));

        member.setJob(job);

        // 관심 태그 설정
        for (int tagId : memberAddInfoReq.tagList()) {
            Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new BaseExceptionHandler(
                ErrorCode.NOT_FOUND_ERROR));
            memberTagService.registerMemberTag(member, tag);
        }

        memberRepository.save(member);
    }

    @Override
    public void updateInformation(MemberUpdateInfoReq memberUpdateInfoReq, Member member)
        throws BaseExceptionHandler, IOException {
        // 희망 직무 설젇
        Job job = jobRepository.findById(
            memberUpdateInfoReq.jobId()).orElseThrow(() -> new BaseExceptionHandler(
            ErrorCode.NOT_FOUND_ERROR));// TODO : fetchJoin으로 MemberTag 가져와야할듯

        member.putJob(job);

        // 기존 관심 태그 삭제
        memberTagRepository.deleteAll(member.getMemberTagList());
        member.setMemberTagList(new ArrayList<>());

        // 새로운 관심 태그 설정
        for (int tagId : memberUpdateInfoReq.tagList()) {
            Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new BaseExceptionHandler(
                ErrorCode.NOT_FOUND_ERROR));
            memberTagService.registerMemberTag(member, tag);
        }
    }

    @Override
    public List<StudyBaseRes> getStudyList(Member member) throws BaseExceptionHandler, IOException {
        return studyRepository.findStudyFetchJoinStudyMemberByMemberId(member.getMemberId());
    }
}
