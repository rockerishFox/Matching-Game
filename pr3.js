let imgArray = [];
let cards = [];

var openCards = [];
var matchedCards = [];

$(document).ready(function () {
  imgArray = $("img");
  cards = $(".card");
});

function startGame() {
  $("#btn-start").css("opacity", "0");
  $("#btn-restart").css("opacity", "1");
  $("table").css("opacity", "1");

  $(".card").each(function () {
    $(this).removeClass("disabled");
    $(this).find(":first-child").css("opacity", "0");
    $(this).unbind();
  });

  openCards = [];
  matchedCards = [];

  numArray = $(".card-container");
  cards = $(".card");

  let imgs = shuffle(imgArray);

  imgs.each(function (index) {
    cards[index].innerHTML = $(this).clone().wrap("<p>").parent().html();
  });

  $(".card").each(function () {
    $(this).click(function () {
      if (!$(this).hasClass("disabled")) displayImg($(this));
    });
  });
}

function displayImg(card) {
  // console.log(matchedCards);
  // console.log("current cards is matched? - " + inCardsMatched(card));
  if (!inCardsMatched(card)) {
    $(card).addClass("disabled");
    $(card).find(":first-child").css("opacity", "1");
    cardClicked(card);
  }
}

function inCardsMatched(card) {
  $(matchedCards).each(function () {
    if ($(this).html() == card.html()) {
      return true;
    }
  });
  return false;
}

function cardClicked(card) {
  openCards.push(card);
  if (openCards.length == 2) {
    if ($(openCards)[0].html() === $(openCards)[1].html()) {
      matchedCards.push(card);
      openCards = [];

      // console.log(" DONE? " + matchedCards.length == 8);
      if (matchedCards.length == 8) {
        setTimeout(function () {
          alert("GOOD JOB!");
        }, 500);
      }
    } else {
      var card1 = $(openCards)[0].find(":first-child");
      var card2 = $(openCards)[1].find(":first-child");
      $(openCards)[0].removeClass("disabled");
      $(openCards)[1].removeClass("disabled");
      openCards = [];

      setTimeout(function () {
        card1.css("opacity", "0");
        card2.css("opacity", "0");
      }, 500);
    }
  }
}

function shuffle(array) {
  var index = array.length;
  while (index != 0) {
    random = Math.floor(Math.random() * index);
    index--;

    var aux = array[index];
    array[index] = array[random];
    array[random] = aux;
  }
  return array;
}
