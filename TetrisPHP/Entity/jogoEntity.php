<?php 

class Jogo{
    private $id; 
    private $pontuacao;
    private $nivel;
    private $linhas;
    private $tempo;
    private $username;
    
    public function _constructor($pontuacao, $nivel, $linhas, $tempo, $username){
        $this->pontuacao = $pontuacao;
        $this->nivel = $nivel;
        $this->linhas = $linhas;
        $this->tempo = $tempo;
        $this->username = $username;
    }

    public function getId(){
        return $this->id;
    }

    public function getPontuacao(){
        return $this->pontuacao;
    }

    public function getNivel(){
        return $this->nivel;
    }

    public function getLinhas(){
        return $this->linhas;
    }

    public function getTempo(){
        return $this->tempo;
    }

    public function getUsername(){
        return $this->username;
    }

    public function __toString(){
        return "Salve";
    }
}

?>