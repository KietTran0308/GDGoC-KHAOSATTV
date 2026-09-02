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

const emailData = {
    "Đặng Minh Tân": "dangminhtan0704@gmail.com",
    "Hoàng Phú Thịnh": "hoqngphuthinh@gmail.com",
    "Hồ Hoàng Long": "hohoanglong2508@gmail.com",
    "Huỳnh Tấn Phi Hùng": "nhochung2018@gmail.com",
    "Ngô Đăng Hiến": "danghienabb@gmail.com",

    "Nguyễn Anh Thư": "nguyenanhthu290407@gmail.com",
    "Nguyễn Hoàng Anh": "nha261105@gmail.com",
    "Nguyễn Minh Triết": "trietnguyen0507@gmail.com",
    "Trần Hòa Xuân Thu": "tranhoaxuanthu@gmail.com",
    "Trần Phương Thảo": "tranphuongthao02012006@gmail.com",

    "Võ Minh Sang": "vosang20102005@gmail.com",
    "Nguyễn Chí Thành": "chithanh213189@gmail.com",
    "Nguyễn Đức Phát": "nguyenducphat2246@gmail.com",
    "Nguyễn Ngọc Đoan Trang": "trangdoanngocnguyen@gmail.com",
    "Trần Tùng Dương": "duongcaptain1234@gmail.com",

    "Trương Quốc Thái": "truongquocthai627@gmail.com",
    "Huỳnh Hoàng Phong": "",
    "Ngô Trung Toàn": "tn133239@gmail.com",
    "Nguyễn Lê Bảo Yến Vy": "nlbyv2107@gmail.com",
    "Nguyễn Ngọc Tú": "ngoctu040506@gmail.com",

    "Trần Minh Đăng": "minhdang875425@gmail.com",
    "Vũ Đình Phi": "vudinhphee@gmail.com",
    "Đàm Thị Ngọc Châu": "damthingocchau26@gmail.com",
    "Trần Giang Tuấn Kiệt": "tuankiet21950@gmail.com"
};

document.addEventListener("DOMContentLoaded", function () {
    const banButtons = document.querySelectorAll(".ban-btn");
    const nameSelect = document.getElementById("name");
    const selectedBanInput = document.getElementById("selectedBan");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const inputFields = document.querySelectorAll('input[type="text"], input[type="email"], textarea, select');

    banButtons.forEach(button => {
        button.addEventListener("click", function () {
            banButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const selectedBan = this.getAttribute("data-ban");
            selectedBanInput.value = selectedBan;
            nameSelect.classList.remove('has-data');
            nameSelect.innerHTML = '<option value="">-- Vui lòng chọn tên của bạn --</option>';

            emailInput.value = "";
            emailInput.classList.remove('has-data');
            emailError.style.display = "none";

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

    emailInput.addEventListener("input", function() {
        emailError.style.display = "none";
        this.style.borderColor = "";
    });

    inputFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim() !== "") this.classList.add('has-data');
            else this.classList.remove('has-data');
        });

        field.addEventListener('change', function() {
             if (this.value.trim() !== "") this.classList.add('has-data');
            else this.classList.remove('has-data');
        });
    });

    const decisionRadios = document.querySelectorAll('input[name="decision"]');
    const continueSection = document.getElementById("continueSection");
    const leaveSection = document.getElementById("leaveSection");

    decisionRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            if (this.value === "Tiếp tục") {
                continueSection.style.display = "block";
                leaveSection.style.display = "none";

                continueSection.querySelectorAll('input[type="radio"]').forEach(input => input.setAttribute("required", "true"));
                leaveSection.querySelectorAll('textarea').forEach(input => input.removeAttribute("required"));

                leaveSection.querySelectorAll('textarea').forEach(input => {
                    input.value = ""; // Xoá text
                    input.classList.remove("has-data"); // Gỡ định dạng màu
                });

            } else if (this.value === "Rời đi") {
                leaveSection.style.display = "block";
                continueSection.style.display = "none";
                leaveSection.querySelectorAll('textarea').forEach(input => input.setAttribute("required", "true"));
                continueSection.querySelectorAll('input[type="radio"]').forEach(input => input.removeAttribute("required"));
                continueSection.querySelectorAll('textarea').forEach(input => {
                    input.value = "";
                    input.classList.remove("has-data");
                });
                continueSection.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.checked = false;
                });
            }
        });
    });

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

        const selectedName = nameSelect.value;
        const enteredEmail = emailInput.value.trim();

        if (emailData[selectedName] && enteredEmail !== emailData[selectedName] && selectedName !== "Huỳnh Hoàng Phong") {
            emailError.textContent = `Email không khớp với tên "${selectedName}". Vui lòng nhập lại.`;
            emailError.style.display = "block";
            emailInput.style.borderColor = "#d93025";

            emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

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
                const formHeader = document.querySelector(".form-header");
                formHeader.insertAdjacentElement("afterend", confirmAlert);
            }

            confirmAlert.style.display = "block";
            submitBtn.textContent = "Xác nhận gửi";
            submitBtn.classList.add("confirm-mode");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const confirmAlert = document.getElementById("confirmAlert");
        if (confirmAlert) confirmAlert.style.display = "none";

        const userName = nameSelect.options[nameSelect.selectedIndex].text;
        const userBan = document.getElementById("selectedBan").value;

        submitBtn.textContent = "Đang xử lý...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        const allFields = ['selectedBan', 'name', 'email', 'improvement', 'decision', 'continue_plan', 'support', 'leave_reason'];
        allFields.forEach(field => {
            if (!formData.has(field) || formData.get(field).trim() === "") {
                formData.delete(field);
                formData.append(field, "");
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
                        Ban chủ nhiệm Google Developer Groups on Campus - Saigon University xin trân trọng cảm ơn bạn
                        <br><br>
                        <span style="text-align: center; font-size: 24px; color: #EA4335; font-weight: bold; text-transform: uppercase;">${userName}</span>
                        <br>
                        <span style="text-align: center; font-size: 18px; color: #4285F4; font-weight: 500;">(${userBan})</span>
                        <br><br>
                        đã dành thời gian hoàn thành khảo sát.
                        <br><br>
                        Dù là lựa chọn nào đi chăng nữa, Ban chủ nhiệm GDGoC SGU xin chân thành cảm ơn và chúc bạn sẽ thành công trên con đường học tập và những lựa chọn sắp tới ❤️.
                    </div>
                `;

                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(error => {
                console.error('Lỗi:', error.message);
                alert("Đã xảy ra lỗi trong quá trình gửi, vui lòng thử lại sau!");
                submitBtn.textContent = "Gửi khảo sát";
                submitBtn.disabled = false;
                isConfirmed = false;
                submitBtn.classList.remove("confirm-mode");
            });
    });
});