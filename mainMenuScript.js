window.addEventListener("load", start);

function start() {
    document.querySelector(".hamburgerMenu__svg").addEventListener("click",openMenu);
    document.querySelector(".clickContainer--tablet").addEventListener("click",closeMenu);
    document.querySelector(".searchLens--mobile__svg").addEventListener("click",openSearchBar);
    document.querySelector(".header__clickContainer--mobile").addEventListener("click",closeSearchBar);
    document.querySelector(".tripleColumnViewButton__svg").addEventListener("click", tripleColumnView);
    document.querySelector(".singleColumnViewButton__svg").addEventListener("click", singleColumnView);
}

function openMenu(){
    document.querySelector(".nav").classList.add("show");
    document.querySelector(".list__logOut").classList.add("show");
    if (window.screen.width <= 1023 && window.screen.width >= 768){
        document.querySelector(".clickContainer--tablet").classList.add("show");
    }
    if (window.screen.width <= 767){
        if(document.querySelector(".headerOptions__hamburgerMenu").classList.contains("show")){
            closeMenu();
        }
        else{
        document.querySelector(".headerOptions__hamburgerMenu").classList.add("show");
        }
    }
}

function closeMenu(){
    document.querySelector(".clickContainer--tablet").classList.remove("show");
    document.querySelector(".nav").classList.remove("show");

    if (window.screen.width < 767){
        document.querySelector(".headerOptions__hamburgerMenu").classList.remove("show");
    }
}

function openSearchBar(){
    if (document.querySelector(".header__clickContainer--mobile").classList.contains("show")){
        closeSearchBar();
    }
    else{
        document.querySelector(".header__clickContainer--mobile").classList.add("show");
        document.querySelector(".header__searchBarContainer--mobile").classList.add("show");
        document.querySelector("header").setAttribute("style", "height:166px");
    }
}

function closeSearchBar(){
    document.querySelector(".header__clickContainer--mobile").classList.remove("show");
    document.querySelector(".header__searchBarContainer--mobile").classList.remove("show");
    document.querySelector("header").removeAttribute("style", "height:166px");
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
