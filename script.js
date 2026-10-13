/* Personal configuration: enter your public Telegram username without @. */
const TELEGRAM_USERNAME = "@CosmoS_Tgg"; // Example: "your_username"

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const telegramLink = document.querySelector("#telegram-link");
const year = document.querySelector("#year");

if (year) year.textContent = String(new Date().getFullYear());

if (telegramLink && TELEGRAM_USERNAME.trim()) {
  telegramLink.href = `https://t.me/${encodeURIComponent(TELEGRAM_USERNAME.trim().replace(/^@/, ""))}`;
  const note = document.querySelector(".config-note");
  if (note) note.hidden = true;
}

function closeMenu() {
  if (!menuButton || !nav) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Menyuni ochish");
  nav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const opening = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute("aria-label", opening ? "Menyuni yopish" : "Menyuni ochish");
    nav.classList.toggle("is-open", opening);
    document.body.classList.toggle("menu-open", opening);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 681px)").matches) closeMenu();
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".section-heading, .about-layout, .skill-card, .projects-intro, .project-card, .service-list > div, .contact-section > *"
);

if (!reduceMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("reveal-ready");
  revealTargets.forEach((element) => element.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  revealTargets.forEach((element) => observer.observe(element));
}
