let pausado = false;

function pausar() {
    if(!pausado){
      document.getElementById("resume").style.display = "flex";
      document.getElementById("jogo").classList.add("blur");
    }
    else {
      document.getElementById("resume").style.display = "none";
      document.getElementById("jogo").classList.remove("blur");
    }
    pausado = !pausado;
  }