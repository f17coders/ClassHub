package com.f17coders.classhub.module.domain.member.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.member.dto.request.MemberAddInfoReq;
import com.f17coders.classhub.module.domain.member.dto.request.MemberUpdateInfoReq;
import com.f17coders.classhub.module.domain.member.dto.response.MemberGetInfoRes;
import com.f17coders.classhub.module.domain.member.repository.MemberRepository;
import com.f17coders.classhub.module.domain.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "member", description = "멤버 API")
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @Operation(summary = "회원 가입 (임시 구현 - 실제 api 아님)")
    @PostMapping("/v1/tmp")
    public ResponseEntity<BaseResponse<Integer>> registerMember(@RequestBody String nickname)
        throws IOException {
        int memberId = memberService.registerMember(nickname);

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, memberId);
    }

    @Operation(summary = "회원 정보 조회")
    @GetMapping("/v1")
    public ResponseEntity<BaseResponse<MemberGetInfoRes>> getInformation(
        @RequestHeader("AUTHORIZATION") int memberId) throws IOException {
        Optional<Member> member = memberRepository.findById(memberId);  // TODO : 시큐리티 적용 후 변경

        MemberGetInfoRes memberGetInfoRes = memberService.getInformation(member.get());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, memberGetInfoRes);
    }

    @Operation(summary = "회원 추가 정보 입력")
    @PostMapping("/v1")
    public ResponseEntity<BaseResponse<Integer>> addInformation(
        @RequestBody MemberAddInfoReq memberAddInfoReq,
        @RequestHeader("AUTHORIZATION") int memberId) throws IOException {
        Optional<Member> member = memberRepository.findById(memberId);  // TODO : 시큐리티 적용 후 변경

        memberService.addInformation(memberAddInfoReq, member.get());

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, memberId);
    }

    @Operation(summary = "회원 추가 정보 수정")
    @PutMapping("/v1")
    public ResponseEntity<BaseResponse<Integer>> updateInformation(
        @RequestBody MemberUpdateInfoReq memberUpdateInfoReq,
        @RequestHeader("AUTHORIZATION") int memberId) throws IOException {
        Optional<Member> member = memberRepository.findById(memberId);  // TODO : 시큐리티 적용 후 변경

        memberService.updateInformation(memberUpdateInfoReq, member.get());

        return BaseResponse.success(SuccessCode.UPDATE_SUCCESS, memberId);
    }
}
