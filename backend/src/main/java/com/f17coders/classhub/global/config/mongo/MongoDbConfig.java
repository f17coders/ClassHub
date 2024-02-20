package com.f17coders.classhub.global.config.mongo;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Configuration
@RequiredArgsConstructor
@EnableMongoAuditing
public class MongoDbConfig {


    // MongoDB 문서를 자바 객체로 매핑
    @Bean
    public MappingMongoConverter mappingMongoConverter(
        MongoDatabaseFactory mongoDatabaseFactory, // 데이터베이스 연결 관리
        MongoMappingContext mongoMappingContext // Java 객체로의 매핑 규칙 유지
    ) {
        // MongoDB 참조 해결
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDatabaseFactory);
        // MongoDB 기본 참조 해결 방법 사용
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
        converter.setTypeMapper(new DefaultMongoTypeMapper(null)); // 클래스 이름 저장하지 않음
        return converter;
    }
}
