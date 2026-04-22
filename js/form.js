const form = document.getElementById("courseForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value.trim();
    const link = document.getElementById("link").value.trim();

    if (!title || !category || !link) {
        alert("Пожалуйста заполните все поля!");
        return;
    }

    const newCourse = {
        id: Date.now(),
        title,
        category,
        link,
        completed: false
    };

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    courses.push(newCourse);

    localStorage.setItem("courses", JSON.stringify(courses));

    window.location.href = "../index.html";
}); 