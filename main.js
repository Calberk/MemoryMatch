$(document).ready(initializeApp);


function initializeApp(){
    applyHandler();
}

var firstSelectedCard = null;
var secondSelectedCard = null;
var total_possible_matches = 2;
var match_counter = 0;

function applyHandler() {
    $(".card").click(cardClick)
}

function cardClick(){
    var firstCardChecked = $(firstSelectedCard).find(".front > img").attr("src")
    var secondCardChecked = $(firstSelectedCard).find(".front > img").attr("src")
    if(firstSelectedCard === null){
        firstSelectedCard = $(event.currentTarget);
        firstSelectedCard.addClass("hide");
    }else {
        secondSelectedCard = event.currentTarget;
        hideCard(event.currentTarget);
        if (firstCardChecked === secondCardChecked){
            console.log("these are the same")
        }else{
            console.log("not the same");
        }
    }
}

function hideCard(card){
        $(event.currentTarget).addClass('hide');
}