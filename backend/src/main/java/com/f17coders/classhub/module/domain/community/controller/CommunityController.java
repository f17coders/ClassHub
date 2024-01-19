package com.f17coders.classhub.module.domain.community.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.dto.request.CreateCommunityReq;
import com.f17coders.classhub.module.domain.community.service.CommunityService;
import com.f17coders.classhub.module.domain.member.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
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
    public ResponseEntity<BaseResponse<Integer>> registerCommunity(@RequestBody CreateCommunityReq createCommunityReq, Member member) throws IOException {
        int communityId = communityService.registerCommunity(createCommunityReq, member);

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, communityId);
    }

    @Operation(summary = "게시글 검색")
    @GetMapping("/v0")
    public ResponseEntity<BaseResponse<Community>> searchCommunity(@Param("communityId") int communityId) throws IOException {
        Community community = communityService.searchCommunity(communityId);

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, community);
    }


}