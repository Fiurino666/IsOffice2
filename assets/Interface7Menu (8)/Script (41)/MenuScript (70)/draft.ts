class MenuScriptBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  
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
    const behaNouvellePartie = this.btnNouvellePartie..fMouseInput.emitter.on("leftClickReleased", () => { ;
    behaNouvellePartie.onClick = () => {
        Sup.log(" btnNouvellePartie");
      clicVisuel(this.btnNouvellePartie);
      };
    const behaCharger = this.btnCharger.getBehavior(ButtonBehavior);
    behaCharger.onClick = () => {
      Sup.log(" btnCharger");
      clicVisuel(this.btnCharger);
    };
    const behaSauvegarder = this.btnSauvegarder.getBehavior(ButtonBehavior);
    behaSauvegarder.onClick = () => {
      Sup.log(" btnSauvegarder");
      clicVisuel(this.btnSauvegarder);
    };
    const behaFermerMenu = this.btnFermerMenu.getBehavior(ButtonBehavior);
    behaFermerMenu.onClick = () => {
      Sup.log(" fermerMenu");
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    };
    const behaQuitterJeu = this.btnQuitterJeu.getBehavior(ButtonBehavior);
    behaQuitterJeu.onClick = () => {
      Sup.log(" btnQuitterJeu");
      clicVisuel(this.btnQuitterJeu);
      Sup.exit();
    };
    const behaCredits = this.btnCredits.getBehavior(ButtonBehavior);
    behaCredits.onClick = () => {
      Sup.log(" btnCredits");
      clicVisuel(this.btnCredits);
    };
    const behaScore = this.btnScore.getBehavior(ButtonBehavior);
    behaScore.onClick = () => {
      Sup.log(" btnScore");
      clicVisuel(this.btnScore);
    };
    const behaSiteInternet = this.btnSiteInternet.getBehavior(ButtonBehavior);
    behaSiteInternet.onClick = () => {
      Sup.log(" btnSiteInternet");
      clicVisuel(this.btnSiteInternet);
    };
    const behaTutoriel = this.btnTutoriel.getBehavior(ButtonBehavior);
    behaTutoriel.onClick = () => {
      Sup.log(" btnTutoriel");
      clicVisuel(this.btnTutoriel);
    };
  }
  
  update() {
    updateMenu(this.menus);
    noclic(this.menus);
  }

}
Sup.registerBehavior(MenuScriptBehavior);
