const inventoryModalOverlay = document.getElementById("inventoryModalOverlay");
const openInventoryModalBtn = document.getElementById("openInventoryModalBtn");
const openInventoryModalBtn2 = document.getElementById("openInventoryModalBtn2");
const closeInventoryModalBtn = document.getElementById("closeInventoryModalBtn");
const cancelInventoryBtn = document.getElementById("cancelInventoryBtn");
const inventoryForm = document.getElementById("inventoryForm");

const inventorySearchInput = document.getElementById("inventorySearchInput");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const inventorySearchBtn = document.getElementById("inventorySearchBtn");

function openInventoryModal() {
    if (inventoryModalOverlay) {
        inventoryModalOverlay.classList.add("open");
    }
}

function closeInventoryModal() {
    if (inventoryModalOverlay) {
        inventoryModalOverlay.classList.remove("open");
    }

    if (inventoryForm) {
        inventoryForm.reset();
    }
}

if (openInventoryModalBtn) {
    openInventoryModalBtn.addEventListener("click", openInventoryModal);
}

if (openInventoryModalBtn2) {
    openInventoryModalBtn2.addEventListener("click", openInventoryModal);
}

if (closeInventoryModalBtn) {
    closeInventoryModalBtn.addEventListener("click", closeInventoryModal);
}

if (cancelInventoryBtn) {
    cancelInventoryBtn.addEventListener("click", closeInventoryModal);
}

if (inventoryModalOverlay) {
    inventoryModalOverlay.addEventListener("click", function (e) {
        if (e.target === inventoryModalOverlay) {
            closeInventoryModal();
        }
    });
}

if (inventoryForm) {
    inventoryForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const itemName = inventoryForm.querySelector("input[name='itemName']").value.trim();
        const category = inventoryForm.querySelector("select[name='category']").value;
        const quantity = inventoryForm.querySelector("input[name='quantity']").value;
        const minQuantity = inventoryForm.querySelector("input[name='minQuantity']").value;

        if (!itemName || !category || quantity === "" || minQuantity === "") {
            alert("상품 정보를 모두 입력해주세요.");
            return;
        }

        console.log("상품 등록:", {
            itemName: itemName,
            category: category,
            quantity: quantity,
            minQuantity: minQuantity
        });

        alert("상품이 등록되었습니다. 현재는 UI 테스트용 동작입니다.");
        closeInventoryModal();
    });
}

if (inventorySearchBtn) {
    inventorySearchBtn.addEventListener("click", function () {
        const keyword = inventorySearchInput.value.trim();
        const category = categoryFilter.value;
        const status = statusFilter.value;

        console.log("재고 검색:", {
            keyword: keyword,
            category: category,
            status: status
        });

        alert("검색 조건이 적용되었습니다. 현재는 UI 테스트용 동작입니다.");
    });
}