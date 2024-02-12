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
@Document(collection = "channel_alarm")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChannelAlarm {

    @Id
    String personal_chat_alarm_id;

    @Field(name ="study_id")
    int studyId;

    @Field(name = "channel_id")
    String channelId;

    @Field(name="member_id")
    int memberId;
}
