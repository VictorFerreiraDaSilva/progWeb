'use strict';
const caractereInvisivel = '⠀';

let ln = 20;
let cl = 10;

let jogo = inicailizarMatriz(ln, cl);
console.log(jogo);
console.log(verificarLinhaCompleta(jogo[0]));

function inicializarArray(tamanho, vazio) {
  var array = [];
  for (let i = 0; i < tamanho; i++) {
    array[i] = vazio === 1 ? caractereInvisivel : i;
  }
  return array;
}

function inicailizarMatriz(linha, coluna) {
  var array = [];
  for (let i = 0; i < linha; i++) {
    array.push(inicializarArray(coluna, 1));
  }
  return array;
}

function verificarLinhaCompleta(linha) {
  let contador = 0;
  for (let i = 0; i < linha.length; i++) {
    if (linha[i] != caractereInvisivel) contador++;
  }
  return contador === linha.length;
}

function completaLinha(linha) {
  var array = inicializarArray(cl, 0);
  jogo[linha] = array;
  atualizaJogo();
}

function atualizaJogo() {
  for (var i = 0; i < ln; i++) {
    for (var j = 0; j < cl; j++) {
      let celula = i.toString() + '_' + j.toString();
      document.getElementById(celula).innerHTML = jogo[i][j];
    }
  }
}

function limparLinhas() {
  while (verificarLinhaCompleta(jogo[19])) {
    jogo.pop();
    jogo.unshift(inicializarArray(cl, 1));
  }

  atualizaJogo();
}

function verificarMaiorPosicaoLivre(coluna) {
  let l = -1;
  jogo.forEach((linha) => {
    if (linha[coluna] === caractereInvisivel) l++;
  });
  return l;
}

function inserirPeca1(coluna) {
  let pos = verificarMaiorPosicaoLivre(coluna);
  for (let i = 0; i < 4; i++) {
    jogo[pos - i][coluna] = 'X';
  }
  atualizaJogo();
}
