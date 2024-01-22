package com.f17coders.classhub.module.domain.study;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.studyMember.StudyMember;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Study extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "study_id")
    private int studyId;

    @Column(length = 300)
    private String title;

    private Integer capacity;

    @Column(length = 1000)
    private String description;

    private Byte is_public;

    private Integer enter_code;

    // Study - StudyMember 연관 관계
    @OneToMany(mappedBy = "study", fetch = FetchType.LAZY)
    private List<StudyMember> studyMemberList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putStudyMember(StudyMember studyMember) {  // 연관 관계 편의 메서드
        studyMember.setStudy(this);
        this.getStudyMemberList().add(studyMember);
    }

    // Study - Lecture 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    // Study - StudyTag 연관 관계
    @OneToMany(mappedBy = "study", fetch = FetchType.LAZY)
    private List<StudyTag> studyTagList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putStudyTag(StudyTag studyTag) {  // 연관 관계 편의 메서드
        studyTag.setStudy(this);
        this.getStudyTagList().add(studyTag);
    }
}

