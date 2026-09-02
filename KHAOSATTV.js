const membersData = {
    "Ban Technology": [
        "Đặng Minh Tân", "Hoàng Phú Thịnh", "Hồ Hoàng Long", "Huỳnh Tấn Phi Hùng", "Ngô Đăng Hiến",
        "Nguyễn Anh Thư", "Nguyễn Hoàng Anh", "Nguyễn Minh Triết", "Trần Hòa Xuân Thu", "Trần Phương Thảo",
        "Võ Minh Sang"
    ],
    "Ban Community Partnerships": [
        "Nguyễn Chí Thành", "Nguyễn Đức Phát", "Nguyễn Ngọc Đoan Trang", "Trần Tùng Dương", "Trương Quốc Thái",
    ],
    "Ban Marketing & Communications": [
        "Huỳnh Hoàng Phong", "Ngô Trung Toàn", "Nguyễn Lê Bảo Yến Vy", "Nguyễn Ngọc Tú", "Trần Minh Đăng", "Vũ Đình Phi"
    ],
    "Ban People Operations": [
        "Đàm Thị Ngọc Châu", "Trần Giang Tuấn Kiệt"
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    const banButtons = document.querySelectorAll(".ban-btn");
    const nameSelect = document.getElementById("name");
    const selectedBanInput = document.getElementById("selectedBan");
    const inputFields = document.querySelectorAll('input[type="text"], textarea, select');

    banButtons.forEach(button => {
        button.addEventListener("click", function () {
            banButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedBan = this.getAttribute("data-ban");
            selectedBanInput.value = selectedBan;
            nameSelect.classList.remove('has-data');
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

    inputFields.forEach(field => {
        // Lắng nghe sự kiện 'input' (khi gõ chữ) và 'change' (khi chọn select)
        field.addEventListener('input', function() {
            if (this.value.trim() !== "") {
                this.classList.add('has-data'); // Thêm class khi có dữ liệu
            } else {
                this.classList.remove('has-data'); // Xóa class khi trống
            }
        });

        // Bắt thêm sự kiện 'change' đặc biệt cho thẻ select
        field.addEventListener('change', function() {
             if (this.value.trim() !== "") {
                this.classList.add('has-data');
            } else {
                this.classList.remove('has-data');
            }
        });
    });

    const decisionRadios = document.querySelectorAll('input[name="decision"]');
    const continueSection = document.getElementById("continueSection");
    const leaveSection = document.getElementById("leaveSection");

    decisionRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "Continue") {
                continueSection.style.display = "block";
                leaveSection.style.display = "none";

                // CHỈ bắt buộc chọn nút radio (câu hỏi tham gia đợt tuyển), BỎ QUA ô textarea
                continueSection.querySelectorAll('input[type="radio"]').forEach(input => input.setAttribute("required", "true"));
                leaveSection.querySelectorAll('textarea').forEach(input => input.removeAttribute("required"));

            } else if (this.value === "Leave") {
                leaveSection.style.display = "block";
                continueSection.style.display = "none";

                // Bắt buộc nhập lý do rời đi
                leaveSection.querySelectorAll('textarea').forEach(input => input.setAttribute("required", "true"));
                continueSection.querySelectorAll('input[type="radio"]').forEach(input => input.removeAttribute("required"));
            }
        });
    });

    // ---- 3. PHẦN GỬI DỮ LIỆU (Đã được đưa vào trong DOMContentLoaded) ----
    const form = document.getElementById("gdgSurveyForm");
    const submitBtn = document.querySelector(".submit-btn");

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxMiEHrVcuRwSIQWoFamr-iQdDa5W090mIl5G635Y9WH_PDHzw6hB-UheHMC2AzXuwS1Q/exec';

    let isConfirmed = false;

    function resetConfirmation() {
        if (isConfirmed) {
            isConfirmed = false;
            const confirmAlert = document.getElementById("confirmAlert");
            if (confirmAlert) confirmAlert.style.display = "none";
            submitBtn.textContent = "Gửi khảo sát";
            submitBtn.classList.remove("confirm-mode");
            submitBtn.disabled = false;
        }
    }

    form.addEventListener("input", resetConfirmation);
    form.addEventListener("change", resetConfirmation);
    banButtons.forEach(btn => btn.addEventListener("click", resetConfirmation));

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!isConfirmed) {
            isConfirmed = true;

            let confirmAlert = document.getElementById("confirmAlert");
            if (!confirmAlert) {
                confirmAlert = document.createElement("div");
                confirmAlert.id = "confirmAlert";
                confirmAlert.className = "confirm-alert";
                confirmAlert.innerHTML = `
                    <strong>Hãy kiểm tra lại thông tin một lần nữa</strong><br>
                `;
                // Chèn ngay dưới phần tiêu đề form
                const formHeader = document.querySelector(".form-header");
                formHeader.insertAdjacentElement("afterend", confirmAlert);
            }

            confirmAlert.style.display = "block";

            submitBtn.textContent = "Xác nhận gửi";
            submitBtn.classList.add("confirm-mode");

            window.scrollTo({ top: 0, behavior: 'smooth' });

            return;
        }

        // NẾU ĐÃ BẤM XÁC NHẬN -> BƯỚC 2: Bắt đầu gửi dữ liệu
        const confirmAlert = document.getElementById("confirmAlert");
        if (confirmAlert) confirmAlert.style.display = "none";

        const nameSelectElement = document.getElementById("name");
        const userName = nameSelectElement.options[nameSelectElement.selectedIndex].text;
        const userBan = document.getElementById("selectedBan").value;

        submitBtn.textContent = "Đang xử lý...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        const allFields = ['selectedBan', 'name', 'improvement', 'decision', 'support', 'leave_reason', 'feedback'];
        allFields.forEach(field => {
            if (!formData.has(field) || formData.get(field).trim() === "") {
                formData.delete(field);
                formData.append(field, "Không có");
            }
        });

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                form.style.display = "none";

                const headerTitle = document.querySelector(".form-header h1");
                const headerDesc = document.querySelector(".form-header p");

                headerTitle.textContent = "Gửi thành công!";
                headerTitle.style.color = "#1a73e8";
                headerTitle.style.textAlign = "center";
                headerDesc.innerHTML = `
                    <div style="font-size: 16px; line-height: 1.6;">
                        Ban chủ nhiệm Google Developer Group on Campus - Saigon xin trân trọng cảm ơn bạn
                        <br><br>
                        <span style="text-align: center; font-size: 24px; color: #EA4335; font-weight: bold; text-transform: uppercase;">${userName}</span>
                        <br>
                        <span style="text-align: center; font-size: 18px; color: #4285F4; font-weight: 500;">(${userBan})</span>
                        <br><br>
                        đã dành thời gian hoàn thành khảo sát.
                        <br><br>
                        Dù là lựa chọn nào đi chăng nữa, ban chủ nhiệm GDGoC SGU xin chân thành cảm ơn và chúc bạn sẽ thành công trên con đường học tập và những lựa chọn sắp tới ❤️.
                    </div>
                `;

                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Lỗi:', error.message);
                alert("Đã xảy ra lỗi trong quá trình gửi, vui lòng thử lại sau!");
                submitBtn.textContent = "Gửi khảo sát";
                submitBtn.disabled = false;
                isConfirmed = false; // Bị lỗi thì trả về trạng thái ban đầu
                submitBtn.classList.remove("confirm-mode");
            });
    });
});