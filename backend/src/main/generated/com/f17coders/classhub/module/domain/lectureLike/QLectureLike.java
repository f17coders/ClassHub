package com.f17coders.classhub.module.domain.lectureLike;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLectureLike is a Querydsl query type for LectureLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLectureLike extends EntityPathBase<LectureLike> {

    private static final long serialVersionUID = -578795772L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLectureLike lectureLike = new QLectureLike("lectureLike");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.f17coders.classhub.module.domain.lecture.QLecture lecture;

    public final NumberPath<Integer> lectureLikeId = createNumber("lectureLikeId", Integer.class);

    public final com.f17coders.classhub.module.domain.member.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QLectureLike(String variable) {
        this(LectureLike.class, forVariable(variable), INITS);
    }

    public QLectureLike(Path<? extends LectureLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLectureLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLectureLike(PathMetadata metadata, PathInits inits) {
        this(LectureLike.class, metadata, inits);
    }

    public QLectureLike(Class<? extends LectureLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.lecture = inits.isInitialized("lecture") ? new com.f17coders.classhub.module.domain.lecture.QLecture(forProperty("lecture"), inits.get("lecture")) : null;
        this.member = inits.isInitialized("member") ? new com.f17coders.classhub.module.domain.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

