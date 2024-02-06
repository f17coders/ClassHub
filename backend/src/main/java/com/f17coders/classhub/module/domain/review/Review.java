package com.f17coders.classhub.module.domain.review;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.community.Community;
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
public class Review extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "review_id")
	private int reviewId;

	private Float score;

	@Column(length = 1000)
	private String content;

	// Review - Member 연관 관계 매핑
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	public void putMember(Member member){   // 연관 관계 편의 메서드
		this.member = member;
		member.getReviewList().add(this);
	}

	// Review - Lecture 연관 관계 매핑
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lecture_id")
	private Lecture lecture;

	public void putLecture(Lecture lecture){   // 연관 관계 편의 메서드
		this.lecture = lecture;
		lecture.getReviewList().add(this);
	}

	// 생성 메서드
	public static Review createReview(Float score, String content, Member member, Lecture lecture) {
		Review review = new Review();
		review.setScore(score);
		review.setContent(content);
		review.putLecture(lecture);
		review.putMember(member);

		return review;
	}
}

