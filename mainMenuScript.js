window.addEventListener("load", start);

function start() {
    loadCardsInfo();
    document.querySelector
    document.querySelector(".hamburgerMenu__svg").addEventListener("click",openMenu);
    document.querySelector(".clickContainer--tablet").addEventListener("click",closeMenu);
    document.querySelector(".searchLens--mobile__svg").addEventListener("click",openSearchBar);
    document.querySelector(".header__clickContainer--mobile").addEventListener("click",closeSearchBar);
    document.querySelector(".tripleColumnViewButton__svg").addEventListener("click", tripleColumnView);
    document.querySelector(".singleColumnViewButton__svg").addEventListener("click", singleColumnView);
}

//  - - - - - - - - - - Connection with Rawg API to load the cards
async function loadCardsInfo(){
    let cardRanking = 0;
    const fetchInfo = await fetch('https://api.rawg.io/api/games?key=2276ace6657640eb84d3a1710c12f880&dates=2021-01-01,2021-08-15');
    let data = await fetchInfo.json();
    console.log(data.results);
    document.querySelector(".cardsContainer__list").innerHTML = "";
    data.results.map(function(element){
        cardRanking++;
        let gameImg = element.background_image;
        let gameName = element.name;
        let gameDate = setDate(element.released);
        let gameGenres = setGenres(element.genres);
        let gamePlatforms = element.parent_platforms;
        let card =
        `
        <li class="card listElement">
            <div class="card card__Image">
                <img src="${gameImg}">
            </div>
            <div class="card cardInfo">
                <div class="card cardInfo__leftInfo">`;         
                    if(gameName.length >= 20 ){
                        const tooltipText = gameName;
                        gameName = gameName.substring(0,16);
                        gameName += "...";
                        //May add: check if overflow exists
                        card += `
                            <div class="card leftInfo__title tooltip">${gameName}
                            <span class="leftInfo__titleFullText tooltip tooltip__text">${tooltipText}</span>
                            `;
                    }
                    else{
                        card +=`<div class="card leftInfo__title">${gameName}`;
                    }

                card += `</div>
                    <div class="card infoContainer--singleColumn">
                        <div class = "card releaseDate--singleColumn">
                            <div class="card leftInfo__releaseDate">
                                <div class="card releaseDate__text">
                                    Release date
                                </div>
                                <div class="card releaseDate__date">
                                    ${gameDate}
                                </div>
                            </div>
                            <hr class="card leftInfo__firstLine">
                        </div>
                        <div class="card genres--singleColumn">
                            <div class="card leftInfo__genres">
                                <div class="card genres__text">
                                    Genres
                                </div>`;

                                    if(gameGenres.length > 20 ){
                                        const tooltipText = gameGenres;
                                        gameGenres = gameGenres.substring(0,18);
                                        gameGenres += "...";
                                        card += `<div class="card genres__info tooltip">${gameGenres}
                                                <span class="tooltip tooltip__text">${tooltipText}</span>
                                            `;
                                    }
                                    else{
                                        card += `<div class="card genres__info">${gameGenres}
                                                <span class="tooltip tooltip__text"></span>
                                            `;
                                    }

                                card += `
                                </div>
                            </div>
                            <hr class="card leftInfo__secondLine">
                        </div>
                        <div class="card leftInfo__position">
                            #${cardRanking}
                        </div>
                    </div>
                </div>
                <div class="card cardInfo__rightInfo">
                    <div class="card rightInfo__platformIcons">`;

                        for (let i = 0; i < gamePlatforms.length; i++) {
                            let platform = setPlatformIcon(gamePlatforms[i].platform.id);
                            card += `
                            <div class="card platformIcon">
                                <img src=${platform}>
                            </div>`;
                        }

                    card += `
                    </div>
                    <div class="card rightInfo__position">
                        #${cardRanking}
                    </div>
                    <div class="card rightInfo__giftButton">
                        <input type="button">
                    </div>
                </div>
            </div>
            <div class="card cardInfo__gameDescription"></div>  
        </li>  
        `;
        // let newLi = document.createElement("li");
        // newLi.classList.add("card");
        // newLi.classList.add("listElement");
        // newLi.innerHTML += card;
        // document.querySelector(".cardsContainer__list").appendChild(newLi);
        document.querySelector(".cardsContainer__list").innerHTML += card;
    });
}

// - - - - - - - - - - Aux functions to re-format the information fetched
// Date
function setDate(date){
    const dateArray = date.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let monthInNumber = dateArray[1];
    if (monthInNumber.startsWith("0")){
        monthInNumber = monthInNumber.substring(1);
    }
    return [monthNames[monthInNumber] + " " + dateArray[2] + " " + dateArray[0]];
}

// Genres
function setGenres(genresArray){
    let genres = "";
    for (let i = 0; i < genresArray.length; i++) {
        genres += genresArray[i].name + ", ";  
    }
    return genres.substring(0,genres.length-2);
}

// Set icon src based on the id
function setPlatformIcon(platform){
    switch (platform) {
        case 1:
            platform = "media/mainMenu/platform__windows.svg";
            break;
        case 2:
            platform = "media/mainMenu/platform__playStation.svg";
            break;
        case 3:
            platform = "media/mainMenu/platform__xbox.svg";
            break;
        case 4:
            platform = "media/mainMenu/platform__ios.svg";
            break;
        case 5:
            platform = "media/mainMenu/platform__apple.svg";
            break;
        case  6:
            platform = "media/mainMenu/platform__linux.svg";
            break;
        case  7:
            platform = "media/mainMenu/platform__nintendo.svg";
            break;
        default: return "media/mainMenu/imageNotFound.jpg";
    }
    return platform;
}

//  - - - - - - - - - - Search Functionality
function search(){

}

// - - - - - - - - - - Hamburguer menu
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

// - - - - - - - - - - Search Bar
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

// - - - - - - - - - - Views
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

    // // Tooltip
    // const test = document.querySelectorAll(".leftInfo__title");
    // for (let i = 0; i < test.length; i++) {
    //     if (test[i].children.innerHTML != 'undefined'){
    //         test[i].innerHTML = document.querySelector(".leftInfo__titleFullText").textContent;
    //         test[i].classList.remove("tooltip");
    //     }
    // }
}
