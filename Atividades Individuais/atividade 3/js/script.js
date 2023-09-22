'use strict';
let caractereInvisivel = '⠀';
let jogo = [
  [caractereInvisivel, caractereInvisivel, caractereInvisivel],
  [caractereInvisivel, caractereInvisivel, caractereInvisivel],
  [caractereInvisivel, caractereInvisivel, caractereInvisivel],
];
let X = true;
let fim = false;
let jogadas = 0;
let j1 = 'Kleber';
let j2 = 'Sadio';
let vj1 = 0;
let vj2 = 0;

function iniciarJogo() {
  j1 = document.getElementById('j1').value;
  j2 = document.getElementById('j2').value;
  document.getElementById('jogador1').innerHTML = j1;
  document.getElementById('jogador2').innerHTML = j2;
  document.getElementById('jogadores').style.display = 'none';
  document.getElementById('container').style.visibility = 'visible';
  novoJogo();
}

function novoJogo() {
  limparGrid();
  document.getElementById('jogadorVez').innerHTML = '';
  document.getElementsByClassName('vez')[0].style.visibility = 'visible';
  document.getElementById('jogadorGanhou').innerHTML = '';
  document.getElementsByClassName('ganhador')[0].style.visibility = 'hidden';
  document.getElementById('vj1').innerHTML = vj1;
  document.getElementById('vj2').innerHTML = vj2;
  atualizaJogo();
  fim = false;
  jogadas = 0;
}

function limparGrid() {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      jogo[i][j] = caractereInvisivel;
      let celula = i.toString() + j.toString();
      document.getElementById(celula).classList.remove('linhaCortando');
    }
  }
}

function atualizaJogo() {
  document.getElementById('jogadorVez').innerHTML = X ? j1 : j2;
  document.getElementById('jogadorVez').style.color = X ? '#cc00b1' : '#00e7e7';
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      let celula = i.toString() + j.toString();
      document.getElementById(celula).innerHTML = jogo[i][j];
    }
  }
}

function verificarVitoria() {
  for (var i = 0; i < 3; i++) {
    if (
      jogo[i][0] != caractereInvisivel &&
      jogo[i][0] === jogo[i][1] &&
      jogo[i][0] === jogo[i][2]
    ) {
      document
        .getElementById(i.toString() + '0')
        .classList.add('linhaCortando');
      document
        .getElementById(i.toString() + '1')
        .classList.add('linhaCortando');
      document
        .getElementById(i.toString() + '2')
        .classList.add('linhaCortando');
      vitoria();
      break;
    }
    if (
      jogo[0][i] != caractereInvisivel &&
      jogo[0][i] === jogo[1][i] &&
      jogo[0][i] === jogo[2][i]
    ) {
      document
        .getElementById('0' + i.toString())
        .classList.add('linhaCortando');
      document
        .getElementById('1' + i.toString())
        .classList.add('linhaCortando');
      document
        .getElementById('2' + i.toString())
        .classList.add('linhaCortando');
      vitoria();
      break;
    }
  }
  if (
    jogo[0][0] != caractereInvisivel &&
    jogo[0][0] === jogo[1][1] &&
    jogo[0][0] === jogo[2][2]
  ) {
    document.getElementById('00').classList.add('linhaCortando');
    document.getElementById('11').classList.add('linhaCortando');
    document.getElementById('22').classList.add('linhaCortando');
    vitoria();
    return;
  }
  if (
    jogo[0][2] != caractereInvisivel &&
    jogo[0][2] === jogo[1][1] &&
    jogo[0][2] === jogo[2][0]
  ) {
    document.getElementById('02').classList.add('linhaCortando');
    document.getElementById('11').classList.add('linhaCortando');
    document.getElementById('20').classList.add('linhaCortando');
    vitoria();
    return;
  }
  if (jogadas >= 9) {
    empate();
  }
}

function empate() {
  fim = true;
  document.getElementsByClassName('ganhador')[0].style.visibility = 'visible';
  document.getElementById('jogadorGanhou').innerHTML = 'Empate!';
  //document.getElementsByClassName('ganhador')[0].style.visibility = 'hidden';
}

function vitoria() {
  fim = true;
  document.getElementById('jogadorGanhou').innerHTML = X
    ? j1 + ' Ganhou!!!'
    : j2 + ' Ganhou!!!';
  document.getElementById('jogadorGanhou').style.color = X
    ? '#cc00b1'
    : '#00e7e7';
  X ? vj1++ : vj2++;
  document.getElementsByClassName('ganhador')[0].style.visibility = 'visible';
}

function colocarMarcador(i, j) {
  if (i === undefined || j === undefined) return;
  if (jogadas >= 9) {
    empate();
    return;
  }
  if (fim === true) return;
  if (jogo[i][j] != caractereInvisivel) {
    return;
  } else {
    let caractere = X ? 'X' : 'O';
    jogo[i][j] = caractere;
    jogadas++;
    verificarVitoria();
    X = !X;
    atualizaJogo();
  }
}
