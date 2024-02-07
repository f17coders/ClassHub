package com.f17coders.classhub.module.domain.member.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.request.MemberAddInfoReq;
import com.f17coders.classhub.module.domain.member.dto.request.MemberUpdateInfoReq;
import com.f17coders.classhub.module.domain.member.dto.response.MemberGetInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.member.service.MemberService;
import com.f17coders.classhub.module.domain.study.dto.response.StudyBaseRes;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "member", description = "멤버 API")
@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @Operation(summary = "회원 정보 조회")
    @GetMapping("/v1")
    public ResponseEntity<BaseResponse<MemberGetInfoRes>> getInformation(
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        MemberGetInfoRes memberGetInfoRes = memberService.getInformation(memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, memberGetInfoRes);
    }

    @Operation(summary = "회원 추가 정보 입력")
    @PostMapping("/v1")
    public ResponseEntity<BaseResponse<Integer>> addInformation(
        @RequestBody MemberAddInfoReq memberAddInfoReq,
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        memberService.addInformation(memberAddInfoReq, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, memberSecurityDTO.getMemberId());
    }

    @Operation(summary = "회원 추가 정보 수정")
    @PutMapping("/v1")
    public ResponseEntity<BaseResponse<Integer>> updateInformation(
        @RequestBody MemberUpdateInfoReq memberUpdateInfoReq,
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        memberService.updateInformation(memberUpdateInfoReq, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, memberSecurityDTO.getMemberId());
    }

    @Operation(summary = "회원 탈퇴")
    @DeleteMapping("/v1")
    public ResponseEntity<BaseResponse<Integer>> withDraw(
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        memberService.withDraw(memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, memberSecurityDTO.getMemberId());
    }

    @Operation(summary = "내가 작성한 글 목록 조회")
    @GetMapping("/v1/communities/my")
    public ResponseEntity<BaseResponse<MemberCommunityListRes>> getCommunityList(Pageable pageable,
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        MemberCommunityListRes communityList = memberService.getCommunityList(
            memberSecurityDTO.toMember(), pageable);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, communityList);
    }

    @Operation(summary = "내가 참여중인 스터디 목록 조회")
    @GetMapping("/v1/studies/participation")
    public ResponseEntity<BaseResponse<List<StudyBaseRes>>> getStudyList(
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) throws IOException {
        List<StudyBaseRes> studyBaseResList = memberService.getStudyList(memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, studyBaseResList);
    }
}
