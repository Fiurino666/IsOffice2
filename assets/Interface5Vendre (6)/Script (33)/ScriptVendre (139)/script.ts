class ScriptVendreBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });;
  //le timer permet de ne pas revenir au menu precedent lors de deux clics trop proche
  timer: number = 0;
  
  //on declare les boutons
  PropCommerciale : Sup.Actor;
  Realise : Sup.Actor;
  FinDesVentes : Sup.Actor;
  Accepte : Sup.Actor;
  Refuse : Sup.Actor;
  
  //les affichages de texte
  TxtNBFini : Sup.TextRenderer;
  TxtProposition : Sup.Actor;
  TxtNBProp : Sup.TextRenderer;
  
  //Les elements non visibles qui s'activent sur bouton proposition commerciale
  TabletteGrande : Sup.Actor;
  Contrat  : Sup.Actor;  
  
  numPropCom : number;
  
  awake() {
    
    /************ */
    nbCommercial = 2;
    nbLotFini = 3;
    /* *******/
    jeuTour = 4;
    this.menus = Sup.getActor("Element").getChild("Bouton").getChildren();
    this.PropCommerciale = Sup.getActor("Element").getChild("Bouton").getChild("PropositionCommerciale");
    this.Realise = Sup.getActor("Element").getChild("Bouton").getChild("Realise");
    this.FinDesVentes = Sup.getActor("Element").getChild("Bouton").getChild("FinVente");
    this.Accepte = Sup.getActor("Element").getChild("Bouton").getChild("Accepte");
    this.Refuse = Sup.getActor("Element").getChild("Bouton").getChild("Refuse");
    
    this.TxtNBFini = Sup.getActor("Element").getChild("Variable").getChild("TxtNBFini").textRenderer;    
    this.TxtNBProp = Sup.getActor("Element").getChild("Variable").getChild("TxtNBProp").textRenderer;
    this.TxtProposition = Sup.getActor("Element").getChild("Variable").getChild("TxtProposition");
    
    this.TabletteGrande = Sup.getActor("Element").getChild("Image").getChild("TabletteGrande");
    this.Contrat = Sup.getActor("Element").getChild("Image").getChild("Contrat");
    
    this.numPropCom = nbCommercial*3;
    this.initialiseBouton();
    this.cliqueBouton();
    updateMenu(this.menus);
    //this.visibleProp();
    
    
  }

  update() {
    this.initialiseBouton();
    updateMenu(this.menus);
    noclic(this.menus);
    this.timer++;
  }
  
  cliqueBouton(){

    //Initialise et rafraichit
    this.initialiseBouton();
    
    //on leur donne des instructions
    this.PropCommerciale.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.visibleProp();
    });

    this.Realise.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("Realise");
    });
    
    this.FinDesVentes.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("FinDesVentes");
    });
    
    this.Accepte.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("Accepte");
    });
    
    this.Refuse.fMouseInput.emitter.on("leftClickReleased", () => {
      this.musicPlayer.play();
      Sup.log("Refuse");
    });
    
    
  }
  
  initialiseBouton(){
    this.TxtNBFini.setText(nbLotFini);
    this.TxtNBProp.setText(this.numPropCom);
    
  }
  
  visibleProp(){ //rend visible l'affichage de chaque proposition commerciale
    if (this.numPropCom > 0){
      this.genereProp();
    }
    this.TabletteGrande.setVisible(true);
    this.Contrat.setVisible(true);
    this.Accepte.setVisible(true);
    this.Refuse.setVisible(true);
    this.TxtProposition.setVisible(true);
  }
  
  genereProp(){ //créé une proposition concernant un stock de lot fini aleatoire (entre 1 et 4) et un prix unitaire aleatoire
    let nomEntreprise : string;
    let nbLot : number;
    let prixLot : number;
    nbLot = Math.floor((Math.random() * 4) + 1);
    Sup.log(nbLot);
    prixLot = 300 * Math.floor((Math.random() * 10) + 5);
    Sup.log(prixLot);
    this.TxtProposition.textRenderer.setText("L'entreprise " + nomEntreprise +" vous propose à l'achat \n "+ nbLot +" "+ gereS(nbLot, "lot") + " de téléphones portables \n au prix de "+ prixLot* nbLot +" €. \n Soit un prix unitaire de "+ prixLot +" € \n Voulez-vous accepter ?");
    this.numPropCom --;
  }
  
  
  
}
Sup.registerBehavior(ScriptVendreBehavior);
