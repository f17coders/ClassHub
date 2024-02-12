package com.f17coders.classhub.module.domain.review;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSiteReview is a Querydsl query type for SiteReview
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSiteReview extends EntityPathBase<SiteReview> {

    private static final long serialVersionUID = -1887897827L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSiteReview siteReview = new QSiteReview("siteReview");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.f17coders.classhub.module.domain.lecture.QLecture lecture;

    public final NumberPath<Float> score = createNumber("score", Float.class);

    public final NumberPath<Integer> siteReviewId = createNumber("siteReviewId", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QSiteReview(String variable) {
        this(SiteReview.class, forVariable(variable), INITS);
    }

    public QSiteReview(Path<? extends SiteReview> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSiteReview(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSiteReview(PathMetadata metadata, PathInits inits) {
        this(SiteReview.class, metadata, inits);
    }

    public QSiteReview(Class<? extends SiteReview> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.lecture = inits.isInitialized("lecture") ? new com.f17coders.classhub.module.domain.lecture.QLecture(forProperty("lecture"), inits.get("lecture")) : null;
    }

}

