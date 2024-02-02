import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.tembero11.restroom.model.RestroomEntity;
import io.github.tembero11.restroom.repository.RestroomRepository;

import java.util.List;

@Service
public class RestroomService {
    @Autowired
    private RestroomRepository repository;

    public List<RestroomEntity> getAllRestrooms(  ) {
        return repository.findAll();
    }
}
ook