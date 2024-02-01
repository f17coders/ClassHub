package com.f17coders.classhub.module.domain.communityScrap.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import com.f17coders.classhub.module.domain.communityScrap.repository.CommunityScrapRepository;
import com.f17coders.classhub.module.domain.member.Member;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CommunityScrapServiceImpl implements CommunityScrapService {

    private final CommunityScrapRepository communityScrapRepository;
    private final CommunityRepository communityRepository;

    @Override
    public void scrapCommunity(int communityId, Member member)
        throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findById(communityId)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

        CommunityScrap communityScrap = CommunityScrap.createCommunityScrap(community, member);
        communityScrapRepository.save(communityScrap);
    }

    @Override
    public void unscrapCommunity(int communityId, Member member)
        throws BaseExceptionHandler, IOException {
        CommunityScrap communityScrap = communityScrapRepository.findByCommunity_CommunityIdAndMember(
                communityId, member)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

        communityScrapRepository.delete(communityScrap);
    }

    @Override
    public boolean canScrap(Community community, Member member) {
        Optional<CommunityScrap> communityScrap = communityScrapRepository.findByCommunity_CommunityIdAndMember(
            community.getCommunityId(), member);

        return communityScrap.isEmpty();
    }
}