package com.f17coders.classhub.module.domain.lecture;

import com.f17coders.classhub.module.domain.BaseEntity;
import com.f17coders.classhub.module.domain.category.Category;
import com.f17coders.classhub.module.domain.lectureBuy.LectureBuy;
import com.f17coders.classhub.module.domain.lectureLike.LectureLike;
import com.f17coders.classhub.module.domain.lectureTag.LectureTag;
import com.f17coders.classhub.module.domain.review.Review;
import com.f17coders.classhub.module.domain.studyTag.StudyTag;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import lombok.ToString;

@Getter
@Setter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Lecture extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "lecture_id")
	private int lectureId;

	@Column(length = 40)
	private String siteLectureId;

	@Column(length = 300)
	private String name;

	@Column(columnDefinition = "TEXT")
	private String image;

	@Enumerated(EnumType.STRING)
	private Level level;

	@Enumerated(EnumType.STRING)
	private SiteType siteType;

	private Integer priceOriginal;
	private Integer priceSale;

	@Column(columnDefinition = "TEXT")
	private String summary;

	@Column(columnDefinition = "TEXT")
	private String descriptionSummary;

	@Column(length = 150)
	private String descriptionDetail;

	private Float siteReviewRating;
	private Integer siteReviewCount;
	private Integer siteStudentCount;
	private Float reviewSum;
	private Integer reviewCount;

	private Integer totalTime;

	@Column(columnDefinition = "JSON")
	private String curriculum;

	@Column(length = 300)
	private String instructor;

	@Column(columnDefinition = "TEXT")
	private String siteLink;

	@Column(columnDefinition = "TEXT")
	private String gptReview;

	// Lecture - Category 연관 관계
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category category;

	// Lecture - tag 연관 관계, Lecture 있는 tag list
	@OneToMany(mappedBy = "lecture", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<LectureTag> lectureTagList = new ArrayList<>();

	// Lecture - LectureLike 연관 관계
    @OneToMany(mappedBy = "lecture", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<LectureLike> lectureLikeSet = new HashSet<>();

	// Lecture - review 연관 관계
    @OneToMany(mappedBy = "lecture", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviewList = new ArrayList<>();

    // Lecture - LectureBuy 연관 관계
    @OneToMany(mappedBy = "lecture", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<LectureBuy> lectureBuySet = new HashSet<>();


//    TODO : 단방향 연관 관계로 우선 설정 후 필요에 의해서 양방향으로 연관 관계 설정 + 연관 관계 편의 메서드의 위치는 로직에 따라 Many쪽에 있을 수도 있고 One쪽에 있을 수도 있으니 변경 가능//

//
//    // Lecture - LectureLike 연관 관계
//    @OneToMany(mappedBy = "lecture", fetch = FetchType.LAZY)
//    private List<LectureLike> lectureLikeList = new ArrayList<>();
//
//    public void putLectureLike(LectureLike lectureLike) {  // 연관 관계 편의 메서드
//        lectureLike.setLecture(this);
//        this.getLectureLikeList().add(lectureLike);
//    }
//
//    // Lecture - LectureTag 연관 관계
//    @OneToMany(mappedBy = "lecture", fetch = FetchType.LAZY)
//    private List<LectureTag> lectureTagList = new ArrayList<>();
//
//    public void putLectureTag(LectureTag lectureTag) {  // 연관 관계 편의 메서드
//        lectureTag.setLecture(this);
//        this.getLectureTagList().add(lectureTag);
//    }
}

