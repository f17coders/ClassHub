package com.f17coders.classhub.module.domain.memberTag;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberTag is a Querydsl query type for MemberTag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberTag extends EntityPathBase<MemberTag> {

    private static final long serialVersionUID = 1475250138L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberTag memberTag = new QMemberTag("memberTag");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.f17coders.classhub.module.domain.member.QMember member;

    public final NumberPath<Integer> memberTagId = createNumber("memberTagId", Integer.class);

    public final com.f17coders.classhub.module.domain.tag.QTag tag;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QMemberTag(String variable) {
        this(MemberTag.class, forVariable(variable), INITS);
    }

    public QMemberTag(Path<? extends MemberTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberTag(PathMetadata metadata, PathInits inits) {
        this(MemberTag.class, metadata, inits);
    }

    public QMemberTag(Class<? extends MemberTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.f17coders.classhub.module.domain.member.QMember(forProperty("member"), inits.get("member")) : null;
        this.tag = inits.isInitialized("tag") ? new com.f17coders.classhub.module.domain.tag.QTag(forProperty("tag")) : null;
    }

}

