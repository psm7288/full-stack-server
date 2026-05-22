package luma.example.luma_scan.repository;

import luma.example.luma_scan.entity.DetectionResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DetectionResultRepository extends JpaRepository<DetectionResult, Long> {
}
