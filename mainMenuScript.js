window.addEventListener("load", start);

function start() {
    loadCardsInfo();
    document.querySelector(".search").addEventListener("click",search);
    document.querySelector(".searchInput").addEventListener("keyup",showSuggestions);
    document.querySelector(".hamburgerMenu__svg").addEventListener("click",openMenu);
    document.querySelector(".clickContainer--tablet").addEventListener("click",closeMenu);
    document.querySelector(".searchLens--mobile__svg").addEventListener("click",openSearchBar);
    document.querySelector(".header__clickContainer--mobile").addEventListener("click",closeSearchBar);
    document.querySelector(".tripleColumnViewButton__svg").addEventListener("click", tripleColumnView);
    document.querySelector(".singleColumnViewButton__svg").addEventListener("click", singleColumnView);
    document.querySelector(".modalClickContainer").addEventListener("click", closeModal);
}

//  - - - - - - - - - - Connection with Rawg API to load the cards
// Home 
async function loadCardsInfo(){
    let cardRanking = 0;
    const fetchInfo = await fetch('https://api.rawg.io/api/games?key=2276ace6657640eb84d3a1710c12f880&dates=2021-01-01,2021-08-15');
    let data = await fetchInfo.json();
    document.querySelector(".list__boldOption").classList.add("list__selected");
    document.querySelector(".cardsContainer__list").innerHTML = "";
    document.querySelector(".titles__mainTitle").innerHTML = "New and trending";
    document.querySelector(".titles__subtitle").innerHTML = "Based on player counts and release date";

    data.results.map(function(element){
        cardRanking++;
        let gameImg = setImage(element.background_image);
        let gameName = element.name;
        let gameDate = setDate(element.released);
        let gameGenres = setGenres(element.genres);
        let gamePlatforms = element.parent_platforms;
        let gameId = element.id;
        let card =
        `
        <li class="card listElement" onclick=openModal(${gameId})>
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

                        if (gamePlatforms == null){
                            card += `
                            <div class="card platformIcon noPlatform">
                            <p>None</p>
                            </div>`;
                        }
                        else{
                            for (let i = 0; i < gamePlatforms.length; i++) {
                                let platform = setPlatformIcon(gamePlatforms[i].platform.id);
                                card += `
                                <div class="card platformIcon">
                                    <img src=${platform}>
                                </div>`;
                            }
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
            <div class="card cardInfo__gameDescription">
                ${gameId}
            </div>  
        </li>  
        `;
        document.querySelector(".cardsContainer__list").innerHTML += card;
    });
    document.querySelector(".loaderContainer").setAttribute("style", "display:none;");
}

// Search
async function loadCardsInfoWithSearch(search){
    let cardRanking = 0;
    const fetchInfo = await fetch(`https://api.rawg.io/api/games?key=2276ace6657640eb84d3a1710c12f880&search=${search}`);
    let data = await fetchInfo.json();
    document.querySelector(".list__boldOption").classList.remove("list__selected");
    document.querySelector(".cardsContainer__list").innerHTML = "";
    document.querySelector(".titles__mainTitle").innerHTML = "Search Results";
    document.querySelector(".titles__subtitle").innerHTML = "Showing results for '" + search + "'";
    data.results.map(function(element){
        cardRanking++;
        let gameImg = setImage(element.background_image);
        let gameName = element.name;
        let gameDate = setDate(element.released);
        let gameGenres = setGenres(element.genres);
        let gamePlatforms = element.parent_platforms;
        let gameId = element.id;
        let card =
        `
        <li class="card listElement" onclick=openModal(${gameId})>
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

                    if (gamePlatforms == null){
                        card += `
                        <div class="card platformIcon noPlatform">
                        <p>None</p>
                        </div>`;
                    }
                    else{
                        for (let i = 0; i < gamePlatforms.length; i++) {
                            let platform = setPlatformIcon(gamePlatforms[i].platform.id);
                            card += `
                            <div class="card platformIcon">
                                <img src=${platform}>
                            </div>`;
                        }
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
            <div class="card cardInfo__gameDescription">
                ${gameId}
            </div>
        </li>  
        `;
        document.querySelector(".cardsContainer__list").innerHTML += card;
    });
}

