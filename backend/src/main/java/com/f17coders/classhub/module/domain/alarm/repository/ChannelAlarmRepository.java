package com.f17coders.classhub.module.domain.alarm.repository;

import com.f17coders.classhub.module.domain.alarm.ChannelAlarm;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChannelAlarmRepository extends MongoRepository<ChannelAlarm, String> {

    ChannelAlarmRepository findChannelAlarmByChannelIdAndMemberId(String channelId, int memberId);

    List<ChannelAlarm> findChannelAlarmsByMemberId(int memberId);
}
