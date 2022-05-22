let status = "Begining";
let level = 1;
let errorSound = new Audio("sounds/wrong.mp3");

var colors = [
    {name: "blue", sound: new Audio("sounds/blue.mp3")},
    {name: "red", sound: new Audio("sounds/red.mp3")},
    {name: "green", sound: new Audio("sounds/green.mp3")},
    {name: "yellow", sound: new Audio("sounds/yellow.mp3")},
];

function flickr(id) {
    console.log(id);
    $("#"+id).finish();
    var soundToPlay = colors.find((item) => {return item.name === id}).sound;
    soundToPlay.load();
    soundToPlay.play();
    $("#"+id).fadeTo(300,"50%").fadeTo(300,"100%");
}


var colorList = [];

function addRandomColorToList (list) {
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = colors[randomNumber].name;
    list.push(randomColor);
    flickr(randomColor);
}

$(document).click(function() {
    if (status === 'Begining') {
        addRandomColorToList(colorList);
        status = 0;
        $("h1").text("Level " + (status + 1));
        level = 1;
        $("h2").text(level);
    }
})

$(".btn").click(function(e) {
    if (status < colorList.length) {
        if (colorList[status] === e.target.id) {
            flickr(e.target.id);
            status ++;
            if(status === colorList.length) {
                setTimeout(addRandomColorToList,700,colorList);
                status = 0;
                level++;
                $("h1").text("Level " + level);
                $("h2").text(level);
            }
        } else {
            status = "Error";
        }
    }
})

$(document).click(function() {
    if (status === 'Error') {
        errorSound.load();
        errorSound.play();
        $("h1").text("Game Over! Press A Key to Start");
        $("body").toggleClass("game-over")
        setTimeout(function(){$("body").toggleClass("game-over")},500);
        colorList = [];
        status = "Begining";
    }
})