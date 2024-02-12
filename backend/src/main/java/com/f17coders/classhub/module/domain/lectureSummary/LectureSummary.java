package com.f17coders.classhub.module.domain.lectureSummary;

import com.f17coders.classhub.module.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LectureSummary extends BaseEntity {
    @Id
    @Column(name = "lecture_id")
    private int lectureId;
    private Float combinedRating;
    private int combinedRatingCount;
    private int lectureLikeCount;
}
