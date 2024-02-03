package io.github.tembero11.restroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.tembero11.restroom.model.RestroomEntity;

public interface RestroomRepository extends JpaRepository<RestroomEntity, Long> {
    
}
