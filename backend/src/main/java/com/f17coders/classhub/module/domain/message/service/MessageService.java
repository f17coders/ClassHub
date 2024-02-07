package com.f17coders.classhub.module.domain.message.service;

import com.f17coders.classhub.global.exception.BaseExceptionHandler;
import com.f17coders.classhub.module.domain.message.Message;
import com.f17coders.classhub.module.domain.message.dto.request.MessageReq;
import java.io.IOException;

public interface MessageService {
      Message registerPersonalMessage(String personalChatId, Message messageReq) throws BaseExceptionHandler, IOException;
}
