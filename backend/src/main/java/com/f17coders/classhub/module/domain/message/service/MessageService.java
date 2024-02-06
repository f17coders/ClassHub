package com.f17coders.classhub.module.domain.message.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.message.Message;
import java.io.IOException;

public interface MessageService {
      String registerPersonalMessage(String personalChatId, Message message) throws BaseExceptionHandler, IOException;
}
