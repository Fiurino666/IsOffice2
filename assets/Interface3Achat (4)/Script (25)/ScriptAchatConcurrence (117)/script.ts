class ScriptAchatConcurrenceBehavior extends Sup.Behavior {
  //Pour définir les intentions d'achat des entreprises concurrentes
  iaArray = new Array(3);
  qInfo : Sup.Actor;
  timer: number = 0;
  affiche = new Array(3);
  iaTotal: number = 0;
  etape1 : Sup.Actor;
  etape2 : Sup.Actor;
  etape3 : Sup.Actor;
  etape4 : Sup.Actor;
  etape5 : Sup.Actor;
  etapeN: number;
  valeur: number = 0;
  element2: string;
  actorNombre : Sup.Actor[];
  txtAffiche : Sup.Actor;
  
  awake() {
    
    this.qInfo = Sup.getActor("Vue2").getChild("Texte").getChild("QInfo");
    this.etape1 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt1");
    this.etape2 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt2");
    this.etape3 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt3");
    this.etape4 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt4");
    this.etape5 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt5");
    this.txtAffiche = Sup.getActor("Vue2").getChild("Texte").getChild("TxtOutput");
    this.actorNombre = Sup.getActor("Vue2").getChild("Prefab").getChildren();
    this.affichageElement();
    this.etapeN = 0;

    this.randomize();
    for (let u = 0; u <3; u++){
      this.affiche[u] = "L'entreprise "+ entrepriseConc[u] +" a prévu d'acheter " +this.iaArray[u]+" lots";
      Sup.log("affiche "+u+" : "+this.affiche[u]);
      this.iaTotal = this.iaTotal + this.iaArray[u];
    }
    Sup.log(this.iaTotal);
    this.qInfo.textRenderer.setText("Achat "+this.element2);
  }

  update() {

    this.quelEtape();
    this.affichageConcurrence();
    
  }
  
  randomize(){
    var rng = new RNG(String(Math.random()));
    for (let i = 0; i <3; i++){
      this.iaArray[i] = rng.random(0, 15);
      Sup.log(this.iaArray[i]);
    }
  }
  
  affichageElement(){
    switch(element){
      case "ecran":{
        this.element2 = "d'écran";
        Sup.log("ecran");
        break;
      }
      case "chassis":{
        this.element2 = "de chassis";
        Sup.log("chassis");
        break;
      }
      case "composant":{
        this.element2 = "de composant";
        Sup.log("composant");
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
  
  affichageConcurrence(){
    //si on a pas encore appuyer sur entree
    if(this.valeur == 0){
      //this.elementNombre();
      this.txtAffiche.textRenderer.setText("Combien de lot "+ this.element2 +" voulez vous acheter?");
      
      Sup.log("xxx 0");
    }    
    //si on a deja appuyer une fois sur entree
    if(this.valeur == 1){
     //this.txtAffiche.textRenderer.setText(this.affiche[0]);
      this.elementNombre();
      Sup.log("xxx 1");
    }    
    if (Sup.Input.wasKeyJustPressed("RETURN")) {
      switch (this.valeur){
          //troisieme fois que nous avons appuyer sur entree
        case 1:{
          Sup.log("xxx 2");
          //this.txtAffiche.textRenderer.setText(this.affiche[1]);
          break;
        }
          
        case 2:{
          Sup.log("xxx 3");
          //this.txtAffiche.textRenderer.setText(this.affiche[2]);
          break;
        }
          
        case 3:{
          Sup.log("xxx 4");
          //this.txtAffiche.textRenderer.setText("Les intentions d'achat pour "+ this.element2 + " sont de "+ this.iaTotal +" ce tour ci");
          break;
        }
          
      }
      this.valeur ++;
    }
  }
  
  
  elementNombre() {
    for (let i =0; i < 16; i++){
      this.actorNombre[i].addBehavior(PrefabBoutonBehavior);
      this.actorNombre[i].getBehavior(PrefabBoutonBehavior).show(i.toString(),true);
    }
    
  }
  
  
}
Sup.registerBehavior(ScriptAchatConcurrenceBehavior);
