package com.f17coders.classhub.module.domain.personalChat.repository;

import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import java.util.List;

public interface PersonalChatCustomRepository {
    List<PersonalChat> findListBySenderOrReceiver(String senderId);
    PersonalChat findBySenderOrReceiver(String senderId, String receiverId);
}
