package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.comment.Comment;
import com.f17coders.classhub.module.domain.comment.dto.response.CommentDetailRes;
import com.f17coders.classhub.module.domain.comment.service.CommentService;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityRegisterReq;
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

    private final CommentService commentService;

    private final String LATEST = "latest";     // 최신순
    private final String LIKE = "like";     // 인기순

    @Override
    public int registerCommunity(CommunityRegisterReq communityRegisterReq, Member member) throws BaseExceptionHandler, IOException {
        String title = communityRegisterReq.title();
        String content = communityRegisterReq.content();
        String tagList = communityRegisterReq.tagList();

        List<CommunityTag> communityTagList = new ArrayList<>();

        Community community = Community.createCommunity(title, content, communityTagList, member);
        communityRepository.save(community);

//        community.putMember(member);  // TODO : 시큐리티 구현 후 활성화

        return community.getCommunityId();
    }

    @Override
    public CommunityReadRes readCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findCommunityByCommunityIdFetchJoinComment(communityId);

        List<CommentDetailRes> commentDetailResList = getCommentListRes(community);

        return CommunityReadRes.builder()
                .title(community.getTitle())
                .content(community.getContent())
                .memberNickname("Member Nickname")   // TODO : 시큐리티 적용 후 변경
                .tagList(List.of("Tag1", "Tag2"))   // TODO : Tag 구현 후 수정
                .commentList(commentDetailResList)
                .canUpdate(true)   // TODO : 시큐리티 적용 후 수정
                .canLike(true)   // TODO : 시큐리티 적용 후 수정
                .canScrap(true)   // TODO : 시큐리티 적용 후 수정
                .createdAt(community.getCreatedAt())
                .build();
    }

    @Override
    public CommunityListRes getCommunityList(String order, String tags, String keyword) throws BaseExceptionHandler, IOException {
        List<Community> communityList = communityRepository.findAll();

        List<CommunityListDetailRes> communityListDetailResList = new ArrayList<>();

        for (Community community : communityList) {
            CommunityListDetailRes communityListDetailRes = CommunityListDetailRes.builder()
                    .communityId(community.getCommunityId())
                    .title(community.getTitle())
                    .content(community.getContent())
                    .memberNickname("Nickname")
                    .commentCount(0)    // TODO : comment 구현 후 수정
                    .likeCount(0)   // TODO : like 구현 후 수정
                    .scrapCount(0)  // TODO : scrap 구현 후 수정
                    .tagList(List.of("Tag1", "Tag2"))   // TODO : Tag 구현 후 수정 필요
                    .createdAt(community.getCreatedAt())
                    .build();

            communityListDetailResList.add(communityListDetailRes);
        }

        return CommunityListRes.builder()
                .communityList(communityListDetailResList)
                .build();
    }

    @Override
    public void updateCommunity(int id, CommunityUpdateReq communityUpdateReq, Member member) throws BaseExceptionHandler, IOException {
        String title = communityUpdateReq.title();
        String content = communityUpdateReq.content();
        String tagList = communityUpdateReq.tagList();

        List<CommunityTag> communityTagList = new ArrayList<>();

        Community community = communityRepository.findByCommunityId(id);
        community.setTitle(title);
        community.setContent(content);
        community.setCommunityTagList(communityTagList);

        communityRepository.save(community);
    }

    @Override
    public void deleteCommunity(int communityId, Member member) throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findByCommunityId(communityId);
        communityRepository.delete(community);
    }

    private static List<CommentDetailRes> getCommentListRes(Community community) {
        List<CommentDetailRes> commentListDetailResList = new ArrayList<>();

        for (Comment comment : community.getCommentList()) {
            CommentDetailRes commentDetailRes = CommentDetailRes.builder()
                    .commentId(comment.getCommentId())
                    .content(comment.getContent())
                    .memberNickname("memberNickname")   // TODO : 시큐리티 적용 후 변경
                    .memberProfileImg("member profileImg")  // TODO : 시큐리티 적용 후 변경
                    .canUpdate(true)  // TODO : 시큐리티 적용 후 변경
                    .createdAt(comment.getCreatedAt())
                    .build();

            commentListDetailResList.add(commentDetailRes);
        }

        return commentListDetailResList;
    }
}