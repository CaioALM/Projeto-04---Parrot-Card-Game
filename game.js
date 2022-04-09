


const cartas = prompt("Com quantas cartas você quer jogar?")

  if ((cartas%2 == 0) && (cartas >= 4 && cartas <= 14)) {     //JOGO ACONTECE
  const adicionarCarta = document.querySelector("cards")
  adicionarCarta.innerHTML = `
  
  `





 } else {   // JOGO NÃO ACONTECE
 
    alert("Digite uma quantidade válida de cartas!")
}