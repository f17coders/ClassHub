package com.f17coders.classhub;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
public class HealthController {
    @GetMapping("/health")
    public String healthCheck() {
        return "health OK";
    }
}
