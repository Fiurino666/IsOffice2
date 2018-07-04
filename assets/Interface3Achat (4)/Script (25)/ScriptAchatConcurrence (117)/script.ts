class ScriptAchatConcurrenceBehavior extends Sup.Behavior {
  //Pour définir les intentions d'achat des entreprises concurrentes
  iaArray = new Array(4);
  afficheInfo : Sup.Actor;
  timer: number = 0;
  affiche : string = "";
  iaTotal: number = 0;
  etape1 : Sup.Actor;
  etape2 : Sup.Actor;
  etape3 : Sup.Actor;
  etape4 : Sup.Actor;
  etape5 : Sup.Actor;
  etapeN: number;
  
  awake() {
    this.afficheInfo = Sup.getActor("Vue2").getChild("Texte").getChild("AfficheInfo");
    this.etape1 = Sup.getActor("Vue2").getChild("Texte").getChild("Txt1");
    this.etape2 = Sup.getActor("Vue2").getChild("Texte").getChild("Txt2");
    this.etape3 = Sup.getActor("Vue2").getChild("Texte").getChild("Txt3");
    this.etape4 = Sup.getActor("Vue2").getChild("Texte").getChild("Txt4");
    this.etape5 = Sup.getActor("Vue2").getChild("Texte").getChild("Txt5");
    this.etapeN = 0;
    this.randomize();
    for (let u = 0; u <3; u++){
      this.affiche.concat("L'entreprise "+ entrepriseConc[u] +" a prévu d'acheter " +this.iaArray[u]+" lots          ");
      Sup.log("affiche :"+this.affiche);
      this.iaTotal = this.iaTotal + this.iaArray[u];
    }
    Sup.log(this.iaTotal);
    this.afficheInfo.textRenderer.setText(this.iaTotal);
  }

  update() {
    //.substring(0, Math.round(timer/60))
    //la methode to string transforme un String en string
    this.afficheInfo.textRenderer.setText(this.iaTotal);
    //Sup.log("essai "+this.affiche.substring(0, this.timer));
    //this.timer ++;
     this.quelEtape();
  }
  
  randomize(){
    var rng = new RNG(String(Math.random()));
    for (let i = 0; i <3; i++){
      this.iaArray[i] = rng.random(0, 15);
      Sup.log(this.iaArray[i]);
    }
  }
  
  affichageInfo(){
    switch(element){
      case "ecran":{
        break;
      }
      case "chassis":{
        break;
      }
      case "composant":{
        break;
      }
      default:{
        Sup.log("test 796");
      }
    }
  }
  
  quelEtape(){
    switch(this.etapeN){
      case 0 :{
        this.etape1.textRenderer.setColor(242,26,64);
        this.etape2.textRenderer.setColor(255,255,255);
        this.etape3.textRenderer.setColor(255,255,255);
        this.etape4.textRenderer.setColor(255,255,255);
        this.etape5.textRenderer.setColor(255,255,255);
        break;
      }
        
      case 1 :{
        this.etape1.textRenderer.setColor(255,255,255);
        this.etape2.textRenderer.setColor(242,26,64);
        this.etape3.textRenderer.setColor(255,255,255);
        this.etape4.textRenderer.setColor(255,255,255);
        this.etape5.textRenderer.setColor(255,255,255);
        break;
      }
        
      case 2 :{
        this.etape1.textRenderer.setColor(255,255,255);
        this.etape2.textRenderer.setColor(255,255,255);
        this.etape3.textRenderer.setColor(242,26,64);
        this.etape4.textRenderer.setColor(255,255,255);
        this.etape5.textRenderer.setColor(255,255,255);
        break;
      }
      case 3 :{
        this.etape1.textRenderer.setColor(255,255,255);
        this.etape2.textRenderer.setColor(255,255,255);
        this.etape3.textRenderer.setColor(255,255,255);
        this.etape4.textRenderer.setColor(242,26,64);
        this.etape5.textRenderer.setColor(255,255,255);
        break;
      }
      case 4 :{
        this.etape1.textRenderer.setColor(255,255,255);
        this.etape2.textRenderer.setColor(255,255,255);
        this.etape3.textRenderer.setColor(255,255,255);
        this.etape4.textRenderer.setColor(255,255,255);
        this.etape5.textRenderer.setColor(242,26,64);
        break;
      }
        
      default:{
        Sup.log("test switch queletape");
        break;
      }
        
    }
    /* a gerer lors du click pour parcourir les 5 etapes
    this.etapeN ++;
    if (this.etapeN == 5){
      this.etapeN == 0;
    }
    */
  }
  
  
}
Sup.registerBehavior(ScriptAchatConcurrenceBehavior);
