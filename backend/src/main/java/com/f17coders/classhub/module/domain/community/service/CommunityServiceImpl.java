package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
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
import com.f17coders.classhub.module.domain.communityLike.service.CommunityLikeService;
import com.f17coders.classhub.module.domain.communityScrap.service.CommunityScrapService;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import com.f17coders.classhub.module.domain.communityTag.repository.CommunityTagRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.tag.Tag;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;
    private final TagRepository tagRepository;
    private final CommunityTagRepository communityTagRepository;

    private final CommunityLikeService communityLikeService;
    private final CommunityScrapService communityScrapService;
    private final CommentService commentService;

    @Override
    public int registerCommunity(CommunityRegisterReq communityRegisterReq, Member member)
        throws BaseExceptionHandler, IOException {
        String title = communityRegisterReq.title();
        String content = communityRegisterReq.content();

        Community community = Community.createCommunity(title, content, member);

        Community saveCommunity = communityRepository.save(community);

        // TagId를 이용하여 Community Tag 등록
        List<Integer> tagListReq = communityRegisterReq.tagList();

        tagListReq.stream()
            .map(tagId -> tagRepository.findById(tagId)
                .orElseThrow(
                    () -> new BaseExceptionHandler("존재하지 않는 태그입니다.", ErrorCode.NOT_FOUND_ERROR)))
            .map(tag -> CommunityTag.createCommunityTag(community, tag))
            .forEach(communityTag -> communityTagRepository.save(communityTag));

        return saveCommunity.getCommunityId();
    }

    @Override
    public CommunityReadRes readCommunity(int communityId, Member member)
        throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findCommunityByCommunityIdForCommunityReadRes(
            communityId);

        // 댓글 목록
        List<CommentDetailRes> commentDetailResList = community.getCommentList().stream()
            .map(comment -> commentService.convertToCommentListRes(comment, member))
            .collect(Collectors.toList());

        // 커뮤니티 태그 조회
        List<TagRes> tagResList = community.getCommunityTagSet().stream()
            .map(communityTag -> TagRes.builder()
                .tagId(communityTag.getTag().getTagId())
                .name(communityTag.getTag().getName())
                .build())
            .collect(Collectors.toList());

        return CommunityReadRes.builder()
            .communityId(communityId)
            .title(community.getTitle())
            .content(community.getContent())
            .memberNickname(community.getMember().getNickname())
            .tagList(tagResList)
            .commentCount(community.getCommentList().size())
            .commentList(commentDetailResList)
            .canUpdate(isWriter(member, community))
            .canLike(communityLikeService.canLike(community, member))
            .canScrap(communityScrapService.canScrap(community, member))
            .createdAt(community.getCreateTime())
            .build();
    }

    @Override
    public CommunityListRes getCommunityList(String tags, String keyword, Pageable pageable)
        throws BaseExceptionHandler, IOException {  // TODO : 반드시 최적화 필요

        List<Integer> tagIdList = getTagList(tags);

        long totalCommunities = communityRepository.countPageByKeywordAndTagIdListJoinCommunityTagJoinTag(
            tagIdList, keyword, pageable);

        long totalPages = (long) Math.ceil((double) totalCommunities / pageable.getPageSize());

        List<CommunityListDetailRes> communityListDetailResList = communityRepository.findPageByKeywordAndTagIdListJoinCommunityTagJoinTag(
                tagIdList, keyword,
                pageable).stream()
            .map(community -> CommunityListDetailRes.builder()
                .communityId(community.getCommunityId())
                .title(community.getTitle())
                .content(community.getContent())
                .memberNickname(community.getMember().getNickname())
                .commentCount(community.getCommentList().size())
                .likeCount(community.getCommunityLikeSet().size())
                .scrapCount(community.getCommunityScrapSet().size())
                .createdAt(community.getCreateTime())
                .tagList(community.getCommunityTagSet().stream()
                    .map(communityTag -> TagRes.builder()
                        .tagId(communityTag.getTag().getTagId())
                        .name(communityTag.getTag().getName())
                        .build())
                    .toList())
                .build())
            .collect(Collectors.toList());

        return CommunityListRes.builder()
            .communityList(communityListDetailResList)
            .totalPages(totalPages)
            .build();
    }


    @Override
    public void updateCommunity(int communityId, CommunityUpdateReq communityUpdateReq,
        Member member) throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findByCommunityIdFetchJoinCommunityTag(
            communityId);

        checkAuthority(member, community);

        String title = communityUpdateReq.title();
        String content = communityUpdateReq.content();
        community.getCommunityTagSet().clear();

        community.setTitle(title);
        community.setContent(content);

        // 새로운 관심 태그 설정
        communityUpdateReq.tagList().stream()
            .map(tagId -> tagRepository.findById(tagId)
                .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR)))
            .map(tag -> CommunityTag.createCommunityTag(community, tag))
            .forEach(communityTag -> communityTagRepository.save(communityTag));
    }

    @Override
    public void deleteCommunity(int communityId, Member member)
        throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findById(communityId)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

        checkAuthority(member, community);

        communityRepository.delete(community);
    }

    private List<Integer> getTagList(String tags) { // tag 목록 문자열로부터 tagId List를 받아옴
        if (tags == null) {
            return new ArrayList<>();
        } else {
            return Arrays.stream(tags.split("\\|"))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
        }
    }

    private static boolean isWriter(Member member, Community community) {
        return community.getMember().equals(member);
    }

    private static void checkAuthority(Member member, Community community) {
        if (!community.getMember().equals(member)) {
            throw new BaseExceptionHandler(ErrorCode.FORBIDDEN_ERROR);
        }
    }
}