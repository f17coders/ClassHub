package com.f17coders.classhub;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "HealthController", description = "서버가 정상적으로 작동하는지 확인 용도")
@Log4j2
@RestController
public class HealthController {
    @GetMapping("/health")
    public String healthCheck() {
        return "health OK";
    }
}
