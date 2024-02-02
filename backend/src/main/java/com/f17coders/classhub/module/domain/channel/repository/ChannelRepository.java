package com.f17coders.classhub.module.domain.channel.repository;

import com.f17coders.classhub.module.domain.channel.Channel;
import com.f17coders.classhub.module.domain.channel.dto.response.ChannelDetailListRes;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChannelRepository extends MongoRepository<Channel, String> {

    List<ChannelDetailListRes> findByStudyId(int studyId);

    void deleteByStudyId(int studyId);
}
