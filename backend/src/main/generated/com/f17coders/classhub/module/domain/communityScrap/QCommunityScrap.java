package com.f17coders.classhub.module.domain.communityScrap;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCommunityScrap is a Querydsl query type for CommunityScrap
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCommunityScrap extends EntityPathBase<CommunityScrap> {

    private static final long serialVersionUID = 9303030L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCommunityScrap communityScrap = new QCommunityScrap("communityScrap");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    public final com.f17coders.classhub.module.domain.community.QCommunity community;

    public final NumberPath<Integer> communityScrapId = createNumber("communityScrapId", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.f17coders.classhub.module.domain.member.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QCommunityScrap(String variable) {
        this(CommunityScrap.class, forVariable(variable), INITS);
    }

    public QCommunityScrap(Path<? extends CommunityScrap> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCommunityScrap(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCommunityScrap(PathMetadata metadata, PathInits inits) {
        this(CommunityScrap.class, metadata, inits);
    }

    public QCommunityScrap(Class<? extends CommunityScrap> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.community = inits.isInitialized("community") ? new com.f17coders.classhub.module.domain.community.QCommunity(forProperty("community"), inits.get("community")) : null;
        this.member = inits.isInitialized("member") ? new com.f17coders.classhub.module.domain.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

