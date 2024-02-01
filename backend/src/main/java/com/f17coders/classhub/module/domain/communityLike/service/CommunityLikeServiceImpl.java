package com.f17coders.classhub.module.domain.communityLike.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityLike.repository.CommunityLikeRepository;
import com.f17coders.classhub.module.domain.member.Member;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CommunityLikeServiceImpl implements CommunityLikeService {

    private final CommunityLikeRepository communityLikeRepository;
    private final CommunityRepository communityRepository;

    @Override
    public void likeCommunity(int communityId, Member member)
        throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findById(communityId)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

        CommunityLike communityLike = CommunityLike.createCommunityLike(community, member);
        communityLikeRepository.save(communityLike);
    }

    @Override
    public void unlikeCommunity(int communityId, Member member)
        throws BaseExceptionHandler, IOException {
        CommunityLike communityLike = communityLikeRepository.findByCommunity_CommunityIdAndMember(
                communityId, member)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

        communityLikeRepository.delete(communityLike);
    }

    @Override
    public boolean canLike(Community community, Member member) {
        Optional<CommunityLike> communityLike = communityLikeRepository.findByCommunity_CommunityIdAndMember(
            community.getCommunityId(), member);

        return communityLike.isEmpty();
    }
}