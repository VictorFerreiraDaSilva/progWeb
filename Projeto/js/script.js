'use strict';
//localStorage
const caractereInvisivel = '⠀';

let ln = localStorage.getItem('ln');
let cl = localStorage.getItem('cl');
let linhasEliminadas = 0;
let pontuacao = 0;
let nivel = 1;
let pecaInserida = false;
let pecaEspecial = false;
let pecaAtual;
let proximaPeca = 0;
document.getElementById('linhasEliminadas').innerHTML = linhasEliminadas;
document.getElementById('pontuacao').innerHTML = pontuacao;
document.getElementById('nivel').innerHTML = nivel;

criarTabuleiro();

function criarTabuleiro() {
  let tamanhoCelula = '0.9rem';
  document.getElementById('tabuleiroDinamico').style.gridTemplateColumns =
    'repeat(' + cl + ', 1fr)';
  let divs = '';
  for (let i = 0; i < ln; i++)
    for (let j = 0; j < cl; j++) {
      divs += '<div class="celula" id="' + i + '_' + j + '">⠀</div>';
    }
  document.getElementById('tabuleiroDinamico').innerHTML = divs;
  if (cl == 10) {
    tamanhoCelula = '1.9rem';
  }
  var celulas = document.getElementsByClassName('celula');
  for (let i = 0; i < celulas.length; i++) {
    celulas[i].style.width = tamanhoCelula;
    celulas[i].style.height = tamanhoCelula;
  }
  document.getElementById('0_0').style.borderTopLeftRadius = '12px';
  document.getElementById('0_' + (cl - 1)).style.borderTopRightRadius = '12px';
  document.getElementById(ln - 1 + '_0').style.borderBottomLeftRadius = '12px';
  document.getElementById(
    ln - 1 + '_' + (cl - 1)
  ).style.borderBottomRightRadius = '12px';
}

function armazenarDados() {
  var nomeUsuario = document.getElementById('nome').value;
  var senhaUsuario = document.getElementById('senha').value;

  // Verifica se os campos estão preenchidos
  if (nomeUsuario === '' || senhaUsuario === '') {
    alert('Por favor, preencha todos os campos.');
    return; // Evita continuar se algum campo estiver em branco
  }

  // Armazena os valores no localStorage
  localStorage.setItem('nomeUsuario', nomeUsuario);
  localStorage.setItem('senhaUsuario', senhaUsuario);

  // Redireciona para a página "tabuleiro.html"
  window.location.href = 'tabuleiro.html';
}

document.addEventListener('DOMContentLoaded', function () {
  var nomeUsuario = localStorage.getItem('nomeUsuario');
  //var senhaUsuario = localStorage.getItem("senhaUsuario");

  // Exibe os valores onde desejado na página
  document.getElementById('nomeUsuario').innerText = nomeUsuario + ' JOGANDO';
  //document.getElementById("senhaUsuario").innerText = "Senha: " + senhaUsuario;
});

function validaRegistro() {
  var nome = document.getElementById('input_nome').value;
  var cpf = document.getElementById('input_cpf').value;
  var telefone = document.getElementById('input_telefone').value;

  // Verifica se os campos estão preenchidos
  if (nome === '' || cpf === '' || telefone === '') {
    alert('Por favor, preencha todos os campos.');
    return; // Evita continuar se algum campo estiver em branco
  }
  let validado = validarEmail();
  if (validado) window.location.href = 'index.html';
}

