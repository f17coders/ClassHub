package com.f17coders.classhub.module.domain.study.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.api.response.ErrorResponse;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import com.f17coders.classhub.module.domain.study.service.StudyService;
import com.f17coders.classhub.module.domain.studyMember.service.StudyMemberService;
import com.f17coders.classhub.module.domain.studyTag.service.StudyTagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Tag(name = "study", description = "스터디룸 API")
@RestController
@RequestMapping("/studies/v1")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudyController {
    private final StudyService studyService;
    private final StudyTagService studyTagService;
    private final StudyMemberService studyMemberService;

    @Operation(summary = "스터디룸 생성")
    @PostMapping
    public ResponseEntity<BaseResponse<Integer>> registerStudy(@RequestBody StudyRegisterReq studyRegisterReq, Member member) throws IOException {
        int studyId = studyService.registerStudy(studyRegisterReq, member);

        for(int tagId : studyRegisterReq.tagList()) {
            studyTagService.registerStudyTag(studyId, tagId);
        }

        studyMemberService.enterStudy(studyId, member);

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 목록 조회")
    @GetMapping
    public ResponseEntity<BaseResponse<StudyListRes>> getStudyList(Pageable pageable) throws IOException {
        StudyListRes studyListRes = studyService.getStudyList(pageable);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyListRes);

    }

    @Operation(summary = "스터디룸 개별 정보 조회")
    @GetMapping("/detail/{studyId}")
    public ResponseEntity<BaseResponse<StudyReadRes>> getStudyDetail(@PathVariable int studyId) throws IOException {
        StudyReadRes studyReadRes = studyService.readStudy(studyId);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyReadRes);

    }

    @Operation(summary = "스터디룸 정보 수정")
    @PatchMapping
    public ResponseEntity<BaseResponse<Integer>> updateStudy(@RequestBody StudyUpdateReq studyUpdateReq) throws IOException {
        studyService.updateStudy(studyUpdateReq);

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, studyUpdateReq.studyId());
    }

    @Operation(summary = "스터디룸 삭제")
    @DeleteMapping("/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> deleteStudy(@PathVariable int studyId) throws IOException {
        studyService.deleteStudy(studyId);

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, studyId);
    }
}
