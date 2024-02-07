package com.f17coders.classhub.module.domain.personalChat.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import com.f17coders.classhub.module.domain.personalChat.dto.reponse.PersonalChatRes;
import com.f17coders.classhub.module.domain.personalChat.dto.request.PersonalChatReq;
import com.f17coders.classhub.module.domain.personalChat.service.PersonalChatService;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "personalChat", description = "개인 채팅 API")
@RestController
@RequestMapping("/api/personal-chat/v1")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PersonalChatController {

    private final PersonalChatService personalChatService;

    @Operation(summary = "개인 채팅방 목록")
    @GetMapping
    public ResponseEntity<BaseResponse<List<PersonalChatRes>>> getPersonalChatMessage(
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {
        List<PersonalChatRes> personalChatResList = personalChatService.getPersonalChatList(
            memberSecurityDTO.getMemberId());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, personalChatResList);
    }

    @Operation(summary = "개인 채팅 생성")
    @PostMapping
    public ResponseEntity<BaseResponse<String>> registerPersonalChat(
        @RequestBody PersonalChatReq personalChatReq,
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {

        // 채팅방 조회
        PersonalChat personalChat = personalChatService.readPersonalChatByRecevier(
            personalChatReq.receiver(),
            memberSecurityDTO.getMemberId());

        String personalChatId;

        if (personalChat == null) { // 존재하지 않을 경우, 생성
            personalChatId = personalChatService.registerPersonalChat(personalChatReq.receiver(),
                memberSecurityDTO.toMember());
        } else {
            personalChatId = personalChat.getPersonalChatId();
        }
        System.out.println(personalChatId);
        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, personalChatId);
    }

    @Operation(summary = "개인 채팅 조회")
    @GetMapping("/{personalChatId}")
    public ResponseEntity<BaseResponse<PersonalChat>> getPersonalChat(
        @PathVariable String personalChatId,
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO)
        throws IOException {

        // 채팅방 조회
        PersonalChat personalChat = personalChatService.readPersonalChat(personalChatId, memberSecurityDTO.toMember());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, personalChat);
    }
}
