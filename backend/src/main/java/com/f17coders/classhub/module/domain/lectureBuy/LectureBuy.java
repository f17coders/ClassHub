package com.f17coders.classhub.module.domain.lectureBuy;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.lectureLike.LectureLike;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LectureBuy extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_buy_id")
    private int lectureBuyId;

    // LectureBuy - Member 연관 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @Setter
    private Member member;

    public void putMember(Member member) {
        this.member = member;
        member.getLectureBuyList().add(this);
    }

    // LectureBuy - Lecture 연관 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    @Setter
    private Lecture lecture;

    public void putLecture(Lecture lecture) {
        this.lecture = lecture;
        lecture.getLectureBuySet().add(this);
    }

    public static LectureBuy createLectureBuy(Lecture lecture, Member member) {
        LectureBuy lectureBuy = new LectureBuy();

        lectureBuy.putLecture(lecture);
        lectureBuy.putMember(member);

        return lectureBuy;
    }
}
