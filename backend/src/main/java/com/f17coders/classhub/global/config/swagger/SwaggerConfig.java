package com.f17coders.classhub.global.config.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    //    private final String JWT = "JWT";
    private Info info(){
        Info info = new Info()
                .title("ClassHub")
                .version("v0.0.1")
                .description("강의 정보, 리뷰, 커뮤니티를 한 곳에서 관리하며, 스터디 그룹을 구성하여 사용자의 학습 경험을 향상시키는 통합 플랫폼입니다.");
        return info;
    }
    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
                .components(new Components())
                .info(this.info())
                .externalDocs(new ExternalDocumentation()
                        .description("Springdoc-openapi 문서 보러가기")
                        .url("http://springdoc.org"));
    }

//    @Bean
//    public OpenAPI openAPI() {
//        SecurityRequirement securityRequirement = new SecurityRequirement().addList(JWT); // 헤더에 토큰 포함
//        Components components = new Components().addSecuritySchemes(JWT, new SecurityScheme()
//                .name(JWT)
//                .type(SecurityScheme.Type.HTTP)
//                .scheme("Bearer")
//                .bearerFormat("JWT")
//        );
//
//        return new OpenAPI()
//                .info(this.info())
//                .addSecurityItem(securityRequirement)
//                .components(components);
//    }
}
