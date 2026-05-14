package luma.example.luma_scan.controller;

import lombok.RequiredArgsConstructor;
import luma.example.luma_scan.service.VisionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final VisionService visionService;

    // 사진 분석 요청을 받는 API
    @PostMapping("/analyze")
    public String analyzeInventory(@RequestBody String imagePath) {
        visionService.requestVisionAnalysis(imagePath);
        return "분석 요청이 완료되었습니다. DB를 확인하세요!";
    }
}
