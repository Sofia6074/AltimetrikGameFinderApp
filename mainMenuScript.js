window.addEventListener("load", start);

function start() {
    // var gameRanking = 1;
    loadCardsInfo();
    document.querySelector(".hamburgerMenu__svg").addEventListener("click",openMenu);
    document.querySelector(".clickContainer--tablet").addEventListener("click",closeMenu);
    document.querySelector(".searchLens--mobile__svg").addEventListener("click",openSearchBar);
    document.querySelector(".header__clickContainer--mobile").addEventListener("click",closeSearchBar);
    document.querySelector(".tripleColumnViewButton__svg").addEventListener("click", tripleColumnView);
    document.querySelector(".singleColumnViewButton__svg").addEventListener("click", singleColumnView);
}

async function loadCardsInfo(){
    // const key = "2276ace6657640eb84d3a1710c12f880";
    const fetchInfo = await fetch('https://api.rawg.io/api/games?key=2276ace6657640eb84d3a1710c12f880&dates=2021-01-01,2021-08-15');
    let data = await fetchInfo.json();
    console.log(data.results);
    document.querySelector(".cardsContainer__list").innerHTML = "";
    let cardsData = data.results.map(function(element){
        let gameImg = element.background_image;
        let gameName = element.name;
        let gameDate = setDate(element.released);
        let gameGenres = setGenres(element.genres);
        let gamePlatforms = element.parent_platforms;
        document.querySelector(".cardsContainer__list").innerHTML += "card";
    });
}

function setDate(date){
    const dateArray = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthInNumber = dateArray[1];
    if (monthInNumber.startsWith("0")){
        monthInNumber = monthInNumber.substring(1);
    }
    return [monthNames[monthInNumber], dateArray[2], dateArray[0]];
}

function setGenres(genresArray){
    let genres = "";
    for (let i = 0; i < genresArray.length; i++) {
        genres += genresArray[i].name + ", ";  
    }
    return genres.substring(0,genres.length-2);
}

function setPlatformIcon(platform){
    switch (platform) {
        case 1:
            platform = "media/mainMenu/platform__windows";
            break;
        case 2:
            platform = "media/mainMenu/platform__playStation";
            break;
        case 3:
            platform = "media/mainMenu/platform__xbox";
            break;
        case 4:
            platform = "media/mainMenu/platform__ios";
            break;
        case 5:
            platform = "media/mainMenu/platform__apple";
            break;
        case  6:
            platform = "media/mainMenu/platform__linux";
            break;
        case  7:
            platform = "media/mainMenu/platform__nintendo";
    }
}

function openMenu(){
    document.querySelector("header").setAttribute("style", "position: unset;");
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
    document.querySelector("header").removeAttribute("style", "position: unset;");
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
