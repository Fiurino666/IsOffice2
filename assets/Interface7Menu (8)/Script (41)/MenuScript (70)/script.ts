class MenuScriptBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.1, { loop: false });;
  btnNouvellePartie : Sup.Actor;
  btnCharger : Sup.Actor;
  btnSauvegarder : Sup.Actor;
  btnFermerMenu : Sup.Actor;
  btnQuitterJeu : Sup.Actor;
  btnCredits : Sup.Actor;
  btnScore : Sup.Actor;
  btnSiteInternet : Sup.Actor;
  btnTutoriel : Sup.Actor;
  
  awake() {
    musicAwake();
    this.menus = Sup.getActor("Bouton").getChildren();
    this.btnNouvellePartie = Sup.getActor("Bouton").getChild("btnNouvellePartie");
    this.btnCharger = Sup.getActor("Bouton").getChild("btnCharger");
    this.btnSauvegarder = Sup.getActor("Bouton").getChild("btnSauvegarder");
    this.btnFermerMenu = Sup.getActor("Bouton").getChild("btnFermerMenu");
    this.btnQuitterJeu = Sup.getActor("Bouton").getChild("btnQuitterJeu");
    this.btnCredits = Sup.getActor("Bouton").getChild("btnCredits");
    this.btnScore = Sup.getActor("Bouton").getChild("btnScore");
    this.btnSiteInternet = Sup.getActor("Bouton").getChild("btnSiteInternet");
    this.btnTutoriel = Sup.getActor("Bouton").getChild("btnTutoriel");
  }
  
  start() {
  //on relie les boutons et on leur attribue l'action du click
    this.btnNouvellePartie.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnNouvellePartie");
      clicVisuel(this.btnNouvellePartie);
       Sup.loadScene("Interface0Personnalisation/Scene/ScenePerso");
      });
    this.btnCharger.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnCharger");
      clicVisuel(this.btnCharger);
    });
    this.btnSauvegarder.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnSauvegarder");
      clicVisuel(this.btnSauvegarder);
    });
    this.btnFermerMenu.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" fermerMenu");
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    });
    this.btnQuitterJeu.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnQuitterJeu");
      clicVisuel(this.btnQuitterJeu);
      Sup.exit();
    });
    this.btnCredits.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnCredits");
      clicVisuel(this.btnCredits);
    });
    this.btnScore.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnScore");
      clicVisuel(this.btnScore);
    });
    this.btnSiteInternet.fMouseInput.emitter.on("leftClickReleased", () => { 
      window.open("http://isoffice.nepita.eu/"); 
      this.musicPlayer.play();
      Sup.log(" btnSiteInternet");
      clicVisuel(this.btnSiteInternet);
    });
    this.btnTutoriel.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnTutoriel");
      clicVisuel(this.btnTutoriel);
    });
  }
  
  update() {
    musicUpdate();
    updateMenu(this.menus);
    noclic(this.menus);
  }

}
Sup.registerBehavior(MenuScriptBehavior);
