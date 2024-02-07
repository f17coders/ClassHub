package com.f17coders.classhub.module.domain.personalChat.repository;

import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonalChatRepository extends MongoRepository<PersonalChat, String>, PersonalChatCustomRepository {
//    PersonalChat findByReceiver(int receiver);
//    List<PersonalChat> findBySenderOrReceiver(int sender, int receiver);

//    PersonalChat findByReceiverAndSender(int receiver, int sender);
}
