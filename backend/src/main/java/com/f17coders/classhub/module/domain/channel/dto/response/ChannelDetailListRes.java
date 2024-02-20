package com.f17coders.classhub.module.domain.channel.dto.response;

import java.time.LocalDateTime;
import lombok.Builder;

@Builder
public record ChannelDetailListRes(

    String channelId,
    String name,

    boolean isDelete,
    LocalDateTime createTime,

    LocalDateTime updateTime
) {

}
