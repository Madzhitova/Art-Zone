// 1. Гамбургер для навигации
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("open");
  });
}

// 2. FAQ раскрытие
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length) {
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    }
  });
}

// 3. Плавное появление блоков
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const height = window.innerHeight;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < height - 100) {
      el.classList.add("active");
    }
  });
}

if (reveals.length) {
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}

// 4. Курсы с localStorage
const courseList = document.getElementById("courseList");
const addBtn = document.getElementById("addCourse");

// Переход на форму
if (addBtn) {
  addBtn.addEventListener("click", () => {
    window.location.href = "/html/form.html";
  });
}

// Дефолтные курсы
const defaultCourses = [
  {
    title: "Основы рисования",
    category: "Базовый",
    link: "https://youtube.com",
    completed: false,
  },
  {
    title: "Цифровая живопись",
    category: "Digital",
    link: "https://youtube.com",
    completed: false,
  },
  {
    title: "Анатомия для художников",
    category: "Персонажи",
    link: "https://youtube.com",
    completed: false,
  },
];

// Загрузка
let courses = JSON.parse(localStorage.getItem("courses")) || [];

if (!courses.length) {
  courses = defaultCourses;
  localStorage.setItem("courses", JSON.stringify(courses));
}

// Сохранение
function saveCourses() {
  localStorage.setItem("courses", JSON.stringify(courses));
}

// Отрисовка
function renderCourses() {
  if (!courseList) return;

  courseList.innerHTML = "";

  courses.forEach((course, index) => {
    const card = document.createElement("div");
    card.className = "course-card";
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>Категория: ${course.category}</p>
      <label>
        <input type="checkbox" class="complete" data-index="${index}" ${course.completed ? "checked" : ""}>
        Пройдено
      </label>
      <div class="course-buttons">
        <a href="${course.link}" target="_blank" class="go-btn">Открыть</a>
        <button class="delete-btn" data-index="${index}">Удалить</button>
      </div>
    `;

    courseList.appendChild(card);
  });
}

// Удаление
if (courseList) {
  courseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;

      if (confirm("Удалить курс?")) {
        courses.splice(index, 1);
        saveCourses();
        renderCourses();
      }
    }
  });

  // Отметка "пройдено"
  courseList.addEventListener("change", (e) => {
    if (e.target.classList.contains("complete")) {
      const index = e.target.dataset.index;

      courses[index].completed = e.target.checked;
      saveCourses();
      renderCourses();
    }
  });
}

renderCourses();