// - - - - - - - - - - Aux functions
// Background image
function setImage(img){
    if (img === null){
        return "media/mainMenu/imageNotFound.jpg";
    }
    return img;
}

// Date
function setDate(date){
    if (date === null) {
        return "No date";
    }
    else{    
        const dateArray = date.split("-");
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let monthInNumber = dateArray[1];
        if (monthInNumber.startsWith("0")){
            monthInNumber = monthInNumber.substring(1);
        }
        return [monthNames[monthInNumber] + " " + dateArray[2] + " " + dateArray[0]];
    }
}

// Genres
function setGenres(genresArray){
    if (genresArray === null) {
        return "No genres";
    }
    else {
        let genres = "";
        for (let i = 0; i < genresArray.length; i++) {
            genres += genresArray[i].name + ", ";  
        }
        return genres.substring(0,genres.length-2);
    }
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
            platform = "media/mainMenu/platform__android.svg";
            break;
        case 6:
            platform = "media/mainMenu/platform__apple.svg";
            break;
        case 7:
            platform = "media/mainMenu/platform__linux.svg";
            break;
        case 8:
            platform = "media/mainMenu/platform__nintendo.svg";
            break;
        default: return "media/mainMenu/platform__notFound.svg";
        // svg source: https://freesvg.org/1544388897
    }
    return platform;
}

// Get game description based on the id
async function getDescription(id){
    const gameDescription = await loadCardsInfoWithId(id);
    return gameDescription.description;
}

async function loadCardsInfoWithId(gameId){
    const fetchInfo = await fetch(`https://api.rawg.io/api/games/${gameId}?key=2276ace6657640eb84d3a1710c12f880`);
    let data = await fetchInfo.json();
    return data;
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
        search();
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

//  - - - - - - - - - - Search Bar functionality
function search(){
    let searchText = "";
    if (document.querySelector(".header__clickContainer--mobile").classList.contains("show")){
        searchText = document.querySelectorAll(".searchInput")[1].value;
        closeSearchBar();
    }
    else {
        searchText = document.querySelectorAll(".searchInput")[0].value;
    }
    loadCardsInfoWithSearch(searchText);
}

// Search suggesitons
async function showSuggestions(){
    const listContainer = document.querySelector(".gameSuggestions");
    listContainer.classList.add("show");
    const input = document.querySelector(".searchInput").value;
    const divs = document.querySelectorAll(".gameSuggestions__div");
    const gamesList = await loadGamesSuggestions(input);

    if (input === '') {
        listContainer.innerHTML = '';
        listContainer.classList.remove("show");  
    }
    else{
        for (let i = 0; i < gamesList.length; i++) {
            const game = gamesList[i];
            let div = divs[i];
            div.innerHTML = game;
            listContainer.append(div);
        }
    }
}

function closeSuggestions(){
    document.querySelector(".gameSuggestions").classList.remove("show");
}

// Loads just the first 3 games that are suggested
async function loadGamesSuggestions(search){
    let gamesArray = [];
    const fetchInfo = await fetch(`https://api.rawg.io/api/games?key=2276ace6657640eb84d3a1710c12f880&page_size=3&search=${search}`);
    let data = await fetchInfo.json();
    data.results.map(function(element){
        gamesArray.push(element.name);
        document.querySelector(".gameSuggestions").innerHTML = "";
    });
    return gamesArray;
}

// Adds the game name into the input
function fillSearchInput(id){
    let game = document.querySelectorAll(".gameSuggestions__div")[id].textContent;
    document.querySelector(".searchInput").value = game;
    search();
    closeSuggestions();
}

// - - - - - - - - - - Views
// Change to triple column view
function tripleColumnView(){
    document.querySelector(".singleColumnViewButton__svg").classList.add("unselected");
    document.querySelector(".tripleColumnViewButton__svg").classList.add("selected");

    let cardElements = document.querySelectorAll(".card");
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].classList.remove("singleColumnView");
    }
}

