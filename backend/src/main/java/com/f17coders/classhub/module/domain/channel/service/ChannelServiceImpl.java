package com.f17coders.classhub.module.domain.channel.service;

import com.f17coders.classhub.module.domain.channel.Channel;
import com.f17coders.classhub.module.domain.channel.dto.request.ChannelRegisterReq;
import com.f17coders.classhub.module.domain.channel.dto.response.ChannelDetailListRes;
import com.f17coders.classhub.module.domain.channel.repository.ChannelRepository;
import com.f17coders.classhub.module.domain.message.Message;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;

    @Override
    public String registerChannel(ChannelRegisterReq channelRegisterReq) {

        String name = channelRegisterReq.name();
        int studyId = channelRegisterReq.studyId();
        List<Message> messageList = new ArrayList<>();

        Channel channel = Channel.createChannel(name, studyId, messageList, false);
        channelRepository.save(channel);

        return channel.getChannelId();
    }

    @Override
    public List<ChannelDetailListRes> getChannelList(int studyId) {
        List<ChannelDetailListRes> channelList = channelRepository.findByStudyId(studyId);

        return channelList;
    }

    @Override
    @Transactional
    public void deleteChannel(String channelId) {
        Channel channel = channelRepository.findById(channelId).get();

        channelRepository.delete(channel);
    }

    @Override
    @Transactional
    public void deleteAllChannel(int studyId) {
        channelRepository.deleteByStudyId(studyId);
    }
}
