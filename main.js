$(document).ready(initializeApp);


function initializeApp(){
    cardRandomizer();
    imageRandomizer();
    startMusic();
    display_stats();
    applyHandler();
    $("#reset-game").click(resetPress);
}

var firstSelectedCard = null;
var secondSelectedCard = null;
var total_possible_matches = 9;
var match_counter = 0;
var canIClick = true;
var games_played = 0;
var attempts = 0;
var accuracy = 0;
var cardImages = [
    "images/archers.png",
    "images/archers.png",
    "images/baby_dragon.png",
    "images/baby_dragon.png",
    "images/barbarians.png",
    "images/barbarians.png",
    "images/goblin.png",
    "images/goblin.png",
    "images/golem.png",
    "images/golem.png",
    "images/ice_wizard.png",
    "images/ice_wizard.png",
    "images/prince.png",
    "images/prince.png",
    "images/princess.png",
    "images/princess.png",
    "images/witch.png",
    "images/witch.png"
];

var backgroundImages = [
    "images/background/background-opt1.jpg",
    "images/background/background-opt2.jpg",
    "images/background/background-opt3.jpg",
    "images/background/background-opt4.jpg",
    "images/background/background-opt5.jpg",
    "images/background/background-opt6.jpg",
    "images/background/background-opt7.jpg",
    "images/background/background-opt8.png",
    "images/background/background-opt9.jpg",
    "images/background/background-opt10.png",
    "images/background/background-opt11.jpg",
    "images/background/background-opt12.jpg",
    "images/background/background-opt13.png",
    "images/background/background-opt14.jpg",

]

function applyHandler() {
    $(".card").click(cardClick);

}

function cardClick() {
    if (!canIClick) {
        return;
    }
        if (firstSelectedCard === null) {
            firstSelectedCard = $(event.currentTarget);
            pop();
            hideCard(firstSelectedCard);
        } else {
            secondSelectedCard = $(event.currentTarget);
            if (secondSelectedCard.hasClass("hide")) {
                return;
            }
            hideCard(secondSelectedCard);
            attempts++;
            if (firstSelectedCard.find(".front > img").attr("src") === secondSelectedCard.find(".front > img").attr("src")) {
                match_counter++;
                matchSound();
                firstSelectedCard.remove();
                secondSelectedCard.remove();
                firstSelectedCard = null;
                secondSelectedCard = null;
                if (match_counter === total_possible_matches) {
                gameWinSound();
                }
            } else {
                misMatchSound();
                canIClick = false;
                timeOut();
            }
        }
            display_stats()
}

function setupGameCards(){
    for (var cardCreated = 0; cardCreated < cardImages.length; cardCreated++){
        var randomCard = cardImages[cardCreated];
        var divContainer = $("<div>").addClass("card-container");
        var divCard = $("<div>").addClass("card shadow");
        var divFront = $("<div>").addClass("front");
        var imgCreated = $("<img>").addClass("front-img").attr("src", randomCard);
        var divBack = $("<div>").addClass("back");
        var divBackImg = $("<img>").addClass("back-img").attr("src", "images/royale-logo.jpg");
        divFront.append(imgCreated);
        divCard.append(divFront);
        divBack.append(divBackImg);
        divCard.append(divBack);
        divContainer.append(divCard);
        $("section").append(divContainer);
    }
}

function cardRandomizer() {
    var swappedImage;
    for (var shrinkingImageIndex = cardImages.length - 1; shrinkingImageIndex >= 0; shrinkingImageIndex--) {
        var randomizedIndex = Math.floor(Math.random() * shrinkingImageIndex);
        swappedImage = cardImages[shrinkingImageIndex];
        cardImages[shrinkingImageIndex] = cardImages[randomizedIndex];
        cardImages[randomizedIndex] = swappedImage;
    }
    setupGameCards()
}

function imageRandomizer() {
    var randomizedIndex = Math.floor(Math.random() * backgroundImages.length);
    var randomBackground = backgroundImages[randomizedIndex];
    $("section").addClass("board-img").css("background-image", "url(" + randomBackground +")");

}

function hideCard(card){
    $(card).addClass('hide');
}

function showCard(card){
    $(card).removeClass('hide')
}

function timeOut(){
    setTimeout(function() {
        showCard(firstSelectedCard);
        showCard(secondSelectedCard);
        firstSelectedCard = null;
        secondSelectedCard = null;
        canIClick = true;
    }   ,1000);
}

function updateAccuracy(){
        var accuracyStat = ((match_counter/attempts) * 100).toFixed(2) + "%";
        return accuracyStat;
}

function display_stats(){
    $(".games-played .value").text(games_played );
    //$(".attempts").value = attempts;
    $(".attempts .value").text(attempts);
    if(attempts === 0){
        $(".accuracy .accuracyValue").text("0.00%");
    }else{
        $(".accuracy .accuracyValue").text(updateAccuracy());
        }
}

function resetPress(){
    resetSound();
    reset_stats();
    display_stats();
    $(".card-container").remove();
    cardRandomizer();
    applyHandler();

}

function reset_stats(){
    games_played++;
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
}

function startMusic() {
    var player = new Audio('sounds/clash_royale_battle.mp3');
    player.play().loop;





}

function resetSound(){
    var ring = new Audio('sounds/reset.mp3');
    ring.play();
}

function matchSound(){
    var ring = new Audio('sounds/gold.mp3');
    ring.play();
}

function misMatchSound(){
    var ring = new Audio('sounds/barb_king.mp3');
    ring.play();
}

function gameWinSound(){
    var ring = new Audio('sounds/game_win.mp3');
    ring.play();
}

function pop(){
    var ring = new Audio('sounds/pop.mp3');
    ring.play();
}