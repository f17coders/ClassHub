package com.f17coders.classhub.module.domain.alarm.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.alarm.ChannelAlarm;
import com.f17coders.classhub.module.domain.alarm.PersonalChatAlarm;
import com.f17coders.classhub.module.domain.alarm.repository.ChannelAlarmRepository;
import com.f17coders.classhub.module.domain.alarm.repository.PersonalChatAlarmRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

    private final PersonalChatAlarmRepository personalChatAlarmRepository;
    private final ChannelAlarmRepository channelAlarmRepository;

    @Override
    public PersonalChatAlarm registPersonalChatAlarm(String personalChatId, int memberId,
        String text) throws BaseExceptionHandler {

        PersonalChatAlarm personalChatAlarm = personalChatAlarmRepository.findPersonalChatAlarmByPersonalChatIdAndMemberId(
            personalChatId, memberId);

        if (personalChatAlarm == null) {

            personalChatAlarm = PersonalChatAlarm.createPersonalChatAlarm(personalChatId, memberId,
                text);

            personalChatAlarmRepository.save(personalChatAlarm);
        }

        return personalChatAlarm;
    }

    @Override
    public ChannelAlarm registchannelAlarm(int studyId, String channelId, int memberId, String text)
        throws BaseExceptionHandler {
        ChannelAlarm channelAlarm = channelAlarmRepository.findChannelAlarmByChannelIdAndMemberId(
            channelId, memberId);

        if (channelAlarm == null) {
            channelAlarm = ChannelAlarm.createChannelAlarm(studyId, channelId, memberId, text);
            channelAlarmRepository.save(channelAlarm);
        }

        return channelAlarm;
    }

    @Override
    public void deletePersonalChatAlarm(String personalChatId, int memberId)
        throws BaseExceptionHandler {
        PersonalChatAlarm personalChatAlarm = personalChatAlarmRepository.findPersonalChatAlarmByPersonalChatIdAndMemberId(
            personalChatId, memberId);
        if (personalChatAlarm != null) {
            personalChatAlarmRepository.delete(personalChatAlarm);
        }
    }

    @Override
    public void deleteChannelAlarm(String channelId, int memberId) throws BaseExceptionHandler {
        ChannelAlarm channelAlarm = channelAlarmRepository.findChannelAlarmByChannelIdAndMemberId(
            channelId, memberId);
        if (channelAlarm != null) {
            channelAlarmRepository.delete(channelAlarm);
        }
    }

    @Override
    public List<PersonalChatAlarm> getPersonalChatAlarm(int memberId) throws BaseExceptionHandler {
        return personalChatAlarmRepository.findPersonalChatAlarmsByMemberId(memberId);
    }

    @Override
    public List<ChannelAlarm> getChannelAlarm(int memberId) throws BaseExceptionHandler {
        return channelAlarmRepository.findChannelAlarmsByMemberId(memberId);
    }
}
