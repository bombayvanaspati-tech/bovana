document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("contact-btn");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.email || !data.message) { toast("Please fill all fields", { error: true }); return; }
    btn.disabled = true; btn.textContent = "Sending...";
    setTimeout(() => {
      btn.disabled = false; btn.textContent = "Send Message";
      form.reset();
      toast("Message sent", { desc: "We'll be in touch within 24 hours." });
    }, 800);
  });
});
