package com.f17coders.classhub.module.domain.channel.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record ChannelUpdateReq(

    String channelId,

    @NotBlank(message = "제목은 필수 입니다.")
    String name
) {

}
