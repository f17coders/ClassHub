package com.f17coders.classhub.module.domain.tag.response;

import com.f17coders.classhub.module.domain.tag.Tag;
import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TagRes {

    private int tagId;
    private String name;

}
