'use strict';

class Coordenada {
  constructor(linha, coluna) {
    this.linha = linha;
    this.coluna = coluna;
  }
  getLinha() {
    return this.linha;
  }
  getColuna() {
    return this.coluna;
  }
}

class Direcoes {
  constructor(
    pecasEsquerda,
    pecasDireita,
    pecasCima,
    pecasBaixo,
    pecasDiagonalES,
    pecasDiagonalEI,
    pecasDiagonalDS,
    pecasDiagonalDI
  ) {
    this.pecasEsquerda = pecasEsquerda;
    this.pecasDireita = pecasDireita;
    this.pecasCima = pecasCima;
    this.pecasBaixo = pecasBaixo;
    this.pecasDiagonalES = pecasDiagonalES;
    this.pecasDiagonalEI = pecasDiagonalEI;
    this.pecasDiagonalDS = pecasDiagonalDS;
    this.pecasDiagonalDI = pecasDiagonalDI;
  }
  getEsquerda() {
    return this.pecasEsquerda;
  }
  getDireita() {
    return this.pecasDireita;
  }
  getCima() {
    return this.pecasCima;
  }
  getBaixo() {
    return this.pecasBaixo;
  }
  getES() {
    return this.pecasDiagonalES;
  }
  getEI() {
    return this.pecasDiagonalEI;
  }
  getDS() {
    return this.pecasDiagonalDS;
  }
  getDI() {
    return this.pecasDiagonalDI;
  }
}

class Peca {
  constructor(pontoCentral, cor, direcoes) {
    this.pontoCentral = pontoCentral;
    this.cor = cor;
    this.direcoes = direcoes;
    this.coordenadas = [];
  }
  pontoCentral() {
    return this.pontoCentral;
  }
  adicionarCoordenada(c) {
    this.coordenadas.push(c);
  }
  apagarPeca(grid) {
    this.coordenadas.forEach((coo) => {
      if (coo != undefined && coo != null)
        grid[coo.getLinha()][coo.getColuna()] = '⠀';
    });
    this.coordenadas = [];
  }
  construirPeca(grid) {
    this.coordenadas.push(
      new Coordenada(
        this.pontoCentral.getLinha(),
        this.pontoCentral.getColuna()
      )
    );
    for (let i = 1; i < this.direcoes.getDireita() + 1; i++) {
      this.coordenadas.push(
        new Coordenada(
          this.pontoCentral.getLinha(),
          this.pontoCentral.getColuna() + i
        )
      );
    }
    for (let i = 1; i < this.direcoes.getBaixo() + 1; i++) {
      this.coordenadas.push(
        new Coordenada(
          this.pontoCentral.getLinha() + i,
          this.pontoCentral.getColuna()
        )
      );
    }
    for (let i = 1; i < this.direcoes.getEsquerda() + 1; i++) {
      this.coordenadas.push(
        new Coordenada(
          this.pontoCentral.getLinha(),
          this.pontoCentral.getColuna() - i
        )
      );
    }
    for (let i = 1; i < this.direcoes.getCima() + 1; i++) {
      this.coordenadas.push(
        new Coordenada(
          this.pontoCentral.getLinha() - i,
          this.pontoCentral.getColuna()
        )
      );
    }
    for (let i = 1; i < this.direcoes.getES() + 1; i++) {
      this.coordenadas.push(
        new Coordenada(
          this.pontoCentral.getLinha() - i,
          this.pontoCentral.getColuna() - i
        )
      );
    }
    for (let i = 1; i < this.direcoes.getEI() + 1; i++) {
      this.coordenadas.push(
        new Coordenada(
          this.pontoCentral.getLinha() + i,
          this.pontoCentral.getColuna() - i
        )
      );
    }
    for (let i = 1; i < this.direcoes.getDS() + 1; i++) {
      this.coordenadas.push(
        new Coordenada(
          this.pontoCentral.getLinha() - i,
          this.pontoCentral.getColuna() + i
        )
      );
    }
    for (let i = 1; i < this.direcoes.getDI() + 1; i++) {
      this.coordenadas.push(
        new Coordenada(
          this.pontoCentral.getLinha() + i,
          this.pontoCentral.getColuna() + i
        )
      );
    }
    this.coordenadas.forEach((c) => {
      if (c != undefined && c != null)
        grid[c.getLinha()][c.getColuna()] = this.cor;
    });
  }
  rotacionar() {
    let aux = this.direcoes.pecasDireita;
    this.direcoes.pecasDireita = this.direcoes.getCima();
    this.direcoes.pecasCima = this.direcoes.getEsquerda();
    this.direcoes.pecasEsquerda = this.direcoes.getBaixo();
    this.direcoes.pecasBaixo = aux;
  }
}

