package com.f17coders.classhub.module.domain.study.controller;

import static com.f17coders.classhub.global.exception.code.ErrorCode.*;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.api.response.ErrorResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyMemberListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadTagRes;
import com.f17coders.classhub.module.domain.study.service.StudyService;
import com.f17coders.classhub.module.domain.studyMember.service.StudyMemberService;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;

import java.io.IOException;

@Tag(name = "study", description = "스터디룸 API")
@RestController
@RequestMapping("/api/studies/v1")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudyController {

    private final StudyService studyService;
    private final StudyMemberService studyMemberService;
    private final MemberRepository memberRepository;

    @Operation(summary = "스터디룸 생성")
    @PostMapping
    public ResponseEntity<BaseResponse<Integer>> registerStudy(
            @Valid @RequestBody StudyRegisterReq studyRegisterReq,
            @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {

        // 스터디 생성
        int studyId = studyService.registerStudy(studyRegisterReq, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, studyId);

    }

    @Operation(summary = "스터디룸 목록 조회")
    @GetMapping
    public ResponseEntity<BaseResponse<StudyListRes>> getStudyList(
            @RequestParam(required = false) String keyword, @RequestParam int recruitment, Pageable pageable) {

        // recuritment => 0 전체 1 모집중 2 모집완료
        StudyListRes studyListRes = studyService.getStudyList(keyword, recruitment, pageable);

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
    @PutMapping
    public ResponseEntity<BaseResponse<Integer>> updateStudy(
            @RequestBody StudyUpdateReq studyUpdateReq, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {

        studyService.updateStudy(studyUpdateReq, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, studyUpdateReq.studyId());
    }

    @Operation(summary = "스터디룸 삭제")
    @DeleteMapping("/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> deleteStudy(@PathVariable int studyId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {

        studyService.deleteStudy(studyId, memberSecurityDTO.getMemberId());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 참여 코드 조회")
    @GetMapping("/invitation-code/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> getEnterCode(@PathVariable int studyId, @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {

        int enterCode = studyService.getEnterCodeLeader(studyId, memberSecurityDTO.getMemberId());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, enterCode);
    }

    @Operation(summary = "참여코드 일치 여부 조회")
    @GetMapping("/invitation-code/valid/{studyId}")
    public ResponseEntity<?> isEnterCode(@PathVariable int studyId,
                                         @RequestParam int enterCode
    ) {

        boolean isValid = studyService.isValidEnterCode(studyId, enterCode);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 참여")
    @PostMapping("/entrance/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> enterStudy(@PathVariable int studyId,
                                                            @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {

        studyMemberService.enterStudy(studyId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 나가기")
    @DeleteMapping("/exit/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> exitStudy(@PathVariable int studyId,
                                                           @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {

        studyMemberService.exitStudy(studyId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 멤버 조회")
    @GetMapping("/members/{studyId}")
    public ResponseEntity<BaseResponse<StudyMemberListRes>> getStudyMemberList(
            @PathVariable int studyId) {

        StudyMemberListRes studyMemberListRes = studyService.getStudyMemberList(studyId);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyMemberListRes);
    }


}
