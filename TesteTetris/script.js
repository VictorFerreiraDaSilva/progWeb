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

function perdeu() {
  console.log('MAMOU');
}

function atualizaJogo() {
  jogo[0].forEach((celula) => {
    if (celula != caractereInvisivel) perdeu();
  });
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

function verificarMaiorPosicaoLivre(coluna, qt = 1) {
  let l = [];
  for (let i = 0; i < qt; i++) {
    l.push(-1);
    let mais = coluna + i;
    for (let j = 0; j < ln; j++) {
      if (jogo[j][mais] === caractereInvisivel) l[i]++;
      if (jogo[j][mais] != caractereInvisivel) break;
    }
  }
  l.sort((a, b) => a - b); //ordenar numeriamente e nao alfabeticamente
  return l[0];
}

function inserirPeca1(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > 9) return;
  let pos = verificarMaiorPosicaoLivre(coluna);
  for (let i = 0; i < 4; i++) {
    jogo[pos - i][coluna] = 'X';
  }
  atualizaJogo();
}

function inserirPeca2(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > 8) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  jogo[pos1][coluna] = 'Y';
  jogo[pos1 - 1][coluna] = 'Y';
  jogo[pos1][mais] = 'Y';
  jogo[pos1 - 1][mais] = 'Y';
  atualizaJogo();
}

function inserirPeca3(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > 8) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  jogo[pos1][coluna] = 'Z';
  jogo[pos1 - 1][coluna] = 'Z';
  jogo[pos1 - 2][coluna] = 'Z';
  jogo[pos1][mais] = 'Z';
  atualizaJogo();
}

function inserirPeca4(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > 8) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  jogo[pos1][coluna] = 'A';
  jogo[pos1][mais] = 'A';
  jogo[pos1 - 1][mais] = 'A';
  jogo[pos1 - 2][mais] = 'A';
  atualizaJogo();
}

function inserirPeca5(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > 7) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 3);
  jogo[pos1][coluna] = 'B';
  jogo[pos1][mais] = 'B';
  jogo[pos1 - 1][mais] = 'B';
  jogo[pos1][++mais] = 'B';
  atualizaJogo();
}

function inserirPeca6(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > 7) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 3);
  jogo[pos1][coluna] = 'C';
  jogo[pos1 - 1][coluna] = 'C';
  jogo[pos1][mais] = 'C';
  jogo[pos1][++mais] = 'C';
  jogo[pos1 - 1][mais] = 'C';
  atualizaJogo();
}
