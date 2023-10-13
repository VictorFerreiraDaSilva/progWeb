'use strict';
const caractereInvisivel = '⠀';

let ln = 20;
let cl = 10;
let linhasEliminadas = 0;
let pontuacao = 0;
let nivel = 1;
let pecaInserida = false;

let jogo = inicailizarMatriz(ln, cl);
console.log(jogo);

function inicializarArray(tamanho, vazio) {
  var array = [];
  for (let i = 0; i < tamanho; i++) {
    array[i] = vazio === 1 ? caractereInvisivel : 'vermelho';
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

function verificarDerrota() {
  for (let i = 0; i < jogo[0].length; i++) {
    if (jogo[0][i] != caractereInvisivel) {
      return true;
    }
  }
  return false;
}

function atualizaJogo() {
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
  let p = 0;
  for (let i = 0; i < contadorLinhas; i++) p += 10;
  p *= contadorLinhas;
  pontuacao += p;
  linhasEliminadas += contadorLinhas;
  nivel = Math.floor(pontuacao / 300 + 1);
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

function tacarParaDireita(linha, coluna, qtColunas, qtLinhas) {
  let contadorErros = 0;
  for (let i = 0; i < qtLinhas; i++) {
    if (jogo[linha + i][coluna + qtColunas] != caractereInvisivel)
      contadorErros++;
  }

  if (contadorErros === 0) {
    for (let j = 0; j < qtLinhas; j++)
      for (let i = qtColunas; i > 0; i--) {
        let aux = jogo[linha + j][coluna + i];
        jogo[linha + j][coluna + i] = jogo[linha + j][coluna + i - 1];
        jogo[linha + j][coluna + i - 1] = aux;
      }
  }

  atualizaJogo();
}

function tacarParaEsquerda(linha, coluna, qtColunas, qtLinhas) {
  let contadorErros = 0;
  for (let i = 0; i < qtLinhas; i++) {
    if (jogo[linha - i][coluna - qtColunas + 1] != caractereInvisivel)
      contadorErros++;
  }

  if (contadorErros === 0) {
    for (let j = 0; j < qtLinhas; j++)
      for (let i = qtColunas; i > 0; i--) {
        let aux = jogo[linha - j][coluna - i + 1];
        jogo[linha - j][coluna - i + 1] = jogo[linha - j][coluna - i + 2];
        jogo[linha - j][coluna - i + 2] = aux;
      }
  }
  atualizaJogo();
}

function tacarParaBaixo(
  linha,
  coluna,
  qtColunas,
  qtLinhas,
  pecaEspecial = false
) {
  let contadorErros = 0;
  for (let i = 0; i < qtColunas; i++) {
    if (jogo[linha + i + qtLinhas][coluna] != caractereInvisivel)
      contadorErros++;
  }
  if (contadorErros === 0) {
    for (let j = 0; j < qtColunas; j++)
      for (let i = qtLinhas - 1; i >= 0; i--) {
        let aux = jogo[linha + i][coluna + j];
        jogo[linha + i][coluna + j] = jogo[linha + i + 1][coluna + j];
        jogo[linha + i + 1][coluna + j] = aux;
      }
  } else {
    pecaInserida = true;
    if (pecaEspecial) espelhar();
  }
  atualizaJogo();
}

function inserirPeca1(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 1) return;
  //let pos = verificarMaiorPosicaoLivre(coluna);
  let pos = 3; //altura da peça - 1
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
  //let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  let pos = 1; //altura da peça - 1
  jogo[pos][coluna] = 'vermelho';
  jogo[pos - 1][coluna] = 'vermelho';
  jogo[pos][mais] = 'vermelho';
  jogo[pos - 1][mais] = 'vermelho';
  atualizaJogo();
}

function inserirPeca3(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 2) return;
  let mais = coluna + 1;
  //let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  let pos = 2; //altura da peça - 1
  jogo[pos][coluna] = 'rosa';
  jogo[pos - 1][coluna] = 'rosa';
  jogo[pos - 2][coluna] = 'rosa';
  jogo[pos][mais] = 'rosa';
  atualizaJogo();
}

function inserirPeca4(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 2) return;
  let mais = coluna + 1;
  //let pos1 = verificarMaiorPosicaoLivre(coluna, 2);
  let pos = 2; //altura da peça - 1
  jogo[pos][coluna] = 'roxo';
  jogo[pos][mais] = 'roxo';
  jogo[pos - 1][mais] = 'roxo';
  jogo[pos - 2][mais] = 'roxo';
  atualizaJogo();
}

function inserirPeca5(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 3) return;
  let mais = coluna + 1;
  //let pos1 = verificarMaiorPosicaoLivre(coluna, 3);
  let pos = 1; //altura da peça - 1
  jogo[pos][coluna] = 'amarelo';
  jogo[pos][mais] = 'amarelo';
  jogo[pos - 1][mais] = 'amarelo';
  jogo[pos][++mais] = 'amarelo';
  atualizaJogo();
}

function inserirPeca6(coluna) {
  if (coluna === undefined) return;
  if (coluna === null) return;
  if (coluna < 0 || coluna > cl - 3) return;
  let mais = coluna + 1;
  //let pos1 = verificarMaiorPosicaoLivre(coluna, 3);
  let pos = 1; //altura da peça - 1
  jogo[pos][coluna] = 'verde';
  jogo[pos - 1][coluna] = 'verde';
  jogo[pos][mais] = 'verde';
  jogo[pos][++mais] = 'verde';
  jogo[pos - 1][mais] = 'verde';
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
  //let pos = verificarMaiorPosicaoLivre(coluna);
  let pos = 0; //altura da peça - 1
  jogo[pos][coluna] = 'ciano';
  //espelhar();
  atualizaJogo();
}

function inserirPeca() {
  let peca = Math.floor(Math.random() * 8);
  if (verificarDerrota()) perdeu();

  switch (peca) {
    case 1:
      inserirPeca1();
      break;
    case 2:
      inserirPeca2();
      break;
    case 3:
      inserirPeca3();
      break;
    case 4:
      inserirPeca4();
      break;
    case 5:
      inserirPeca5();
      break;
    case 6:
      inserirPeca6();
      break;
    case 7:
      inserirPecaEspecial();
      break;
  }
}

function perdeu() {
  console.log('MAMOU');
}

function iniciarJogo() {
  linhasEliminadas = 0;
  pontuacao = 0;
  nivel = 1;
  pecaInserida = false;
  while (verificarDerrota() === false) {
    inserirPeca();
    while (pecaInserida === false) {
      //controlar coisas
      pecaInserida = true;
    }
    limparLinhasEGerarPontuacao();

    break;
  }
  perdeu();
}
