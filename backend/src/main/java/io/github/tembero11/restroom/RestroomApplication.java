package io.github.tembero11.restroom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@EnableJpaRepositories("io.github.tembero.*")
@ComponentScan(basePackages = { "io.github.tembero.*" })
@EntityScan("io.github.tembero.*")   
@SpringBootApplication
@RestController
public class RestroomApplication {
    public static void main(String[] args) {
      SpringApplication.run(RestroomApplication.class, args);
    }
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      return String.format("Hello %s!", name);
    }
}