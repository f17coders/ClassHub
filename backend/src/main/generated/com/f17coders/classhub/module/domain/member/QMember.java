package com.f17coders.classhub.module.domain.member;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -196563530L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    public final ListPath<com.f17coders.classhub.module.domain.comment.Comment, com.f17coders.classhub.module.domain.comment.QComment> commentList = this.<com.f17coders.classhub.module.domain.comment.Comment, com.f17coders.classhub.module.domain.comment.QComment>createList("commentList", com.f17coders.classhub.module.domain.comment.Comment.class, com.f17coders.classhub.module.domain.comment.QComment.class, PathInits.DIRECT2);

    public final ListPath<com.f17coders.classhub.module.domain.communityLike.CommunityLike, com.f17coders.classhub.module.domain.communityLike.QCommunityLike> communityLikeList = this.<com.f17coders.classhub.module.domain.communityLike.CommunityLike, com.f17coders.classhub.module.domain.communityLike.QCommunityLike>createList("communityLikeList", com.f17coders.classhub.module.domain.communityLike.CommunityLike.class, com.f17coders.classhub.module.domain.communityLike.QCommunityLike.class, PathInits.DIRECT2);

    public final ListPath<com.f17coders.classhub.module.domain.community.Community, com.f17coders.classhub.module.domain.community.QCommunity> communityList = this.<com.f17coders.classhub.module.domain.community.Community, com.f17coders.classhub.module.domain.community.QCommunity>createList("communityList", com.f17coders.classhub.module.domain.community.Community.class, com.f17coders.classhub.module.domain.community.QCommunity.class, PathInits.DIRECT2);

    public final ListPath<com.f17coders.classhub.module.domain.communityScrap.CommunityScrap, com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap> communityScrapList = this.<com.f17coders.classhub.module.domain.communityScrap.CommunityScrap, com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap>createList("communityScrapList", com.f17coders.classhub.module.domain.communityScrap.CommunityScrap.class, com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final BooleanPath isWithdrawn = createBoolean("isWithdrawn");

    public final com.f17coders.classhub.module.domain.job.QJob job;

    public final ListPath<com.f17coders.classhub.module.domain.lectureBuy.LectureBuy, com.f17coders.classhub.module.domain.lectureBuy.QLectureBuy> lectureBuyList = this.<com.f17coders.classhub.module.domain.lectureBuy.LectureBuy, com.f17coders.classhub.module.domain.lectureBuy.QLectureBuy>createList("lectureBuyList", com.f17coders.classhub.module.domain.lectureBuy.LectureBuy.class, com.f17coders.classhub.module.domain.lectureBuy.QLectureBuy.class, PathInits.DIRECT2);

    public final ListPath<com.f17coders.classhub.module.domain.lectureLike.LectureLike, com.f17coders.classhub.module.domain.lectureLike.QLectureLike> lectureLikeList = this.<com.f17coders.classhub.module.domain.lectureLike.LectureLike, com.f17coders.classhub.module.domain.lectureLike.QLectureLike>createList("lectureLikeList", com.f17coders.classhub.module.domain.lectureLike.LectureLike.class, com.f17coders.classhub.module.domain.lectureLike.QLectureLike.class, PathInits.DIRECT2);

    public final NumberPath<Integer> memberId = createNumber("memberId", Integer.class);

    public final ListPath<com.f17coders.classhub.module.domain.memberTag.MemberTag, com.f17coders.classhub.module.domain.memberTag.QMemberTag> memberTagList = this.<com.f17coders.classhub.module.domain.memberTag.MemberTag, com.f17coders.classhub.module.domain.memberTag.QMemberTag>createList("memberTagList", com.f17coders.classhub.module.domain.memberTag.MemberTag.class, com.f17coders.classhub.module.domain.memberTag.QMemberTag.class, PathInits.DIRECT2);

    public final StringPath nickname = createString("nickname");

    public final StringPath profileImage = createString("profileImage");

    public final StringPath provider = createString("provider");

    public final ListPath<com.f17coders.classhub.module.domain.review.Review, com.f17coders.classhub.module.domain.review.QReview> reviewList = this.<com.f17coders.classhub.module.domain.review.Review, com.f17coders.classhub.module.domain.review.QReview>createList("reviewList", com.f17coders.classhub.module.domain.review.Review.class, com.f17coders.classhub.module.domain.review.QReview.class, PathInits.DIRECT2);

    public final StringPath socialId = createString("socialId");

    public final ListPath<com.f17coders.classhub.module.domain.studyMember.StudyMember, com.f17coders.classhub.module.domain.studyMember.QStudyMember> studyMemberList = this.<com.f17coders.classhub.module.domain.studyMember.StudyMember, com.f17coders.classhub.module.domain.studyMember.QStudyMember>createList("studyMemberList", com.f17coders.classhub.module.domain.studyMember.StudyMember.class, com.f17coders.classhub.module.domain.studyMember.QStudyMember.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.job = inits.isInitialized("job") ? new com.f17coders.classhub.module.domain.job.QJob(forProperty("job")) : null;
    }

}

