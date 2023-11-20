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
      <input class="input" id="nome" name="usuario"/>
      <h2 class="texto">SENHA</h2>
      <input class="input" id="senha" type="password" name="senha"/>
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
  include 'System/db.php';

  $dbi = new DataBaseInfo();
  
  $servername = $dbi->getServerName(); 
  $username = $dbi->getUsername();
  $password = $dbi->getPassword();
  $db = $dbi->getDB();

  if(isset($_POST["login"])){
    if(!empty($_POST["usuario"]) && !empty($_POST["senha"])){

      $conn = new mysqli($servername, $username, $password, $db);
      // Check connection
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }

      $sql = "SELECT username, nome, dt_nasc, cpf, telefone, email FROM usuario where username = '" . $_POST["usuario"] . "' and senha = md5('" . $_POST["senha"] ."');";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          $_SESSION["usuario"] = $row["username"];
          $_SESSION["nome"] = $row["nome"];
          $_SESSION["dt_nasc"] = $row["dt_nasc"];
          $_SESSION["cpf"] = $row["cpf"];
          $_SESSION["telefone"] = $row["telefone"];
          $_SESSION["email"] = $row["email"];
        }
        $conn->close();       
        header("Location: tabuleiro.php");
      } else {
        $conn->close();   
        echo "<script>alert('Usuario e/ou Senha inválidos');</script>";
      }
    }
  }

?>