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
  TxtSolde : Sup.TextRenderer;
  TxtduBoutonPropCom : Sup.Actor;
  
  //Les elements non visibles qui s'activent sur bouton proposition commerciale
  TabletteGrande : Sup.Actor;
  Contrat  : Sup.Actor;  
  
  numPropCom : number;
  list: string[] = ["Fnoc","Dorty","Belanger","Chemin De Vente","Tazamon","PetitBill","Lodl","Coforada","Tub","Phoneo"];
  
  nbLot : number;
  prixLot : number;
  
  prixLotTotal : number;
  
  awake() {
    
    jeuTour = 4;
    valVentesMar = 0;// on initialise les valeurs de vente, si aucune vente n est faite a la fin du mois on a le chiffre correct
    this.menus = Sup.getActor("Element").getChild("Bouton").getChildren();
    this.PropCommerciale = Sup.getActor("Element").getChild("Bouton").getChild("PropositionCommerciale");
    this.Realise = Sup.getActor("Element").getChild("Bouton").getChild("Realise");
    this.FinDesVentes = Sup.getActor("Element").getChild("Bouton").getChild("FinVente");
    this.Accepte = Sup.getActor("Element").getChild("Bouton").getChild("Accepte");
    this.Refuse = Sup.getActor("Element").getChild("Bouton").getChild("Refuse");
    
    this.TxtNBFini = Sup.getActor("Element").getChild("Variable").getChild("TxtNBFini").textRenderer;    
    this.TxtNBProp = Sup.getActor("Element").getChild("Variable").getChild("TxtNBProp").textRenderer;
    this.TxtProposition = Sup.getActor("Element").getChild("Variable").getChild("TxtProposition");
    this.TxtSolde = Sup.getActor("Element").getChild("Variable").getChild("TxtSolde").textRenderer;
    this.TxtduBoutonPropCom = Sup.getActor("Texte").getChild("Btn Prop Commerciale");
    
    this.TabletteGrande = Sup.getActor("Element").getChild("Image").getChild("TabletteGrande");
    this.Contrat = Sup.getActor("Element").getChild("Image").getChild("Contrat");
    
    this.numPropCom = nbCommercial*3;
    if(jeuMois==3 && jeuAnnee==2000){ //pour respecter le scenario
      this.numPropCom --;
    }
    this.initialiseBouton();
    this.cliqueBouton();
    updateMenu(this.menus);
    //this.visibleProp();
    this.prixLotTotal = 0;
    
  }

  update() {
    this.initialiseBouton();
    updateMenu(this.menus);
    noclic(this.menus);
    this.timer++;
    musicUpdate();
  }
  
  cliqueBouton(){

    //Initialise et rafraichit
    this.initialiseBouton();
    
    //on leur donne des instructions
    this.PropCommerciale.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.visibleProp();
      this.PropCommerciale.setVisible(false);
      this.TxtduBoutonPropCom.setVisible(false);
    });

    this.Realise.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("Realise");
      this.RealiseFunc();
    });
    
    this.FinDesVentes.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("FinDesVentes");
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    });
    
    this.Accepte.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("Accepte");
      this.ValideProp();
      if (this.numPropCom>0){
        this.PropCommerciale.setVisible(true);
        this.TxtduBoutonPropCom.setVisible(true);
      }
      
    });
    
    this.Refuse.fMouseInput.emitter.on("leftClickReleased", () => {
      this.musicPlayer.play();
      Sup.log("Refuse");
      this.RefuseProp();
      if (this.numPropCom>0){
        this.PropCommerciale.setVisible(true);
        this.TxtduBoutonPropCom.setVisible(true);
      }
    });
  }
  
  initialiseBouton(){
    this.TxtNBFini.setText(nbLotFini);
    this.TxtNBProp.setText(this.numPropCom);
    this.TxtSolde.setText("Solde : " + solde +" €");
  }
  
  visibleProp(){ //rend visible l'affichage de chaque proposition commerciale
    if (this.numPropCom > 0){
      this.genereProp();
      this.VisibleBool(true);
    }
  }
  
  genereProp(){ //créé une proposition concernant un stock de lot fini aleatoire (entre 1 et 4) et un prix unitaire aleatoire
    //this.PropCommerciale.setVisible(false);
    //Sup.getActor("Texte").getChild("Btn Prop Commerciale").setVisible(false);
    let nomEntreprise : string;
    nomEntreprise = this.list[Math.floor((Math.random() * 9) + 0)]
    this.nbLot = Math.floor((Math.random() * 4) + 1);
    Sup.log(this.nbLot);
    this.prixLot = 200 * Math.floor((Math.random() * 10) + 5);
    Sup.log(this.prixLot);
    this.TxtProposition.textRenderer.setText("L'entreprise " + nomEntreprise +" vous propose à l'achat \n "+ this.nbLot +" "+ gereS(this.nbLot, "lot") + " de téléphones portables \n au prix de "+ this.prixLot* this.nbLot +" €. \n Soit un prix unitaire de "+ this.prixLot +" €. \n Voulez-vous accepter ?");
    
  }
  
  ValideProp(){ //fonction qui est appeler lors du clic sur le bouton valider
    if(this.numPropCom>0){
      this.VisibleBool(false);
      if (nbLotFini >= this.nbLot){
        nbLotFini -= this.nbLot;
        this.decaleGain();
        this.calculGainCompte();
        
        valVentesMar += (this.nbLot * this.prixLot);
        nbLotTotalVendu += this.nbLot;
        this.prixLotTotal += (this.nbLot * this.prixLot);
      }else{
        this.TabletteGrande.setVisible(true);
        this.TxtProposition.textRenderer.setText("Vous n'avez pas assez de lots en stock \n pour accepter cette proposition.");
        this.TxtProposition.setVisible(true);
      }
    }else{
      this.VisibleBool(false);
      //this.PropCommerciale.setVisible(false);
      //Sup.getActor("Texte").getChild("Btn Prop Commerciale").setVisible(false);
    }
    this.numPropCom --;
  }
  
  RefuseProp(){
    this.VisibleBool(false);
    this.numPropCom --;
  }
  
  VisibleBool(bool: boolean){ //le boolean permet de savoir si les elements sont visibles
    this.TabletteGrande.setVisible(bool);
    this.Contrat.setVisible(bool);
    this.Accepte.setVisible(bool);
    this.Refuse.setVisible(bool);
    this.TxtProposition.setVisible(bool);
  }
  
  RealiseFunc(){
    this.TabletteGrande.setVisible(true);
    this.TxtProposition.setVisible(true);
    Sup.log("Vous avez vendu "+ nbLotTotalVendu +" "+ gereS(nbLotTotalVendu, "lot") + " de téléphones portables \n au prix de "+ this.prixLotTotal +" €. \n");
    this.TxtProposition.textRenderer.setText("Vous avez vendu "+ nbLotTotalVendu +" "+ gereS(nbLotTotalVendu, "lot") + " de téléphones portables \n au prix de "+ this.prixLotTotal +" €. \n");
  }
  
  decaleGain(){
    if ( nbComptable >= 1){
    venteEnAttenteM0 = venteEnAttenteM1;
    venteEnAttenteM1 = venteEnAttenteM2;
    venteEnAttenteM2 = venteEnAttenteM3;
    venteEnAttenteM3 = venteEnAttenteMx;
    }
  }
  
  calculGainCompte(){
    if ( (jeuMois <= 6 && jeuAnnee == 2000) || nbComptable == 3){//cas particulier on commence le jeu et l assistant remplace trois comptables
      venteEnAttenteM1 += (this.nbLot * this.prixLot);
    }else if(nbComptable == 2){
      venteEnAttenteM2 += (this.nbLot * this.prixLot);
      }else if(nbComptable == 1){
        venteEnAttenteM3 += (this.nbLot * this.prixLot);
        }else{
          venteEnAttenteMx += (this.nbLot * this.prixLot); 
        }
  }
  
  
}
Sup.registerBehavior(ScriptVendreBehavior);