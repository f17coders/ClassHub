package com.f17coders.classhub.module.domain.communityTag;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCommunityTag is a Querydsl query type for CommunityTag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCommunityTag extends EntityPathBase<CommunityTag> {

    private static final long serialVersionUID = -653430762L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCommunityTag communityTag = new QCommunityTag("communityTag");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    public final com.f17coders.classhub.module.domain.community.QCommunity community;

    public final NumberPath<Integer> communityTagId = createNumber("communityTagId", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.f17coders.classhub.module.domain.tag.QTag tag;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QCommunityTag(String variable) {
        this(CommunityTag.class, forVariable(variable), INITS);
    }

    public QCommunityTag(Path<? extends CommunityTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCommunityTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCommunityTag(PathMetadata metadata, PathInits inits) {
        this(CommunityTag.class, metadata, inits);
    }

    public QCommunityTag(Class<? extends CommunityTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.community = inits.isInitialized("community") ? new com.f17coders.classhub.module.domain.community.QCommunity(forProperty("community"), inits.get("community")) : null;
        this.tag = inits.isInitialized("tag") ? new com.f17coders.classhub.module.domain.tag.QTag(forProperty("tag")) : null;
    }

}

