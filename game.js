let qtdCartas = 0;
let qtdClicks = 0;
let seconds = 0;
let idInterval;

let cartaVerso = new Array();

cartaVerso[0] = new Image();
cartaVerso[0].src = "/images/bobrossparrot.gif";
cartaVerso[1] = new Image();
cartaVerso[1].src = "/images/explodyparrot.gif";
cartaVerso[2] = new Image();
cartaVerso[2].src = "/images/fiestaparrot.gif";
cartaVerso[3] = new Image();
cartaVerso[3].src = "/images/metalparrot.gif";
cartaVerso[4] = new Image();
cartaVerso[4].src = "/images/revertitparrot.gif";
cartaVerso[5] = new Image();
cartaVerso[5].src = "/images/tripletsparrot.gif";
cartaVerso[6] = new Image();
cartaVerso[6].src = "/images/unicornparrot.gif";

function startJogo() {
  while (
    qtdCartas < 4 ||
    qtdCartas > 14 ||
    qtdCartas % 2 !== 0 ||
    qtdCartas === ""
  ) {
    qtdCartas = prompt(
      "Com quantas cartas você gostaria de jogar? Lembrando que só pode escolher entre 4 e 14 cartas!"
    );

    if (confirm === false) {
      alert("Para jogar, recarregue a página.");
    }
  }

  timer();

  let jogo = [];

  for (let i = 0; i < qtdCartas / 2; i++) {
    jogo.push(cartaVerso[i]);
    jogo.push(cartaVerso[i]);
  }

  jogo.sort(comparator);

  const mesa = document.querySelector(".mesa");
  mesa.innerHTML = "";

  for (let i = 0; i < qtdCartas; i++) {
    let source = jogo[i].outerHTML;

    mesa.innerHTML += `
            <div class="card" onclick="flip(this)" data-identifier="card">
                <div class="front-face face no-flip" data-identifier="front-face">
                    <figure><img src="/images/front.png" alt=""></figure>
                </div>
                <div class="back-face face no-flip" data-identifier="back-face">
                    ${source}
                </div>
            </div>
        `;
  }
}

function comparator() {
  return Math.random() - 0.5;
}

let frontFace = [];
let backFace = [];

const cards = document.querySelector(".mesa");

function flip(card) {
  let front = card.querySelector(".front-face.face");
  let back = card.querySelector(".back-face.face");

  if (front.classList.contains("done") || cards.classList.contains("wait")) {
    return;
  } else if (frontFace[0] === undefined) {
    front.classList.add("flip");
    back.classList.add("flip");

    front.classList.remove("no-flip");
    back.classList.remove("no-flip");

    frontFace[0] = front;
    backFace[0] = back.querySelector("img");

    qtdClicks++;
  } else if (backFace[0].parentNode === back) {
    return;
  } else if (backFace[0].src === back.querySelector("img").src) {
    front.classList.add("flip");
    back.classList.add("flip");

    card.classList.add("done");

    front.classList.remove("no-flip");
    back.classList.remove("no-flip");

    frontFace = [];
    backFace = [];

    qtdClicks++;

    setTimeout(endGame, 500);
  } else {
    front.classList.add("flip");
    back.classList.add("flip");

    cards.classList.add("wait");

    setTimeout(virarCartas, 1500, backFace[0], frontFace[0], back, front);

    frontFace = [];
    backFace = [];

    qtdClicks++;
  }
  console.log(qtdClicks);
}

function virarCartas(aux1, aux2, aux3, aux4) {
  aux1.parentNode.classList.remove("flip");
  aux2.classList.remove("flip");

  aux3.classList.remove("flip");
  aux4.classList.remove("flip");

  aux1.parentNode.classList.add("no-flip");
  aux2.classList.add("no-flip");

  aux3.classList.add("no-flip");
  aux4.classList.add("no-flip");

  cards.classList.remove("wait");
}

function endGame() {
  if (document.querySelector(".no-flip") === null) {
    alert(`Você ganhou em ${qtdClicks} jogadas e ${seconds} segundos!`);
    if (confirm("Você gostaria de reiniciar o jogo?")) {
      qtdCartas = 0;
      qtdClicks = 0;
      seconds = 0;

      clearInterval(idInterval);

      startJogo();
    } else {
      clearInterval(idInterval);
      const main = document.querySelector("main");
      main;
      return;
    }
  }
}

function timer() {
  const count = document.querySelector(".seconds");
  count.innerHTML = ` ${seconds} s`;

  idInterval = setInterval(incrementCounter, 1000);
}

function incrementCounter() {
  seconds++;

  const count = document.querySelector(".seconds");
  count.innerHTML = ` ${seconds} s`;
}

startJogo();
