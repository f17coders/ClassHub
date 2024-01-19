package com.f17coders.classhub.global.exception;

import com.f17coders.classhub.global.exception.code.ErrorCode;
import lombok.Getter;
import lombok.Setter;

@Getter
public class BaseExceptionHandler extends RuntimeException {
    private final ErrorCode errorCode;
    @Setter
    private String message;

    public BaseExceptionHandler(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    public BaseExceptionHandler(String message, ErrorCode errorCode) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
    }
}
