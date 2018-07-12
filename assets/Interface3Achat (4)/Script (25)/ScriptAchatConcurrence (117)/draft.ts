
class ScriptAchatConcurrenceBehavior extends Sup.Behavior {
  //Pour définir les intentions d'achat des entreprises concurrentes
  iaArray = new Array(3);
  qInfo : Sup.Actor;
  timer : number = 0;
  affiche = new Array(3);
  iaTotal : number = 0;
  etape1 : Sup.Actor;
  etape2 : Sup.Actor;
  etape3 : Sup.Actor;
  etape4 : Sup.Actor;
  etape5 : Sup.Actor;
  etapeN : number = 0;
  valeur : number = 0;
  element2 : string;
  boutonNombre : Sup.Actor;
  boutonTableau : Sup.Actor[];
  texteNombre : Sup.Actor;
  txtAffiche1 : Sup.Actor;
  txtAffiche2 : Sup.Actor;
  txtAffiche3 : Sup.Actor;
  camera : Sup.Actor;
  emitter : EventEmitter;
  
  awake() {
    EventEmitter.defaultMaxListeners = 20;
    this.boutonTableau = new Array(16);
    this.affecteActor();
    this.affichageElement();
    
    this.randomize();
    for (let u = 0; u <3; u++){
      this.affiche[u] = "L'entreprise "+ entrepriseConc[u] +" a prévu d'acheter " +this.iaArray[u]+" lots";
      Sup.log("affiche "+u+" : "+this.affiche[u]);
      this.iaTotal = this.iaTotal + this.iaArray[u];
    }
    Sup.log(this.iaTotal);
    this.qInfo.textRenderer.setText("Achat "+this.element2);
    updateMenu(this.boutonNombre.getChildren());
    this.cliqueBouton();
  }

  update() {
    //permet de remettre l opacite a 1 par defaut
    updateMenu(this.boutonNombre.getChildren());
    //enleve le flip vertical du clik sur le bouton
    noclic(this.boutonNombre.getChildren());
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
      case 0 :
        this.etape1.textRenderer.setColor(242,26,64);
        this.etape2.textRenderer.setColor(255,255,255);
        this.etape3.textRenderer.setColor(255,255,255);
        this.etape4.textRenderer.setColor(255,255,255);
        this.etape5.textRenderer.setColor(255,255,255);
        break;
        
      case 1 :
        this.etape1.textRenderer.setColor(255,255,255);
        this.etape2.textRenderer.setColor(242,26,64);
        this.etape3.textRenderer.setColor(255,255,255);
        this.etape4.textRenderer.setColor(255,255,255);
        this.etape5.textRenderer.setColor(255,255,255);
        break;
        
      case 2 :
        this.etape1.textRenderer.setColor(255,255,255);
        this.etape2.textRenderer.setColor(255,255,255);
        this.etape3.textRenderer.setColor(242,26,64);
        this.etape4.textRenderer.setColor(255,255,255);
        this.etape5.textRenderer.setColor(255,255,255);
        break;
      
      case 3 :
        this.etape1.textRenderer.setColor(255,255,255);
        this.etape2.textRenderer.setColor(255,255,255);
        this.etape3.textRenderer.setColor(255,255,255);
        this.etape4.textRenderer.setColor(242,26,64);
        this.etape5.textRenderer.setColor(255,255,255);
        break;
        
      case 4 :
        this.etape1.textRenderer.setColor(255,255,255);
        this.etape2.textRenderer.setColor(255,255,255);
        this.etape3.textRenderer.setColor(255,255,255);
        this.etape4.textRenderer.setColor(255,255,255);
        this.etape5.textRenderer.setColor(242,26,64);
        break;
        
      default:
        Sup.log("test switch queletape");
        break;        
      }
    // a gerer lors du click pour parcourir les 5 etapes
    this.etapeN ++;
    if (this.etapeN == 5){
      this.etapeN == 0;
    }
    
  }
  
  affichageConcurrence(){
    
      switch (this.valeur){

          case 0:    //si on a pas encore appuyer sur entree
            this.txtAffiche1.textRenderer.setText("Combien de lot "+ this.element2 +" voulez vous acheter?");
            this.visibleNombre(true);
            Sup.log("xxx 0");
            break;

          case 1:  //si on a deja appuyer une fois sur entree
              if (Sup.Input.wasKeyJustPressed("RETURN")) {
                this.txtAffiche1.textRenderer.setText(this.affiche[0]);
                this.txtAffiche2.setVisible(true);
                this.txtAffiche2.textRenderer.setText(this.affiche[1]);
                this.txtAffiche3.setVisible(true);
                this.txtAffiche3.textRenderer.setText(this.affiche[2]);
                this.visibleNombre(false);
                Sup.log("xxx 1");
                this.quelEtape();
              }
            break;

          case 2:
            Sup.log("xxx 2");
            this.txtAffiche3.setVisible(false);
            this.txtAffiche1.textRenderer.setText("Les intentions d'achat du marché sont de "+ this.iaTotal +" lots");
            this.txtAffiche2.textRenderer.setText("Vous pouvez donc acheter "+Math.floor(this.iaTotal/4)+" lots");
            this.quelEtape();
            break;

          case 3:
            Sup.log("xxx 3");
            this.quelEtape();
            Sup.log("valeur"+this.valeur);
            this.camera.moveY(-11);
            this.camera.getBehavior(ScriptAchatConcurrenceBehavior).destroy;
            this.valeur ++;
            break;

          default:
            Sup.log("test switch 585");
            break;

    }
  
  }

  visibleNombre(boolVisible) {
    this.boutonNombre.setVisible(boolVisible);
    this.texteNombre.setVisible(boolVisible);
  }
  
  cliqueBouton(){
    for (let i = 0; i <16; i++){
       this.boutonTableau[i].fMouseInput.emitter.on("leftClickReleased", () => {
          this.valeur ++;
        });
      }
  }
  
  affecteActor(){
    this.qInfo = Sup.getActor("Vue2").getChild("Texte").getChild("QInfo");
    this.etape1 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt1");
    this.etape2 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt2");
    this.etape3 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt3");
    this.etape4 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt4");
    this.etape5 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt5");
    this.txtAffiche1 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtOutput1");
    this.txtAffiche2 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtOutput2");
    this.txtAffiche3 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtOutput3");
    this.boutonNombre = Sup.getActor("Vue2").getChild("Element").getChild("Bouton");
    this.texteNombre = Sup.getActor("Vue2").getChild("Element").getChild("Texte");
    this.camera = Sup.getActor("Camera");
    for (let i = 0; i <16; i++){
      let toto:string = "Sprite"+i.toString();
      this.boutonTableau[i] = Sup.getActor("Vue2").getChild("Element").getChild("Bouton").getChild(toto);
      new fMouseInput (this.boutonTableau[i]);
      this.boutonTableau[i].fMouseInput.setCameraActorName("Camera");
    }
  }
  
}
Sup.registerBehavior(ScriptAchatConcurrenceBehavior);
