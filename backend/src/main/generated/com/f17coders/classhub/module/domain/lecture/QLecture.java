package com.f17coders.classhub.module.domain.lecture;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLecture is a Querydsl query type for Lecture
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLecture extends EntityPathBase<Lecture> {

    private static final long serialVersionUID = 1090852886L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLecture lecture = new QLecture("lecture");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    public final com.f17coders.classhub.module.domain.category.QCategory category;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final StringPath curriculum = createString("curriculum");

    public final StringPath descriptionDetail = createString("descriptionDetail");

    public final StringPath descriptionSummary = createString("descriptionSummary");

    public final StringPath gptReviewBad = createString("gptReviewBad");

    public final StringPath gptReviewGood = createString("gptReviewGood");

    public final StringPath image = createString("image");

    public final StringPath instructor = createString("instructor");

    public final SetPath<com.f17coders.classhub.module.domain.lectureBuy.LectureBuy, com.f17coders.classhub.module.domain.lectureBuy.QLectureBuy> lectureBuySet = this.<com.f17coders.classhub.module.domain.lectureBuy.LectureBuy, com.f17coders.classhub.module.domain.lectureBuy.QLectureBuy>createSet("lectureBuySet", com.f17coders.classhub.module.domain.lectureBuy.LectureBuy.class, com.f17coders.classhub.module.domain.lectureBuy.QLectureBuy.class, PathInits.DIRECT2);

    public final NumberPath<Integer> lectureId = createNumber("lectureId", Integer.class);

    public final SetPath<com.f17coders.classhub.module.domain.lectureLike.LectureLike, com.f17coders.classhub.module.domain.lectureLike.QLectureLike> lectureLikeSet = this.<com.f17coders.classhub.module.domain.lectureLike.LectureLike, com.f17coders.classhub.module.domain.lectureLike.QLectureLike>createSet("lectureLikeSet", com.f17coders.classhub.module.domain.lectureLike.LectureLike.class, com.f17coders.classhub.module.domain.lectureLike.QLectureLike.class, PathInits.DIRECT2);

    public final ListPath<com.f17coders.classhub.module.domain.lectureTag.LectureTag, com.f17coders.classhub.module.domain.lectureTag.QLectureTag> lectureTagList = this.<com.f17coders.classhub.module.domain.lectureTag.LectureTag, com.f17coders.classhub.module.domain.lectureTag.QLectureTag>createList("lectureTagList", com.f17coders.classhub.module.domain.lectureTag.LectureTag.class, com.f17coders.classhub.module.domain.lectureTag.QLectureTag.class, PathInits.DIRECT2);

    public final EnumPath<Level> level = createEnum("level", Level.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> priceOriginal = createNumber("priceOriginal", Integer.class);

    public final NumberPath<Integer> priceSale = createNumber("priceSale", Integer.class);

    public final NumberPath<Integer> reviewCount = createNumber("reviewCount", Integer.class);

    public final ListPath<com.f17coders.classhub.module.domain.review.Review, com.f17coders.classhub.module.domain.review.QReview> reviewList = this.<com.f17coders.classhub.module.domain.review.Review, com.f17coders.classhub.module.domain.review.QReview>createList("reviewList", com.f17coders.classhub.module.domain.review.Review.class, com.f17coders.classhub.module.domain.review.QReview.class, PathInits.DIRECT2);

    public final NumberPath<Float> reviewSum = createNumber("reviewSum", Float.class);

    public final StringPath siteLectureId = createString("siteLectureId");

    public final StringPath siteLink = createString("siteLink");

    public final NumberPath<Integer> siteReviewCount = createNumber("siteReviewCount", Integer.class);

    public final NumberPath<Float> siteReviewRating = createNumber("siteReviewRating", Float.class);

    public final NumberPath<Integer> siteStudentCount = createNumber("siteStudentCount", Integer.class);

    public final EnumPath<SiteType> siteType = createEnum("siteType", SiteType.class);

    public final StringPath summary = createString("summary");

    public final NumberPath<Integer> totalTime = createNumber("totalTime", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QLecture(String variable) {
        this(Lecture.class, forVariable(variable), INITS);
    }

    public QLecture(Path<? extends Lecture> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLecture(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLecture(PathMetadata metadata, PathInits inits) {
        this(Lecture.class, metadata, inits);
    }

    public QLecture(Class<? extends Lecture> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized("category") ? new com.f17coders.classhub.module.domain.category.QCategory(forProperty("category")) : null;
    }

}

