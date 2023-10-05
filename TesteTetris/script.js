'use strict';
let jogo = inicailizarMatriz(20, 10);
console.log(jogo);
console.log(verificarLinhaCompleta(jogo[0]));
function inicializarArray(tamanho) {
  var array = [];
  for (let i = 0; i < tamanho; i++) {
    array[i] = null;
  }
  return array;
}

function inicailizarMatriz(linha, coluna) {
  var array = [];
  for (let i = 0; i < linha; i++) {
    array.push(inicializarArray(coluna));
  }
  return array;
}

function verificarLinhaCompleta(linha) {
  let contador = 0;
  for (let i = 0; i < linha.length; i++) if (linha[i] != null) contador++;
  return contador === linha.length;
}
