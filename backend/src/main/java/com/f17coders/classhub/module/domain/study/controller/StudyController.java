package com.f17coders.classhub.module.domain.study.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.service.MemberService;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadTagRes;
import com.f17coders.classhub.module.domain.study.service.StudyService;
import com.f17coders.classhub.module.domain.studyMember.service.StudyMemberService;
import com.f17coders.classhub.module.domain.studyTag.service.StudyTagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import java.io.IOException;

@Tag(name = "study", description = "스터디룸 API")
@RestController
@RequestMapping("/studies/v1")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudyController {

    private final StudyService studyService;
    private final StudyTagService studyTagService;
    private final StudyMemberService studyMemberService;
    private final MemberService memberService;

    @Operation(summary = "스터디룸 생성")
    @PostMapping
    public ResponseEntity<BaseResponse<Integer>> registerStudy(
        @RequestBody StudyRegisterReq studyRegisterReq) throws IOException {
        Member member = null;

        // 스터디 생성
        int studyId = studyService.registerStudy(studyRegisterReq, member);

        // 스터디 태그 등록
        studyTagService.registerStudyTag(studyId, studyRegisterReq.tagList());

        // 스터디장의 스터디 입장
        studyMemberService.enterStudy(studyId, member);

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 목록 조회")
    @GetMapping
    public ResponseEntity<BaseResponse<StudyListRes>> getStudyList(
        @RequestParam(required = false) String keyword, Pageable pageable) throws IOException {
        StudyListRes studyListRes = studyService.getStudyList(keyword, pageable);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyListRes);

    }

    @Operation(summary = "스터디룸 개별 정보 조회")
    @GetMapping("/detail/{studyId}")
    public ResponseEntity<BaseResponse<StudyReadTagRes>> getStudyDetail(@PathVariable int studyId)
        throws IOException {
        StudyReadTagRes studyReadTagRes = studyService.readStudy(studyId);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyReadTagRes);

    }

    @Operation(summary = "스터디룸 정보 수정")
    @PatchMapping
    public ResponseEntity<BaseResponse<Integer>> updateStudy(
        @RequestBody StudyUpdateReq studyUpdateReq) throws IOException {

        studyService.updateStudy(studyUpdateReq);

        // 스터디 태그 삭제
        studyTagService.removeStudyTagAll(studyUpdateReq.studyId());

        // 스터디 태그 등록
        studyTagService.registerStudyTag(studyUpdateReq.studyId(), studyUpdateReq.tagList());

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, studyUpdateReq.studyId());
    }

    @Operation(summary = "스터디룸 삭제")
    @DeleteMapping("/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> deleteStudy(@PathVariable int studyId)
        throws IOException {

        // 스터디 삭제
        studyService.deleteStudy(studyId);

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 참여 코드 조회")
    @GetMapping("/invitation-code/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> getEnterCode(@PathVariable int studyId)
        throws IOException {

        int enterCode = studyService.getEnterCode(studyId);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, enterCode);
    }

    @Operation(summary = "스터디룸 참여")
    @PostMapping("/entrance/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> enterStudy(@PathVariable int studyId)
        throws IOException {

        Member member = null;

        studyMemberService.enterStudy(studyId, member);

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 나가기")
    @DeleteMapping("/exit/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> exitStudy(@PathVariable int studyId)
        throws IOException {

        Member member = null;
        studyMemberService.exitStudy(studyId, member);

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, studyId);
    }


}
