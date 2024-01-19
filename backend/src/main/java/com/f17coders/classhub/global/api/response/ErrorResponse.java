package com.f17coders.classhub.global.api.response;

import com.f17coders.classhub.global.exception.code.ErrorCode;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.Objects;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ErrorResponse {
    private int status;
    private String code;
    private String message;
    private List<FieldError> errors;
    private String reason;

    @Builder(builderMethodName = "of")
    protected ErrorResponse(final ErrorCode code, final List<FieldError> errors, final String message) {
        Objects.requireNonNull(code);
        this.status = code.getStatus();
        this.code = code.getDivisionCode();
        this.message = code.getMessage();
        this.errors = Objects.isNull(errors) ? List.of() : errors;
        this.reason = Objects.isNull(message) ? "" : message;
    }
}