function validarEmail() {
  var emailInput = document.getElementById('input_email');
  var email = emailInput.value;

  // Expressão regular para validar o formato do e-mail
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert('Por favor, insira um endereço de e-mail válido.');
    return false;
  }
  return true;
}

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
    let errosDireita = 0;
    let errosEsquerda = 0;
    let errosCima = 0;
    let errosBaixo = 0;
    let erros = 0;
    do {
      errosDireita = 0;
      errosEsquerda = 0;
      errosCima = 0;
      errosBaixo = 0;
      erros = 0;
      let linhaCentral = this.pontoCentral.getLinha();
      let colunaCentral = this.pontoCentral.getColuna();
      if (linhaCentral - this.direcoes.getCima() < 0) errosCima++;
      if (linhaCentral + this.direcoes.getBaixo() > ln - 1) errosBaixo++;
      if (colunaCentral - this.direcoes.getEsquerda() < 0) errosEsquerda++;
      if (colunaCentral + this.direcoes.getDireita() > cl - 1) errosDireita++;
      if (linhaCentral - this.direcoes.getES() < 0) errosCima++;
      if (colunaCentral - this.direcoes.getES() < 0) errosEsquerda++;
      if (linhaCentral - this.direcoes.getDS() < 0) errosCima++;
      if (colunaCentral + this.direcoes.getDS() > cl - 1) errosDireita++;
      if (linhaCentral + this.direcoes.getEI() > ln - 1) errosBaixo++;
      if (colunaCentral - this.direcoes.getEI() < 0) errosEsquerda++;
      if (linhaCentral + this.direcoes.getDI() > ln - 1) errosBaixo++;
      if (colunaCentral + this.direcoes.getDI() > cl - 1) errosDireita++;

      if (errosDireita > 0) {
        this.pontoCentral.coluna -= errosDireita;
        erros++;
      }
      if (errosEsquerda > 0) {
        this.pontoCentral.coluna += errosEsquerda;
        erros++;
      }
      if (errosCima > 0) {
        this.pontoCentral.linha += errosCima;
        erros++;
      }
      if (errosBaixo > 0) {
        this.pontoCentral.linha -= errosBaixo;
        erros++;
      }
    } while (erros != 0);

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
    aux = this.direcoes.pecasDiagonalDS;
    this.direcoes.pecasDiagonalDS = this.direcoes.pecasDiagonalES;
    this.direcoes.pecasDiagonalES = this.direcoes.pecasDiagonalEI;
    this.direcoes.pecasDiagonalEI = this.direcoes.pecasDiagonalDI;
    this.direcoes.pecasDiagonalDI = aux;
  }
}

