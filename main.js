$(document).ready(initializeApp);


function initializeApp(){
    applyHandler();
    clickPullDownMenu();
}

var firstSelectedCard = null;
var secondSelectedCard = null;
var total_possible_matches = 1;
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
            if($(secondSelectedCard).hasClass(".hide")) {
                return;
            }
            hideCard(secondSelectedCard);
            if (firstSelectedCard.find(".front > img").attr("src") === secondSelectedCard.find(".front > img").attr("src")){
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

function clickPullDownMenu(){
    $(".flip").click(function(){
        $(".panel").slideToggle("slow");
    });
}