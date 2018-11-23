class BanqueScriptBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.1, { loop: false });;
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
  txtMontant: Sup.Actor;
  txtDuree: Sup.Actor;
  txtLoyer: Sup.Actor;
  txtMois: Sup.Actor;
  
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
    
    this.txtMontant = Sup.getActor("Variable").getChild("txtMontant");
    this.txtDuree = Sup.getActor("Variable").getChild("txtDuree");
    this.txtLoyer = Sup.getActor("Variable").getChild("txtLoyer");
    this.txtMois = Sup.getActor("Variable").getChild("txtMois");
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
       this.calculEmprunt();
      });
    this.btnMontant2.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
       this.calculEmprunt();
      
      });
    this.btnMontant3.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
       this.calculEmprunt();
      
      });
    this.btnMois12.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
       this.calculEmprunt();
      
      });
    this.btnMois24.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
       this.calculEmprunt();
      
      });
    this.btnValider.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.valideEmprunt();
      });
  }

  update() {
    musicUpdate();
    updateMenu(this.menus);
    noclic(this.menus);
    this.empruntDejaCommencer();
    
  }
  
  calculEmprunt(){ //affichage de l'emprunt
    
  }
  
  valideEmprunt(){ //pour envoyer la demande d'emprunt en cours
    
  }
  
  empruntDejaCommencer(){ //affiche les boutons seulement si l'emprunt est possible
    
  }
}
Sup.registerBehavior(BanqueScriptBehavior);
