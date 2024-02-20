package com.f17coders.classhub.module.domain.member;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.comment.Comment;
import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.communityLike.CommunityLike;
import com.f17coders.classhub.module.domain.communityScrap.CommunityScrap;
import com.f17coders.classhub.module.domain.job.Job;
import com.f17coders.classhub.module.domain.lectureBuy.LectureBuy;
import com.f17coders.classhub.module.domain.lectureLike.LectureLike;
import com.f17coders.classhub.module.domain.memberTag.MemberTag;
import com.f17coders.classhub.module.domain.review.Review;
import com.f17coders.classhub.module.domain.studyMember.StudyMember;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private int memberId;

    @Column(length = 300)
    @Setter
    private String socialId;

    @Column(length = 4)
    @Setter
    private String provider;

    @Column(length = 150)
    @Setter
    private String profileImage;

    @Setter
    @Column(columnDefinition = "TINYINT", length = 1)
    private Boolean isWithdrawn = false;

    @Column(length = 80, unique = true)
//    @Size(min = 4, max = 80, message = "닉네임을 4 ~ 80자 사이로 설정해주세요!")    // 소셜 로그인 시 최소 4자로 입력하면 정승환 이 로그인이 안 되는 오류 발생
    @Size(max = 80, message = "닉네임을 80자 이내로 설정해주세요!")
    @Setter
    private String nickname;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;

    //  Member - Jpb 연관 관계
    public void putJob(Job job) {  // 연관 관계 편의 메서드
        this.setJob(job);
        job.getMemberList().add(this);
    }

    // Member - Community 연관 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Community> communityList = new ArrayList<>(); // 작성한 커뮤니티 게시글

    // Member - Comment 연관 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Comment> commentList = new ArrayList<>();

    // Member - CommunityLike 연관 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityLike> communityLikeList = new ArrayList<>();

    // Member - CommunityScrap 연관 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityScrap> communityScrapList = new ArrayList<>();

    // Member - MemberTag 연관 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MemberTag> memberTagList = new ArrayList<>();

    // Member - StudyMember 연관관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<StudyMember> studyMemberList = new ArrayList<>();

    // Member - LectureLike 연관 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<LectureLike> lectureLikeList = new ArrayList<>();

    // Member - review 연관 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Review> reviewList = new ArrayList<>();

    // Member - LectureLike 연관 관계
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<LectureBuy> lectureBuyList = new ArrayList<>();

    public void putMemberTag(MemberTag memberTag) {  // 연관 관계 편의 메서드
        memberTag.setMember(this);
        this.getMemberTagList().add(memberTag);
    }

    @Builder
    public Member(String socialId, String nickname, String profileImage, String provider) {
        this.socialId = socialId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.provider = provider;
    }

    @Builder(builderMethodName = "fromUser", buildMethodName = "get")
    public Member(int memberId, String socialId, String nickname, String profileImage,
        String provider) {
        this.memberId = memberId;
        this.socialId = socialId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.provider = provider;
    }

    // 생성 메서드
    public static Member createMember(String nickname, String profileImage) {
        Member member = new Member();
        member.setNickname(nickname);
        member.setProfileImage(profileImage);
        return member;
    }



//    TODO : 단방향 연관 관계로 우선 설정 후 필요에 의해서 양방향으로 연관 관계 설정 + 연관 관계 편의 메서드의 위치는 로직에 따라 Many쪽에 있을 수도 있고 One쪽에 있을 수도 있으니 변경 가능
//    // Member - review 연관 관계
//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
//    private List<Review> reviewList = new ArrayList<>(); // 작성한 커뮤니티 게시글
//
//    public void putReview(Review review) {  // 연관 관계 편의 메서드
//        review.setMember(this);
//        this.getReviewList().add(review);
//    }
//
//    // Member - LectureBuy 연관 관계
//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
//    private List<LectureBuy> lectureBuyList = new ArrayList<>(); // 구매한 강의 목록
//
//    public void putLectureBuy(LectureBuy lectureBuy) {  // 연관 관계 편의 메서드
//        lectureBuy.setMember(this);
//        this.getLectureBuyList().add(lectureBuy);
//    }
//
//    // Member - LectureLike 연관 관계
//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
//    private List<LectureLike> lectureLikeList = new ArrayList<>(); // 좋아요한 강의 목록
//
//    public void putLectureLike(LectureLike lectureLike) {  // 연관 관계 편의 메서드
//        lectureLike.setMember(this);
//        this.getLectureLikeList().add(lectureLike);
//    }
//
//    // Member - StudyMember 연관 관계
//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
//    private List<StudyMember> studyMemberList = new ArrayList<>(); // 참여한 스터디룸 목록
//
//    public void putStudyMember(StudyMember studyMember) {  // 연관 관계 편의 메서드
//        studyMember.setMember(this);
//        this.getStudyMemberList().add(studyMember);
//    }
}