// Change to single column view
async function singleColumnView(){
    document.querySelector(".loaderContainer").removeAttribute("style", "display:none;");
    setTimeout(function () { document.querySelector(".loaderContainer").setAttribute("style", "display:none;"); }, 1000);
    
    document.querySelector(".singleColumnViewButton__svg").classList.remove("unselected");
    document.querySelector(".tripleColumnViewButton__svg").classList.remove("selected");
    
    let cardElements = document.querySelectorAll(".card");
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].classList.add("singleColumnView");
    }
    cardsDescription = document.querySelectorAll(".cardInfo__gameDescription");
    for (let i = 0; i < cardsDescription.length; i++) {
        const gameId = cardsDescription[i].innerText;
        const gameDescription = await getDescription(gameId);
        cardsDescription[i].innerHTML = "";
        cardsDescription[i].innerHTML = gameDescription;
    }
}

// View icons hover event
document.querySelector(".singleColumnViewButton__svg").onmouseover = function(){
    document.querySelector(".singleColumnViewButton__svg").classList.add("hover");
};

document.querySelector(".singleColumnViewButton__svg").onmouseout = function(){
    document.querySelector(".singleColumnViewButton__svg").classList.remove("hover");
};

document.querySelector(".tripleColumnViewButton__svg").onmouseover = function(){
    document.querySelector(".tripleColumnViewButton__svg").classList.add("hover");
};

document.querySelector(".tripleColumnViewButton__svg").onmouseout = function(){
    document.querySelector(".tripleColumnViewButton__svg").classList.remove("hover");
};

// - - - - - - - - - - Modal
async function openModal(id){
    document.querySelector(".modalClickContainer").classList.add("show");

    // To disable the scroll, only for desktop
    if (window.innerWidth > 1023 ) {
        document.querySelector("body").classList.add("modal--open");
    }
    
    // Get card info
    const cards = document.querySelectorAll(".listElement");
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute("onclick") == `openModal(${id})`){
            // Get img
            const img = cards[i].querySelector(".card__Image").getElementsByTagName("img")[0].currentSrc;
            // Get name
            let name = "";
            if (cards[i].querySelector(".leftInfo__title").classList.contains("tooltip")){
                name = cards[i].querySelectorAll(".tooltip")[1].textContent;
            }
            else {
                name = cards[i].querySelector(".leftInfo__title").textContent;
            }
            //Get release date
            const releaseDate = cards[i].querySelector(".releaseDate__date").textContent;
            //Get genres
            let genres = "";
            if (cards[i].querySelector(".genres__info").classList.contains("tooltip")){
                genres = cards[i].querySelectorAll(".tooltip")[1].textContent;
            }
            else {
                genres = cards[i].querySelector(".genres__info").textContent;
            }
            // Get platforms
            let platforms = [];
            if (cards[i].querySelector(".platformIcon").classList.contains("noPlatform")){
                platforms.push("Not defined");
            }
            else {
                for (let j = 0; j < cards[i].querySelectorAll(".platformIcon").length; j++) {
                    platforms.push(cards[i].querySelectorAll(".platformIcon")[j].getElementsByTagName("img")[0].currentSrc);
                }
            }
            // Get description
            let description = [];
            if (cards[i].querySelector(".cardInfo__gameDescription").classList.contains("singleColumnView")){
                for (let j = 0; j < cards[i].querySelector(".cardInfo__gameDescription").childNodes.length; j++) {
                    description.push(cards[i].querySelector(".cardInfo__gameDescription").childNodes[j].innerText); 
                }
            }
            else {
                description = await getDescription(id);
            }

            //Fetch aditional info
            const extraInfo = await loadCardsInfoWithId(id);
            const platformsName = setPlatformsNames(extraInfo.parent_platforms);
            const publisher = setPublisher(extraInfo.publishers[0]);
            const website = setWebsite(extraInfo.website);
            const developer = setDeveloper(extraInfo.developers[0]);
            const ageRating = setAgeRating(extraInfo.esrb_rating);
            const screenshots = await loadScreenshots(extraInfo.slug);
            
            let modal = 
            `
            <div class="modal__bg show">
                <img src="${img}">
                <div class="modal__gradient"></div>
            </div>
            <div class="modal show">
                <div class="modal__platforms">`;

                    for (let j = 0; j < platforms.length; j++) {
                        if (platforms[i] == "Not defined") {
                            modal += `Not defined`;
                        }
                        else{
                            modal += `<img src=${platforms[j]}>`;
                        }
                        
                    }

                modal +=`
                </div>
                <div class="modal__title">
                    ${name}
                </div>
                <div class="modal__dateAndRating">
                    <div class="dateAndRating dateAndRating__date">Placeholder</div>
                    <div class="dateAndRating dateAndRating__ratingTop">Placeholder</div>
                    <div class="dateAndRating dateAndRating__ratingCategory">Placeholder</div>
                </div>
                <div class="modal__options">
                    <input type="button" class="options__buy">
                    <input type="button" class="options__wishList">
                </div>
                <div class="modal__description">
                    ${description}
                </div>
                <div class="modal__actions">
                    <input type="button" class="actions__comment">
                    <input type="button" class="actions__review">
                </div>
                <div class="modal__info">
                    <div class="modalInfo__leftInfo">
                        <div class="info title info__platforms">
                            Platforms
                            <a href="" class="subtitle">${platformsName}</a>
                        </div>
                        <div class="info title info__releaseDate">
                            Release Date
                            <p class="subtitle">${releaseDate}</p>
                        </div>
                        <div class="info title info__publisher">
                            Publisher
                            <a href="" class="subtitle">${publisher}</a>
                        </div>
                        <div class="info title info__website">
                            Website
                            <a href="" class="subtitle">${website}</a>
                        </div>
                    </div>
                    <div>
                        <div class="info title info__genre">
                            Genre
                            <a href="" class="subtitle">${genres}</a>
                        </div>
                        <div class="info title info__developer">
                            Developer
                            <a href="" class="subtitle">${developer}</a>
                        </div>
                        <div class="info title info__ageRating">
                            Age Rating
                            <p class="subtitle">${ageRating}</p>
                        </div>
                    </div>
                </div>
                <div class="modal__media">
                    <div class="mainMedia">
                        <img src="${screenshots[0]}">
                    </div>
                    <div class="bottomMedia">
                        <img src="${screenshots[1]}">
                        <img src="${screenshots[2]}">
                        <img src="${screenshots[3]}">
                        <img src="${screenshots[4]}">
                    </div>
                </div>
                <div class="modal__exitButton">
                    <img src="media/mainMenu/exitModal.svg" onclick=closeModal()>
                </div>
            </div>
            `
            document.querySelector(".modalContainer").innerHTML += modal;
        }
    }

    if (window.innerWidth <= 1023 ) {
        document.querySelector("footer").classList.add("footer--tablet");
    }
    if (window.innerWidth <= 767 ) {
        document.querySelector("footer").setAttribute("style","display: none;");
    }

}

