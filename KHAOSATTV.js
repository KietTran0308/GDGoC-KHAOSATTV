const membersData = {
    "Ban Education & Development": [
        "Đặng Minh Tân", "Hoàng Phú Thịnh", "Hồ Hoàng Long", "Huỳnh Tấn Phi Hùng", "Ngô Đăng Hiến",
        "Nguyễn Anh Thư", "Nguyễn Hoàng Anh", "Nguyễn Minh Triết", "Trần Hòa Xuân Thu", "Trần Phương Thảo",
        "Võ Minh Sang"
    ],
    "Ban Community & Event": [
        "Nguyễn Chí Thành", "Nguyễn Đức Phát", "Nguyễn Ngọc Đoan Trang", "Trần Tùng Dương", "Trương Quốc Thái",
    ],
    "Ban Media & Creative": [
        "Huỳnh Hoàng Phong", "Ngô Trung Toàn", "Nguyễn Lê Bảo Yến Vy", "Nguyễn Ngọc Tú", "Trần Minh Đăng", "Vũ Đình Phi"
    ],
    "Ban People & Operation": [
        "Đàm Thị Ngọc Châu", "Trần Giang Tuấn Kiệt"
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    const banButtons = document.querySelectorAll(".ban-btn");
    const nameSelect = document.getElementById("name");
    const selectedBanInput = document.getElementById("selectedBan");

    banButtons.forEach(button => {
        button.addEventListener("click", function () {
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

    const decisionRadios = document.querySelectorAll('input[name="decision"]');
    const continueSection = document.getElementById("continueSection");
    const leaveSection = document.getElementById("leaveSection");

    const continueInputs = continueSection.querySelectorAll('input, textarea');
    const leaveInputs = leaveSection.querySelectorAll('input, textarea');

    decisionRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "Continue") {
                continueSection.style.display = "block";
                leaveSection.style.display = "none";

                continueInputs.forEach(input => input.setAttribute("required", "true"));
                leaveInputs.forEach(input => input.removeAttribute("required"));

            } else if (this.value === "Leave") {
                leaveSection.style.display = "block";
                continueSection.style.display = "none";

                leaveInputs.forEach(input => input.setAttribute("required", "true"));
                continueInputs.forEach(input => input.removeAttribute("required"));
            }
        });
    });

    // ---- 3. PHẦN GỬI DỮ LIỆU (Đã được đưa vào trong DOMContentLoaded) ----
    const form = document.getElementById("gdgSurveyForm");
    const submitBtn = document.querySelector(".submit-btn");

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxMiEHrVcuRwSIQWoFamr-iQdDa5W090mIl5G635Y9WH_PDHzw6hB-UheHMC2AzXuwS1Q/exec';

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        submitBtn.textContent = "Đang xử lý...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        // Đảm bảo không có cột nào bị bỏ trống trên Google Sheets
        const allFields = ['selectedBan', 'name', 'improvement', 'decision', 'continue_plan', 'support', 'leave_reason', 'feedback'];
        allFields.forEach(field => {
            if (!formData.has(field) || formData.get(field).trim() === "") {
                formData.delete(field); 
                formData.append(field, "Không có");
            }
        });

        // Gửi dữ liệu qua Google Sheets
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                form.style.display = "none";

                const successMessage = document.getElementById("successMessage");
                successMessage.style.display = "block";

                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Lỗi:', error.message);
                alert("Đã xảy ra lỗi trong quá trình gửi, vui lòng thử lại sau!");
                submitBtn.textContent = "Gửi khảo sát";
                submitBtn.disabled = false;
            });
    });
});