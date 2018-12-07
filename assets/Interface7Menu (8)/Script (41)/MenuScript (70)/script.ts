class MenuScriptBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.1, { loop: false });
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
      this.reinitialise();
       Sup.loadScene("Interface0Personnalisation/Scene/ScenePerso");
      });
    this.btnCharger.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnCharger");
      clicVisuel(this.btnCharger);
      apiLire();
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    });
    this.btnSauvegarder.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" btnSauvegarder");
      clicVisuel(this.btnSauvegarder);
      apiSauve();
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
    
    if (Sup.Input.wasKeyJustPressed("ECHAP")) {
      this.musicPlayer.play();
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    }
  }
  
  reinitialise(){
     jeuTour = 0;
     jeuMois = 0;
     nbOuvrier = 0;
     nbCommercial = 0;
     nbComptable = 0;
     nbEcran = 0;
     nbChassis = 0;
     nbComposant = 0;
     nbElementM = 0; 
     nbLotFini = 0;
     nbLotFiniM = 0; 
     nbLotTotalAcheter = 0; 
     nbLotTotalVendu = 0; 

     solde = 20000;

     valAchatMar = 0; //Les achats de marchandises.
     valSalaires = 0; //les charges salariales.
     valChargesFin = 0; //les charges financieres présente les intérêts des emprunts en cours
     valChargesExc = 0; //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur
     valVentesMar = 0; //les ventes de marchandises
     valProduitsFin = 0; //les produits financiers lorsque l'on fait un emprunt
     valProduitsExc = 0; //évènements aléatoires impactant positivement notre solde

     valAchatMarM = 0; //Les achats de marchandises M-1
     valSalairesM = 0; //les charges salariales M-1
     valChargesFinM = 0; //les charges financieres présente les intérêts des emprunts en cours M-1
     valChargesExcM = 0; //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur M-1
     valVentesMarM = 0; //les ventes de marchandises M-1
     valProduitsFinM = 0; //les produits financiers lorsque l'on fait un emprunt M-1
     valProduitsExcM = 0; //évènements aléatoires impactant positivement notre solde M-1
     valVarStoPiM = 0; //stocke le nombre de piece en stock du mois dernier
     valResultatM = 0;
  }

}
Sup.registerBehavior(MenuScriptBehavior);
