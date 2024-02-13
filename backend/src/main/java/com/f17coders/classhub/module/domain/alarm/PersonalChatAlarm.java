package com.f17coders.classhub.module.domain.alarm;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Document(collection = "personal_chat_alarm")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonalChatAlarm {

    @Id
    String personal_chat_alarm_id;

    @Field(name = "personal_chat_id")
    String personalChatId;

    @Field(name = "member_id")
    int memberId;

    @Field(name="text")
    String text;

    public static PersonalChatAlarm createPersonalChatAlarm(String personalChatId, int memberId, String text) {
        PersonalChatAlarm personalChatAlarm = new PersonalChatAlarm();

        personalChatAlarm.setPersonalChatId(personalChatId);
        personalChatAlarm.setMemberId(memberId);
        personalChatAlarm.setText(text);

        return personalChatAlarm;
    }
}
