
const grid = document.getElementById("grid");
let currentIndex = null;

function load(){
    grid.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("tutorials")) || [];

    data.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `<img src="${item.image}">`;

        card.onclick = () => openViewer(item, index);

        grid.appendChild(card);
    });
}

function openViewer(item, index){
    currentIndex = index;

    const viewer = document.getElementById("viewer");
    viewer.classList.add("active");

    document.getElementById("viewerTitle").textContent = item.title;
    document.getElementById("viewerText").textContent = item.text;

    const img = document.getElementById("viewerImg");
    const video = document.getElementById("viewerVideo");

    img.src = item.image;
    img.style.display = "block";

    video.innerHTML = item.video
        ? `<video controls src="${item.video}"></video>`
        : "";

    video.style.display = "none";
}

function closeViewer(){
    document.getElementById("viewer").classList.remove("active");
}

function showImage(){
    document.getElementById("viewerImg").style.display = "block";
    document.getElementById("viewerVideo").style.display = "none";
}

function showVideo(){
    document.getElementById("viewerImg").style.display = "none";
    document.getElementById("viewerVideo").style.display = "block";
}

function deleteItem(){

    if(currentIndex === null) return;

    const data = JSON.parse(localStorage.getItem("tutorials")) || [];

    data.splice(currentIndex, 1);

    localStorage.setItem("tutorials", JSON.stringify(data));

    closeViewer();
    load();
}

load();