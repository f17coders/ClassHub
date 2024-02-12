package com.f17coders.classhub.module.domain.study;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudy is a Querydsl query type for Study
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudy extends EntityPathBase<Study> {

    private static final long serialVersionUID = 511534188L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudy study = new QStudy("study");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    public final NumberPath<Integer> capacity = createNumber("capacity", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final StringPath description = createString("description");

    public final NumberPath<Integer> enterCode = createNumber("enterCode", Integer.class);

    public final BooleanPath isPublic = createBoolean("isPublic");

    public final com.f17coders.classhub.module.domain.lecture.QLecture lecture;

    public final NumberPath<Integer> studyId = createNumber("studyId", Integer.class);

    public final com.f17coders.classhub.module.domain.member.QMember studyLeader;

    public final ListPath<com.f17coders.classhub.module.domain.studyMember.StudyMember, com.f17coders.classhub.module.domain.studyMember.QStudyMember> studyMemberList = this.<com.f17coders.classhub.module.domain.studyMember.StudyMember, com.f17coders.classhub.module.domain.studyMember.QStudyMember>createList("studyMemberList", com.f17coders.classhub.module.domain.studyMember.StudyMember.class, com.f17coders.classhub.module.domain.studyMember.QStudyMember.class, PathInits.DIRECT2);

    public final ListPath<com.f17coders.classhub.module.domain.studyTag.StudyTag, com.f17coders.classhub.module.domain.studyTag.QStudyTag> studyTagList = this.<com.f17coders.classhub.module.domain.studyTag.StudyTag, com.f17coders.classhub.module.domain.studyTag.QStudyTag>createList("studyTagList", com.f17coders.classhub.module.domain.studyTag.StudyTag.class, com.f17coders.classhub.module.domain.studyTag.QStudyTag.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QStudy(String variable) {
        this(Study.class, forVariable(variable), INITS);
    }

    public QStudy(Path<? extends Study> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudy(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudy(PathMetadata metadata, PathInits inits) {
        this(Study.class, metadata, inits);
    }

    public QStudy(Class<? extends Study> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.lecture = inits.isInitialized("lecture") ? new com.f17coders.classhub.module.domain.lecture.QLecture(forProperty("lecture"), inits.get("lecture")) : null;
        this.studyLeader = inits.isInitialized("studyLeader") ? new com.f17coders.classhub.module.domain.member.QMember(forProperty("studyLeader"), inits.get("studyLeader")) : null;
    }

}

