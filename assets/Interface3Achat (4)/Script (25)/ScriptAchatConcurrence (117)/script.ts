
class ScriptAchatConcurrenceBehavior extends Sup.Behavior {
  //Pour définir les intentions d'achat des entreprises concurrentes
  iaArray = new Array(3);
  affiche = new Array(6);
  txtAffiche = new Array(6);
  boutonTableau = new Array(16);
  texteTableau = new Array(16);
  EnchereSprite = new Array(16);
  EnchereTexte = new Array(16);
  qInfo : Sup.Actor;
  timer : number = 0;
  iaTotal : number = 0;
  etape1 : Sup.Actor;
  etape2 : Sup.Actor;
  etape3 : Sup.Actor;
  etape4 : Sup.Actor;
  etape5 : Sup.Actor;
  valeur : number = 1;
  element2 : string;
  boutonNombre : Sup.Actor;
  texteNombre : Sup.Actor;
  camera : Sup.Actor;
  emitter : EventEmitter;
  //Pour savoir combien d'element le joueur veux acheter
  lotNombre : number;
  lotDivise : number;
  lotChoisi : number;
  
  awake() {
    //pour gerer l'ajout continue de 16 boutons
    EventEmitter.defaultMaxListeners = 20;
    this.affecteActor();
    this.affichageElement();
    
    this.randomize();
    for (let u = 0; u <3; u++){
      this.affiche[u] = "L'entreprise "+ entrepriseConc[u] +" a prévu d'acheter " +this.iaArray[u]+" lots.";
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
  
  //crée des valeurs random pour simuler la concurrence
  randomize(){
    var rng = new RNG(String(Math.random()));
    for (let i = 0; i <3; i++){
      this.iaArray[i] = rng.random(0, 15);
      Sup.log(this.iaArray[i]);
    }
  }
  
  //transforme les textes pour un affichage different
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
 
  
  affichageConcurrence(){
    
      switch (this.valeur){

          case 1:    //si on a pas encore appuyer sur entree
            this.etape1.textRenderer.setColor(242,26,64);
            this.etape2.textRenderer.setColor(255,255,255);
            this.etape3.textRenderer.setColor(255,255,255);
            this.etape4.textRenderer.setColor(255,255,255);
            this.etape5.textRenderer.setColor(255,255,255);
          
            this.txtAffiche[0].textRenderer.setText("Combien de lots "+ this.element2 +" voulez-vous acheter ?");
            this.visibleNombre(true);
            this.visibleTxt(false);
            Sup.log("xxx 0");
          
            break;

          case 2:  //si on a deja appuyer une fois sur entree
            this.etape1.textRenderer.setColor(255,255,255);
            this.etape2.textRenderer.setColor(242,26,64);
            this.etape3.textRenderer.setColor(255,255,255);
            this.etape4.textRenderer.setColor(255,255,255);
            this.etape5.textRenderer.setColor(255,255,255);
          
            this.visibleNombre(false);
            this.txtAffiche[0].textRenderer.setText(this.affiche[0]);
            this.txtAffiche[1].setVisible(true);
            this.txtAffiche[1].textRenderer.setText(this.affiche[1]);
            this.txtAffiche[2].setVisible(true);
            this.txtAffiche[2].textRenderer.setText(this.affiche[2]);
            this.txtAffiche[3].setVisible(true);
            this.txtAffiche[3].textRenderer.setText("Votre entreprise "+societe+" a prévu d'acheter "+this.lotNombre+ " lots.");
            this.txtAffiche[4].setVisible(true);
            
            this.txtAffiche[4].textRenderer.setText("Les intentions d'achat du marché sont estimées à "+this.iaTotal+" / 4 soit : "+ this.lotDivise +" lots.");
            this.txtAffiche[5].setVisible(true);
            this.txtAffiche[5].textRenderer.setText("Appuyer sur Entrée");
            if (Sup.Input.wasKeyJustPressed("RETURN")) {      
              Sup.log("xxx 1");
              this.valeur++;
            }
            break;

          case 3:
            this.etape1.textRenderer.setColor(255,255,255);
            this.etape2.textRenderer.setColor(255,255,255);
            this.etape3.textRenderer.setColor(242,26,64);
            this.etape4.textRenderer.setColor(255,255,255);
            this.etape5.textRenderer.setColor(255,255,255);
            
            this.txtAffiche[0].textRenderer.setText("Combien de lots "+ this.element2 +" voulez-vous acheter chez le fabricant 1 ?");
            this.visibleTxt(false);
            this.afficheNBNombre();
            this.reaffecteClick();
            Sup.log("xxx 2");


            break;

          case 4:
            this.etape1.textRenderer.setColor(255,255,255);
            this.etape2.textRenderer.setColor(255,255,255);
            this.etape3.textRenderer.setColor(255,255,255);
            this.etape4.textRenderer.setColor(242,26,64);
            this.etape5.textRenderer.setColor(255,255,255);
          
            this.txtAffiche[0].textRenderer.setText("Combien de lots "+ this.element2 +" voulez-vous acheter chez le fabricant 2 ?");
            this.afficheNBNombre();
            if (Sup.Input.wasKeyJustPressed("RETURN")) {      
              Sup.log("xxx 3");
              this.valeur++;
            }
            break;
          
          case 5:
            this.etape1.textRenderer.setColor(255,255,255);
            this.etape2.textRenderer.setColor(255,255,255);
            this.etape3.textRenderer.setColor(255,255,255);
            this.etape4.textRenderer.setColor(255,255,255);
            this.etape5.textRenderer.setColor(242,26,64);
          
            this.txtAffiche[0].textRenderer.setText("Combien de lots"+ this.element2 +" voulez-vous acheter chez le fabricant 3 ?");
            this.afficheNBNombre();  
            Sup.log("valeur"+this.valeur);
            
            if (Sup.Input.wasKeyJustPressed("RETURN")) {      
              Sup.log("xxx 4");
              this.valeur++;
            }
            break;
          
          case 6:
          
            Sup.log("xxx 5");
            Sup.log("valeur"+this.valeur);
            this.camera.moveY(-11);
            this.camera.getBehavior(ScriptAchatConcurrenceBehavior).destroy;
            this.valeur=1;
            
            break;

          default:
            Sup.log("test switch 585");
            break;

    }
  
  }

  //cacher ou montrer les boutons de 0 a 15
  visibleNombre(boolVisible){
    this.boutonNombre.setVisible(boolVisible);
    this.texteNombre.setVisible(boolVisible);
  }
  
  //cache ou affiche les encheres
  visibleEnchere(boolVisible){
    for (let i=0; i<16; i++){
      this.EnchereSprite[i].setVisible(boolVisible);
      this.EnchereTexte[i].setVisible(boolVisible);
    }
  }
  
  //affiche les lots d'élement qui nous sont disponibles
  afficheNBNombre(){
    this.visibleNombre(true);
    Sup.log("lotdivise ="+this.lotDivise);
    for(let i=0; i<16; i++){
      this.boutonTableau[i].setVisible(false);
      this.texteTableau[i].setVisible(false);
    }
    for(let i=0; i<this.lotDivise+1; i++){
      this.boutonTableau[i].setVisible(true);
      this.texteTableau[i].setVisible(true);
    }
  }
  
  cliqueBouton(){
    for (let i=0; i<16; i++){
       this.boutonTableau[i].fMouseInput.emitter.on("leftClickReleased", () => {
         //affecte a lotnombre selon le montant du bouton cliqué
         this.lotNombre = i;
         this.calculIA();
         //permet d'allez à l'affichage suivant
         this.valeur ++;
      });
    }
  }
  
  //on définit les variables pour chaque acteur
  affecteActor(){
    this.qInfo = Sup.getActor("Vue2").getChild("Texte").getChild("QInfo");
    this.etape1 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt1");
    this.etape2 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt2");
    this.etape3 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt3");
    this.etape4 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt4");
    this.etape5 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt5");
    for (let i = 0; i <6; i++){
      this.txtAffiche[i] = Sup.getActor("Vue2").getChild("Texte").getChild("TxtOutput"+i.toString());
    }
    this.boutonNombre = Sup.getActor("Vue2").getChild("Element").getChild("Bouton");
    this.texteNombre = Sup.getActor("Vue2").getChild("Element").getChild("Texte");
    this.camera = Sup.getActor("Camera");
    this.boutonTableau = Sup.getActor("Vue2").getChild("Element").getChild("Bouton").getChildren();
    this.texteTableau = Sup.getActor("Vue2").getChild("Element").getChild("Texte").getChildren();
    for (let i = 0; i <16; i++){
      let toto:string = "Sprite"+i.toString();
      new fMouseInput (this.boutonTableau[i]);
      this.boutonTableau[i].fMouseInput.setCameraActorName("Camera");
    }
    this.EnchereSprite = Sup.getActor("Vue2").getChild("Element").getChild("Enchere").getChild("Sprite").getChildren();
    this.EnchereTexte  = Sup.getActor("Vue2").getChild("Element").getChild("Enchere").getChild("Texte").getChildren();
    
  }
  
  //rajoute notre intention d'achat à celui des ordis
  calculIA(){
    Sup.log("lotNombre ds calculIA ="+this.lotNombre);
    Sup.log("iatotal ds calculIA ="+this.iaTotal);
    this.iaTotal = this.iaTotal+this.lotNombre;
    Sup.log("calculIA fait: "+this.iaTotal);
    
    this.lotDivise = this.iaTotal/4;
    this.lotDivise = Math.floor(this.lotDivise);
    Sup.log("lotDivise fin ="+this.lotDivise);
  }
  
  //pour afficher ou cacher les txtAffiche de 1 à 5, le 0 reste toujours visible
  visibleTxt(bool: boolean){
    for (let i = 1; i <6; i++){
      this.txtAffiche[i].setVisible(bool);
      Sup.log("visibleTxt: "+bool);
    }
  }
  
  reaffecteClick(){
    for (let i=0; i<16; i++){
        this.boutonTableau[i].fMouseInput.emitter.on("leftClickReleased", () => {
           Sup.log("et je clique");
           //affecte a lotnombre selon le montant du bouton cliqué
           this.lotChoisi = i;
           //permet d'allez à l'affichage suivant
           this.valeur ++;
           //cache les boutons
           this.visibleNombre(false);
           //affiche les boutons suivants
           this.visibleEnchere(true);
        }); }

  }
  
  
  
}
Sup.registerBehavior(ScriptAchatConcurrenceBehavior);
