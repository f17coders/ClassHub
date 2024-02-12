package com.f17coders.classhub.module.domain.lectureBuy;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLectureBuy is a Querydsl query type for LectureBuy
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLectureBuy extends EntityPathBase<LectureBuy> {

    private static final long serialVersionUID = -887388426L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLectureBuy lectureBuy = new QLectureBuy("lectureBuy");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.f17coders.classhub.module.domain.lecture.QLecture lecture;

    public final NumberPath<Integer> lectureBuyId = createNumber("lectureBuyId", Integer.class);

    public final com.f17coders.classhub.module.domain.member.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QLectureBuy(String variable) {
        this(LectureBuy.class, forVariable(variable), INITS);
    }

    public QLectureBuy(Path<? extends LectureBuy> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLectureBuy(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLectureBuy(PathMetadata metadata, PathInits inits) {
        this(LectureBuy.class, metadata, inits);
    }

    public QLectureBuy(Class<? extends LectureBuy> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.lecture = inits.isInitialized("lecture") ? new com.f17coders.classhub.module.domain.lecture.QLecture(forProperty("lecture"), inits.get("lecture")) : null;
        this.member = inits.isInitialized("member") ? new com.f17coders.classhub.module.domain.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

