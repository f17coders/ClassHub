package com.f17coders.classhub.module.domain.message.dto.request;

import lombok.Builder;

@Builder
public record MessageReq(

        int sender,
        String text
) {

}
