$(document).ready(initializeApp);


function initializeApp(){
    cardRandomizer();
    imageRandomizer();
    applyHandler();
    display_stats();
    $("#reset-game").click(resetPress);
    $('.playAgain').click(resetPress)
    initModal();
    pressPlay();
    changeAudio();
    resetDisable()
    // progressBarOrientation()
}

var firstSelectedCard = null;
var secondSelectedCard = null;
var total_possible_matches = 10;
var match_counter = 0;
var canIClick = true;
var games_played = 0;
var attempts = 0;
var accuracy = 0;
var lifePoints = 100;
var cardImages = [
    "images/cards/fire_spirits.png",
    "images/cards/fire_spirits.png",
    "images/cards/baby_dragon.png",
    "images/cards/baby_dragon.png",
    "images/cards/snow_spirits.png",
    "images/cards/snow_spirits.png",
    "images/cards/golem.png",
    "images/cards/golem.png",
    "images/cards/ice_wizard.png",
    "images/cards/ice_wizard.png",
    "images/cards/prince.png",
    "images/cards/prince.png",
    "images/cards/princess.png",
    "images/cards/princess.png",
    "images/cards/witch.png",
    "images/cards/witch.png",
    "images/cards/elixir.png",
    "images/cards/elixir.png",
    "images/cards/tornado.png",
    "images/cards/tornado.png",    
];

var backgroundImages = [
    "images/background/background-opt1.jpg",
    "images/background/background-opt2.jpg",
    "images/background/background-opt3.jpg",
    "images/background/background-opt4.jpg",
    "images/background/background-opt5.jpg",
    "images/background/background-opt6.jpg",
    "images/background/background-opt7.jpg",
    "images/background/background-opt8.jpg",
    "images/background/background-opt9.jpg",
    "images/background/background-opt10.jpg",
    "images/background/background-opt11.jpg",
    "images/background/background-opt12.jpg",
    "images/background/background-opt13.jpg",
    "images/background/background-opt14.jpg",
    "images/background/background-opt15.jpg",
    "images/background/background-opt16.jpg",
    "images/background/background-opt17.jpg",
]

function applyHandler() {
    $(".card").click('.back > img', cardClick);
}

function initModal(){
    $('#intro_modal').modal({
        show: true,
        keyboard: false,
        backdrop: 'static'
    });
}

function winModal(){
    $('#winModal').modal('show');
    gameWinSound();
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

function setupGameCards(){
    for (var cardCreated = 0; cardCreated < cardImages.length; cardCreated++){
        var randomCard = cardImages[cardCreated];
        var divContainer = $("<div>").addClass("card-container");
        var divCard = $("<div>").addClass("card");
        var divFront = $("<div>").addClass("front");
        var imgCreated = $("<img>").addClass("front-img").attr("src", randomCard);
        var divBack = $("<div>").addClass("back");
        var divBackImg = $("<img>").addClass("back-img").attr("src", "images/royale-logo.jpg");
        divFront.append(imgCreated);
        divCard.append(divFront);
        divBack.append(divBackImg);
        divCard.append(divBack);
        // divContainer.append(divCard);
        $("section").append(divCard);
    }
}

// Card functionality //

function cardClick() {
    if (!canIClick) {
        return;
    }
    if (firstSelectedCard === null) {
        firstSelectedCard = event.currentTarget;
        hideCard(firstSelectedCard);
        // firstSelectedCard = $(event.currentTarget);
        // pop();
        
    } else {
            secondSelectedCard = event.currentTarget;
            if ($(secondSelectedCard).hasClass("rotate")) {
                return;
            }
        hideCard(event.currentTarget);
        secondSelectedCard = event.currentTarget;
        // secondSelectedCard = $(event.currentTarget);
        // if (secondSelectedCard.hasClass("hide")) {
        //     return;
        // }
        // hideCard(secondSelectedCard);
        // attempts++;
        if ($(firstSelectedCard).find(".front > img").attr("src") === $(secondSelectedCard).find(".front > img").attr("src")) {
            matchSound();
            $(firstSelectedCard).find(".front > img").animate({opacity: '0',}, 1500);
            $(secondSelectedCard).find(".front > img").animate({opacity: '0',}, 1500);
            setTimeout(clearCard, 1000);
            // firstSelectedCard = null;
            // secondSelectedCard = null;
            match_counter++;
            if (match_counter === total_possible_matches) {
                setTimeout(winModal, 1500)
            }
        } else {
            attempts++;
            misMatchSound();
            canIClick = false;
            flipTimer();
            remainingHealthCalculator();
        }
    }
        display_stats()
}

function hideCard(card){
    // $(card).addClass('hide');
    $(card).addClass('rotate');
    
}

function clearCard(){
    // $(firstSelectedCard).addClass('hide').removeClass('rotate');
    // $(secondSelectedCard).addClass('hide').removeClass('rotate');
    firstSelectedCard = null;
    secondSelectedCard = null;
}

function flipTimer(){
    setTimeout(unFlipCard, 1000);
}

function unFlipCard(){
    $(firstSelectedCard).removeClass('rotate');
    $(secondSelectedCard).removeClass('rotate');
    firstSelectedCard = null;
    secondSelectedCard = null;
    canIClick = true;
}

// Game Info/Reset Section //

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
    $(".card").remove();
    cardRandomizer();
    applyHandler();
    imageRandomizer();
    resetHealthBar();
}

