package com.f17coders.classhub.module.domain.channel.controller;

import com.f17coders.classhub.global.api.response.BaseResponse;
import com.f17coders.classhub.global.exception.code.SuccessCode;
import com.f17coders.classhub.module.domain.channel.dto.request.ChannelRegisterReq;
import com.f17coders.classhub.module.domain.channel.dto.response.ChannelDetailListRes;
import com.f17coders.classhub.module.domain.channel.service.ChannelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "channel", description = "채널 API")
@RestController
@RequestMapping("/studies/v1/channels")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChannelController {

    private final ChannelService channelService;

    @Operation(summary = "채널 등록")
    @PostMapping
    public ResponseEntity<BaseResponse<String>> registerChannel(
        @RequestBody ChannelRegisterReq channelRegisterReq) {
        String channelId = channelService.registerChannel(channelRegisterReq);

        return BaseResponse.success(SuccessCode.INSERT_SUCCESS, channelId);
    }

    @Operation(summary = "채널 목록 조회")
    @GetMapping("/{studyId}")
    public ResponseEntity<BaseResponse<List<ChannelDetailListRes>>> getChannelList(
        @PathVariable int studyId) {
        List<ChannelDetailListRes> channelList = channelService.getChannelList(studyId);

        return BaseResponse.success(SuccessCode.SELECT_SUCCESS, channelList);
    }

    @Operation(summary = "채널 삭제")
    @DeleteMapping("/{channelId}")
    public ResponseEntity<BaseResponse<String>> deleteChannel(@PathVariable String channelId) {
        channelService.deleteChannel(channelId);

        return BaseResponse.success(SuccessCode.DELETE_SUCCESS, channelId);
    }
}
