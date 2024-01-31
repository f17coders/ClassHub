package com.f17coders.classhub.module.domain.member.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
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
import java.util.Optional;
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
    public int registerMember(String nickname) throws BaseExceptionHandler, IOException {
        String profileImg = "https://hit-run-seoul.org/wp-content/uploads/2011/06/2011_06_16_cookiemonster_290x290.png";

        Member member = Member.createMember(nickname, profileImg);

        Member saveMember = memberRepository.save(member);

        return saveMember.getMemberId();
    }

    @Override
    public MemberGetInfoRes getInformation(Member member)
        throws BaseExceptionHandler, IOException {    // TODO : 최적화 고려 (쿼리 횟수)
        JobRes jobRes = JobRes.builder()
            .name(member.getJob().getName())
            .jobId(member.getJob().getJobId())
            .build();

        // 관심 태그 조회

        List<MemberTag> memberTagList = memberTagRepository.findByMemberIdFetchJoinMemberAndFetchJoinTag(
            member.getMemberId());

        List<TagRes> tagResList = new ArrayList<>();

        for (MemberTag memberTag : memberTagList) {
            TagRes tagRes = TagRes.builder()
                .tagId(memberTag.getTag().getTagId())
                .name(memberTag.getTag().getName())
                .build();

            tagResList.add(tagRes);
        }

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
        Optional<Job> job = jobRepository.findById(memberAddInfoReq.jobId());
        if (job.isPresent()) {
            member.setJob(job.get());
        }

        // 관심 태그 설정
        for (int tagId : memberAddInfoReq.tagList()) {
            Optional<Tag> tag = tagRepository.findById(tagId);
            memberTagService.registerMemberTag(member, tag.get());
        }
    }

    @Override
    public void updateInformation(MemberUpdateInfoReq memberUpdateInfoReq, Member member)
        throws BaseExceptionHandler, IOException {
        // 희망 직무 설젇
        Optional<Job> job = jobRepository.findById(memberUpdateInfoReq.jobId());
        if (job.isPresent()) {
            member.putJob(job.get());
        }

        // 기존 관심 태그 삭제
        List<MemberTag> originalMemberTagList = memberTagRepository.findAllByMember(member);

        for (MemberTag memberTag : member.getMemberTagList()) {
            memberTagRepository.delete(memberTag);
        }

        // 새로운 관심 태그 설정
        for (int tagId : memberUpdateInfoReq.tagList()) {
            Optional<Tag> tag = tagRepository.findById(tagId);
            memberTagService.registerMemberTag(member, tag.get());
        }
    }

    @Override
    public List<StudyBaseRes> getStudyList(Member member) throws BaseExceptionHandler, IOException {
        return studyRepository.findStudyFetchJoinStudyMemberByMemberId(member.getMemberId());
    }
}
