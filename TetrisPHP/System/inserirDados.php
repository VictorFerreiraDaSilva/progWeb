<?php

    session_start();
    include 'db.php';
    $dbi = new DataBaseInfo();

    $servername = $dbi->getServerName(); 
    $username = $dbi->getUsername();
    $password = $dbi->getPassword();
    $db = $dbi->getDB();

    if(isset($_POST["novaPartida"])){
        if($_POST["Fpontuacao"] != NULL && $_POST["Fnivel"] != NULL && $_POST["Flinhas"] != NULL && $_POST["Ftempo"] != NULL){
            $conn = new mysqli($servername, $username, $password, $db);
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql = "INSERT INTO jogo (pontuacao, nivel, linhas_apagadas, tempo, dt, username) VALUES (" . $_POST["Fpontuacao"] . ", " . $_POST["Fnivel"] . ", " . $_POST["Flinhas"] . ", '" . $_POST["Ftempo"] . "', curdate(), '" . $_SESSION["usuario"] . "')";
            
            if ($conn->query($sql) === TRUE) {
                $conn->close();
                header("Location: ../tabuleiro.php");
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
                $conn->close();
            }      
        }
    }
    if(isset($_POST["sair"])){
        if($_POST["Fpontuacao"] != NULL && $_POST["Fnivel"] != NULL && $_POST["Flinhas"] != NULL && $_POST["Ftempo"] != NULL){
            $conn = new mysqli($servername, $username, $password, $db);
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql = "INSERT INTO jogo (pontuacao, nivel, linhas_apagadas, tempo, dt, username) VALUES (" . $_POST["Fpontuacao"] . ", " . $_POST["Fnivel"] . ", " . $_POST["Flinhas"] . ", '" . $_POST["Ftempo"] . "', curdate(), '" . $_SESSION["usuario"] . "')";
            
            if ($conn->query($sql) === TRUE) {
                $conn->close();
                header("Location: ../index.php");
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
                $conn->close();
            }      
        }
    }

?>