// - - - - - - - - - - Modal aux functions
function setPlatformsNames(platforms){
    if (platforms === null) {
        return "Not defined";
    }
    else {
        let platformNames = "";
        for (let i = 0; i < platforms.length; i++) {
            platformNames += platforms[i].platform.name + ", ";  
        }
        return platformNames.substring(0,platformNames.length-2);
    }
}

function setPublisher (publisher){
    if (publisher == null){
        return publisher = "Not defined";
    }
    return publisher.name;
}

function setWebsite (website){
    if (website == ""){
        return website = "Not defined";
    }
    return website;
}

function setDeveloper (developer){
    if (developer == null){
        return developer = "Not defined";
    }
    return developer.name;
}

function setAgeRating (rating){
    if (rating == null){
        return rating = "Not rated";
    }
    return rating.name;
}

// Loads the screenshots for the modal
async function loadScreenshots(gameSlug){
    const fetchInfo = await fetch(`https://api.rawg.io/api/games/${gameSlug}/screenshots?key=2276ace6657640eb84d3a1710c12f880`);
    let data = await fetchInfo.json();
    let screenshots = [];
    
    for (let i = 0; i < 5; i++) {
        if (data.results[i].image == null){
            screenshots.push("media/mainMenu/imageNotFound.jpg");
        }
        else {
            screenshots.push(data.results[i].image);
        }
    }
    return screenshots;
}

// Close modal
function closeModal(){
    document.querySelector(".modal").remove();
    document.querySelector(".modal__bg").remove();
    document.querySelector(".modalClickContainer").classList.remove("show");

    if (window.innerWidth <= 767 ) {
        document.querySelector("footer").setAttribute("style","display: block;");
    }
    if (window.innerWidth <= 1023 ) {
        document.querySelector("footer").classList.remove("footer--tablet");
    }
    else{
        // Enable scroll
        document.querySelector("body").classList.remove("modal--open");
    }

}
