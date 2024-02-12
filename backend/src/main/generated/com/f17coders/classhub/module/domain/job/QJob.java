package com.f17coders.classhub.module.domain.job;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QJob is a Querydsl query type for Job
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QJob extends EntityPathBase<Job> {

    private static final long serialVersionUID = 1070587156L;

    public static final QJob job = new QJob("job");

    public final com.f17coders.classhub.module.domain.QBaseEntity _super = new com.f17coders.classhub.module.domain.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createTime = _super.createTime;

    public final NumberPath<Integer> jobId = createNumber("jobId", Integer.class);

    public final SetPath<com.f17coders.classhub.module.domain.member.Member, com.f17coders.classhub.module.domain.member.QMember> memberList = this.<com.f17coders.classhub.module.domain.member.Member, com.f17coders.classhub.module.domain.member.QMember>createSet("memberList", com.f17coders.classhub.module.domain.member.Member.class, com.f17coders.classhub.module.domain.member.QMember.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updateTime = _super.updateTime;

    public QJob(String variable) {
        super(Job.class, forVariable(variable));
    }

    public QJob(Path<? extends Job> path) {
        super(path.getType(), path.getMetadata());
    }

    public QJob(PathMetadata metadata) {
        super(Job.class, metadata);
    }

}

