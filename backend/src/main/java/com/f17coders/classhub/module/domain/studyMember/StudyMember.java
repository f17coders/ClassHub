package com.f17coders.classhub.module.domain.studyMember;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.study.Study;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class StudyMember extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "study_member_id")
    private int studyMemberId;

    // StudyMember - Member 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // StudyMember - Study 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    public void putStudy(Study study) {

        if (this.study != null) {
            this.study.getStudyMemberList().remove(this);
        }
        this.study = study;
        study.getStudyMemberList().add(this);
    }

    public void putMember(Member member) {
        if (this.member != null) {
            this.member.getStudyMemberList().remove(this);
        }
        this.member = member;
        member.getStudyMemberList().add(this);
    }

    public static StudyMember createStudyMember() {
        StudyMember studyMember = new StudyMember();

        return studyMember;
    }


}