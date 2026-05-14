package luma.example.luma_scan.service;

import luma.example.luma_scan.dto.DetectionResponse;
import luma.example.luma_scan.entity.Inventory;
import luma.example.luma_scan.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient; // 이게 꼭 있어야 WebClient 빨간줄이 사라집니다
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VisionService {

    private final InventoryRepository inventoryRepository;
    private final WebClient webClient = WebClient.create("http://ai-server-url:8000"); // AI 서버 주소

    @Transactional
    public void requestVisionAnalysis(String imagePath) {
        // 1. AI 서버에 분석 요청 (POST)
        List<DetectionResponse> results = webClient.post()
                .uri("/predict")
                .bodyValue(Map.of("image_url", imagePath))
                .retrieve()
                .bodyToFlux(DetectionResponse.class)
                .collectList()
                .block();

        // 2. 결과값을 DB에 연동하여 업데이트
        if (results != null) {
            results.forEach(res -> {
                inventoryRepository.findByItemName(res.getItemName())
                        .ifPresent(item -> item.updateQuantity(res.getCount()));
            });
        }
    }
}
