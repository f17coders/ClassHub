package com.f17coders.classhub.module.domain.alarm.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.alarm.ChannelAlarm;
import com.f17coders.classhub.module.domain.alarm.PersonalChatAlarm;
import com.f17coders.classhub.module.domain.alarm.repository.PersonalChatAlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{

    private final PersonalChatAlarmRepository personalChatAlarmRepository;

    @Override
    public PersonalChatAlarm registPersonalChatAlarm(String personalChatId) throws BaseExceptionHandler {

        PersonalChatAlarm personalChatAlarm =

        return null;
    }

    @Override
    public ChannelAlarm registchannelAlarm(int studyId, String channelId) throws BaseExceptionHandler {
        return null;
    }

    @Override
    public void deletePersonalChatAlarm(String personalChatId) throws BaseExceptionHandler {

    }

    @Override
    public void deleteChannelAlarm(int studyId, String channelId) throws BaseExceptionHandler {

    }
}