function reset_stats(){
    games_played++;
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    firstSelectedCard = null;
    secondSelectedCard = null;
}

function resetHealthBar(){
    lifePoints = 100;
    $('.barSuccess-portrait').css('width', 40 + '%');
    $('.barWarning-portrait').css('width', 40 + '%');
    $('.barDanger-portrait').css('width', 20 + '%');

    $('.king-portrait > .happy-portrait').show()
    $('.king-portrait > .cry-portrait').hide()
    $('.kingAngry-portrait > .angry-portrait').hide();

    $('.barSuccess-landscape').css('height', 40 + '%');
    $('.barWarning-landscape').css('height', 40 + '%');
    $('.barDanger-landscape').css('height', 20 + '%');

    $('.king-portrait > .happy-landscape').show()
    $('.king-portrait > .cry-landscape').hide()
    $('.kingAngry-portrait > .angry-landscape').hide();

}

function resetDisable(){
    if(attempts === 0){
        $('#reset-game').off('click');
    }else {
        $('#reset-game').on('click', resetPress)
    }
}

// Game progress bar and end//

// function progressBarOrientation(){
//     if(window.innerHeight > window.innerWidth){
//         $(".extras-area-portrait").toggleClass('hide');
//         $(".extras-area-landscape").toggleClass('hide');

//     }else{
//         $(".extras-area-portrait").toggleClass('hide');
//         $(".extras-area-landscape").toggleClass('hide');
    // }
// }


function remainingHealthCalculator(){
    var wrongAnswer = 5;
    lifePoints = lifePoints - wrongAnswer;
    if(lifePoints === 0){
        setTimeout(function(){
            $("#loseModal").modal({
            show: true,
            keyboard: false,
            backdrop: 'static'
        });}, 1500)
        return;
    }
    // if(window.innerHeight > window.innerWidth){
        if(lifePoints >= 60 ){
            $('.barSuccess-portrait').css('width', (lifePoints-60) + '%');
            if(lifePoints === 60){
                $('.king-portrait > .happy-portrait').hide()
                $('.king-portrait > .cry-portrait').show()
            }
        }else if(lifePoints >=20){
            $('.barWarning-portrait').css('width', (lifePoints-20) + '%');
            if(lifePoints ===20){
                $('.king-portrait > .cry-portrait').hide();
                $('.kingAngry-portrait > .angry-portrait').show();
            }
        }else{
            $('.barDanger-portrait').css('width', (lifePoints) + '%');
        }
    
        if(lifePoints >= 60 ){
            $('.barSuccess-landscape').css('height', (lifePoints-60) + '%');
            if(lifePoints === 60){
                $('.king-landscape > .happy-landscape').hide()
                $('.king-landscape > .cry-landscape').show()
            }
        }else if(lifePoints >=20){
            $('.barWarning-landscape').css('height', (lifePoints-20) + '%');
            if(lifePoints ===20){
                $('.king-landscape > .cry-landscape').hide();
                $('.kingAngry-landscape > .angry-landscape').show();
            }
        }else{
            $('.barDanger-landscape').css('height', (lifePoints) + '%');
        }
    }
// }

// Sound effect and music //

function changeAudio(){
    var audio = document.getElementById("background-music");
    var audio2 = document.getElementById("background-music2");
    var audio3 = document.getElementById("background-music3");
    var audio4 = document.getElementById("background-music4");
    var audio5 = document.getElementById("background-music5");
    var audio6 = document.getElementById("background-music6");
    $("#sound_toggle").click(function(){
        if ($("#sound_toggle").hasClass('mute')) {
            $(this).removeClass('mute');
            audio.muted = false;
            audio2.muted = false;
            audio3.muted = false;
            audio4.muted = false;
            audio5.muted = false;
            audio6.muted = false;
        } else {
            $(this).addClass('mute');
            audio.muted = true;
            audio2.muted = true;
            audio3.muted = true;
            audio4.muted = true;
            audio5.muted = true;
            audio6.muted = true;
        }
    })
}

function pressPlay(){
    $('.playBtn').click(startMusic)
}

function resetSound(){
    var ring = document.getElementById("background-music2");
    ring.play();
}

function matchSound(){
    var ring = document.getElementById("background-music3");
    ring.play();
}

function misMatchSound(){
    var ring = document.getElementById("background-music4");
    ring.play();
}

function gameWinSound(){
    var ring = document.getElementById("background-music5");
    ring.play();
}

function pop(){
    var ring = document.getElementById("background-music6");
    ring.play();
}

function startMusic() {
    var audio = document.getElementById("background-music");
    audio.play().loop;
    audio.loop = true;
}


