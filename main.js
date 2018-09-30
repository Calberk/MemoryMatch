$(document).ready(initializeApp);


function initializeApp(){
    applyHandler();
    startMusic();
    display_stats()
    randomize();
}

var firstSelectedCard = null;
var secondSelectedCard = null;
var total_possible_matches = 9;
var match_counter = 0;
var canIClick = true;
var games_played = 0;
var attempts = 0;
var accuracy = 0;
var images = ["archers.png", "archers.png", "baby_dragon.png", "baby_dragon.png", "barbarians.png", "barbarians.png", "goblin.png", "goblin.png", "golem.png", "golem.png", "ice_wizard.png"];

function applyHandler() {
    $(".card").click(cardClick)
    $("#reset-game").click(resetPress);
}

function cardClick() {
    if (!canIClick) {
        return;
    }
        if (firstSelectedCard === null) {
            firstSelectedCard = $(event.currentTarget);
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
                firstSelectedCard = null;
                secondSelectedCard = null;
                if (match_counter === total_possible_matches) {
                }
            } else {
                canIClick = false;
                timeOut()
            }
        }
            display_stats()
}

function randomize(){

}

function hideCard(card){
    $(card).addClass('hide');
}

function showCard(card){
    $(card).removeClass('hide')
}

function timeOut(){
    setTimeout(function () {
        showCard(firstSelectedCard);
        showCard(secondSelectedCard);
        firstSelectedCard = null;
        secondSelectedCard = null;
        canIClick = true;
    }, 1500);
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
        $(".accuracy .value").text("0.00%");
    }else{
        $(".accuracy .value").text(updateAccuracy());
        }
}

function resetPress(){
    games_played++;
    reset_stats();
    display_stats();
    randomize();
    $(".card").removeClass('hide');
}

function reset_stats(){
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    display_stats();
}

function startMusic() {
    var player = new Audio('sounds/clash_royale_battle.mp3');
    player.play();
}

