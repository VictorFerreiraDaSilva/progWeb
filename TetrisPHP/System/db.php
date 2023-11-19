<?php 

class DataBaseInfo{
    private $servername = "localhost"; //muda aqui para as infos do teu mySQL
    private $username = "root";
    private $password = "root";
    private $db = "si401_tetris_gp03";
    
    public function _constructor(){
        
    }

    public function getServerName(){
        return $this->servername;
    }
    
    public function getUsername(){
        return $this->username;
    }
    
    public function getPassword(){
        return $this->password;
    }
    
    public function getDB(){
        return $this->db;
    }
}

?>