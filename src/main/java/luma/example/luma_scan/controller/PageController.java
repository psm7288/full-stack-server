package luma.example.luma_scan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PageController {

    @ResponseBody
    @GetMapping("/ping")
    public String ping() {
        return "PageController 연결 성공";
    }

    @GetMapping({"/", "/login"})
    public String login() {
        return "pages/login";
    }

    @GetMapping("/home")
    public String home() {
        return "pages/home";
    }

    @GetMapping("/analysis")
    public String analysis() {
        return "pages/analysis";
    }

    @GetMapping("/inventory")
    public String inventory() {
        return "pages/inventory";
    }

    @GetMapping("/inbound")
    public String inbound() {
        return "pages/inbound";
    }

    @GetMapping("/outbound")
    public String outbound() {
        return "pages/outbound";
    }
}