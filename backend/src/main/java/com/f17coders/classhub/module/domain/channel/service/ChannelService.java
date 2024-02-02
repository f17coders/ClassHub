package com.f17coders.classhub.module.domain.channel.service;

import com.f17coders.classhub.module.domain.channel.dto.request.ChannelRegisterReq;
import com.f17coders.classhub.module.domain.channel.dto.request.ChannelUpdateReq;
import com.f17coders.classhub.module.domain.channel.dto.response.ChannelDetailListRes;
import java.util.List;

public interface ChannelService {

    String registerChannel(ChannelRegisterReq channelRegisterReq);

    List<ChannelDetailListRes> getChannelList(int studyId);

    void updateChannel(ChannelUpdateReq channelUpdateReq);

    void deleteChannel(String channelId);

    void deleteAllChannel(int studyId);

}
