package io.github.tembero11.restroom.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RestroomEntity {
    enum Sex {
        MEN,
        WOMEN,
        BOTH
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private float lat;
    private float lon;
    private Sex sex;
    private boolean isAccessible;
    private float fee;
}
