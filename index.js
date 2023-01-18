let numClick = -1;
let userOrder = [];
let correctOrder = [];
let possibleColors = ["red", "green", "blue", "yellow"];
let level = 0;
let highscore = 0;
let buttons = document.querySelectorAll(".button");
let levelText = document.querySelector(".level span");
let highscoreText = document.querySelector(".score span");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
        numClick++;
        let color = this.innerText;
        playAudio(color);
        clickAnimation(color);
        checkAnswer(color);
    });
}

function checkAnswer(color) {
    userOrder.push(color);
    if (color == correctOrder[numClick]) {
        if (userOrder.length == correctOrder.length) {
            setTimeout(function () {
                userOrder = [];
                numClick = -1;
                nextSequence();
            }, 1000);
        }
    } else {
        userOrder = [];
        correctOrder = [];
        document.querySelector("h1").innerText = "Game Over, Hit another key to try again !!";
        document.querySelector("h1").style.color = "red";
        if (level > highscore) {
            highscore = level;
        }
        level = 0;
        levelText.innerText = level;
        highscoreText.innerText = highscore;
        numClick = -1;
        let temp = "wrong";
        playAudio(temp);
    }
}

function nextSequence() {
    level++;
    levelText.innerText = level;
    let randnum = Math.floor(Math.random() * 4);
    let color = possibleColors[randnum];
    correctOrder.push(color);
    playAudio(color);
    clickAnimation(color);
}

function playAudio(color) {
    let soundPath = "sounds/" + color + ".mp3";
    let audio = new Audio(soundPath);
    audio.play();
}

function clickAnimation(color) {
    let buttonClicked = document.querySelector("." + color);
    buttonClicked.classList.add("pressed");

    setTimeout(function () {
        buttonClicked.classList.remove("pressed");
    }, 100);
}

document.addEventListener("keypress", function () {
    if (level <= 0) {
        nextSequence();
        document.querySelector("h1").innerText = "Let's see how much you can score";
        document.querySelector("h1").style.color = "antiquewhite";
    }
});
