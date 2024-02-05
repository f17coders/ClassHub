package com.f17coders.classhub.module.domain.tag.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.tag.dto.response.TagListRes;
import com.f17coders.classhub.module.domain.tag.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "tag", description = "해시태그 API")
@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TagController {

    private final TagService tagService;

    @Operation(summary = "강의 기준 해시태그 목록 조회")
    @GetMapping("/v0/lectures")
    public ResponseEntity<BaseResponse<TagListRes>> getTagListOrderLecture() {
        TagListRes tagListRes = tagService.getTagListOrderLecture();

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, tagListRes);
    }

    @Operation(summary = "커뮤니티 기준 해시태그 목록 조회")
    @GetMapping("/v0/communities")
    public ResponseEntity<BaseResponse<TagListRes>> getTagListOrderCommunity() {
        TagListRes tagListRes = tagService.getTagListOrderCommunity();

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, tagListRes);
    }

    @Operation(summary = "멤버 기준 해시태그 목록 조회")
    @GetMapping("/v1/members")
    public ResponseEntity<BaseResponse<TagListRes>> getTagListOrderMember() {
        TagListRes tagListRes = tagService.getTagListOrderMember();

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, tagListRes);
    }
}
