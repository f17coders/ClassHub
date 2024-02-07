package com.f17coders.classhub.module.domain.message.repository;

import com.f17coders.classhub.module.domain.message.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
}
