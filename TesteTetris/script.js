'use strict';
const caractereInvisivel = '⠀';

let ln = 20;
let cl = 10;

let jogo = inicailizarMatriz(ln, cl);
console.log(jogo);

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
      document.getElementById(celula).innerHTML = jogo[i][j].charAt(0);
      document.getElementById(celula).className = '';
      document.getElementById(celula).classList.add('celula');
      document.getElementById(celula).classList.add(jogo[i][j]);
    }
  }
}

function limparLinhasEGerarPontuacao() {
  let contadorLinhas = 0;
  while (verificarLinhaCompleta(jogo[19])) {
    jogo.pop();
    jogo.unshift(inicializarArray(cl, 1));
    contadorLinhas++;
  }
  atualizaJogo();
  let pontuacao = 0;
  for (let i = 0; i < contadorLinhas; i++) pontuacao += 10;
  pontuacao *= contadorLinhas;
  return pontuacao;
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
  if (coluna < 0 || coluna > cl - 1) return;
  let pos = verificarMaiorPosicaoLivre(coluna);
  for (let i = 0; i < 4; i++) {
    jogo[pos - i][coluna] = 'laranja';
  }
  atualizaJogo();
}

function inserirPeca2(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 2) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  jogo[pos1][coluna] = 'vermelho';
  jogo[pos1 - 1][coluna] = 'vermelho';
  jogo[pos1][mais] = 'vermelho';
  jogo[pos1 - 1][mais] = 'vermelho';
  atualizaJogo();
}

function inserirPeca3(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 2) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  jogo[pos1][coluna] = 'rosa';
  jogo[pos1 - 1][coluna] = 'rosa';
  jogo[pos1 - 2][coluna] = 'rosa';
  jogo[pos1][mais] = 'rosa';
  atualizaJogo();
}

function inserirPeca4(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 2) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  jogo[pos1][coluna] = 'roxo';
  jogo[pos1][mais] = 'roxo';
  jogo[pos1 - 1][mais] = 'roxo';
  jogo[pos1 - 2][mais] = 'roxo';
  atualizaJogo();
}

function inserirPeca5(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 3) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 3);
  jogo[pos1][coluna] = 'amarelo';
  jogo[pos1][mais] = 'amarelo';
  jogo[pos1 - 1][mais] = 'amarelo';
  jogo[pos1][++mais] = 'amarelo';
  atualizaJogo();
}

function inserirPeca6(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 3) return;
  let mais = coluna + 1;
  let pos1 = verificarMaiorPosicaoLivre(coluna, 3);
  jogo[pos1][coluna] = 'verde';
  jogo[pos1 - 1][coluna] = 'verde';
  jogo[pos1][mais] = 'verde';
  jogo[pos1][++mais] = 'verde';
  jogo[pos1 - 1][mais] = 'verde';
  atualizaJogo();
}

function espelhar() {
  jogo.forEach((linha) => {
    linha.reverse();
  });
  atualizaJogo();
}

function inserirPecaEspecial(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 1) return;
  let pos = verificarMaiorPosicaoLivre(coluna);
  jogo[pos][coluna] = 'ciano';
  espelhar();
}
