// Replace this with your business WhatsApp number in international format,
// digits only. Pakistan example: 923001234567 (no plus sign or spaces).
const WHATSAPP_NUMBER = "+97472249406";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) { menuToggle.textContent = "☰"; menuToggle.setAttribute("aria-label", "Open navigation"); }
}));
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.querySelector("#service");
    const option = [...select.options].find(item => item.value === link.dataset.service);
    if (option) select.value = option.value;
  });
});

document.querySelector("#lead-form")?.addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = Object.fromEntries(new FormData(form).entries());
  const status = document.querySelector("#form-status");
  if (!/^\+?[\d\s()-]{8,30}$/.test(String(data.phone || "").trim())) {
    status.textContent = "Please enter a valid phone or WhatsApp number.";
    return;
  }
  const message = [
    "Assalam-o-alaikum! I'd like to enquire about your services.",
    "",
    `Name: ${data.name}`,
    `Business: ${data.business || "Not provided"}`,
    `Interested in: ${data.service}`,
    `My contact: ${data.phone}`,
    `Details: ${data.message || "Not provided"}`
  ].join("\n");

  // Try to save the enquiry first. If D1 is not configured, WhatsApp still works.
  status.textContent = "Preparing your enquiry…";
  try {
    const response = await fetch("api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (response.ok) status.textContent = "Enquiry saved. Opening WhatsApp…";
    else status.textContent = "Opening WhatsApp. Press Send there to submit your enquiry.";
  } catch {
    status.textContent = "Opening WhatsApp. Press Send there to submit your enquiry.";
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const selector = anchor.getAttribute("href");
    const target = selector && document.querySelector(selector);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
