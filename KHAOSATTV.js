const membersData = {
    "Ban 1": [
        "Đặng Minh Tân", "Hoàng Phú Thịnh", "Hồ Hoàng Long", "Huỳnh Tấn Phi Hùng", "Ngô Đăng Hiến", 
        "Nguyễn Anh Thư", "Nguyễn Hoàng Anh", "Nguyễn Minh Triết", "Trần Hòa Xuân Thu", "Trần Phương Thảo", 
        "Võ Minh Sang"
    ],
    "Ban 2": [
        "Nguyễn Chí Thành", "Nguyễn Đức Phát", "Nguyễn Ngọc Đoan Trang", "Trần Tùng Dương", "Trương Quốc Thái", 
    ],
    "Ban 3": [
        "Huỳnh Hoàng Phong", "Ngô Trung Toàn", "Nguyễn Lê Bảo Yến Vy", "Nguyễn Ngọc Tú", "Trần Minh Đăng", "Vũ Đình Phi"
    ],
    "Ban 4": [
        "Đàm Thị Ngọc Châu", "Trần Giang Tuấn Kiệt" 
    ]
};

document.addEventListener("DOMContentLoaded", function() {
    // ---- 1. Logic chọn Ban và Tên ----
    const banButtons = document.querySelectorAll(".ban-btn");
    const nameSelect = document.getElementById("name");
    const selectedBanInput = document.getElementById("selectedBan");

    banButtons.forEach(button => {
        button.addEventListener("click", function() {
            banButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedBan = this.getAttribute("data-ban");
            selectedBanInput.value = selectedBan;

            nameSelect.innerHTML = '<option value="">-- Vui lòng chọn tên của bạn --</option>';

            const members = membersData[selectedBan];
            if (members) {
                members.forEach(name => {
                    const option = document.createElement("option");
                    option.value = name;
                    option.textContent = name;
                    nameSelect.appendChild(option);
                });
            }
        });
    });

    // ---- 2. Logic ẩn/hiện Form và xử lý Required ----
    const decisionRadios = document.querySelectorAll('input[name="decision"]');
    const continueSection = document.getElementById("continueSection");
    const leaveSection = document.getElementById("leaveSection");

    // Lấy các input/textarea bên trong các vùng để bật/tắt tính năng bắt buộc
    const continueInputs = continueSection.querySelectorAll('input, textarea');
    const leaveInputs = leaveSection.querySelectorAll('input, textarea');

    decisionRadios.forEach(radio => {
        radio.addEventListener("change", function() {
            if (this.value === "continue") {
                continueSection.style.display = "block";
                leaveSection.style.display = "none";
                
                // Bật required cho phần "Tiếp tục"
                continueInputs.forEach(input => input.setAttribute("required", "true"));
                // Tắt required cho phần "Rời đi" để không bị lỗi lúc submit form
                leaveInputs.forEach(input => input.removeAttribute("required"));
                
            } else if (this.value === "leave") {
                leaveSection.style.display = "block";
                continueSection.style.display = "none";
                
                // Bật required cho phần "Rời đi"
                leaveInputs.forEach(input => input.setAttribute("required", "true"));
                // Tắt required cho phần "Tiếp tục"
                continueInputs.forEach(input => input.removeAttribute("required"));
            }
        });
    });
});