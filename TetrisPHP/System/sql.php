<?php

include 'db.php';

$dbi = new DataBaseInfo();

$servername = $dbi->getServerName(); 
$username = $dbi->getUsername();
$password = $dbi->getPassword();
$db = $dbi->getDB();

//conectando
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

//dropando a database se tiver alguma com o msm nome
$sql = "DROP DATABASE IF EXISTS $db";
if ($conn->query($sql) != TRUE) {
  echo "erro dropando database: " . $conn->error;
}

//criando a database pro tetris
$sql = "CREATE DATABASE $db";
if ($conn->query($sql) != TRUE) {
  echo "erro criando database: " . $conn->error;
}

//fechando a conexao e abrindo dnv conectado ja na database
$conn->close();
$conn = new mysqli($servername, $username, $password, $db);

//criando a tabela do usuario
$sql = "CREATE TABLE IF NOT EXISTS usuario (
  username VARCHAR(100) PRIMARY KEY NOT NULL,
  nome VARCHAR(100) NOT NULL,
  dt_nasc DATE NOT NULL,
  cpf CHAR(11) NOT NULL,
  telefone CHAR(11) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL
);";  
if ($conn->query($sql) != TRUE) {
  echo "Erro criando tabela usuario: " . $conn->error;
}

//criando a tabela para os jogos
$sql = "CREATE TABLE IF NOT EXISTS jogo (
  id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  pontuacao INT NOT NULL,
  nivel INT NOT NULL,
  linhas_apagadas INT NOT NULL,
  tempo TIME NOT NULL,
  dt DATE NOT NULL,
  username VARCHAR(100) NOT NULL,
  FOREIGN KEY (username)
        REFERENCES usuario (username)
        ON DELETE CASCADE
);";  
if ($conn->query($sql) != TRUE) {
  echo "Erro criando tabela jogo: " . $conn->error;
}

//se deu bom fecha a conexao
echo "Tudo certo!";
$conn->close();
?>