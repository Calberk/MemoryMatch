$("document").ready(initializeApp()

var images = ["images/logo.jpg"];

function initializeApp(){
    pageSetup();
}

function pageSetup(){
var logo = $(".logo").css("background-image", "url(" + images[0] +")");
$("body").append(logo);
}
