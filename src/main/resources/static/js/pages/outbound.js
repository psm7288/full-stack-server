const outboundModalOverlay = document.getElementById("outboundModalOverlay");
const openOutboundModalBtn = document.getElementById("openOutboundModalBtn");
const openOutboundModalBtn2 = document.getElementById("openOutboundModalBtn2");
const closeOutboundModalBtn = document.getElementById("closeOutboundModalBtn");
const cancelOutboundBtn = document.getElementById("cancelOutboundBtn");
const outboundForm = document.getElementById("outboundForm");

const outboundSearchInput = document.getElementById("outboundSearchInput");
const outboundCategoryFilter = document.getElementById("outboundCategoryFilter");
const outboundStatusFilter = document.getElementById("outboundStatusFilter");
const outboundSearchBtn = document.getElementById("outboundSearchBtn");

function openOutboundModal() {
    if (!outboundModalOverlay) {
        return;
    }

    const now = new Date();
    const pad = function (n) {
        return String(n).padStart(2, "0");
    };

    const localDateTime =
        now.getFullYear() + "-" +
        pad(now.getMonth() + 1) + "-" +
        pad(now.getDate()) + "T" +
        pad(now.getHours()) + ":" +
        pad(now.getMinutes());

    const dateInput = outboundForm.querySelector("input[name='outboundDate']");

    if (dateInput) {
        dateInput.value = localDateTime;
    }

    outboundModalOverlay.classList.add("open");
}

function closeOutboundModal() {
    if (outboundModalOverlay) {
        outboundModalOverlay.classList.remove("open");
    }

    if (outboundForm) {
        outboundForm.reset();
    }
}

if (openOutboundModalBtn) {
    openOutboundModalBtn.addEventListener("click", openOutboundModal);
}

if (openOutboundModalBtn2) {
    openOutboundModalBtn2.addEventListener("click", openOutboundModal);
}

if (closeOutboundModalBtn) {
    closeOutboundModalBtn.addEventListener("click", closeOutboundModal);
}

if (cancelOutboundBtn) {
    cancelOutboundBtn.addEventListener("click", closeOutboundModal);
}

if (outboundModalOverlay) {
    outboundModalOverlay.addEventListener("click", function (e) {
        if (e.target === outboundModalOverlay) {
            closeOutboundModal();
        }
    });
}

if (outboundForm) {
    outboundForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const product = outboundForm.querySelector("select[name='productId']");
        const qty = outboundForm.querySelector("input[name='outboundQty']");
        const destination = outboundForm.querySelector("input[name='destination']");
        const outboundDate = outboundForm.querySelector("input[name='outboundDate']");
        const status = outboundForm.querySelector("select[name='status']");

        if (!product.value) {
            alert("상품을 선택해주세요.");
            return;
        }

        if (!qty.value || Number(qty.value) <= 0) {
            alert("반출 수량을 입력해주세요.");
            return;
        }

        console.log("반출 등록:", {
            productId: product.value,
            outboundQty: qty.value,
            destination: destination.value,
            outboundDate: outboundDate.value,
            status: status.value
        });

        alert("반출이 등록되었습니다. 현재는 UI 테스트용 동작입니다.");
        closeOutboundModal();
    });
}

if (outboundSearchBtn) {
    outboundSearchBtn.addEventListener("click", function () {
        console.log("반출 검색:", {
            keyword: outboundSearchInput.value.trim(),
            category: outboundCategoryFilter.value,
            status: outboundStatusFilter.value
        });

        alert("검색 조건이 적용되었습니다. 현재는 UI 테스트용 동작입니다.");
    });
}