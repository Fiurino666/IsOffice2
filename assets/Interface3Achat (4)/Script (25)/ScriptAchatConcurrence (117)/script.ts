class ScriptAchatConcurrenceBehavior extends Sup.Behavior {
  //Pour définir les intentions d'achat des entreprises concurrentes
  iaArray = new Array(4);
  afficheInfo : Sup.Actor;
  timer: number = 0;
  affiche : string = "";
  
  awake() {
    this.afficheInfo = Sup.getActor("Vue2").getChild("Texte").getChild("AfficheInfo");
    var iaTotal: number = 0;
    this.randomize();
    for (let u = 0; u <3; u++){
      this.affiche.concat("L'entreprise "+ entrepriseConc[u] +" a prévu d'acheter " +this.iaArray[u]+" lots          ");
      Sup.log("affiche :"+this.affiche);
      iaTotal = iaTotal + this.iaArray[u];
    }
    Sup.log(iaTotal);
    //afficheInfo.textRenderer.setText(iaTotal);
  }

  update() {
    //.substring(0, Math.round(timer/60))
    //la methode to string transforme un String en string
    //this.afficheInfo.textRenderer.setText(this.affiche.substring(0, Math.round(this.timer/60)));
    //Sup.log("essai "+this.affiche.substring(0, this.timer));
    //this.timer ++;
  }
  
  randomize(){
    var rng = new RNG(String(Math.random()));
    for (let i = 0; i <3; i++){
      this.iaArray[i] = rng.random(0, 15);
      Sup.log(this.iaArray[i]);
    }
  }
  
  
}
Sup.registerBehavior(ScriptAchatConcurrenceBehavior);
