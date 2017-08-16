$(document).ready(function() { 

    var numberCards = $(".carousel > div").length;

    var arrayOfCards = [];

    for (var i = 0; i < numberCards; i++) {
        arrayOfCards[i] = $(".carousel > div:nth-child(" + (i + 1) + ")");
    }

    for (i = 0; i < numberCards; i++) {
        arrayOfCards[i].css({"position" : "absolute"});
    }

    var height = $(".carousel div:first-child").outerHeight(true);
    var width = $(".carousel div:first-child").outerWidth(true);

    $(".carousel").css("height", height);

    for (i = 0; i < numberCards; i++) {
        arrayOfCards[i].css("left" , (i)*width);
    }

    loop(4000);

    // Loop here

    function loop(time) {
        nextCard(time);
        timeOut = window.setTimeout(function() { loop(time); }, time + 3000);
    }

    function nextCard(time) {
            arrayOfCards[0].animate({"left": -width}, time, function() {
                arrayOfCards[0].css("left", (numberCards - 1)*width);
                arrayOfCards = arrayOfCards.splice(1).concat(arrayOfCards);
            });

            for (i = 0; i < (numberCards - 1); i++) {
                arrayOfCards[i + 1].animate({"left": i*width}, time);
            }
    } 

    function pastCard(time) {
        arrayOfCards[numberCards - 1].css("left", -width);

        arrayOfCards[numberCards - 1].animate({"left": 0}, time, function() {
            arrayOfCards = arrayOfCards.splice(-1).concat(arrayOfCards);
        });

        for (i = 0; i < numberCards - 1; i++) {
            arrayOfCards[i].animate({"left": (i + 1)*width}, time);
        }
    } 
        
    // Controllers

    $(".carousel div:last-child").after('<div class="next"></div><div class="past"></div>'); 

    $(".next").click(function(){
        for(i = (numberCards - 1); i >= 0; i--) {
            arrayOfCards[i].finish();
        }
        clearTimeout(timeOut);
        nextCard(500);
    });

    $(".past").click(function() {
        for(i = (numberCards - 1); i >= 0; i--) {
            arrayOfCards[i].finish();
        }
        clearTimeout(timeOut);
        pastCard(500);
    });

});