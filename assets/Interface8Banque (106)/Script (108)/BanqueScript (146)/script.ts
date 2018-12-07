class BanqueScriptBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.1, { loop: false });
  btnFermerBanque : Sup.Actor;
  btnMontant1 : Sup.Actor;
  btnMontant2 : Sup.Actor;
  btnMontant3 : Sup.Actor;
  btnMois12 : Sup.Actor;
  btnMois24 : Sup.Actor;
  btnValider : Sup.Actor;
  affMontant1 : Sup.Actor;
  affMontant2 : Sup.Actor;
  affMontant3 : Sup.Actor;
  affDur12 : Sup.Actor;
  affDur24 : Sup.Actor;
  affMois : Sup.Actor;
  
  txtMontant: Sup.Actor;
  txtDuree: Sup.Actor;
  txtLoyer: Sup.Actor;
  txtMois: Sup.Actor;
  affValide : Sup.Actor;
  varMontant: number = 25000;
  varDuree: number = 12;
  
  
  awake() {
    musicAwake();
    this.menus = Sup.getActor("Bouton").getChildren();
    this.btnFermerBanque = Sup.getActor("Texte").getChild("Quit");
    this.btnMontant1 = Sup.getActor("Bouton").getChild("Montant1");
    this.btnMontant2 = Sup.getActor("Bouton").getChild("Montant2");
    this.btnMontant3 = Sup.getActor("Bouton").getChild("Montant3");
    this.btnMois12 = Sup.getActor("Bouton").getChild("Court");
    this.btnMois24 = Sup.getActor("Bouton").getChild("Long");
    this.btnValider = Sup.getActor("Bouton").getChild("Valider");
    
    this.affMontant1 = Sup.getActor("Texte").getChild("AffMontant1");
    this.affMontant2 = Sup.getActor("Texte").getChild("AffMontant2");
    this.affMontant3 = Sup.getActor("Texte").getChild("AffMontant3");
    this.affDur12 = Sup.getActor("Texte").getChild("AffDur12");
    this.affDur24 = Sup.getActor("Texte").getChild("AffDur24");    
    this.affValide = Sup.getActor("Texte").getChild("AffValide");  
    this.affMois = Sup.getActor("Texte").getChild("Mois");
    
    this.txtMontant = Sup.getActor("Variable").getChild("txtMontant");
    this.txtDuree = Sup.getActor("Variable").getChild("txtDuree");
    this.txtLoyer = Sup.getActor("Variable").getChild("txtLoyer");
    this.txtMois = Sup.getActor("Variable").getChild("txtMois");
    this.calculEmprunt();
  }
  
  start() {
  //on relie les boutons et on leur attribue l'action du click
    this.btnFermerBanque.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" Quit");
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      });
    
    this.btnMontant1.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.varMontant = 25000;
      this.calculEmprunt();
      });
    this.btnMontant2.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.varMontant = 50000;
      this.calculEmprunt();
      
      });
    this.btnMontant3.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.varMontant = 75000;
      this.calculEmprunt();
      
      });
    this.btnMois12.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.varDuree = 12;
      this.calculEmprunt();
      
      });
    this.btnMois24.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.varDuree = 24;
      this.calculEmprunt();
      
      });
    this.btnValider.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.valideEmprunt();
      this.calculEmprunt();
      });
  }

  update() {
    musicUpdate();
    updateMenu(this.menus);
    noclic(this.menus);
    this.empruntDejaCommencer();
    
  }
  
  calculEmprunt(){ //affichage de l'emprunt
    this.txtMontant.textRenderer.setText(this.varMontant.toLocaleString()+" €");
    this.txtDuree.textRenderer.setText(this.varDuree+" mois");
    let varAff = Math.round(this.varMontant/this.varDuree);
    this.txtLoyer.textRenderer.setText(varAff.toLocaleString()+" €");
    this.txtMois.textRenderer.setText(varMoisREmp+" mois");
  }
  
  valideEmprunt(){ //pour envoyer la demande d'emprunt en cours
    empruntDC = true;
    empruntCeMois = true;
    solde += this.varMontant;
    varMoisREmp = this.varDuree;
    varMoisFinEmp = this.varDuree + jeuMois;
    if (varMoisFinEmp <25){
      varMoisFinEmp -= 12;
      varAnFinEmp = jeuAnnee+1;
    }else{
      varMoisFinEmp -= 24;
      varAnFinEmp = jeuAnnee+2;
    }
    valChargesFin = Math.round(this.varMontant/this.varDuree);
    valProduitsFin = this.varMontant;
  }
  
  empruntDejaCommencer(){ //affiche les boutons seulement si l'emprunt est possible
    if (empruntDC){
        this.btnMontant1.setVisible(false);
        this.btnMontant2.setVisible(false);
        this.btnMontant3.setVisible(false);
        this.btnMois12.setVisible(false);
        this.btnMois24.setVisible(false);
        this.btnValider.setVisible(false);

        this.affMontant1.setVisible(false);
        this.affMontant2.setVisible(false);
        this.affMontant3.setVisible(false);
        this.affDur12.setVisible(false);
        this.affDur24.setVisible(false);
        this.affValide.setVisible(false);
        this.affMois.setVisible(false);
    }else{
      this.btnMontant1.setVisible(true);
      this.btnMontant2.setVisible(true);
      this.btnMontant3.setVisible(true);
      this.btnMois12.setVisible(true);
      this.btnMois24.setVisible(true);
      this.btnValider.setVisible(true);

      this.affMontant1.setVisible(true);
      this.affMontant2.setVisible(true);
      this.affMontant3.setVisible(true);
      this.affDur12.setVisible(true);
      this.affDur24.setVisible(true);
      this.affValide.setVisible(true);
      this.affMois.setVisible(true);
    }
  }
}
Sup.registerBehavior(BanqueScriptBehavior);
