alert("Ikuti aku tapi ingat langkahmu dari awal (level 1)");

const boxColors = ["red", "green", "blue", "yellow", "purple", "brown"];
let gamePattern = [];
let playerColor = [];

let level = 0;
let startGame = false;

$(document).on("keypress", function (event) {
  if (!startGame && (event.key === "S" || event.key === "s")) {
    nextSeq();
    startGame = true;
  }
});

$("h1").on("click", function () {
  if (!startGame) {
    nextSeq();
    startGame = true;
  }
});

$(".box").on("click", function () {
  let idColor = $(this).attr("id");
  playerColor.push(idColor);
  $(this).fadeOut(100).fadeIn(100);

  sound(idColor);
  match(playerColor.length - 1);
});

function match(lengthArray) {
  if (gamePattern[lengthArray] === playerColor[lengthArray]) {
    if (gamePattern.length === playerColor.length) {
      sound("win-next");
      playerColor = [];
      setTimeout(() => {
        nextSeq();
      }, 2000);
    }
  } else {
    $("body").addClass("lose");
    setTimeout(() => {
      $("body").removeClass("lose");
    }, 1000);
    sound("lose");
    $("h1").text("Gagal... Coba Lagi! Tekan S atau Klik aku");
    level = 0;
    gamePattern = [];
    playerColor = [];
    startGame = false;
  }
}

function nextSeq() {
  level++;
  $("h1").text(`level ${level}`);
  let numberRandom = Math.floor(Math.random() * 6);
  let randomChooseColor = boxColors[numberRandom];
  gamePattern.push(randomChooseColor);

  sound(randomChooseColor);
  animatePress(randomChooseColor);
}

function sound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("tap-box");
  setTimeout(() => {
    $("#" + currentColour).removeClass("tap-box");
  }, 800);
}
