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

    @Field(name="text")
    String text;

    public static ChannelAlarm createChannelAlarm(int studyId, String channelId, int memberId, String text) {
        ChannelAlarm channelAlarm = new ChannelAlarm();

        channelAlarm.setStudyId(studyId);
        channelAlarm.setChannelId(channelId);
        channelAlarm.setMemberId(memberId);
        channelAlarm.setText(text);

        return channelAlarm;
    }
}
