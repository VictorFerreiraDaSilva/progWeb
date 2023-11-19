<?php
  session_start()
?>

<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registre-se</title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/script.js"></script>
  </head>
  <body>
  <form action="registro.php" method="post">
    <section class="caixa_register">
      <div id="container_register">
        <p class="register_titulo">
          <span class="roxo">R</span><span class="amarelo">E</span
          ><span class="verde">G</span><span class="azul">I</span
          ><span class="vermelho">S</span><span class="roxo">T</span
          ><span class="rosa">R</span><span class="amarelo">E</span
          ><span class="verde">-</span><span class="azul">S</span
          ><span class="vermelho">E</span>
        </p>
      </div>

      <h1 class="texto_registro">DADOS PESSOAIS</h1>
      <br/>
      
      <form action="#" method="post">
      <p class="texto_titulo_register">NOME COMPLETO</p>
      <input class="input_register" id="input_nome" placeholder="Insira seu nome aqui" type="text" name="nome"/>
      <br/>
      <div id="row">
        <p class="texto_titulo_register">
          <span>DATA DE NASC.</span><span>CPF</span>
        </p>
      </div>
      <div>
        <input class="input_register" id="input_data" type="date"name="data" /><input
          class="input_register"
          id="input_cpf"
          placeholder="123.456.789-10"
          name="cpf"
        />
      </div>
      <br />
      <div class="texto_titulo_register">
        <p>TELEFONE</p>
        <p>E-MAIL</p>
      </div>
      <div>
        <input
          class="input_register"
          id="input_telefone"
          placeholder="(XX) 91234-5678"
          name="telefone"
        /><input
          class="input_register"
          id="input_email"
          placeholder="seu@email.aqui"
          name="email"
        />
      </div>
      <br />
      <br />
      <h1 class="texto_registro">CONTA</h1>
      <br />
      <div class="registro_login">
        <p>USUÁRIO</p>
        <p>SENHA</p>
      </div>
      <div>
        <input class="input_register" id="input_usuario" type="text" name="usuario"/>
        <input class="input_register" id="input_senha" type="password" name="senha"/>
      </div>      
      <input type="submit" name="registrar" value="SUBMETER" class="botao_submeter">
    </form>
    </section>
    </form>
  </body>
</html>

<?php
  include 'System/db.php';

  $dbi = new DataBaseInfo();
  
  $servername = $dbi->getServerName(); 
  $username = $dbi->getUsername();
  $password = $dbi->getPassword();
  $db = $dbi->getDB();

  if(isset($_POST["registrar"])){
    /*echo $_POST["nome"];
    echo $_POST["data"];
    echo $_POST["cpf"];
    echo $_POST["telefone"];
    echo $_POST["email"];
    echo $_POST["usuario"];
    echo $_POST["senha"];*/
    if(!empty($_POST["nome"]) && !empty($_POST["data"]) && !empty($_POST["cpf"]) && !empty($_POST["telefone"]) && !empty($_POST["email"]) && !empty($_POST["usuario"]) && !empty($_POST["senha"])){

      $conn = new mysqli($servername, $username, $password, $db);
      // Check connection
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }

      $sql = "INSERT INTO usuario 
      VALUES ('" . $_POST["usuario"] . "', '" . $_POST["nome"] . "', '" . $_POST["data"] . "', '" . $_POST["cpf"] . "', '" . $_POST["telefone"] . "', '" . $_POST["email"] . "', md5('" . $_POST["senha"] . "') )";

      if ($conn->query($sql) === TRUE) {
        $conn->close();
        echo "<script>
        alert('Registrado com sucesso');
        window.location.href='index.php';
        </script>";
      } else {
        $conn->close();
        echo "Error: " . $sql . "<br>" . $conn->error;
      }


    }
    else{
        echo"Está faltando usuário/senha <br>";
    }
  }
?>