package com.f17coders.classhub.module.domain.personalChat.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record PersonalChatReq (

    @NotBlank
    int receiver
){

}
