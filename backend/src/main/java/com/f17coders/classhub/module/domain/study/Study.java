package com.f17coders.classhub.module.domain.study;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.communityTag.CommunityTag;
import com.f17coders.classhub.module.domain.lecture.Lecture;
import com.f17coders.classhub.module.domain.member.Member;
import com.f17coders.classhub.module.domain.studyMember.StudyMember;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import com.f17coders.classhub.module.domain.tag.Tag;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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

    @Column(name = "is_public", columnDefinition = "tinyint(1)")
    private boolean isPublic;

    private Integer enterCode;

    // Study - StudyMember 연관 관계, Study에 참여 중인 Member list
    @OneToMany(mappedBy = "study", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudyMember> studyMemberList = new ArrayList<>();

    // study - tag 연관 관계, Study에 있는 tag list
    @OneToMany(mappedBy = "study", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudyTag> studyTagList = new ArrayList<>();

    // Study - Lecture 연관 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecture_id")
    private Lecture lecture;

    // Study - 스터디장 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_Leader_id")
    private Member studyLeader;

    public void setEnterCode() {
        this.enterCode = makeEnterCode();
    }

    public static Study createStudy(String title, Integer capacity, String description,
                                    boolean isPublic,
                                    Lecture lecture, Member studyLeader) {
        Study study = new Study();

        study.setTitle(title);
        study.setCapacity(capacity);
        study.setDescription(description);
        study.setPublic(isPublic);
        study.setLecture(lecture);
        study.setStudyLeader(studyLeader);

        if (!isPublic) {
            study.setEnterCode();
        }
        return study;
    }

    // 랜덤 숫자 생성 함수
    private static int makeEnterCode() {
        // Random 객체 생성
        Random random = new Random();

        // 100000부터 999999까지의 범위에서 랜덤 숫자 생성
        return random.nextInt(900000) + 100000;
    }
}

