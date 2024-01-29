package com.f17coders.classhub.module.domain.review;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SiteReview extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "site_review_id")
    private int siteReviewId;

    private Float score;

    @Column(length = 1000)
    private String content;

    // Review - Lecture 연관 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;
}

