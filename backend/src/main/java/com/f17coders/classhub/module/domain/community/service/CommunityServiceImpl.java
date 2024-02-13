package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.module.domain.comment.Comment;
import com.f17coders.classhub.module.domain.comment.dto.response.CommentDetailRes;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityRegisterReq;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityUpdateReq;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityListDetailRes;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityListRes;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityReadRes;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityLike.repository.CommunityLikeRepository;
import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import com.f17coders.classhub.module.domain.communityScrap.repository.CommunityScrapRepository;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import com.f17coders.classhub.module.domain.communityTag.repository.CommunityTagRepository;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.tag.dto.response.TagRes;
import com.f17coders.classhub.module.domain.tag.repository.TagRepository;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor    // TODO : Transactional 처리
public class CommunityServiceImpl implements CommunityService {
    private final RedisTemplate<String, Integer> redisTemplate;

    private final CommunityRepository communityRepository;
    private final TagRepository tagRepository;
    private final CommunityTagRepository communityTagRepository;
    private final CommunityLikeRepository communityLikeRepository;
    private final CommunityScrapRepository communityScrapRepository;

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
    @Transactional
    public CommunityReadRes readCommunity(int communityId, Member member)
        throws BaseExceptionHandler, IOException {
        Community community = communityRepository.findCommunityByCommunityIdForCommunityReadRes(
            communityId);

        // 조회 수 증가
        updateViewCount(community);

        // 댓글 목록
        List<CommentDetailRes> commentDetailResList = community.getCommentList().stream()
            .map(comment -> CommentDetailRes.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .memberNickname(comment.getMember() != null ? comment.getMember().getNickname() : "(탈퇴한 사용자)")
                .memberProfileImg(comment.getMember() != null ? comment.getMember().getProfileImage() : "https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800")
                .canUpdate(isCommentWriter(member, comment))
                .createdAt(comment.getCreateTime())
                .build())
            .collect(Collectors.toList());

        // 커뮤니티 태그 조회
        List<TagRes> tagResList = community.getCommunityTagList().stream()
            .map(communityTag -> TagRes.builder()
                .tagId(communityTag.getTag().getTagId())
                .name(communityTag.getTag().getName())
                .build())
            .collect(Collectors.toList());

        return CommunityReadRes.builder()
            .communityId(communityId)
            .title(community.getTitle())
            .content(community.getContent())
            .memberNickname(community.getMember() != null ? community.getMember().getNickname() : "(탈퇴한 사용자)")
            .tagList(tagResList)
            .viewCount(community.getViewCount())
            .commentCount(community.getCommentList().size())
            .commentList(commentDetailResList)
            .canUpdate(isCommunityWriter(member, community))
            .canLike(canLike(community, member))
            .canScrap(canScrap(community, member))
            .createdAt(community.getCreateTime())
            .build();
    }

    @Override
    public CommunityListRes getCommunityList(String tags, String keyword, Pageable pageable)
        throws BaseExceptionHandler, IOException {  // TODO : 반드시 최적화 필요
        List<Integer> tagIdList = getTagList(tags);

        long totalCommunities = communityRepository.countPageByKeywordAndTagIdListJoinCommunityTagJoinTag(
            tagIdList, keyword);

        long totalPages = (long) Math.ceil((double) totalCommunities / pageable.getPageSize());

        List<CommunityListDetailRes> communityListDetailResList = communityRepository.findPageByKeywordAndTagIdListJoinCommunityTagJoinTag(
                tagIdList, keyword,
                pageable).stream()
            .map(community -> CommunityListDetailRes.builder()
                .communityId(community.getCommunityId())
                .title(community.getTitle())
                .content(community.getContent())
                .memberNickname(community.getMember() != null ? community.getMember().getNickname() : "(탈퇴한 사용자)")
                .commentCount(community.getCommentList().size())
                .likeCount(community.getCommunityLikeSet().size())
                .scrapCount(community.getCommunityScrapSet().size())
                .createdAt(community.getCreateTime())
                .tagList(community.getCommunityTagList().stream()
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
        community.getCommunityTagList().clear();

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

    @Override
    public void likeCommunity(int communityId, Member member)
        throws BaseExceptionHandler {
        Community community = communityRepository.findById(communityId)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

        CommunityLike communityLike = CommunityLike.createCommunityLike(community, member);
        communityLikeRepository.save(communityLike);
    }

    @Override
    public void unlikeCommunity(int communityId, Member member)
        throws BaseExceptionHandler {
        CommunityLike communityLike = communityLikeRepository.findByCommunity_CommunityIdAndMember(
                communityId, member)
            .orElseThrow(() -> new BaseExceptionHandler(ErrorCode.NOT_FOUND_ERROR));

        communityLikeRepository.delete(communityLike);
    }

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

    private List<Integer> getTagList(String tags) { // tag 목록 문자열로부터 tagId List를 받아옴
        if (tags == null) {
            return new ArrayList<>();
        } else {
            return Arrays.stream(tags.split("\\|"))
                .map(Integer::parseInt)
                .collect(Collectors.toList());
        }
    }

    // 기존 updateViewCount
//    private void updateViewCount(Community community) {
//        community.setViewCount(community.getViewCount() + 1);
//    }

    // Redis를 활용한 updateViewCount
    private void updateViewCount(Community community) {
        String key = "viewCounts::" + community.getCommunityId();

        Boolean hasKey = redisTemplate.hasKey(key);

        if (hasKey != null && hasKey) {
            // Redis에 해당 key가 존재하면 조회수를 증가시킵니다.
            redisTemplate.opsForValue().increment(key);
        } else {
            // Redis에 해당 key가 존재하지 않으면 새로 만들고 조회수를 1로 설정합니다.
            redisTemplate.opsForValue().set(key, 1);
        }
    }

    private boolean isCommunityWriter(Member member, Community community) {
        if(member == null)
            return false;
        return community.getMember().getMemberId() == member.getMemberId();
    }

    private boolean isCommentWriter(Member member, Comment comment) {
        if(member == null)
            return false;
        return comment.getMember().getMemberId() == member.getMemberId();
    }

    private void checkAuthority(Member member, Community community) {
        if (!community.getMember().equals(member)) {
            throw new BaseExceptionHandler(ErrorCode.FORBIDDEN_ERROR);
        }
    }

    public boolean canLike(Community community, Member member) {
        if (member == null) {
            return true;
        } else {
            return communityLikeRepository.findByCommunityAndMember(
                community, member).isEmpty();
        }
    }

    public boolean canScrap(Community community, Member member) {
        if (member == null) {
            return true;
        } else {
            Optional<CommunityScrap> communityScrap = communityScrapRepository.findByCommunity_CommunityIdAndMember(
                community.getCommunityId(), member);

            return communityScrap.isEmpty();
        }
    }
}