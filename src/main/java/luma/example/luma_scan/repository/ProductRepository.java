package luma.example.luma_scan.repository;

import luma.example.luma_scan.entity.Product; // 이 경로가 정확해야 에러가 안 납니다!
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
}
