// 이미지 분석 관련 요소
const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const previewText = document.getElementById("previewText");
const imageAnalyzeBtn = document.getElementById("imageAnalyzeBtn");
const resetImageBtn = document.getElementById("resetImageBtn");

// 실시간 카메라 관련 요소
const cameraVideo = document.getElementById("cameraVideo");
const captureCanvas = document.getElementById("captureCanvas");
const cameraPlaceholder = document.getElementById("cameraPlaceholder");
const cameraArea = document.getElementById("cameraArea");

const startCameraBtn = document.getElementById("startCameraBtn");
const captureBtn = document.getElementById("captureBtn");
const stopCameraBtn = document.getElementById("stopCameraBtn");

const liveDot = document.getElementById("liveDot");
const liveStatusText = document.getElementById("liveStatusText");
const cameraPermissionText = document.getElementById("cameraPermissionText");

// 공통 요소
const saveResultBtn = document.getElementById("saveResultBtn");
const goLiveBtn = document.getElementById("goLiveBtn");
const navLinks = document.querySelectorAll(".nav a");

let cameraStream = null;

// 이미지 미리보기
if (imageInput) {
    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];

        if (!file) {
            resetImagePreview();
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            previewImage.src = event.target.result;
            previewImage.style.display = "block";
            previewText.style.display = "none";
        };

        reader.readAsDataURL(file);
    });
}

// 이미지 분석 버튼
if (imageAnalyzeBtn) {
    imageAnalyzeBtn.addEventListener("click", function () {
        if (!imageInput.files[0]) {
            alert("먼저 이미지를 업로드해주세요.");
            return;
        }

        imageAnalyzeBtn.textContent = "분석 중...";
        imageAnalyzeBtn.disabled = true;

        setTimeout(function () {
            imageAnalyzeBtn.textContent = "분석 완료";
            alert("이미지 분석이 완료되었습니다. 현재는 UI 테스트용 동작입니다.");

            setTimeout(function () {
                imageAnalyzeBtn.textContent = "이미지 분석";
                imageAnalyzeBtn.disabled = false;
            }, 1000);
        }, 1200);
    });
}

// 이미지 초기화
if (resetImageBtn) {
    resetImageBtn.addEventListener("click", function () {
        imageInput.value = "";
        resetImagePreview();
    });
}

function resetImagePreview() {
    previewImage.src = "";
    previewImage.style.display = "none";
    previewText.style.display = "block";
    previewText.textContent = "선택된 이미지가 없습니다.";
}

// 카메라 시작
if (startCameraBtn) {
    startCameraBtn.addEventListener("click", async function () {
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            });

            cameraVideo.srcObject = cameraStream;

            cameraPlaceholder.style.display = "none";
            cameraArea.classList.add("active");

            liveDot.classList.add("active");
            liveStatusText.textContent = "카메라 실행 중";

            if (cameraPermissionText) {
                cameraPermissionText.textContent = "허용됨";
                cameraPermissionText.classList.remove("neutral");
                cameraPermissionText.classList.remove("danger");
                cameraPermissionText.classList.add("success");
            }

            startCameraBtn.textContent = "실행 중";
            startCameraBtn.disabled = true;
        } catch (error) {
            alert("카메라를 실행할 수 없습니다. 브라우저 권한을 확인해주세요.");
            console.error(error);

            if (cameraPermissionText) {
                cameraPermissionText.textContent = "거부됨";
                cameraPermissionText.classList.remove("neutral");
                cameraPermissionText.classList.remove("success");
                cameraPermissionText.classList.add("danger");
            }
        }
    });
}

// 현재 프레임 분석
if (captureBtn) {
    captureBtn.addEventListener("click", function () {
        if (!cameraStream) {
            alert("먼저 카메라를 시작해주세요.");
            return;
        }

        const context = captureCanvas.getContext("2d");

        captureCanvas.width = cameraVideo.videoWidth;
        captureCanvas.height = cameraVideo.videoHeight;

        context.drawImage(
            cameraVideo,
            0,
            0,
            captureCanvas.width,
            captureCanvas.height
        );

        liveStatusText.textContent = "현재 프레임 분석 완료";
        alert("현재 프레임을 캡처했습니다. 이후 이 이미지를 Python YOLO 서버로 전송하면 됩니다.");
    });
}

