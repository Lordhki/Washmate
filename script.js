const bookingForm = document.querySelector("#booking-form");
const formStatus = document.querySelector("#form-status");

// Replace this with your deployed Apps Script /exec URL.
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbymMdqtMNitIgizPZaG1u6a3hlXutONkfgvO0Cuvw0X5fNbJPe2EAdcfZGRjllBkchP/exec";
bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) {
    return;
  }

  if (
    !GOOGLE_SCRIPT_URL.startsWith("https://script.google.com/") ||
    GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")
  ) {
    formStatus.textContent =
      "Biểu mẫu chưa được cấu hình. Vui lòng thử lại sau.";
    return;
  }

  const submitButton = bookingForm.querySelector('button[type="submit"]');

  submitButton.disabled = true;
  formStatus.textContent = "Đang gửi yêu cầu...";

  try {
    const payload = new URLSearchParams(new FormData(bookingForm));

    payload.set("consent", bookingForm.elements.consent.checked ? "yes" : "no");

    // Apps Script does not reliably support browser CORS requests.
    // no-cors allows this simple form POST, but its response is opaque.
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: payload
    });

    formStatus.textContent =
      "Yêu cầu đã được gửi. Vui lòng chờ WASHMATE liên hệ xác nhận.";
  } catch (error) {
    console.error("Booking submission failed:", error);

    formStatus.textContent = "Không thể gửi yêu cầu. Vui lòng thử lại sau.";
  } finally {
    submitButton.disabled = false;
  }
});
