<?php
  session_start()
?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GAME OVER</title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/script.js"></script>
  </head>
  <body>
    <div class="gameover_janela">
      <div class="gameover">
        <p class="gameover">
          <span class="roxo">G</span><span class="amarelo">A</span
          ><span class="verde">M</span><span class="azul">E</span>
        </p>
        <p class="gameover">
          <span class="vermelho">O</span><span class="roxo">V</span
          ><span class="roxo">E</span><span class="amarelo">R</span>
        </p>
      </div>
      <a href="tabuleiro.php"><div class="botao_resume">NOVA PARTIDA</div></a>
      <a href="ranking_global.php"><div class="botao_resume">RANKING GLOBAL</div></a>
      <a href="index.php"><div class="botao_sair">SAIR DO JOGO</div></a>
    </div>
  </body>
</html>