function peca1() {
  let p = new Coordenada(0, 5);
  let dir = new Direcoes(0, 0, 0, 3, 0, 0, 0, 0);
  let pec = new Peca(p, 'roxoQ', dir);
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}
function peca2() {
  let p = new Coordenada(0, 5);
  let dir = new Direcoes(0, 1, 0, 1, 0, 0, 0, 1);
  let pec = new Peca(p, 'amareloQ', dir);
  pec.adicionarCoordenada();
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

function peca3() {
  let p = new Coordenada(2, 5);
  let dir = new Direcoes(0, 1, 2, 0, 0, 0, 0, 0);
  let pec = new Peca(p, 'rosaQ', dir);
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

function peca4() {
  let p = new Coordenada(2, 5);
  let dir = new Direcoes(1, 0, 2, 0, 0, 0, 0, 0);
  let pec = new Peca(p, 'laranjaQ', dir);
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

function peca5() {
  let p = new Coordenada(1, 5);
  let dir = new Direcoes(1, 1, 1, 0);
  let pec = new Peca(p, 'verdeQ', dir);
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

function peca6() {
  let p = new Coordenada(1, 5);
  let dir = new Direcoes(1, 1, 0, 0, 1, 0, 1, 0);
  let pec = new Peca(p, 'vermelhoQ', dir);
  pecaAtual = pec;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

function pecaE() {
  let p = new Coordenada(0, 5);
  let dir = new Direcoes(0, 0, 0, 0, 0, 0, 0, 0);
  let pec = new Peca(p, 'cianoQ', dir);
  pecaAtual = pec;
  pecaEspecial = true;
  pecaAtual.construirPeca(jogo);
  atualizaJogo();
}

//RIAN
let velocidade = 7000;
let dropStart = Date.now();

let jogo = inicailizarMatriz(ln, cl);

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
  document.getElementById('linhasEliminadas').innerHTML = linhasEliminadas;
  document.getElementById('pontuacao').innerHTML = pontuacao;
  document.getElementById('nivel').innerHTML = nivel;
}

const partialReverse = (arr = [], num = 0) => {
  const partialArr = arr.slice(0, num);
  partialArr.reverse();
  arr.splice(0, num, ...partialArr);
};

function espelhar() {
  jogo.forEach((linha) => {
    //linha.reverse();
    partialReverse(linha, cl);
  });
  atualizaJogo();
}

function perdeu() {
  window.location.href = 'gameover.html';
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
  if (pecaInserida) {
    return;
  }
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
      return 0;
    } else {
      pecaInserida = true;
      if (pecaEspecial) espelhar();
      return 1;
    }
  } catch (error) {
    pecaInserida = true;
    if (pecaEspecial) espelhar();
    return 1;
  }
}

// RIAN
function controles(event) {
  const movimentos = {
    ArrowLeft() {
      tacarParaEsquerda();
    },

    ArrowRight() {
      tacarParaDireita();
    },

    ArrowUp() {
      roda();
    },

    ArrowDown() {
      tacarParaBaixo();
    },
  };

  const movimentar = movimentos[event.code];
  movimentar();
}

function exibirProximaPeca() {
  let src = '';
  switch (proximaPeca) {
    case 1:
      src = 'peca_roxa.png';
      break;
    case 2:
      src = 'peca_amarela.png';
      break;
    case 3:
      src = 'peca_rosa.png';
      break;
    case 4:
      src = 'peca_laranja.png';
      break;
    case 5:
      src = 'peca_verde.png';
      break;
    case 6:
      src = 'peca_vermelha.png';
      break;
    case 7:
      src = 'especial.png';
      break;
  }
  document.getElementById('proximaPeca').src = '/Projeto/assets/' + src;
  document.getElementById('proximaPeca').style.height = '250px';
}

const timer = (seconds) => {
  let time = seconds * 1100 - nivel * 100;
  if (time <= 0) time = 10;
  return new Promise((res) => setTimeout(res, time));
};

async function queda() {
  while (pecaInserida === false) {
    await timer(1);
    tacarParaBaixo();
    atualizaJogo();
  }
  pecaInserida = false;
}

async function iniciarJogo() {
  linhasEliminadas = 0;
  pontuacao = 0;
  nivel = 1;
  pecaInserida = false;
  pecaEspecial = false;
  proximaPeca = Math.floor(Math.random() * 7) + 1;
  do {
    let numero = proximaPeca;
    proximaPeca = Math.floor(Math.random() * 7) + 1;
    exibirProximaPeca();
    switch (numero) {
      case 1:
        peca1();
        break;
      case 2:
        peca2();
        break;
      case 3:
        peca3();
        break;
      case 4:
        peca4();
        break;
      case 5:
        peca5();
        break;
      case 6:
        peca6();
        break;
      case 7:
        pecaE();
        break;
    }
    await queda();
    pecaInserida = false;
    pecaEspecial = false;
    limparLinhasEGerarPontuacao();
  } while (verificarDerrota() === false);
  window.location.href = 'gameover.html';
}

document.addEventListener('keydown', controles);

// window.addEventListener('load', iniciarJogo);

const botaoIniciar = document.getElementById('botao_iniciar');
botaoIniciar.addEventListener('click', function () {
  iniciarJogo();
  botaoIniciar.style.display = 'none';
});

function sumirBotao() {
  const botao = document.getElementById('botao_iniciar');
  botao.remove();
}

const disappearButton = document.getElementById('botao_iniciar');
disappearButton.addEventListener('click', sumirBotao);

window.addEventListener('keydown', function (e) {
  //(esquerda, direita, cima, baixo)
  if ([37, 38, 39, 40].includes(e.keyCode)) {
    e.preventDefault();
  }
});

let tempoDecorrido = 0;
let cronometroEmExecucao = false;
let intervalID;

let tempoElement = document.getElementById('tempo');
let iniciarButton = document.getElementById('botao_iniciar');

function atualizarCronometro() {
  tempoDecorrido++;
  const segundos = tempoDecorrido % 60;
  const minutos = Math.floor((tempoDecorrido / 60) % 60);

  const formatoTempo = `${minutos.toString().padStart(2, '0')}:${segundos
    .toString()
    .padStart(2, '0')}`;
  tempoElement.textContent = formatoTempo;
}

iniciarButton.addEventListener('click', () => {
  if (!cronometroEmExecucao) {
    intervalID = setInterval(atualizarCronometro, 1000);
    cronometroEmExecucao = true;
  }
});
