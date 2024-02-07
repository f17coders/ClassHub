package com.f17coders.classhub.module.domain.message.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.message.Message;
import com.f17coders.classhub.module.domain.message.dto.request.MessageReq;
import com.f17coders.classhub.module.domain.message.repository.MessageRepository;
import com.f17coders.classhub.module.domain.personalChat.PersonalChat;
import com.f17coders.classhub.module.domain.personalChat.repository.PersonalChatRepository;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService{

    private final PersonalChatRepository personalChatRepository;
    private final MessageRepository messageRepository;
//    @Override
//    public List<Message> getPersonalMessageList(String messageId) throws BaseExceptionHandler, IOException {
//        return messageRepository.
//    }

    @Override
    public Message registerPersonalMessage(String personalChatId, Message messageReq)
        throws BaseExceptionHandler, IOException {

        Message message = Message.createMessage(messageReq.getSender(), messageReq.getText());
        PersonalChat personalChat = personalChatRepository.findById(personalChatId).get();

        messageRepository.save(message);
        personalChat.getMessageList().add(message);

        personalChatRepository.save(personalChat);

        return message;
    }
}
