package com.f17coders.classhub.global.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Log4j2
public class JWTUtil {
    @Value(value = "${key.jwt.secret}")
    private String jwtKey;

    public String generateToken(Map<String, Object> valueMap, int days) {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        // payload 부분 설정
        Map<String, Object> payloads = new HashMap<>();
        payloads.putAll(valueMap);

        // 유효 시간 (단위: DAY)
        int time = (24 * 60) * days;

        String jwtStr = Jwts.builder()      // 시크릿 키(jwtKey)를 사용해 토큰을 서명
                .setHeader(headers)
                .setClaims(payloads)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(time).toInstant()))
                .signWith(SignatureAlgorithm.HS256, jwtKey.getBytes())
                .compact();

        return jwtStr;
    }

    public Map<String, Object> validateToken(String token) {    // 주어진 JWT 토큰이 유효한지 검증하고, 토큰에서 정보를 추출하여 반환
        Map<String, Object> claim = null;

        claim = Jwts.parser()
                .setSigningKey(jwtKey.getBytes()) // Set Key
                .parseClaimsJws(token) // 파싱 및 검증, 실패 시 에러
                .getBody();
        return claim;   // 성공하면 토큰의 페이로드를 반환
    }
}
