package com.f17coders.classhub.module.domain.communityLike.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityLike.repository.CommunityLikeRepository;
import com.f17coders.classhub.module.domain.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityLikeServiceImpl implements CommunityLikeService{
    private final CommunityLikeRepository communityLikeRepository;
    private final CommunityRepository communityRepository;

    @Override
    public void likeCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findByCommunityId(communityId);

        CommunityLike communityLike = CommunityLike.createCommunityLike(community, null);   // TODO : 시큐리티 적용 후 member로 변경
        communityLikeRepository.save(communityLike);

        communityLike.putCommunity(community);
//        communityLike.putMember(member);   // TODO : 시큐리티 적용 후 주석 헤재
    }

    @Override
    public void unlikeCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException {
//        CommunityLike communityLike = communityLikeRepository.findByCommunity_CommunityIdAndMember_MemberId(communityId, member.getMemberId());     // TODO : 시큐리티 적용 후 주석 해제
        CommunityLike communityLike = communityLikeRepository.findFirstByCommunity_CommunityId(communityId);// TODO : 시큐리티 적용 후 삭제

        communityLikeRepository.delete(communityLike);
    }
}