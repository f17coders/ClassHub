package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.dto.request.CreateCommunityReq;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import com.f17coders.classhub.module.domain.member.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {
    private final CommunityRepository communityRepository;

    @Override
    public int registerCommunity(CreateCommunityReq createCommunityReq, Member member) throws BaseExceptionHandler, IOException {
        String title = createCommunityReq.title();
        String content = createCommunityReq.content();
        String tagList = createCommunityReq.tagList();

        List<CommunityTag> communityTagList = new ArrayList<>();

        Community community = Community.createCommunity(title, content, communityTagList, member);
        communityRepository.save(community);

        return community.getCommunityId();
    }

    @Override
    public Community searchCommunity(int communityId) throws BaseExceptionHandler, IOException {
        return communityRepository.searchCommunityById(communityId);
    }
}