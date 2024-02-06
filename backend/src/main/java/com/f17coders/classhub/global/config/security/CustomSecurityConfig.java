package com.f17coders.classhub.global.config.security;

import com.f17coders.classhub.global.util.JWTUtil;
import com.f17coders.classhub.module.security.APIUserDetailsService;
import com.f17coders.classhub.module.security.filter.TokenCheckFilter;
import com.f17coders.classhub.module.security.handler.CustomSocialLoginSuccessHandler;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Log4j2
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class CustomSecurityConfig {

	private final APIUserDetailsService apiUserDetailsService;
	private final JWTUtil jwtUtil;

	@Bean
	public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(
			AuthenticationManagerBuilder.class);

		authenticationManagerBuilder.userDetailsService(apiUserDetailsService);
		AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

		http
			.authenticationManager(authenticationManager)
			.addFilterBefore(tokenCheckFilter(jwtUtil, apiUserDetailsService),
				UsernamePasswordAuthenticationFilter.class)
			.csrf(AbstractHttpConfigurer::disable)
			.sessionManagement((sessionManagement) ->
				sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.cors(httpSecurityCorsConfigurer ->
				httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()))
			.authorizeHttpRequests(auth ->
				auth.requestMatchers("/api/*/v0/**").permitAll()
					.requestMatchers("/api/*/v0").permitAll()
					.anyRequest().authenticated()
			)
			.oauth2Login(oauth2 ->
				oauth2
					.authorizationEndpoint(authorization -> authorization
						.baseUri("/login/oauth2/authorization")
					)
					.successHandler(authenticationSuccessHandler())
			);

		return http.build();
	}

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {      // TODO : 추후 프론트로 Resourse가 전부 넘어가면 삭제해도 될지도?
		return web -> {
			web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
		};
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOriginPatterns(List.of("*"));       // 모든 출처에서 오는 요청 허용
		configuration.setAllowedMethods(
			Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));     // 허용할 HTTP 메소드
		configuration.setAllowedHeaders(Arrays.asList(      // 요청 헤더 중 허용할 헤더 설정
			"Authorization",
			"Cache-Control",
			"Content-Type"
		));
		configuration.setAllowCredentials(true);    // 인증 정보(cookies, headers) 등을 포함한 요청을 허용하도록 설정

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();     // URL 기반의 CORS 설정 소스 객체 생성
		source.registerCorsConfiguration("/**", configuration);     // 모든 url 패턴에 대해 CORS 설정 적용
		return source;
	}

	@Bean
	public TokenCheckFilter tokenCheckFilter(JWTUtil jwtUtil,
		APIUserDetailsService apiUserDetailsService) {
		return new TokenCheckFilter(apiUserDetailsService, jwtUtil);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler() {
		return new CustomSocialLoginSuccessHandler(jwtUtil);
	}
}
