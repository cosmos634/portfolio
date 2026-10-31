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

// Lightweight scroll progress indicator (passive listener + one update per frame).
const scrollProgress = document.querySelector("#scroll-progress");
if (scrollProgress) {
  let progressFramePending = false;
  const updateScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    progressFramePending = false;
  };
  window.addEventListener("scroll", () => {
    if (progressFramePending) return;
    progressFramePending = true;
    window.requestAnimationFrame(updateScrollProgress);
  }, { passive: true });
  updateScrollProgress();
}


/* Four-language interface. The original Uzbek copy remains the default. */
(() => {
  const selector = document.querySelector("#language-select");
  if (!selector) return;

  const translations = {
    ru: {
      ".skip-link": "Перейти к основному содержимому",
      ".nav a[href='#about']": "Обо мне",
      ".nav a[href='#skills']": "Навыки",
      ".nav a[href='#projects']": "Проекты",
      ".nav a[href='#contact']": "Контакты",
      ".hero .eyebrow": "НЕЗАВИСИМЫЙ РАЗРАБОТЧИК <span class='eyebrow-separator'>/</span> ТАДЖИКИСТАН",
      ".hero h1": "Превращаю идеи в <span class='gradient-text'>работающие</span> цифровые решения<span class='lime'>.</span>",
      ".hero-intro": "Изучаю Python, Telegram-ботов и веб-технологии, создавая реальные проекты. Маленькие шаги, чистый код и постоянная практика.",
      ".hero-actions .button-primary": "Смотреть проекты <span aria-hidden='true'>↘</span>",
      ".hero-actions .button-glass": "Бот ThemeGram <span aria-hidden='true'>↗</span>",
      ".scroll-note": "<span class='scroll-line'></span> ПРОКРУТИТЕ ВНИЗ",
      "#about .section-heading .eyebrow": "01 — ОБО МНЕ",
      "#about .section-number": "НЕМНОГО КОНТЕКСТА",
      "#about h2": "Я продолжаю учиться.<br><span class='muted-heading'>И уже создаю реальные проекты.</span>",
      "#about .about-copy p:first-child": "Я самостоятельно изучаю программирование. С помощью Python и Telegram-ботов создаю полезные инструменты, пробую веб-технологии и постоянно улучшаю свой код.",
      "#about .about-copy p:nth-child(2)": "Это портфолио — мои эксперименты, практические проекты и путь развития. Здесь только реальные навыки и работа, без лишних обещаний.",
      "#about .text-link": "Мой профиль GitHub <span aria-hidden='true'>↗</span>",
      "#skills .section-heading .eyebrow": "02 — НАВЫКИ",
      "#skills .section-number": "ИНСТРУМЕНТЫ, С КОТОРЫМИ Я РАБОТАЮ",
      "#skills .skill-card:nth-child(1) h3": "Python",
      "#skills .skill-card:nth-child(1) p": "Основной синтаксис, функции, структуры данных и небольшие скрипты.",
      "#skills .skill-card:nth-child(2) h3": "Telegram-боты",
      "#skills .skill-card:nth-child(2) p": "Aiogram 3, роутеры и обработчики, inline-клавиатуры, callback-запросы и логика ботов.",
      "#skills .skill-card:nth-child(3) h3": "Основы веб-разработки",
      "#skills .skill-card:nth-child(3) p": "Простые веб-интерфейсы и прототипы с Flask, Jinja и HTML.",
      "#skills .skill-card:nth-child(4) h3": "Работа с данными",
      "#skills .skill-card:nth-child(4) p": "SQLite, базовые SQL-запросы и начальный опыт с Flask-SQLAlchemy.",
      "#skills .skill-card:nth-child(5) h3": "Git и GitHub",
      "#skills .skill-card:nth-child(5) p": "Репозитории, коммиты и управление историей версий.",
      "#skills .skill-note h3": "Постоянное развитие",
      "#skills .skill-note p": "Каждый проект помогает закреплять знания. Я продолжаю учиться и развиваться.",
      "#projects .section-heading .eyebrow": "03 — ПРОЕКТЫ",
      "#projects .section-number": "СОЗДАЮ И ПОКАЗЫВАЮ ПРОЦЕСС",
      ".projects-intro h2": "Идеи, <span class='gradient-text'>воплощённые в жизнь.</span>",
      ".projects-intro p": "Мои репозитории GitHub и работающий Telegram-бот ThemeGram. В каждой карточке можно посмотреть код или сам проект.",
      ".project-featured .project-info h3": "ThemeGram",
      ".project-featured .project-info p": "Telegram-бот для просмотра и выбора тем оформления для iOS и Android. Каталог, выбор категорий и запуск через webhook.",
      ".project-featured .project-links .project-link:first-child": "Открыть бота <span>↗</span>",
      ".project-featured .project-links .secondary-link": "Исходный код <span>↗</span>",
      ".project-card:nth-child(2) .project-info h3": "Бот меню ресторана",
      ".project-card:nth-child(2) .project-info p": "Проект для практики категорий меню, деталей блюд, inline-кнопок и корзины на Aiogram 3.",
      ".project-card:nth-child(2) .project-link": "Открыть репозиторий <span>↗</span>",
      ".project-card:nth-child(3) .project-info h3": "Панель администратора",
      ".project-card:nth-child(3) .project-info p": "Эксперимент с веб-панелью на Flask, Jinja и базе данных. Пока это учебный проект, а не готовый коммерческий продукт.",
      ".project-card:nth-child(3) .project-link": "Открыть репозиторий <span>↗</span>",
      ".project-card:nth-child(4) .project-info h3": "Личное портфолио",
      ".project-card:nth-child(4) .project-info p": "Адаптивный сайт-портфолио с карточками проектов, анимациями и мобильным меню.",
      ".project-card:nth-child(4) .project-link": "Открыть репозиторий <span>↗</span>",
      ".all-projects-link": "Все мои репозитории GitHub <span>↗</span>",
      ".services-inner .eyebrow": "04 — МОИ НАПРАВЛЕНИЯ",
      ".services-inner h2": "Небольшая задача.<br><span class='muted-heading'>Понятное решение.</span>",
      ".services-copy": "Сначала разбираюсь в задаче, затем выбираю подходящее и реалистичное решение. Не обещаю того, чего пока не умею.",
      ".service-list > div:nth-child(1) b": "Прототипы Telegram-ботов",
      ".service-list > div:nth-child(1) small": "Меню, категории и простые интерактивные сценарии",
      ".service-list > div:nth-child(2) b": "Сценарии заказов",
      ".service-list > div:nth-child(2) small": "Выбор товаров и базовая логика корзины",
      ".service-list > div:nth-child(3) b": "Скрипты Python",
      ".service-list > div:nth-child(3) small": "Автоматизация небольших повторяющихся задач",
      ".service-list > div:nth-child(4) b": "Простые веб-прототипы",
      ".service-list > div:nth-child(4) small": "Небольшие веб-инструменты на Flask",
      ".contact-section .eyebrow": "05 — КОНТАКТЫ",
      ".contact-section h2": "Есть идея или задача?<br><span class='gradient-text'>Давайте обсудим.</span>",
      ".contact-copy": "Напишите мне в Telegram о своём проекте или вопросе. Вместе обсудим возможные решения.",
      ".contact-actions .button-primary": "Написать в Telegram <span>↗</span>",
      ".contact-actions .button-glass": "Профиль GitHub <span>↗</span>",
      ".footer-note": "Учусь самостоятельно. Создаю на практике."
    },
    en: {
      ".skip-link": "Skip to main content",
      ".nav a[href='#about']": "About",
      ".nav a[href='#skills']": "Skills",
      ".nav a[href='#projects']": "Projects",
      ".nav a[href='#contact']": "Contact",
      ".hero .eyebrow": "INDEPENDENT DEVELOPER <span class='eyebrow-separator'>/</span> TAJIKISTAN",
      ".hero h1": "I turn ideas into <span class='gradient-text'>working</span> digital solutions<span class='lime'>.</span>",
      ".hero-intro": "I learn Python, Telegram bots, and web technologies by building real projects. Small steps, clean code, and consistent practice.",
      ".hero-actions .button-primary": "Explore projects <span aria-hidden='true'>↘</span>",
      ".hero-actions .button-glass": "ThemeGram bot <span aria-hidden='true'>↗</span>",
      ".scroll-note": "<span class='scroll-line'></span> SCROLL TO EXPLORE",
      "#about .section-heading .eyebrow": "01 — ABOUT ME",
      "#about .section-number": "A LITTLE CONTEXT",
      "#about h2": "I’m still learning.<br><span class='muted-heading'>And building real projects.</span>",
      "#about .about-copy p:first-child": "I’m a self-taught developer. I build useful tools with Python and Telegram bots, explore web technologies, and keep improving my code.",
      "#about .about-copy p:nth-child(2)": "This portfolio showcases my experiments, practical projects, and learning journey. Honest skills and real work — no exaggerated claims.",
      "#about .text-link": "My GitHub profile <span aria-hidden='true'>↗</span>",
      "#skills .section-heading .eyebrow": "02 — SKILLS",
      "#skills .section-number": "TOOLS I WORK WITH",
      "#skills .skill-card:nth-child(1) h3": "Python",
      "#skills .skill-card:nth-child(1) p": "Core syntax, functions, data structures, and small scripts.",
      "#skills .skill-card:nth-child(2) h3": "Telegram bots",
      "#skills .skill-card:nth-child(2) p": "Aiogram 3, routers and handlers, inline keyboards, callbacks, and bot flows.",
      "#skills .skill-card:nth-child(3) h3": "Web fundamentals",
      "#skills .skill-card:nth-child(3) p": "Simple web interfaces and prototypes with Flask, Jinja, and HTML.",
      "#skills .skill-card:nth-child(4) h3": "Data",
      "#skills .skill-card:nth-child(4) p": "SQLite, basic SQL queries, and beginner experience with Flask-SQLAlchemy.",
      "#skills .skill-card:nth-child(5) h3": "Git & GitHub",
      "#skills .skill-card:nth-child(5) p": "Repositories, commits, and version history management.",
      "#skills .skill-note h3": "Always improving",
      "#skills .skill-note p": "Every project helps me strengthen my knowledge. I’m continuing to learn and grow.",
      "#projects .section-heading .eyebrow": "03 — PROJECTS",
      "#projects .section-number": "BUILDING IN PUBLIC",
      ".projects-intro h2": "Ideas <span class='gradient-text'>turned into practice.</span>",
      ".projects-intro p": "My GitHub repositories and the live ThemeGram Telegram bot. Open each card to explore the code or project.",
      ".project-featured .project-info h3": "ThemeGram",
      ".project-featured .project-info p": "A Telegram bot for browsing and choosing themes for iOS and Android. Features a theme catalog, category selection, and webhook-based deployment.",
      ".project-featured .project-links .project-link:first-child": "Open the bot <span>↗</span>",
      ".project-featured .project-links .secondary-link": "Source code <span>↗</span>",
      ".project-card:nth-child(2) .project-info h3": "Restaurant menu bot",
      ".project-card:nth-child(2) .project-info p": "An Aiogram 3 practice project featuring menu categories, item details, inline buttons, and a cart flow.",
      ".project-card:nth-child(2) .project-link": "View repository <span>↗</span>",
      ".project-card:nth-child(3) .project-info h3": "Admin panel",
      ".project-card:nth-child(3) .project-info p": "A web panel experiment built with Flask, Jinja, and a database. It is a learning project, not a finished commercial product.",
      ".project-card:nth-child(3) .project-link": "View repository <span>↗</span>",
      ".project-card:nth-child(4) .project-info h3": "Personal portfolio",
      ".project-card:nth-child(4) .project-info p": "A responsive personal website with project cards, lightweight animations, and a mobile menu.",
      ".project-card:nth-child(4) .project-link": "View repository <span>↗</span>",
      ".all-projects-link": "All my GitHub repositories <span>↗</span>",
      ".services-inner .eyebrow": "04 — WHAT I DO",
      ".services-inner h2": "A small task.<br><span class='muted-heading'>A clear solution.</span>",
      ".services-copy": "I first understand the task, then choose a suitable and realistic solution. I don’t promise work beyond my current skills.",
      ".service-list > div:nth-child(1) b": "Telegram bot prototypes",
      ".service-list > div:nth-child(1) small": "Menus, categories, and simple interactive flows",
      ".service-list > div:nth-child(2) b": "Order flows",
      ".service-list > div:nth-child(2) small": "Product selection and basic cart logic",
      ".service-list > div:nth-child(3) b": "Python scripts",
      ".service-list > div:nth-child(3) small": "Automating small repetitive tasks",
      ".service-list > div:nth-child(4) b": "Simple web prototypes",
      ".service-list > div:nth-child(4) small": "Small web tools built with Flask",
      ".contact-section .eyebrow": "05 — CONTACT",
      ".contact-section h2": "Have an idea or a task?<br><span class='gradient-text'>Let’s talk.</span>",
      ".contact-copy": "Message me on Telegram about your project or question. We can explore what’s possible together.",
      ".contact-actions .button-primary": "Message on Telegram <span>↗</span>",
      ".contact-actions .button-glass": "GitHub profile <span>↗</span>",
      ".footer-note": "Learning independently. Building through practice."
    },
    tg: {
      ".skip-link": "Гузаштан ба мундариҷаи асосӣ",
      ".nav a[href='#about']": "Дар бораи ман",
      ".nav a[href='#skills']": "Маҳоратҳо",
      ".nav a[href='#projects']": "Лоиҳаҳо",
      ".nav a[href='#contact']": "Тамос",
      ".hero .eyebrow": "БАРНОМАСОЗИ МУСТАҚИЛ <span class='eyebrow-separator'>/</span> ТОҶИКИСТОН",
      ".hero h1": "Ман ғояҳоро ба ҳалли рақамии <span class='gradient-text'>амалӣ</span> табдил медиҳам<span class='lime'>.</span>",
      ".hero-intro": "Python, ботҳои Telegram ва технологияҳои вебро тавассути сохтани лоиҳаҳои воқеӣ меомӯзам. Қадамҳои хурд, рамзи тоза ва таҷрибаи пайваста.",
      ".hero-actions .button-primary": "Дидани лоиҳаҳо <span aria-hidden='true'>↘</span>",
      ".hero-actions .button-glass": "Боти ThemeGram <span aria-hidden='true'>↗</span>",
      ".scroll-note": "<span class='scroll-line'></span> БА ПОЁН",
      "#about .section-heading .eyebrow": "01 — ДАР БОРАИ МАН",
      "#about .section-number": "КАМЕ ДАР БОРАИ МАН",
      "#about h2": "Ман ҳоло ҳам меомӯзам.<br><span class='muted-heading'>Вале лоиҳаҳои воқеӣ месозам.</span>",
      "#about .about-copy p:first-child": "Ман барномасозиро мустақилона меомӯзам. Бо Python ва ботҳои Telegram абзорҳои муфид месозам, технологияҳои вебро меомӯзам ва рамзи худро беҳтар мекунам.",
      "#about .about-copy p:nth-child(2)": "Ин портфолио таҷрибаҳо, лоиҳаҳои амалӣ ва роҳи рушди маро нишон медиҳад. Танҳо таҷрибаи воқеӣ, бе ваъдаҳои зиёдатӣ.",
      "#about .text-link": "Профили GitHub-и ман <span aria-hidden='true'>↗</span>",
      "#skills .section-heading .eyebrow": "02 — МАҲОРАТҲО",
      "#skills .section-number": "АБЗОРҲОИ ИСТИФОДАБАРАНДАИ МАН",
      "#skills .skill-card:nth-child(1) h3": "Python",
      "#skills .skill-card:nth-child(1) p": "Синтаксиси асосӣ, функсияҳо, сохторҳои додаҳо ва скриптҳои хурд.",
      "#skills .skill-card:nth-child(2) h3": "Ботҳои Telegram",
      "#skills .skill-card:nth-child(2) p": "Aiogram 3, router ва handler, клавиатураҳои inline, callback ва мантиқи бот.",
      "#skills .skill-card:nth-child(3) h3": "Асосҳои веб",
      "#skills .skill-card:nth-child(3) p": "Интерфейсҳо ва прототипҳои оддии веб бо Flask, Jinja ва HTML.",
      "#skills .skill-card:nth-child(4) h3": "Маълумот",
      "#skills .skill-card:nth-child(4) p": "SQLite, дархостҳои асосии SQL ва таҷрибаи ибтидоӣ бо Flask-SQLAlchemy.",
      "#skills .skill-card:nth-child(5) h3": "Git ва GitHub",
      "#skills .skill-card:nth-child(5) p": "Репозиторийҳо, commit ва идоракунии таърихи версияҳо.",
      "#skills .skill-note h3": "Рушди доимӣ",
      "#skills .skill-note p": "Ҳар лоиҳа барои мустаҳкам кардани дониш кӯмак мекунад. Ман омӯзиш ва рушдро идома медиҳам.",
      "#projects .section-heading .eyebrow": "03 — ЛОИҲАҲО",
      "#projects .section-number": "СОХТАН ВА НАМОИШ ДОДАН",
      ".projects-intro h2": "Ғояҳое, ки ба <span class='gradient-text'>амал табдил ёфтанд.</span>",
      ".projects-intro p": "Репозиторийҳои GitHub ва боти фаъоли ThemeGram. Дар ҳар корт метавонед рамз ё худи лоиҳаро бинед.",
      ".project-featured .project-info h3": "ThemeGram",
      ".project-featured .project-info p": "Боти Telegram барои дидан ва интихоби мавзӯъҳои iOS ва Android. Каталог, интихоби гурӯҳҳо ва оғози кор тавассути webhook.",
      ".project-featured .project-links .project-link:first-child": "Кушодани бот <span>↗</span>",
      ".project-featured .project-links .secondary-link": "Рамзи манбаъ <span>↗</span>",
      ".project-card:nth-child(2) .project-info h3": "Боти менюи тарабхона",
      ".project-card:nth-child(2) .project-info p": "Лоиҳаи омӯзишӣ бо Aiogram 3: гурӯҳҳои меню, маълумоти таомҳо, тугмаҳои inline ва сабад.",
      ".project-card:nth-child(2) .project-link": "Дидани репозиторий <span>↗</span>",
      ".project-card:nth-child(3) .project-info h3": "Панели идоракунӣ",
      ".project-card:nth-child(3) .project-info p": "Таҷрибаи сохтани панели веб бо Flask, Jinja ва пойгоҳи додаҳо. Ин ҳоло лоиҳаи омӯзишӣ аст, на маҳсулоти тиҷоратии тайёр.",
      ".project-card:nth-child(3) .project-link": "Дидани репозиторий <span>↗</span>",
      ".project-card:nth-child(4) .project-info h3": "Портфолиои шахсӣ",
      ".project-card:nth-child(4) .project-info p": "Сомонаи мутобиқшаванда бо кортҳои лоиҳаҳо, аниматсияҳои сабук ва менюи мобилӣ.",
      ".project-card:nth-child(4) .project-link": "Дидани репозиторий <span>↗</span>",
      ".all-projects-link": "Ҳамаи репозиторийҳои GitHub <span>↗</span>",
      ".services-inner .eyebrow": "04 — САМТҲОИ МАН",
      ".services-inner h2": "Вазифаи хурд.<br><span class='muted-heading'>Ҳалли равшан.</span>",
      ".services-copy": "Аввал вазифаро мефаҳмам, баъд роҳи мувофиқ ва воқеиро интихоб мекунам. Барои коре, ки ҳоло намедонам, ваъдаи зиёд намедиҳам.",
      ".service-list > div:nth-child(1) b": "Прототипҳои ботҳои Telegram",
      ".service-list > div:nth-child(1) small": "Меню, гурӯҳҳо ва равандҳои интерактивии оддӣ",
      ".service-list > div:nth-child(2) b": "Раванди фармоиш",
      ".service-list > div:nth-child(2) small": "Интихоби маҳсулот ва мантиқи асосии сабад",
      ".service-list > div:nth-child(3) b": "Скриптҳои Python",
      ".service-list > div:nth-child(3) small": "Автоматикунонии вазифаҳои хурди такрорӣ",
      ".service-list > div:nth-child(4) b": "Прототипҳои оддии веб",
      ".service-list > div:nth-child(4) small": "Абзорҳои хурди веб бо Flask",
      ".contact-section .eyebrow": "05 — ТАМОС",
      ".contact-section h2": "Ғоя ё вазифа доред?<br><span class='gradient-text'>Биёед суҳбат кунем.</span>",
      ".contact-copy": "Дар бораи лоиҳа ё саволи худ ба ман дар Telegram нависед. Якҷоя имкониятҳоро баррасӣ мекунем.",
      ".contact-actions .button-primary": "Навиштан дар Telegram <span>↗</span>",
      ".contact-actions .button-glass": "Профили GitHub <span>↗</span>",
      ".footer-note": "Мустақилона меомӯзам. Дар амал месозам."
    }
  };

  const original = new Map();
  const selectors = new Set(Object.keys(translations.ru).concat(Object.keys(translations.en), Object.keys(translations.tg)));
  selectors.forEach((key) => {
    const element = document.querySelector(key);
    if (element) original.set(key, element.innerHTML);
  });

  function setLanguage(language) {
    const lang = translations[language] ? language : "uz";
    document.documentElement.lang = lang;
    document.title = ({
      uz: "Joha — Python Developer & Telegram Bots | Portfolio",
      ru: "Joha — Python-разработчик и Telegram-боты | Портфолио",
      en: "Joha — Python Developer & Telegram Bots | Portfolio",
      tg: "Joha — Барномасози Python ва ботҳои Telegram | Портфолио"
    })[lang];

    if (lang === "uz") {
      original.forEach((value, key) => {
        const element = document.querySelector(key);
        if (element) element.innerHTML = value;
      });
    } else {
      Object.entries(translations[lang]).forEach(([key, value]) => {
        const element = document.querySelector(key);
        if (element) element.innerHTML = value;
      });
    }
    selector.value = lang;
    try { localStorage.setItem("joha-portfolio-language", lang); } catch (_) {}
  }

  selector.addEventListener("change", () => setLanguage(selector.value));
  let saved = "uz";
  try { saved = localStorage.getItem("joha-portfolio-language") || "uz"; } catch (_) {}
  setLanguage(saved);
})();
