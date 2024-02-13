package com.f17coders.classhub.module.domain.alarm.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.alarm.ChannelAlarm;
import com.f17coders.classhub.module.domain.alarm.PersonalChatAlarm;
import com.f17coders.classhub.module.domain.alarm.service.AlarmService;
import com.f17coders.classhub.module.security.dto.MemberSecurityDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "alarm", description = "알람 API")
@RestController
@RequestMapping("/api/studies/v1/alarm")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AlarmController {

    private final AlarmService alarmService;

    @Operation(summary = "채널 알람 조회")
    @GetMapping("/channels")
    public ResponseEntity<BaseResponse<List<ChannelAlarm>>> getChannelAlarm(
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {
        List<ChannelAlarm> channelAlarm = alarmService.getChannelAlarm(
            memberSecurityDTO.getMemberId());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, channelAlarm);
    }

    @Operation(summary = "개인 채팅 알람 조회")
    @GetMapping("/personalChat")
    public ResponseEntity<BaseResponse<List<PersonalChatAlarm>>> getPersonalChatAlarm(
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {
        List<PersonalChatAlarm> personalChatAlarm = alarmService.getPersonalChatAlarm(
            memberSecurityDTO.getMemberId());

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, personalChatAlarm);
    }

    @Operation(summary = "채널 알람 읽음 처리")
    @DeleteMapping("/channels/{channelId}")
    public ResponseEntity<BaseResponse<String>> deleteChannelAlarm(
        @PathVariable String channelId,
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {

        alarmService.deleteChannelAlarm(channelId, memberSecurityDTO.getMemberId());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, channelId);
    }

    @Operation(summary = "개인 채팅 읽음 처리")
    @DeleteMapping("/personalChat/{personalChatId}")
    public ResponseEntity<BaseResponse<String>> deletePersonalChatAlarm(
        @PathVariable String personalChatId,
        @AuthenticationPrincipal MemberSecurityDTO memberSecurityDTO) {

        alarmService.deletePersonalChatAlarm(personalChatId, memberSecurityDTO.getMemberId());

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, personalChatId);
    }
}
