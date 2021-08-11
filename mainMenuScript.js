window.addEventListener("load", start);

function start() {
    document.querySelector(".hamburgerMenu__svg").addEventListener("click",openMenu);
    document.querySelector(".clickContainer--tabletAndMobile").addEventListener("click",closeMenu);
    document.querySelector(".tripleColumnViewButton__svg").addEventListener("click", tripleColumnView);
    document.querySelector(".singleColumnViewButton__svg").addEventListener("click", singleColumnView);
}

function tripleColumnView(){
    document.querySelector(".singleColumnViewButton__svg").setAttribute("style", "fill:#303030;");
    document.querySelector(".tripleColumnViewButton__svg").setAttribute("style", "fill:#515151;");
    let cardElements = document.querySelectorAll(".card");
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].classList.remove("singleColumnView");
    }
}

function singleColumnView(){
    document.querySelector(".singleColumnViewButton__svg").setAttribute("style", "fill:#515151;");
    document.querySelector(".tripleColumnViewButton__svg").setAttribute("style", "fill:#303030;");
    let cardElements = document.querySelectorAll(".card");
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].classList.add("singleColumnView");
    }
}

function openMenu(){
    document.querySelector(".clickContainer--tabletAndMobile").classList.add("show");
    document.querySelector(".nav").setAttribute("style","display:block");
}

function closeMenu(){
    document.querySelector(".clickContainer--tabletAndMobile").classList.remove("show");
    document.querySelector(".nav").setAttribute("style","display:none");
}
