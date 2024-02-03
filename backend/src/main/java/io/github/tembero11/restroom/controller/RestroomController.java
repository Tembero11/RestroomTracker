package io.github.tembero11.restroom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import io.github.tembero11.restroom.service.RestroomService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/restrooms")
public class RestroomController {
    @Autowired
    private RestroomService restroomService;
}