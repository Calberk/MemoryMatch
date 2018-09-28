$(document).ready(initializeApp);


function initializeApp(){
    applyHandler();
}

var firstSelectedCard = null;
var secondSelectedCard = null;
var total_possible_matches = 2;
var match_counter = 0;
var canIClick = true;

function applyHandler() {
    $(".card").click(cardClick)
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
            hideCard(secondSelectedCard);
            if (firstSelectedCard.find("img").attr("src") === secondSelectedCard.find("img").attr("src")){
                match_counter++;
                firstSelectedCard = null;
                secondSelectedCard = null;
                if (match_counter === total_possible_matches){
                    alert("You have won")
                }
            } else {
                canIClick = false;
                setTimeout(function () {
                    showCard(firstSelectedCard);
                    showCard(secondSelectedCard);
                    firstSelectedCard = null;
                    secondSelectedCard = null;
                    canIClick = true;
                }, 2000);
            }
        }
}

function hideCard(card){
    $(card).addClass('hide');
}

function showCard(card){
    $(card).removeClass('hide')
}