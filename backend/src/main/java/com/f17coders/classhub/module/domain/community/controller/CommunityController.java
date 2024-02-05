package com.f17coders.classhub.module.domain.community.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityRegisterReq;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityUpdateReq;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityListRes;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityReadRes;
import com.f17coders.classhub.module.domain.community.service.CommunityService;
import com.f17coders.classhub.module.domain.communityLike.service.CommunityLikeService;
import com.f17coders.classhub.module.domain.communityScrap.service.CommunityScrapService;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "community", description = "커뮤니티 API - Member, Tag 관련 아직 적용 안 되어있음")
@RestController
@RequestMapping("/api/communities")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CommunityController {

    private final CommunityService communityService;
    private final CommunityLikeService communityLikeService;
    private final CommunityScrapService communityScrapService;
    private final MemberRepository memberRepository;

    @Operation(summary = "게시글 등록")
    @PostMapping("/v1")
    public ResponseEntity<BaseResponse<Integer>> registerCommunity(
        @RequestBody CommunityRegisterReq communityRegisterReq, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        int communityId = communityService.registerCommunity(communityRegisterReq, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 상세 조회")
    @GetMapping("/v0/details/{communityId}")
    public ResponseEntity<BaseResponse<CommunityReadRes>> readCommunity(
        @PathVariable("communityId") int communityId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {
        CommunityReadRes communityReadRes = communityService.readCommunity(communityId,
            memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, communityReadRes);
    }

    @Operation(summary = "게시글 목록 조회 - 검색, 필터링 아직 적용 안 됨")
    @GetMapping("/v0")
    public ResponseEntity<BaseResponse<CommunityListRes>> getCommunityList(
        @RequestParam(value = "tags", required = false) String tags,
        @RequestParam(value = "keyword", required = false) String keyword, Pageable pageable)
        throws IOException {
        CommunityListRes communityList = communityService.getCommunityList(tags, keyword, pageable);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, communityList);
    }

    @Operation(summary = "게시글 수정")
    @PatchMapping("/v1/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> updateCommunity(
        @PathVariable("communityId") int communityId,
        @RequestBody CommunityUpdateReq communityUpdateReq, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        communityService.updateCommunity(communityId, communityUpdateReq, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 삭제")
    @DeleteMapping("/v1/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> deleteCommunity(
        @PathVariable("communityId") int communityId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {
        communityService.deleteCommunity(communityId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 좋아요")
    @PostMapping("/v1/likes/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> likeCommunity(
        @PathVariable("communityId") int communityId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {
        communityLikeService.likeCommunity(communityId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 좋아요 취소")
    @DeleteMapping("/v1/unlikes/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> unlikeCommunity(
        @PathVariable("communityId") int communityId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {
        communityLikeService.unlikeCommunity(communityId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 스크랩")
    @PostMapping("/v1/scrap/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> scrapCommunity(
        @PathVariable("communityId") int communityId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {
        communityScrapService.scrapCommunity(communityId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 스크랩 취소")      // TODO : 테스트 필요
    @DeleteMapping("/v1/unscrap/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> unlscrapCommunity(
        @PathVariable("communityId") int communityId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {
        communityScrapService.unscrapCommunity(communityId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, communityId);
    }
}