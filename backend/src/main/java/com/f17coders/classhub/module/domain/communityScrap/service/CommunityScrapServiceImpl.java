package com.f17coders.classhub.module.domain.communityScrap.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import com.f17coders.classhub.module.domain.communityScrap.repository.CommunityScrapRepository;
import com.f17coders.classhub.module.domain.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CommunityScrapServiceImpl implements CommunityScrapService {
    private final CommunityScrapRepository communityScrapRepository;
    private final CommunityRepository communityRepository;

    @Override
    public void scrapCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findByCommunityId(communityId);

        CommunityScrap communityScrap = CommunityScrap.createCommunityScrap(community, null);   // TODO : 시큐리티 적용 후 member로 변경
        communityScrapRepository.save(communityScrap);

        communityScrap.putCommunity(community);
//        communityScrap.putMember(member);   // TODO : 시큐리티 적용 후 주석 헤재
    }

    @Override
    public void unscrapCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException {
//        CommunityScrap communityScrap = communityScrapRepository.findByCommunity_CommunityIdAndMember_MemberId(communityId, member.getMemberId());     // TODO : 시큐리티 적용 후 주석 해제
        CommunityScrap communityScrap = communityScrapRepository.findFirstByCommunity_CommunityId(communityId);// TODO : 시큐리티 적용 후 삭제

        communityScrapRepository.delete(communityScrap);
    }
}