// 카메라 중지
if (stopCameraBtn) {
    stopCameraBtn.addEventListener("click", function () {
        if (!cameraStream) {
            alert("현재 실행 중인 카메라가 없습니다.");
            return;
        }

        stopCamera();
        liveStatusText.textContent = "카메라 중지됨";
    });
}

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    cameraStream = null;
    cameraVideo.srcObject = null;

    cameraPlaceholder.style.display = "flex";
    cameraArea.classList.remove("active");

    liveDot.classList.remove("active");

    startCameraBtn.textContent = "카메라 시작";
    startCameraBtn.disabled = false;
}

// 인식 결과 재고 반영
if (saveResultBtn) {
    saveResultBtn.addEventListener("click", function () {
        alert("인식 결과가 재고에 반영되었습니다. 현재는 UI 테스트용 동작입니다.");
    });
}

// 상단 영상 분석 시작 버튼
if (goLiveBtn) {
    goLiveBtn.addEventListener("click", function () {
        location.href = "#live";
    });
}

// 메뉴 클릭 시 active 처리
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

// 스크롤 위치에 따라 메뉴 active 처리
window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id], article[id]");
    const scrollPosition = window.scrollY + 120;

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(function (link) {
                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + sectionId) {
                    link.classList.add("active");
                }
            });
        }
    });
});

// 페이지 종료 또는 새로고침 시 카메라 정리
window.addEventListener("beforeunload", function () {
    if (cameraStream) {
        stopCamera();
    }
});

// 반출 등록 모달
const exportModalOverlay = document.getElementById("exportModalOverlay");
const openExportModalBtn = document.getElementById("openExportModalBtn");
const closeExportModalBtn = document.getElementById("closeExportModalBtn");
const cancelExportBtn = document.getElementById("cancelExportBtn");
const exportForm = document.getElementById("exportForm");

// 모달 열기
if (openExportModalBtn) {
    openExportModalBtn.addEventListener("click", function () {
        // 처리 일시 기본값: 현재 시각
        const now = new Date();
        const pad = (n) => String(n).padStart(2, "0");
        const localDt =
            now.getFullYear() + "-" +
            pad(now.getMonth() + 1) + "-" +
            pad(now.getDate()) + "T" +
            pad(now.getHours()) + ":" +
            pad(now.getMinutes());

        const dateInput = exportForm.querySelector("input[name='exportDate']");
        if (dateInput) dateInput.value = localDt;

        exportModalOverlay.classList.add("open");
    });
}

// 모달 닫기
function closeExportModal() {
    exportModalOverlay.classList.remove("open");
    exportForm.reset();
}

if (closeExportModalBtn) {
    closeExportModalBtn.addEventListener("click", closeExportModal);
}

if (cancelExportBtn) {
    cancelExportBtn.addEventListener("click", closeExportModal);
}

// 오버레이 클릭 시 닫기
if (exportModalOverlay) {
    exportModalOverlay.addEventListener("click", function (e) {
        if (e.target === exportModalOverlay) closeExportModal();
    });
}

// 반출 등록 폼 제출
if (exportForm) {
    exportForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const product = exportForm.querySelector("select[name='productId']");
        const qty = exportForm.querySelector("input[name='exportQty']");
        const destination = exportForm.querySelector("input[name='destination']");
        const exportDate = exportForm.querySelector("input[name='exportDate']");

        if (!product.value) {
            alert("상품을 선택해주세요.");
            return;
        }

        // 실제 연동 시 fetch('/api/export', { method: 'POST', body: ... }) 로 교체
        console.log("반출 등록:", {
            productId: product.value,
            exportQty: qty.value,
            destination: destination.value,
            exportDate: exportDate.value
        });

        alert("반출이 등록되었습니다. 현재는 UI 테스트용 동작입니다.");
        closeExportModal();
    });
}
