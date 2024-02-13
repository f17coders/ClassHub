package com.f17coders.classhub.module.domain.alarm.repository;

import com.f17coders.classhub.module.domain.alarm.PersonalChatAlarm;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PersonalChatAlarmRepository extends MongoRepository<PersonalChatAlarm, String> {
    PersonalChatAlarm findPersonalChatAlarmByPersonalChatIdAndMemberId(String personalChatId, int memberId);
    List<PersonalChatAlarm> findPersonalChatAlarmsByMemberId(int memberId);
}
