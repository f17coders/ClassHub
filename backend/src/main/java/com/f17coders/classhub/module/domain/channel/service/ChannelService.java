package com.f17coders.classhub.module.domain.channel.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.channel.dto.request.ChannelRegisterReq;
import com.f17coders.classhub.module.domain.channel.dto.request.ChannelUpdateReq;
import com.f17coders.classhub.module.domain.channel.dto.response.ChannelDetailListRes;
import java.util.List;

public interface ChannelService {

    String registerChannel(ChannelRegisterReq channelRegisterReq, int memberId) throws BaseExceptionHandler;

    List<ChannelDetailListRes> getChannelList(int studyId, int memberId) throws BaseExceptionHandler;

    void updateChannel(ChannelUpdateReq channelUpdateReq, int memberId) throws BaseExceptionHandler;

    void deleteChannel(String channelId, int memberId) throws BaseExceptionHandler;

    void deleteAllChannel(int studyId, int memberId) throws BaseExceptionHandler;

}
