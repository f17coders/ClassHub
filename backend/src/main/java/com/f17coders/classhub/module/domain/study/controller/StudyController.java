package com.f17coders.classhub.module.domain.study.controller;

import static com.f17coders.classhub.global.exception.code.ErrorCode.NOT_VALID_ERROR;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.api.response.ErrorResponse;
import com.f17coders.classhub.global.exception.code.ErrorCode;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.study.dto.request.StudyRegisterReq;
import com.f17coders.classhub.module.domain.study.dto.request.StudyUpdateReq;
import com.f17coders.classhub.module.domain.study.dto.response.StudyListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyMemberListRes;
import com.f17coders.classhub.module.domain.study.dto.response.StudyReadTagRes;
import com.f17coders.classhub.module.domain.study.service.StudyService;
import com.f17coders.classhub.module.domain.studyMember.service.StudyMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private final StudyMemberService studyMemberService;
    private final MemberRepository memberRepository;

    @Operation(summary = "스터디룸 생성")
    @PostMapping
    public ResponseEntity<BaseResponse<Integer>> registerStudy(
        @RequestBody StudyRegisterReq studyRegisterReq,
        @RequestHeader("AUTHORIZATION") int memberId)
        throws IOException {

        //TODO: security 적용 후 변경
        Optional<Member> member = memberRepository.findById(memberId);

        // 스터디 생성
        int studyId = studyService.registerStudy(studyRegisterReq, member.get());

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

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, studyUpdateReq.studyId());
    }

    @Operation(summary = "스터디룸 삭제")
    @DeleteMapping("/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> deleteStudy(@PathVariable int studyId)
        throws IOException {

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

    @Operation(summary = "참여코드 일치 여부 조회")
    @GetMapping("/invitation-code/valid/{studyId}")
    public ResponseEntity<?> isEnterCode(@PathVariable int studyId,
        @RequestParam int enterCode) throws IOException {

        int trueEnterCode = studyService.getEnterCode(studyId);

        if(enterCode == trueEnterCode) {
            return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyId);
        } else {
            ErrorResponse response = ErrorResponse.of().code(NOT_VALID_ERROR).message("참여코드가 일치하지 않습니다.").build();

            return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
        }
    }

    @Operation(summary = "스터디룸 참여")
    @PostMapping("/entrance/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> enterStudy(@PathVariable int studyId,
        @RequestHeader("AUTHORIZATION") int memberId)
        throws IOException {

        //TODO: security 적용 후 변경
        Optional<Member> member = memberRepository.findById(memberId);

        studyMemberService.enterStudy(studyId, member.get());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 나가기")
    @DeleteMapping("/exit/{studyId}")
    public ResponseEntity<BaseResponse<Integer>> exitStudy(@PathVariable int studyId,
        @RequestHeader("AUTHORIZATION") int memberId)
        throws IOException {

        //TODO: security 적용 후 변경
        Optional<Member> member = memberRepository.findById(memberId);

        studyMemberService.exitStudy(studyId, member.get());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, studyId);
    }

    @Operation(summary = "스터디룸 멤버 조회")
    @GetMapping("/members/{studyId}")
    public ResponseEntity<BaseResponse<StudyMemberListRes>> getStudyMemberList(
        @PathVariable int studyId)
        throws IOException {

        StudyMemberListRes studyMemberListRes = studyService.getStudyMemberList(studyId);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyMemberListRes);
    }


}
