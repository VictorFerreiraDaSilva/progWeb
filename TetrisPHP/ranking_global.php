<?php
  session_start()
?>

<?php
  include 'System/db.php';

  $dbi = new DataBaseInfo();
  
  $servername = $dbi->getServerName(); 
  $username = $dbi->getUsername();
  $password = $dbi->getPassword();
  $db = $dbi->getDB();

  $jogos = array();

  $conn = new mysqli($servername, $username, $password, $db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT username, dt, pontuacao, nivel, tempo FROM jogo ORDER BY pontuacao DESC";
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          //echo $row["pontuacao"] . "|" . $row["nivel"] . "|" . $row["linhas_apagadas"] . "|" . $row["tempo"] . "|" . $row["username"];
          $jogos[] = ['username' => $row["username"], 'data' => $row["dt"], 'pontuacao' => $row["pontuacao"], 'nivel' => $row["nivel"], 'tempo' => $row["tempo"]];
      }
      //echo json_encode($jogos);
  }
  $conn->close();
  $_SESSION["jogos"] = $jogos;
?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/scriptBlur.js"></script>
    <title>TETRIS</title>
  </head>
  <body class="jogobody">
  <div class="resume_janela" id="resume">
      <div class="resume_titulo">
        <p class="resume_titulo">
          <span class="azul">M</span><span class="verde">E</span
          ><span class="vermelho">N</span><span class="roxo">U</span>
        </p>
      </div>
      <a href="tabuleiro.php"><div class="botao_resume">NOVA PARTIDA</div></a>
      <a href="index.php"><div class="botao_sair">SAIR DO JOGO</div></a>
    </div>
    <header>
        <div class="icones_header">
          <a class="icone" href="#" onclick="pausar()">
            <img src="assets/menu.png" alt="Imagem menu" />
          </a>
          <a class="icone" href="ranking_global.php">
            <img src="assets/trophy-01.png" alt="Imagem ranking" />
          </a>
          <a class="icone" href="atualizar_dados.php">
            <img src="assets/user-circle.png" alt="Imagem perfil" />
          </a>
          <a class="icone" href="index.php">
            <img src="assets/user-minus-02.png" alt="Imagem sair" />
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
    <div class="ranking_global" id="jogo">
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
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">USUARIO</p>
          <div class="espacamento8px"></div>
          <?php
            $jogos = $_SESSION["jogos"];
            $i = 1;
            if($jogos != null){
              foreach ($jogos as $jogo) {
                echo "<p class='espacamento10px' id='ranking". $i . "'>";
                echo $jogo["username"] == null ? "-" : $jogo["username"];
                echo "</p>";
                $i++;
                if($i > 10) break;
              }
            }
          ?>
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">PONTOS</p>
          <div class="espacamento8px"></div>
          <?php
            $jogos = $_SESSION["jogos"];
            $i = 1;
            if($jogos != null){
              foreach ($jogos as $jogo) {
                echo "<p class='espacamento10px' id='ranking". $i . "'>";
                echo $jogo["pontuacao"] == null ? "-" : $jogo["pontuacao"];
                echo "</p>";
                $i++;
                if($i > 10) break;
              }
            }
          ?>
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">NÍVEL</p>
          <div class="espacamento8px"></div>
          <?php
            $jogos = $_SESSION["jogos"];
            $i = 1;
            if($jogos != null){
              foreach ($jogos as $jogo) {
                echo "<p class='espacamento10px' id='ranking". $i . "'>";
                echo $jogo["nivel"] == null ? "-" : $jogo["nivel"];
                echo "</p>";
                $i++;
                if($i > 10) break;
              }
            }
          ?>
        </div>
        <div class="rank_column t28px amarelo">
          <p class="branco t36px">TEMPO</p>
          <div class="espacamento8px"></div>
          <?php
            $jogos = $_SESSION["jogos"];
            $i = 1;
            if($jogos != null){
              foreach ($jogos as $jogo) {
                echo "<p class='espacamento10px' id='ranking". $i . "'>";
                echo $jogo["tempo"] == null ? "-" : $jogo["tempo"];
                echo "</p>";
                $i++;
                if($i > 10) break;
              }
            }
          ?>
        </div>
      </div>
    </div>
    <footer><div id="nomeUsuario">⠀</div></footer>
  </body>
  <svg id="svg-filter">
    <!-- PEGAMO DO SEGUINTE LINK: https://jsfiddle.net/rijokpaul/1k5x6dgm/ , só dicionar a classe blur que fica borrado -->
    <filter id="svg-blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur>
    </filter>
  </svg>
</html>
