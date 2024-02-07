package com.f17coders.classhub.module.domain.message;

import com.f17coders.classhub.module.domain.MongoBaseEntity;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "message")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Message extends MongoBaseEntity {

    @Id
    private String messageId;

    private String text;

    private Map<String, String> sender;

    static public Message createMessage(Map<String, String> sender, String text) {
        Message message = new Message();

        message.setSender(sender);
        message.setText(text);

        return message;
    }
}
