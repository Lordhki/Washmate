const bookingForm = document.querySelector("#booking-form");
const formStatus = document.querySelector("#form-status");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) {
    return;
  }

  formStatus.textContent =
    "Đây là biểu mẫu minh họa — thông tin của bạn chưa được gửi hoặc lưu.";
  bookingForm.reset();
});
