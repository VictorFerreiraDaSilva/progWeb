<?php
  session_start()
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Atualizar dados</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="script.js"></script>
</head>

<header>
        <div class="icones_header">
          <a class="icone" href="resume.php">
            <img src="assets/menu.png" alt="Imagem menu" />
          </a>
          <a class="icone" href="ranking_global.php" onclick="preencherRanking()"
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

<body>
    <section class="caixa_register">
        <div id="container_register">
            <p class="atualizar_titulo"><span class="roxo">A</span><span class="amarelo">T</span><span class="verde">U</span><span class="azul">A</span><span class="vermelho">L</span><span class="roxo">I</span><span class="rosa">Z</span><span class="amarelo">A</span><span class="verde">R</span>
            <span class="azul">D</span><span class="vermelho">A</span><span class="amarelo">D</span><span class="rosa">O</span><span class="verde">S</span></p> 
        </div>

        <h1 class="texto_registro">DADOS PESSOAIS</h1>
        <br>
        
      <form action="#" method="post">
        <p class="texto_titulo_register">NOME COMPLETO</p>
        <input class="input_register" id="input_nome" type="text" name="nome"></input>
        <br>
        <div class="texto_titulo_register">
            <p>DATA DE NASC.</p>
            <p>CPF</p>
        </div>
        <div>
            <input  class="input_nao_atualizar" class="input_register" id="input_data" readonly="true" placeholder="Valor imutável"> &nbsp</input><input class="input_nao_atualizar" class="input_register" placeholder="Valor imutável"
                id="input_cpf" readonly="true"></input></div>
        <br>
        <div class="texto_titulo_register">
            <p>TELEFONE</p>
            <p>E-MAIL</p>
            
        </div>
        <div>
            <input class="input_register" id="input_telefone" name="telefone"> </input>
            <input class="input_register"id="input_email" name="email"></input>
        </div>
        <br>
        <br>
        <h1 class="texto_registro">CONTA</h1>
        <br>
        <div class="registro_login">
            <p>USUÁRIO</p>
            <P>NOVA SENHA</P>
        </div>
        <div>
            <input class="input_nao_atualizar" class="input_register" id="input_usuario" readonly="true" placeholder="Valor imutável"></input> 
            <input class="input_register" id="input_senha" type="password" name="novaSenha"></input><br><br>
            <div class="registro_login">
                <P>SENHA ATUAL</P>
            </div>
            <input class="input_register" id="input_senha" type="password" name="senhaAtual"></input>
        </div>

        <input type="submit" name="atualizar" value="SUBMETER" class="botao_submeter">
      </form>
    </section>
</body>
</html>

<?php
  include 'System/db.php';

  $dbi = new DataBaseInfo();
  
  $servername = $dbi->getServerName(); 
  $username = $dbi->getUsername();
  $password = $dbi->getPassword();
  $db = $dbi->getDB();

  if(isset($_POST["atualizar"])){
    if(!empty($_POST["nome"]) && !empty($_POST["telefone"]) && !empty($_POST["email"]) && !empty($_POST["novaSenha"]) && !empty($_POST["senhaAtual"])){
        $senhaCerta = false;
      $conn = new mysqli($servername, $username, $password, $db);
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }

      $sql = "SELECT nome FROM usuario where username = '" . $_SESSION["usuario"] . "' and senha = md5('" . $_POST["senhaAtual"] ."');";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
          $senhaCerta = true;
        }    
      }
      if($senhaCerta){
        $sql = "UPDATE usuario SET nome='" . $_POST["nome"] . "', telefone ='" . $_POST["telefone"] . "', email='" . $_POST["email"] . "', senha = md5('" . $_POST["novaSenha"] . "') WHERE username = '" . $_SESSION["usuario"] . "' and senha = md5('" . $_POST["senhaAtual"] ."');";
        
    
        if ($conn->query($sql) === TRUE) {
            $conn->close();
            echo "<script>
            alert('Atualizado com sucesso');
            window.location.href='index.php';
            </script>";
        } 
        else {
            $conn->close();
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
      }
      else {
        $conn->close();
        echo "Senha Incorreta";
      }
    }
    else{
        echo"Está faltando usuário/senha <br>";
    }
  }
?>