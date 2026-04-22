function save(){

    const title = document.getElementById("title").value;
    const text = document.getElementById("text").value;

    const imageFile = document.getElementById("image").files[0];
    const videoFile = document.getElementById("video").files[0];
    if(!title || !imageFile){
        alert("Заполни название и картинку");
        return;
    }
    const readerImg = new FileReader();

    readerImg.onload = function(e){

        const imageBase64 = e.target.result;

        if(videoFile){
            const readerVideo = new FileReader();
            readerVideo.onload = function(ev){
                const videoBase64 = ev.target.result;
                saveToStorage(title, text, imageBase64, videoBase64);
            };
            readerVideo.readAsDataURL(videoFile);
        } else {
            saveToStorage(title, text, imageBase64, null);
        }
    };
    readerImg.readAsDataURL(imageFile);
}

function saveToStorage(title, text, image, video){

    const item = { title, text, image, video };

    let data = JSON.parse(localStorage.getItem("tutorials")) || [];

    data.push(item);

    localStorage.setItem("tutorials", JSON.stringify(data));

    window.location.href = "tutorial.html";
}