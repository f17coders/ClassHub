package com.f17coders.classhub.module.domain.community;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCommunity is a Querydsl query type for Community
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCommunity extends EntityPathBase<Community> {

    private static final long serialVersionUID = -1220173012L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCommunity community = new QCommunity("community");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    public final ListPath<com.f17coders.classhub.module.domain.comment.Comment, com.f17coders.classhub.module.domain.comment.QComment> commentList = this.<com.f17coders.classhub.module.domain.comment.Comment, com.f17coders.classhub.module.domain.comment.QComment>createList("commentList", com.f17coders.classhub.module.domain.comment.Comment.class, com.f17coders.classhub.module.domain.comment.QComment.class, PathInits.DIRECT2);

    public final NumberPath<Integer> communityId = createNumber("communityId", Integer.class);

    public final SetPath<com.f17coders.classhub.module.domain.communityLike.CommunityLike, com.f17coders.classhub.module.domain.communityLike.QCommunityLike> communityLikeSet = this.<com.f17coders.classhub.module.domain.communityLike.CommunityLike, com.f17coders.classhub.module.domain.communityLike.QCommunityLike>createSet("communityLikeSet", com.f17coders.classhub.module.domain.communityLike.CommunityLike.class, com.f17coders.classhub.module.domain.communityLike.QCommunityLike.class, PathInits.DIRECT2);

    public final SetPath<com.f17coders.classhub.module.domain.communityScrap.CommunityScrap, com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap> communityScrapSet = this.<com.f17coders.classhub.module.domain.communityScrap.CommunityScrap, com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap>createSet("communityScrapSet", com.f17coders.classhub.module.domain.communityScrap.CommunityScrap.class, com.f17coders.classhub.module.domain.communityScrap.QCommunityScrap.class, PathInits.DIRECT2);

    public final ListPath<com.f17coders.classhub.module.domain.communityTag.CommunityTag, com.f17coders.classhub.module.domain.communityTag.QCommunityTag> communityTagList = this.<com.f17coders.classhub.module.domain.communityTag.CommunityTag, com.f17coders.classhub.module.domain.communityTag.QCommunityTag>createList("communityTagList", com.f17coders.classhub.module.domain.communityTag.CommunityTag.class, com.f17coders.classhub.module.domain.communityTag.QCommunityTag.class, PathInits.DIRECT2);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.f17coders.classhub.module.domain.member.QMember member;

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public final NumberPath<Integer> viewCount = createNumber("viewCount", Integer.class);

    public QCommunity(String variable) {
        this(Community.class, forVariable(variable), INITS);
    }

    public QCommunity(Path<? extends Community> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCommunity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCommunity(PathMetadata metadata, PathInits inits) {
        this(Community.class, metadata, inits);
    }

    public QCommunity(Class<? extends Community> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.f17coders.classhub.module.domain.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

