package com.f17coders.classhub.module.domain.channel;

import com.f17coders.classhub.module.domain.MongoBaseEntity;
import com.f17coders.classhub.module.domain.message.Message;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Document(collection = "channel")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Channel extends MongoBaseEntity {

    @Id
    private String channelId;
    @Field(name = "name")
    private String name;
    @DBRef
    private List<Message> messageList;

    @Field(name = "study_id")
    private int studyId;

    @Field(name = "is_basic")
    private boolean isBasic;

    public static Channel createChannel(String name, int studyId, List<Message> message,
        boolean isBasic) {
        Channel channel = new Channel();

        channel.setName(name);
        channel.setStudyId(studyId);
        channel.setMessageList(message);
        channel.setBasic(isBasic);

        return channel;
    }
}
