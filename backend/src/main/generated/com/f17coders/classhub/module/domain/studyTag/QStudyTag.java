package com.f17coders.classhub.module.domain.studyTag;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyTag is a Querydsl query type for StudyTag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyTag extends EntityPathBase<StudyTag> {

    private static final long serialVersionUID = 1847296662L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyTag studyTag = new QStudyTag("studyTag");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final com.f17coders.classhub.module.domain.study.QStudy study;

    public final NumberPath<Integer> studyTagId = createNumber("studyTagId", Integer.class);

    public final com.f17coders.classhub.module.domain.tag.QTag tag;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QStudyTag(String variable) {
        this(StudyTag.class, forVariable(variable), INITS);
    }

    public QStudyTag(Path<? extends StudyTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyTag(PathMetadata metadata, PathInits inits) {
        this(StudyTag.class, metadata, inits);
    }

    public QStudyTag(Class<? extends StudyTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.study = inits.isInitialized("study") ? new com.f17coders.classhub.module.domain.study.QStudy(forProperty("study"), inits.get("study")) : null;
        this.tag = inits.isInitialized("tag") ? new com.f17coders.classhub.module.domain.tag.QTag(forProperty("tag")) : null;
    }

}

