const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const previewText = document.getElementById("previewText");
const imageAnalyzeBtn = document.getElementById("imageAnalyzeBtn");
const resetImageBtn = document.getElementById("resetImageBtn");

const cameraVideo = document.getElementById("cameraVideo");
const captureCanvas = document.getElementById("captureCanvas");
const cameraPlaceholder = document.getElementById("cameraPlaceholder");
const cameraArea = document.getElementById("cameraArea");

const startCameraBtn = document.getElementById("startCameraBtn");
const captureBtn = document.getElementById("captureBtn");
const stopCameraBtn = document.getElementById("stopCameraBtn");

const liveDot = document.getElementById("liveDot");
const liveStatusText = document.getElementById("liveStatusText");
const processStatusText = document.getElementById("processStatusText");
const cameraPermissionText = document.getElementById("cameraPermissionText");
const saveResultBtn = document.getElementById("saveResultBtn");

let cameraStream = null;

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

if (imageAnalyzeBtn) {
    imageAnalyzeBtn.addEventListener("click", function () {
        if (!imageInput.files[0]) {
            alert("먼저 이미지를 업로드해주세요.");
            return;
        }

        imageAnalyzeBtn.textContent = "분석 중...";
        imageAnalyzeBtn.disabled = true;

        if (processStatusText) {
            processStatusText.textContent = "이미지 분석 중";
        }

        setTimeout(function () {
            imageAnalyzeBtn.textContent = "분석 완료";
            alert("이미지 분석이 완료되었습니다. 현재는 UI 테스트용 동작입니다.");

            if (processStatusText) {
                processStatusText.textContent = "분석 완료";
            }

            setTimeout(function () {
                imageAnalyzeBtn.textContent = "이미지 분석";
                imageAnalyzeBtn.disabled = false;
            }, 1000);
        }, 1200);
    });
}

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

            if (processStatusText) {
                processStatusText.textContent = "실시간 분석 중";
            }

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

        if (processStatusText) {
            processStatusText.textContent = "프레임 분석 완료";
        }

        alert("현재 프레임을 캡처했습니다. 이후 이 이미지를 Python YOLO 서버로 전송하면 됩니다.");
    });
}

if (stopCameraBtn) {
    stopCameraBtn.addEventListener("click", function () {
        if (!cameraStream) {
            alert("현재 실행 중인 카메라가 없습니다.");
            return;
        }

        stopCamera();
        liveStatusText.textContent = "카메라 중지됨";

        if (processStatusText) {
            processStatusText.textContent = "대기";
        }
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

if (saveResultBtn) {
    saveResultBtn.addEventListener("click", function () {
        alert("인식 결과가 재고에 반영되었습니다. 현재는 UI 테스트용 동작입니다.");
    });
}

window.addEventListener("beforeunload", function () {
    if (cameraStream) {
        stopCamera();
    }
});

// --- 여기서부터 진짜 DB 연동 코드 ---

// 1. 페이지가 로드되면 DB에서 데이터를 가져와 화면의 '3개'를 진짜 숫자로 바꿉니다.
document.addEventListener("DOMContentLoaded", function () {
    refreshInventoryDisplay();
});

function refreshInventoryDisplay() {
    fetch('/api/inventory/all')
        .then(response => response.json())
        .then(data => {
            // 서버 데이터에서 P001(콜라) 상품 찾기
            const colaData = data.find(item => item.productId === 'P001');

            if (colaData) {
                // 화면에서 '콜라' 수량이 적힌 요소를 찾아 숫자를 변경 (99개로!)
                // HTML 구조상 콜라가 첫 번째 result-item이라고 가정합니다.
                const resultItems = document.querySelectorAll(".result-list .result-item b");
                if (resultItems.length > 0) {
                    resultItems[0].textContent = colaData.currentQty + "개";
                }
            }
        })
        .catch(error => console.error("데이터 로드 실패:", error));
}

// 2. [인식 결과 재고 반영] 버튼을 실제로 작동하게 만듭니다.
if (saveResultBtn) {
    // 기존의 단순 alert 로직을 아래로 교체하세요.
    saveResultBtn.onclick = function() {
        // 예시: 콜라(P001) 수량을 현재 감지된 수량으로 업데이트 요청
        // 실제로는 화면에 감지된 숫자를 읽어와야 하지만, 테스트를 위해 77로 쏴보겠습니다.
        const testUpdateQty = 77;

        fetch(`/api/inventory/detect?productId=P001&count=${testUpdateQty}&confidence=0.98`)
            .then(response => {
                if(response.ok) {
                    alert("DB에 성공적으로 반영되었습니다!");
                    refreshInventoryDisplay(); // 반영 후 화면 숫자 다시 불러오기
                }
            })
            .catch(error => alert("반영 실패: " + error));
    };
}

// 1초마다 서버에 "새로운 데이터 있어?"라고 물어보고 화면을 갱신합니다.
setInterval(function() {
    refreshInventoryDisplay();
}, 1000); // 1000ms = 1초. 더 빠르게 하고 싶으면 500으로 조절 가능합니다.