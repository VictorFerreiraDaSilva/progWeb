<?php
  session_start()
?>

<!DOCTYPE html>
<html lang="pt">
  <head>
    <title>SI401</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div class="container">
      <p class="titulo recuoNormal">
        <span class="roxo">T</span><span class="amarelo">E</span
        ><span class="verde">T</span><span class="rosa">R</span
        ><span class="azul">I</span><span class="vermelho">S</span>
      </p>
    </div>
    <form action="index.php" method="post">
    <section class="caixa_start">
      <h2 class="texto">USUÁRIO</h2>
      <input class="input" id="nome" />
      <h2 class="texto">SENHA</h2>
      <input class="input" id="senha" type="password" />
      <input type="submit" name="login" value="JOGAR" class="botao_jogar">
      <section class="register">
        <h2>Primeira vez jogando?</h2>
        <a class="link-registro" href="registro.php">
          <h2>REGISTRE-SE</h2>
        </a>
      </section>
    </section>
  </form>
    <script src="js/script.js"></script>
  </body>
</html>

<?php

  if(isset($_POST["login"])){
     if(!empty($_POST["usuario"]) && !empty($_POST["senha"])){
      $_SESSION["usuario"] = $_POST["usuario"];
      $_SESSION["senha"] = $_POST["senha"];    }

      header("Location: tabuleiro.php");
    }
    else{
        echo"Está faltando usuário/senha <br>";
  }

?>