function peca1() {
  let p = new Coordenada(0, 5);
  let dir = new Direcoes(0, 0, 0, 3, 0, 0, 0, 0);
  let pec = new Peca(p, 'roxo', dir);
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}
function peca2() {
  let p = new Coordenada(0, 5);
  let dir = new Direcoes(0, 1, 0, 1, 0, 0, 0, 1);
  let pec = new Peca(p, 'amarelo', dir);
  pec.adicionarCoordenada();
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

const caractereInvisivel = '⠀';

let ln = 20;
let cl = 10;
let linhasEliminadas = 0;
let pontuacao = 0;
let nivel = 1;
let pecaInserida = false;
let pecaEspecial = false;
let pecaAtual;

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
  for (let i = 0; i < ln; i++) {
    if (verificarLinhaCompleta(jogo[i])) {
      contadorLinhas++;
      jogo.splice(i, 1);
      jogo.unshift(inicializarArray(cl, 1));
    }
  }
  atualizaJogo();
  let p = 0;
  for (let i = 0; i < contadorLinhas; i++) p += 10;
  p *= contadorLinhas;
  pontuacao += p;
  linhasEliminadas += contadorLinhas;
  nivel = Math.floor(pontuacao / 300 + 1);
}

function espelhar() {
  jogo.forEach((linha) => {
    linha.reverse();
  });
  atualizaJogo();
}

function perdeu() {
  console.log('MAMOU');
}

function peca() {
  let p = new Coordenada(5, 5);
  let dir = new Direcoes(1, 1, 1, 0);
  let pec = new Peca(p, 'verde', dir);
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

function roda() {
  pecaAtual.apagarPeca(jogo);
  pecaAtual.rotacionar();
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

function tacarParaDireita() {
  if (
    jogo[pecaAtual.pontoCentral.getLinha()][
      pecaAtual.pontoCentral.getColuna() + pecaAtual.direcoes.getDireita() + 1
    ] === caractereInvisivel
  ) {
    pecaAtual.pontoCentral.coluna++;
    pecaAtual.apagarPeca(jogo);
    pecaAtual.construirPeca(jogo);
    atualizaJogo();
  }
}

function tacarParaEsquerda() {
  if (
    jogo[pecaAtual.pontoCentral.getLinha()][
      pecaAtual.pontoCentral.getColuna() - pecaAtual.direcoes.getEsquerda() - 1
    ] === caractereInvisivel
  ) {
    pecaAtual.pontoCentral.coluna--;
    pecaAtual.apagarPeca(jogo);
    pecaAtual.construirPeca(jogo);
    atualizaJogo();
  }
}

function tacarParaCima() {
  if (
    jogo[pecaAtual.pontoCentral.getLinha() - pecaAtual.direcoes.getCima() - 1][
      pecaAtual.pontoCentral.getColuna()
    ] === caractereInvisivel
  ) {
    pecaAtual.pontoCentral.linha--;
    pecaAtual.apagarPeca(jogo);
    pecaAtual.construirPeca(jogo);
    atualizaJogo();
  }
}

function incluiCoordenada(cords, linha, coluna) {
  let tem = false;
  cords.forEach((co) => {
    if (co != undefined && co != null)
      if (co.getLinha() === linha && co.getColuna() === coluna) {
        tem = true;
      }
  });
  return tem;
}

function tacarParaBaixo() {
  try {
    let contadorErros = 0;
    let coordenadasDaBase = [];
    let linhaBaixoPeca = 0;
    pecaAtual.coordenadas.forEach((c) => {
      if (c != undefined && c != null)
        if (
          !incluiCoordenada(
            pecaAtual.coordenadas,
            c.getLinha() + 1,
            c.getColuna()
          )
        ) {
          if (jogo[c.getLinha() + 1][c.getColuna()] != caractereInvisivel) {
            contadorErros++;
          }
        }
    });
    if (contadorErros === 0) {
      pecaAtual.pontoCentral.linha++;
      pecaAtual.apagarPeca(jogo);
      pecaAtual.construirPeca(jogo);
      atualizaJogo();
    } else {
      pecaInserida = true;
    }
  } catch (error) {
    console.log(error);
    pecaInserida = true;
  }
}
