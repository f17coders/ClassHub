package com.f17coders.classhub.module.domain.personalChat;

import com.f17coders.classhub.module.domain.MongoBaseEntity;
import com.f17coders.classhub.module.domain.message.Message;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
@Getter
@Setter
@Document(collection = "personal_chat")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonalChat extends MongoBaseEntity {

    @Id
    private String personalChatId;

    @Field(name = "receiver")
    private int receiver;

    @Field(name ="sender")
    private int sender;

    @DBRef
    private List<Message> messageList;

    public static PersonalChat createPersonalChat(int receiver, int sender, List<Message> message) {
        PersonalChat personalChat = new PersonalChat();

        personalChat.setReceiver(receiver);
        personalChat.setSender(sender);
        personalChat.setMessageList(message);

        return personalChat;
    }
}