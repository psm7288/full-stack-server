package luma.example.luma_scan.service;

import luma.example.luma_scan.entity.DetectionResult;
import luma.example.luma_scan.entity.Product;
import luma.example.luma_scan.repository.DetectionResultRepository;
import luma.example.luma_scan.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class VisionService {

    private final ProductRepository productRepository;
    private final DetectionResultRepository detectionResultRepository;

    @Transactional
    public void processDetection(String productId, int count, double confidence) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("상품 없음: " + productId));

        product.setCurrentQty(count);
        product.setStatus(product.getCurrentQty() <= product.getMinQty() ? "부족" : "정상");

        DetectionResult result = new DetectionResult();
        result.setProduct(product);
        result.setDetectedQty(count);
        result.setConfidence(confidence);
        detectionResultRepository.save(result);
    }
}