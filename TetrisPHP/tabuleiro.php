<?php
  session_start()
?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tabuleiro</title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/scriptTabuleiro.js"></script>
  </head>
  <body>
    <header>
      <section class="icones_header">
        <a class="icone" href="ranking_global.php" onclick="preencherRanking()">
          <img src="assets/trophy-01.png" />
        </a>
        <a class="icone" href="atualizar_dados.php">
          <img src="assets/user-circle.png" />
        </a>
        <a class="icone" href="index.php">
          <img src="assets/user-minus-02.png" />
        </a>
        <p class="titulo">
          <span class="roxo">T</span><span class="amarelo">E</span
          ><span class="verde">T</span><span class="rosa">R</span
          ><span class="azul">I</span><span class="vermelho">S</span>
        </p>
      </section>
    </header>

    <h1 class="titulo_tabuleiro">ESCOLHA O TABULEIRO</h1>
    <section class="tabuleiro_row">
      <div class="tabuleiro_div">
        <a onclick="setTabuleiro(20, 10)">
        <img src="assets/peca_amarela_tabuleiro.png" class="image" />
          <h2 class="tamanho">10 X 20</h2>
        </a>
      </div>
      <div class="tabuleiro_div">
        <a onclick="setTabuleiro(44, 22)">
        <img src="assets/peca_rosa_tabuleiro.png" class="image" />
          <h2 class="tamanho">22 X 44</h2>
        </a>
      </div>
    </section>
  </body>
</html>
