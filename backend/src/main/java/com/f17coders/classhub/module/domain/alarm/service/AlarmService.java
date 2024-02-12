package com.f17coders.classhub.module.domain.alarm.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.alarm.ChannelAlarm;
import com.f17coders.classhub.module.domain.alarm.PersonalChatAlarm;

public interface AlarmService {
    PersonalChatAlarm registPersonalChatAlarm(String personalChatId) throws BaseExceptionHandler;
    ChannelAlarm registchannelAlarm(int studyId, String channelId) throws BaseExceptionHandler;

    void deletePersonalChatAlarm(String personalChatId) throws BaseExceptionHandler;
    void deleteChannelAlarm(int studyId, String channelId) throws BaseExceptionHandler;
}
