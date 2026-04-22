const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const colorInput = document.getElementById("color")
const sizeInput = document.getElementById("size")
const brushBtn = document.getElementById("brush")
const clearBtn = document.getElementById("clear")

let color = colorInput.value
let brushSize = sizeInput.value
let drawing = false
let history = []

// Адаптивный canvas
function resizeCanvas() {
    const imgData = ctx.getImageData(0,0,canvas.width,canvas.height)
    canvas.width = window.innerWidth * 0.95
    canvas.height = window.innerHeight * 0.7
    ctx.putImageData(imgData,0,0)
}
window.addEventListener("resize", resizeCanvas)
resizeCanvas()

// Настройка toolbar
colorInput.oninput = () => color = colorInput.value
sizeInput.oninput = () => brushSize = sizeInput.value
brushBtn.onclick = () => drawing = false

// Очистка холста
clearBtn.onclick = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    history = []
}

// Рисование мышью
canvas.addEventListener("mousedown", e=>{
    drawing=true
    draw(e)
})
canvas.addEventListener("mouseup", e=>{
    if(drawing){ drawing=false; ctx.beginPath(); saveState() }
})
canvas.addEventListener("mousemove", draw)

// Рисование пальцем
canvas.addEventListener("touchstart", e=>{
    e.preventDefault()
    drawing=true
    drawTouch(e)
})
canvas.addEventListener("touchend", e=>{
    e.preventDefault()
    if(drawing){ drawing=false; ctx.beginPath(); saveState() }
})
canvas.addEventListener("touchmove", e=>{
    e.preventDefault()
    drawTouch(e)
})

// Функция рисования
function draw(e){
    if(!drawing) return
    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.strokeStyle = color
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.offsetX, e.offsetY)
}

function drawTouch(e){
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    draw({offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top})
}

// История для undo
function saveState(){
    history.push(canvas.toDataURL())
}
function undo(){
    if(history.length===0) return
    history.pop()
    const img=new Image()
    if(history.length>0) img.src = history[history.length-1]
    else { ctx.clearRect(0,0,canvas.width,canvas.height); return }
    img.onload = ()=> { ctx.clearRect(0,0,canvas.width,canvas.height); ctx.drawImage(img,0,0) }
}
document.addEventListener("keydown", e=>{
    if(e.ctrlKey && e.key.toLowerCase()==="z"){ e.preventDefault(); undo() }
})