package com.f17coders.classhub.module.domain.community.service;

import com.f17coders.classhub.module.domain.community.Community;
import com.f17coders.classhub.module.domain.community.repository.CommunityRepository;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ViewCountScheduler {

    private final CommunityRepository communityRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private final int ONE_HOUR = 3600000;

    @Scheduled(fixedDelay = ONE_HOUR)  // 1시간마다 실행
    @Transactional
    public void updateViewCounts() {
        Set<String> keys = redisTemplate.keys("viewCounts::*");
        if (keys != null) {
            for (String key : keys) {
                Integer id = Integer.parseInt(key.split("::")[1]);
                Integer viewCount = (Integer) redisTemplate.opsForValue().get(key);

                // DB에 조회수를 반영
                communityRepository.findById(id).ifPresent(community -> {
                    community.setViewCount(community.getViewCount() + viewCount);
                    communityRepository.save(community);
                });

                // Redis의 해당 키를 삭제
                redisTemplate.delete(key);
            }
        }
    }
}
