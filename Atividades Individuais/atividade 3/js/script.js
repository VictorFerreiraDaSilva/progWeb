'use strict';
let caractereInvisivel = '⠀';
let jogo = [
  [caractereInvisivel, caractereInvisivel, caractereInvisivel],
  [caractereInvisivel, caractereInvisivel, caractereInvisivel],
  [caractereInvisivel, caractereInvisivel, caractereInvisivel],
];
let X = true;
//colocarMarcador();
//atualizaJogo();

function novoJogo() {
  limparGrid();
  document.getElementById('jogadorVez').innerHTML = '';
  document.getElementById('jogadorGanhou').innerHTML = '';
  document.getElementsByClassName('ganhador')[0].style.visibility = 'hidden';
  document.getElementById('blur').classList.add('blur');
}

function limparGrid() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      jogo[i][j] = caractereInvisivel;
    }
  }
}

function atualizaJogo() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      let celula = i.toString() + j.toString();
      document.getElementById(celula).innerHTML = jogo[i][j];
    }
  }
}

function verificarVitoria() {
  let ganhou = false;
  for (var i = 0; i < 3; i++) {
    if (
      jogo[i][0] != caractereInvisivel &&
      jogo[i][0] === jogo[i][1] &&
      jogo[i][0] === jogo[i][2]
    ) {
      ganhou = true;
      break;
    }
    if (
      jogo[0][i] != caractereInvisivel &&
      jogo[0][i] === jogo[1][i] &&
      jogo[0][i] === jogo[2][i]
    ) {
      ganhou = true;
      break;
    }
  }
  if (
    jogo[0][0] != caractereInvisivel &&
    jogo[0][0] === jogo[1][1] &&
    jogo[0][0] === jogo[2][2]
  ) {
    ganhou = true;
  }
  if (
    jogo[0][2] != caractereInvisivel &&
    jogo[0][2] === jogo[1][1] &&
    jogo[0][2] === jogo[2][0]
  ) {
    ganhou = true;
  }

  if (ganhou) {
    console.log('Eba');
  }
}

function colocarMarcador(i, j) {
  if (i === undefined || j === undefined) return;
  if (jogo[i][j] != caractereInvisivel) {
    return;
  } else {
    let caractere = X ? 'X' : 'O';
    jogo[i][j] = caractere;
    verificarVitoria();
    X = !X;
    atualizaJogo();
  }
}
