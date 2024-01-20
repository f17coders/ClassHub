package com.f17coders.classhub.module.domain.community.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityCreateReq;
import com.f17coders.classhub.module.domain.community.dto.request.CommunityUpdateReq;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityListRes;
import com.f17coders.classhub.module.domain.community.dto.response.CommunityReadRes;
import com.f17coders.classhub.module.domain.community.service.CommunityService;
import com.f17coders.classhub.module.domain.member.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Tag(name = "community", description = "커뮤니티 API")
@RestController
@RequestMapping("/communities")
@RequiredArgsConstructor
public class CommunityController {
    private final CommunityService communityService;

    @Operation(summary = "게시글 등록")
    @PostMapping("/v1")
    public ResponseEntity<BaseResponse<Integer>> registerCommunity(@RequestBody CommunityCreateReq communityCreateReq, Member member) throws IOException {
        int communityId = communityService.registerCommunity(communityCreateReq, member);

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 상세 조회")
    @GetMapping("/v0/details/{communityId}")
    public ResponseEntity<BaseResponse<CommunityReadRes>> readCommunity(@PathVariable("communityId") int communityId, Member member) throws IOException {
        CommunityReadRes communityReadRes = communityService.readCommunity(communityId, member);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, communityReadRes);
    }

    @Operation(summary = "게시글 목록 조회 - 검색, 필터링 포함")
    @GetMapping("/v0")
    public ResponseEntity<BaseResponse<CommunityListRes>> getCommunityList() throws IOException {
        CommunityListRes communityList = communityService.getCommunityList();

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, communityList);
    }

    @Operation(summary = "게시글 수정")
    @PostMapping("/v1/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> updateCommunity(@PathVariable("communityId") int communityId, @RequestBody CommunityUpdateReq communityUpdateReq, Member member) throws IOException {
        communityId = communityService.updateCommunity(communityId, communityUpdateReq, member);

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 삭제")
    @DeleteMapping("/v1/{communityId}")
    public ResponseEntity<BaseResponse<Integer>> deleteCommunity(@PathVariable("communityId") int communityId, Member member) throws IOException {
        communityService.deleteCommunity(communityId, member);

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, communityId);
    }
}