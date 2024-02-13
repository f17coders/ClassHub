package com.f17coders.classhub.module.domain.alarm.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.alarm.ChannelAlarm;
import com.f17coders.classhub.module.domain.alarm.PersonalChatAlarm;
import java.util.List;

public interface AlarmService {
    PersonalChatAlarm registPersonalChatAlarm(String personalChatId, int memberId, String text) throws BaseExceptionHandler;
    ChannelAlarm registchannelAlarm(int studyId, String channelId, int memberId, String text) throws BaseExceptionHandler;

    void deletePersonalChatAlarm(String personalChatId, int memberId) throws BaseExceptionHandler;
    void deleteChannelAlarm(String channelId, int memberId) throws BaseExceptionHandler;

    List<PersonalChatAlarm> getPersonalChatAlarm(int memberId) throws BaseExceptionHandler;
    List<ChannelAlarm> getChannelAlarm(int memberId) throws BaseExceptionHandler;
}
