package com.f17coders.classhub.module.domain.lectureLike;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LectureLike extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lecture_like_id")
    private int lectureLikeId;

    // Member - LectureLike 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @Setter
    private Member member;

    public void putMember(Member member) {
        this.member = member;
        member.getLectureLikeList().add(this);
    }


    // LectureLike - Lecture 연관 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    @Setter
    private Lecture lecture;

    public void putLecture(Lecture lecture) {
        this.lecture = lecture;
        lecture.getLectureLikeSet().add(this);
    }

    public static LectureLike createLectureLike(Lecture lecture, Member member) {
        LectureLike lectureLike = new LectureLike();

        lectureLike.putLecture(lecture);
        lectureLike.putMember(member);

        return lectureLike;
    }

}
