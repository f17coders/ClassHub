package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityCreateReq;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityUpdateReq;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityListDetailRes;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityListRes;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityReadRes;
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
    public int registerCommunity(CommunityCreateReq communityCreateReq, Member member) throws BaseExceptionHandler, IOException {
        String title = communityCreateReq.title();
        String content = communityCreateReq.content();
        String tagList = communityCreateReq.tagList();

        List<CommunityTag> communityTagList = new ArrayList<>();

        Community community = Community.createCommunity(title, content, communityTagList, member);
        communityRepository.save(community);

        return community.getId();
    }

    @Override
    public CommunityReadRes readCommunity(int id, Member member) throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findById(id);

        return CommunityReadRes.builder()
                .title(community.getTitle())
                .content(community.getContent())
                .memberNickname("Member Nickname")   // TODO : 시큐리티 적용 후 member.getNickname()으로 변경 필요
                .tagList(List.of("Tag1", "Tag2"))   // TODO : Tag 구현 후 수정 필요
                .commentList(List.of("Tag1", "Tag2"))   // TODO : Comment 구현 후 수정 필요
                .canUpdate(true)   // TODO : 시큐리티 적용 후 수정 필요
                .canLike(true)   // TODO : 시큐리티 적용 후 수정 필요
                .canScrap(true)   // TODO : 시큐리티 적용 후 수정 필요
                .createdAt(community.getCreatedAt())
                .build();
    }

    @Override
    public CommunityListRes getCommunityList() throws BaseExceptionHandler, IOException {
        List<Community> communityList = communityRepository.findAll();

        List<CommunityListDetailRes> communityListDetailResList = new ArrayList<>();

        for (Community community : communityList) {
            CommunityListDetailRes communityListDetailRes = CommunityListDetailRes.builder()
                    .communityId(community.getId())
                    .title(community.getTitle())
                    .content(community.getContent())
                    .memberNickname("Nickname")
                    .commentCount(0)
                    .likeCount(0)
                    .scrapCount(0)
                    .tagList(List.of("Tag1", "Tag2"))   // TODO : Tag 구현 후 수정 필요
                    .createdAt(community.getCreatedAt())
                    .build();

            communityListDetailResList.add(communityListDetailRes);
        }

        return CommunityListRes.builder()
                .communityListDetailResList(communityListDetailResList)
                .build();
    }

    @Override
    public int updateCommunity(int id, CommunityUpdateReq communityUpdateReq, Member member) throws BaseExceptionHandler, IOException {
        String title = communityUpdateReq.title();
        String content = communityUpdateReq.content();
        String tagList = communityUpdateReq.tagList();

        List<CommunityTag> communityTagList = new ArrayList<>();

        Community community = communityRepository.findById(id);
        community.setTitle(title);
        community.setContent(content);
        community.setCommunityTagList(communityTagList);

        communityRepository.save(community);

        return community.getId();
    }

    @Override
    public void deleteCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findById(communityId);
        communityRepository.delete(community);
    }
}