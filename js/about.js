const reveals = document.querySelectorAll(".reveal");

function reveal(){

const height = window.innerHeight;

reveals.forEach(el=>{

const top = el.getBoundingClientRect().top;

if(top < height - 100){
el.classList.add("active");
}

});

}

window.addEventListener("scroll",reveal);
reveal();