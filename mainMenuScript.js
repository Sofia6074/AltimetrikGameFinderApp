window.addEventListener("load", start);

function start() {
    document.querySelector(".threeColumnView").addEventListener("click", threeColumnView);
    document.querySelector(".singleColumnView").addEventListener("click", singleColumnView);
}

function threeColumnView(){
    console.log("threeColumnView clicked");
}

function singleColumnView(){
    console.log("singleColumnView clicked");
    console.log(document.querySelectorAll(".cardInfo"))
}
