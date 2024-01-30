package io.github.tembero11.restroom.api.v1.controller;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/v1/account")
class AccountController {
    @GetMapping(value = "/")
    public String getAccounts() {
        return"Hello from account";
    }
}