<?php
  session_start()
?>

<!DOCTYPE html>
<?php
  include 'System/db.php';

  $dbi = new DataBaseInfo();
  
  $servername = $dbi->getServerName(); 
  $username = $dbi->getUsername();
  $password = $dbi->getPassword();
  $db = $dbi->getDB();

  $jogos = array();
  $dbi = new DataBaseInfo();
  
  $servername = $dbi->getServerName(); 
  $username = $dbi->getUsername();
  $password = $dbi->getPassword();
  $db = $dbi->getDB();

  $conn = new mysqli($servername, $username, $password, $db);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT pontuacao, nivel, linhas_apagadas, tempo, username FROM jogo WHERE username = 'vito' ORDER BY pontuacao DESC";
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
          //echo $row["pontuacao"] . "|" . $row["nivel"] . "|" . $row["linhas_apagadas"] . "|" . $row["tempo"] . "|" . $row["username"];
          $jogos[] = ['username' => $row["username"], 'pontuacao' => $row["pontuacao"], 'nivel' => $row["nivel"],'linhas' => $row["linhas_apagadas"], 'tempo' => $row["tempo"]];
      }
      //echo json_encode($jogos);
  }
  $conn->close();
  $_SESSION["jogos"] = $jogos;
?>

<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="css/style.css" />
    <title>TETRIS</title>
  </head>
  <body class="jogobody">
    <div class="gameover_janela" id="gameover">
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
      <a href="ranking_global.php"><div class="botao_resume">RANKING GLOBAL</div></a>
      <form action="System/inserirDados.php" method="post">
        <input class="input" id="Fpontuacao" name="Fpontuacao" style="display: none"/>
        <input class="input" id="Fnivel" name="Fnivel" style="display: none"/>
        <input class="input" id="Ftempo" name="Ftempo" style="display: none"/>
        <input class="input" id="Flinhas" name="Flinhas" style="display: none"/>
        <input type="submit" name="novaPartida" value="NOVA PARTIDA" class="botao_resume">
        <br>
        <input type="submit" name="sair" value="SAIR DO JOGO" class="botao_sair">
      </form>
    </div>
    <div class="resume_janela" id="resume">
      <div class="resume_titulo">
        <p class="resume_titulo">
          <span class="roxo">R</span><span class="amarelo">E</span
          ><span class="verde">S</span><span class="azul">U</span
          ><span class="vermelho">M</span><span class="roxo">E</span>
        </p>
      </div>

      <a href="#" onclick="pausar()"><div class="botao_resume">RESUME</div></a>
      <a href="tabuleiro.php"><div class="botao_resume">NOVA PARTIDA</div></a>
      <a href="index.php"><div class="botao_sair">SAIR DO JOGO</div></a>
    </div>
    <div>
      <header>
        <div class="icones_header">
          <a class="icone" href="#" onclick="pausar()">
            <img src="assets/menu.png" alt="Imagem menu" />
          </a>
          <a
            class="icone"
            href="ranking_global.php"
          >
            <img src="assets/trophy-01.png" alt="Imagem ranking" />
          </a>
          <a class="icone" href="atualizar_dados.php">
            <img src="assets/user-circle.png" alt="Imagem perfil" />
          </a>
          <a class="icone" href="index.php">
            <img src="assets/user-minus-02.png" alt="Imagem sair" />
          </a>
          <p class="titulo">
            <span class="roxo">T</span><span class="amarelo">E</span
            ><span class="verde">T</span><span class="rosa">R</span
            ><span class="azul">I</span><span class="vermelho">S</span>
          </p>
        </div>
      </header>

      <section class="tela_jogo" id="jogo">
        <div class="estat_rank">
          <h1 class="estatistica">
            <span class="roxo">E</span><span class="amarelo">S</span
            ><span class="verde">T</span><span class="rosa">A</span
            ><span class="azul">T</span><span class="vermelho">Í</span
            ><span class="amarelo">S</span><span class="verde">T</span
            ><span class="rosa">I</span><span class="azul">C</span
            ><span class="roxo">A</span>
          </h1>
          <div class="estat">
            <h1 class="tempo">TEMPO</h1>
            <p class="tempo_num" id="tempo">00:00</p>
            <h2 id="pontos" class="est">
              PONTOS:⠀<span id="pontuacao" class="vermelho"></span>
            </h2>
            <h2 id="linhas" class="est">
              LINHAS:⠀<span id="linhasEliminadas" class="vermelho"></span>
            </h2>
            <h2 id="dificuldade" class="est">
              NIVEL:⠀<span id="nivel" class="vermelho"></span>
            </h2>
          </div>

          <section class="ranking_teste">
            <h1 class="ranking">
              <span class="vermelho">H</span><span class="amarelo">I</span
              ><span class="verde">S</span><span class="rosa">T</span
              ><span class="azul">Ó</span><span class="amarelo">R</span
              ><span class="roxo">I</span><span class="verde">C</span
              ><span class="rosa">O</span>
            </h1>
            <br />
            <div class="ranking_pessoal">
              <div class="ranking_pessoal_column amarelo">
                <p class="branco">RANK</p>
                <div class="espacamento8px"></div>
                <p class="rosa">1º</p>
                <p class="verde">2º</p>
                <p class="azul">3º</p>
                <p class="">4º</p>
                <p class="">5º</p>
              </div>
              <div class="ranking_pessoal_column vermelho">
                <p class="branco">PONTOS</p>
                <div class="espacamento8px"></div>
                <?php
                $jogos = $_SESSION["jogos"];
                $i = 1;
                if($jogos != null){
                  foreach ($jogos as $jogo) {
                    echo "<p id='pontos" . $i . "'>";
                    echo $jogo["pontuacao"] == null ? "-" : $jogo["pontuacao"];
                    echo "</p>";
                    $i++;
                    if($i > 5) break;
                  }
                }
                ?>
              </div>
              <div class="ranking_pessoal_column vermelho">
                <p class="branco">NÍVEL</p>
                <div class="espacamento8px"></div>
                <?php
                $jogos = $_SESSION["jogos"];
                $i = 1;
                if($jogos != null){
                  foreach ($jogos as $jogo) {
                    echo "<p id='nivel" . $i . "'>";
                    echo $jogo["nivel"] == null ? "-" : $jogo["nivel"];
                    echo "</p>";
                    $i++;
                    if($i > 5) break;
                  }
                }
                ?>
              </div>
              <div class="ranking_pessoal_column vermelho">
                <p class="branco">TEMPO</p>
                <div class="espacamento8px"></div>
                <?php
                $jogos = $_SESSION["jogos"];
                $i = 1;
                if($jogos != null){
                  foreach ($jogos as $jogo) {
                    echo "<p id='tempo" . $i . "'>";
                    echo $jogo["tempo"] == null ? "-" : $jogo["tempo"];
                    echo "</p>";
                    $i++;
                    if($i > 5) break;
                  }
                }
                ?>
              </div>
            </div>
          </section>
        </div>
        <!-- <div class="jogo"> -->
        <div id="container_jogo">
          <!-- <div class="jogo"> -->
          <div id="tabuleiroDinamico"></div>
          <!-- </div> -->
          <!-- </div> -->
          <!-- </div> -->
        </div>

        <section class="prox_peca_botoes">
          <div class="prox_peca">
            <h1 class="peca_titulo">
              <span class="roxo">P</span><span class="amarelo">R</span
              ><span class="verde">Ó</span><span class="rosa">X</span
              ><span class="azul">I</span><span class="vermelho">M</span
              ><span class="amarelo">A</span> <br /><span class="verde">P</span
              ><span class="rosa">E</span><span class="azul">Ç</span
              ><span class="roxo">A</span>
            </h1>

            <div class="quadrado_peca">
              <img id="proximaPeca" src="assets/peca_roxa.png" alt="peça"/>
            </div>
          </div>

          <div class="div_inipause">
            <button id="botao_iniciar">JOGAR</button>
            <button id="botao_pause" onclick="pausar()">PAUSAR</button>
          </div>
          <br>
          <div class="div_inipause">
            <h3 class="vermelho">AVISO:</h3>
            <h4 class="rosa">Se precisar reinciar o jogo, pressione F5</h4>
          </div>  
        </section>
      </section>
    </div>
    <footer><div id="nomeUsuario">⠀</div></footer>
    <script src="js/script.js"></script>
  </body>
  <svg id="svg-filter">
    <!-- PEGAMO DO SEGUINTE LINK: https://jsfiddle.net/rijokpaul/1k5x6dgm/ , só dicionar a classe blur que fica borrado -->
    <filter id="svg-blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur>
    </filter>
  </svg>
</html>