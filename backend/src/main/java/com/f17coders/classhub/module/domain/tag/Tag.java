package com.f17coders.classhub.module.domain.tag;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import com.f17coders.classhub.module.domain.lectureTag.LectureTag;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private int tagId;

    @Column(length = 300)
    private String name;

    // Tag - StudyTag 연관 관계
    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY)
    private List<StudyTag> studyTagList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putStudyTag(StudyTag studyTag) {  // 연관 관계 편의 메서드
        studyTag.setTag(this);
        this.getStudyTagList().add(studyTag);
    }

    // Tag - MemberTag 연관 관계
    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY)
    private List<MemberTag> memberTagList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putMemberTag(MemberTag memberTag) {  // 연관 관계 편의 메서드
        memberTag.setTag(this);
        this.getMemberTagList().add(memberTag);
    }

    // Tag - CommunityTag 연관 관계
    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY)
    private List<CommunityTag> communityTagList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putCommunityTag(CommunityTag communityTag) {  // 연관 관계 편의 메서드
        communityTag.setTag(this);
        this.getCommunityTagList().add(communityTag);
    }

    // Tag - LectureTag 연관 관계
    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY)
    private List<LectureTag> lectureTagList = new ArrayList<>(); // 좋아요한 강의 목록

    public void putLectureTag(LectureTag lectureTag) {  // 연관 관계 편의 메서드
        lectureTag.setTag(this);
        this.getLectureTagList().add(lectureTag);
    }
}

