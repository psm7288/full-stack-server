const inboundModalOverlay = document.getElementById("inboundModalOverlay");
const openInboundModalBtn = document.getElementById("openInboundModalBtn");
const openInboundModalBtn2 = document.getElementById("openInboundModalBtn2");
const closeInboundModalBtn = document.getElementById("closeInboundModalBtn");
const cancelInboundBtn = document.getElementById("cancelInboundBtn");
const inboundForm = document.getElementById("inboundForm");

const inboundSearchInput = document.getElementById("inboundSearchInput");
const inboundCategoryFilter = document.getElementById("inboundCategoryFilter");
const inboundStatusFilter = document.getElementById("inboundStatusFilter");
const inboundSearchBtn = document.getElementById("inboundSearchBtn");

function openInboundModal() {
    if (!inboundModalOverlay) {
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

    const dateInput = inboundForm.querySelector("input[name='inboundDate']");

    if (dateInput) {
        dateInput.value = localDateTime;
    }

    inboundModalOverlay.classList.add("open");
}

function closeInboundModal() {
    if (inboundModalOverlay) {
        inboundModalOverlay.classList.remove("open");
    }

    if (inboundForm) {
        inboundForm.reset();
    }
}

if (openInboundModalBtn) {
    openInboundModalBtn.addEventListener("click", openInboundModal);
}

if (openInboundModalBtn2) {
    openInboundModalBtn2.addEventListener("click", openInboundModal);
}

if (closeInboundModalBtn) {
    closeInboundModalBtn.addEventListener("click", closeInboundModal);
}

if (cancelInboundBtn) {
    cancelInboundBtn.addEventListener("click", closeInboundModal);
}

if (inboundModalOverlay) {
    inboundModalOverlay.addEventListener("click", function (e) {
        if (e.target === inboundModalOverlay) {
            closeInboundModal();
        }
    });
}

if (inboundForm) {
    inboundForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const product = inboundForm.querySelector("select[name='productId']");
        const qty = inboundForm.querySelector("input[name='inboundQty']");
        const supplier = inboundForm.querySelector("input[name='supplier']");
        const inboundDate = inboundForm.querySelector("input[name='inboundDate']");
        const status = inboundForm.querySelector("select[name='status']");

        if (!product.value) {
            alert("상품을 선택해주세요.");
            return;
        }

        if (!qty.value || Number(qty.value) <= 0) {
            alert("반입 수량을 입력해주세요.");
            return;
        }

        console.log("반입 등록:", {
            productId: product.value,
            inboundQty: qty.value,
            supplier: supplier.value,
            inboundDate: inboundDate.value,
            status: status.value
        });

        alert("반입이 등록되었습니다. 현재는 UI 테스트용 동작입니다.");
        closeInboundModal();
    });
}

if (inboundSearchBtn) {
    inboundSearchBtn.addEventListener("click", function () {
        console.log("반입 검색:", {
            keyword: inboundSearchInput.value.trim(),
            category: inboundCategoryFilter.value,
            status: inboundStatusFilter.value
        });

        alert("검색 조건이 적용되었습니다. 현재는 UI 테스트용 동작입니다.");
    });
}