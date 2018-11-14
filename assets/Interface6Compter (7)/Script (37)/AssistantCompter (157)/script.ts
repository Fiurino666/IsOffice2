class AssistantCompterBehavior extends Sup.Behavior {
  //on declare les boutons
  Suivant : Sup.Actor;
  Titre : Sup.TextRenderer;
  Texte : Sup.TextRenderer;
  camera : Sup.Actor;
  Bouton : Sup.Actor;
  TexteBouton : Sup.Actor;
  menus : Sup.Actor[];
  estVisible : boolean;
  iaArray = new Array(3);
  
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });
  
  awake() {
    this.Suivant = Sup.getActor("Vue2").getChild("Texte").getChild("Suivant");
    this.Texte = Sup.getActor("Vue2").getChild("Texte").getChild("Parle").textRenderer;
    this.Titre = Sup.getActor("Vue2").getChild("Texte").getChild("Titre").textRenderer;
    this.camera = Sup.getActor("Camera");
    this.Bouton = Sup.getActor("Vue2").getChild("Bouton");
    this.menus = Sup.getActor("Vue2").getChild("Bouton").getChildren();
    this.TexteBouton = Sup.getActor("Vue2").getChild("TexteBouton");
    this.Titre.setText("Mois : "+moisDeLannee()+" de l'année "+ jeuAnnee);
    this.scenario();
    this.cliqueBouton();
    this.cliqueFin();
  }

  update() {
    musicUpdate();
    if(this.estVisible){updateMenu(this.menus);}
  }
  
  cliqueBouton(){
    this.Suivant.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.Bouton.setVisible(true);
      this.TexteBouton.setVisible(true);
      this.Suivant.setVisible(false);
      this.musicPlayer.play();
      this.estVisible = true;
    });
  }
  
   cliqueFin(){
    this.Bouton.getChild("Ok").fMouseInput.emitter.on("leftClickReleased", () => { 
      clicVisuel(this.Bouton.getChild("Ok"));
      this.musicPlayer.play();
      Sup.log("FinDuMois");
      this.camera.moveY(-11);
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    });
  }                                    
  
  scenario(){
    if (jeuMois == 7){
      this.Texte.setText("Je ne peux malheureusement plus assurer  \n \
      mes fonctions de comptable, les six mois sont finis.  \n \
       Vous devez maintenant engager un comtpable qualifié, \n \
      mais n'oubliez pas qu'un comptable seul vous permet \n \
      d'être payé en 3 mois, 2 comptables en 2 mois,  \n \
      et 3 comptables en un mois comme actuellement.");
    }else{
      this.evenement();
    }
  }
  
  evenement(){
    if(valResultatM <0){
      this.iaArray[0] = "engagé assez de commerciaux";
      this.iaArray[1] = "engagé assez d'ouvrier'";
      this.iaArray[2] = "acheté assez de composant";
      var rng = new RNG(String(Math.random()));
      this.Texte.setText("Votre résultat est négatif, il va falloir s'améliorer. Avez vous "+this.iaArray[rng.random(0, 2)] +"?");
    }else {
      this.Texte.setText("Votre résultat est positif");
    }
  }
}
Sup.registerBehavior(AssistantCompterBehavior);
