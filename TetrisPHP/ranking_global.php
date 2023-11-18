<?php
  session_start()
?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/script.js"></script>
    <title>TETRIS</title>
  </head>
  <body class="jogobody">
    <header>
      <div class="icones_header">
        <a class="icone" href="resume.php">
          <img src="assets/menu.png" alt="Imagem do menu" />
        </a>
        <a class="icone" href="ranking_global.php">
          <img src="assets/trophy-01.png" alt="Imagem do ranking" />
        </a>
        <a class="icone" href="atualizar_dados.php">
          <img src="assets/user-circle.png" alt="Imagem do perfil" />
        </a>
        <a class="icone" href="index.php">
          <img src="assets/user-minus-02.png" alt="Imagem saída" />
        </a>
        <p class="titulo">
          <span class="vermelho">R</span>
          <span class="rosa">A</span>
          <span class="azul">N</span>
          <span class="roxo">K</span>
          <span class="verde">I</span>
          <span class="rosa">N</span>
          <span class="amarelo">G</span>
          <span>⠀</span>
          <span class="roxo">G</span>
          <span class="amarelo">L</span>
          <span class="verde">O</span>
          <span class="rosa">B</span>
          <span class="azul">A</span>
          <span class="vermelho">L</span>
        </p>
      </div>
    </header>
    <div class="ranking_global">
      <div class="rank">
        <div class="rank_column amarelo">
          <p class="branco">RANK</p>
          <div class="espacamento8px"></div>
          <p class="rosa">1º</p>
          <p class="verde">2º</p>
          <p class="azul">3º</p>
          <p>4º</p>
          <p>5º</p>
          <p>6º</p>
          <p>7º</p>
          <p>8º</p>
          <p>9º</p>
          <p>10º</p>
          <p>11º</p>
          <p>12º</p>
          <p>13º</p>
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">USUARIO</p>
          <div class="espacamento8px"></div>
          <p class="espacamento10px rosa" id="rankinguser1">-</p>
          <p class="espacamento10px verde" id="rankinguser2">-</p>
          <p class="espacamento10px azul" id="rankinguser3">-</p>
          <p class="espacamento10px" id="rankinguser4">-</p>
          <p class="espacamento10px" id="rankinguser5">-</p>
          <p class="espacamento10px" id="rankinguser6">-</p>
          <p class="espacamento10px" id="rankinguser7">-</p>
          <p class="espacamento10px" id="rankinguser8">-</p>
          <p class="espacamento10px" id="rankinguser9">-</p>
          <p class="espacamento10px" id="rankinguser10">-</p>
          <p class="espacamento10px" id="rankinguser11">-</p>
          <p class="espacamento10px" id="rankinguser12">-</p>
          <p class="espacamento10px" id="rankinguser13">-</p>
          <p class="espacamento10px" id="rankinguser14">-</p>
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">DATA</p>
          <div class="espacamento8px"></div>
          <p class="espacamento10px rosa" id="rankingdata1">-</p>
          <p class="espacamento10px verde" id="rankingdata2">-</p>
          <p class="espacamento10px azul" id="rankingdata3">-</p>
          <p class="espacamento10px" id="rankingdata4">-</p>
          <p class="espacamento10px" id="rankingdata5">-</p>
          <p class="espacamento10px" id="rankingdata6">-</p>
          <p class="espacamento10px" id="rankingdata7">-</p>
          <p class="espacamento10px" id="rankingdata8">-</p>
          <p class="espacamento10px" id="rankingdata9">-</p>
          <p class="espacamento10px" id="rankingdata10">-</p>
          <p class="espacamento10px" id="rankingdata11">-</p>
          <p class="espacamento10px" id="rankingdata12">-</p>
          <p class="espacamento10px" id="rankingdata13">-</p>
          <p class="espacamento10px" id="rankingdata14">-</p>
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">PONTOS</p>
          <div class="espacamento8px"></div>
          <p class="espacamento10px rosa" id="rankingpontos1">-</p>
          <p class="espacamento10px verde" id="rankingpontos2">-</p>
          <p class="espacamento10px azul" id="rankingpontos3">-</p>
          <p class="espacamento10px" id="rankingpontos4">-</p>
          <p class="espacamento10px" id="rankingpontos5">-</p>
          <p class="espacamento10px" id="rankingpontos6">-</p>
          <p class="espacamento10px" id="rankingpontos7">-</p>
          <p class="espacamento10px" id="rankingpontos8">-</p>
          <p class="espacamento10px" id="rankingpontos9">-</p>
          <p class="espacamento10px" id="rankingpontos10">-</p>
          <p class="espacamento10px" id="rankingpontos11">-</p>
          <p class="espacamento10px" id="rankingpontos12">-</p>
          <p class="espacamento10px" id="rankingpontos13">-</p>
          <p class="espacamento10px" id="rankingpontos14">-</p>
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">NÍVEL</p>
          <div class="espacamento8px"></div>
          <p class="espacamento10px rosa" id="rankingnivel1">-</p>
          <p class="espacamento10px verde" id="rankingnivel2">-</p>
          <p class="espacamento10px azul" id="rankingnivel3">-</p>
          <p class="espacamento10px" id="rankingnivel4">-</p>
          <p class="espacamento10px" id="rankingnivel5">-</p>
          <p class="espacamento10px" id="rankingnivel6">-</p>
          <p class="espacamento10px" id="rankingnivel7">-</p>
          <p class="espacamento10px" id="rankingnivel8">-</p>
          <p class="espacamento10px" id="rankingnivel9">-</p>
          <p class="espacamento10px" id="rankingnivel10">-</p>
          <p class="espacamento10px" id="rankingnivel11">-</p>
          <p class="espacamento10px" id="rankingnivel12">-</p>
          <p class="espacamento10px" id="rankingnivel13">-</p>
          <p class="espacamento10px" id="rankingnivel14">-</p>
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">TEMPO</p>
          <div class="espacamento8px"></div>
          <p class="espacamento10px rosa" id="rankingtempo1">-</p>
          <p class="espacamento10px verde" id="rankingtempo2">-</p>
          <p class="espacamento10px azul" id="rankingtempo3">-</p>
          <p class="espacamento10px" id="rankingtempo4">-</p>
          <p class="espacamento10px" id="rankingtempo5">-</p>
          <p class="espacamento10px" id="rankingtempo6">-</p>
          <p class="espacamento10px" id="rankingtempo7">-</p>
          <p class="espacamento10px" id="rankingtempo8">-</p>
          <p class="espacamento10px" id="rankingtempo9">-</p>
          <p class="espacamento10px" id="rankingtempo10">-</p>
          <p class="espacamento10px" id="rankingtempo11">-</p>
          <p class="espacamento10px" id="rankingtempo12">-</p>
          <p class="espacamento10px" id="rankingtempo13">-</p>
          <p class="espacamento10px" id="rankingtempo14">-</p>
        </div>
      </div>
    </div>
    <footer><div id="nomeUsuario">⠀</div></footer>
    <script>
      // Função a ser executada quando a página for carregada
      document.addEventListener("DOMContentLoaded", function () {
        preencherRanking();
      });
    </script>
  </body>
</html>
