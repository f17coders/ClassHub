package com.f17coders.classhub.module.domain.tag.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.tag.Dto.response.TagListRes;
import com.f17coders.classhub.module.domain.tag.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name = "tag", description = "해시태그 API")
@RestController
@RequestMapping("/tags/v0")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TagController {

    private final TagService tagService;
    @Operation(summary="강의 기준 해시태그 목록 조회")
    @GetMapping("/lectures")
    public ResponseEntity<BaseResponse<TagListRes>> getTagListOrderLecture(@RequestParam(required = false) String tags) {
        TagListRes tagListRes = tagService.getTagListOrderLecture(tags);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, tagListRes);
    }

    @Operation(summary="커뮤니티 기준 해시태그 목록 조회")
    @GetMapping("/communities")
    public ResponseEntity<BaseResponse<TagListRes>> getTagListOrderCommunity(@RequestParam(required = false) String tags) {
        TagListRes tagListRes = tagService.getTagListOrderCommunity(tags);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, tagListRes);
    }
}
