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
  Assistant : Sup.Actor;
  Ennemi : Sup.Actor;
  
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });
  
  awake() {
    this.Suivant = Sup.getActor("Vue2").getChild("Texte").getChild("Suivant");
    this.Texte = Sup.getActor("Vue2").getChild("Texte").getChild("Parle").textRenderer;
    this.Titre = Sup.getActor("Vue2").getChild("Texte").getChild("Titre").textRenderer;
    this.camera = Sup.getActor("Camera");
    this.Bouton = Sup.getActor("Vue2").getChild("Bouton");
    this.menus = Sup.getActor("Vue2").getChild("Bouton").getChildren();
    this.TexteBouton = Sup.getActor("Vue2").getChild("TexteBouton");
    this.Assistant = Sup.getActor("Vue2").getChild("Assistant");
    this.Ennemi = Sup.getActor("Vue2").getChild("Ennemi");
    this.scenario();
    this.cliqueBouton();
    this.cliqueFin();
    this.Titre.setText("Mois : "+moisDeLannee()+" de l'année "+ jeuAnnee);
    this.gestionMois();
    //ScriptTextAchatBehavior.caller("this.update");
  }

  update() {
    musicUpdate();
    if(this.estVisible){
      updateMenu(this.menus);
    }
  }
  
  gestionMois(){
    jeuMois++;
    jeuTour=0;
    if(jeuMois == 13){
      jeuMois = 1;
      jeuAnnee ++;
    }
    Sup.log("jeuMois : "+jeuMois);
  }
  
  cliqueBouton(){
    this.Suivant.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.Bouton.setVisible(true);
      this.TexteBouton.setVisible(true);
      this.Suivant.setVisible(false);
      this.musicPlayer.play();
      this.estVisible = true;
      this.Suivant.setVisible(false);
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
    if (jeuMois == 3 && jeuAnnee == anneeDepart){
       this.Texte.setText("Oh non, la concurrence sort un nouveau produit  \n \
        ils ont décidé de l'appeler 3310  \n \
        Et c'est Mokia qui le lance. \n \
        Pensez vous que ça va marcher? \n \
        De toute façon je crois en vous,  \n \
        grace à la puissance de la grenouille,  \n \
        notre animal totem. \n \
        Vous avez un contrat commercial en moins ce tour.");
      
    }else{
      if (jeuMois == 7 && jeuAnnee == anneeDepart){
        this.Texte.setText("Je ne peux malheureusement plus assurer  \n \
        mes fonctions de comptable, les six mois sont finis.  \n \
         Vous devez maintenant engager un comptable qualifié, \n \
        mais n'oubliez pas qu'un comptable seul vous permet \n \
        d'être payé en 3 mois, 2 comptables en 2 mois,  \n \
        et 3 comptables en un mois comme actuellement.");
      }
      else{
        if (jeuMois == 1 && jeuAnnee == anneeDepart+1){
          this.Texte.setText("Bonjour à toi ver de terre  \n \
        je suis stef Mobs patron d'Appel, \n \
        il parait que vous chercher à vous faire  \n \
        une place dans le secteur. \n \
        Il n'y a que le design qui compte  \n \
        et nos clients sont maitre de leur destin.  \n \
        Attendez vous à des soucis à l'avenir.");
        this.Assistant.setVisible(false);
        this.Ennemi.setVisible(true);
        }else{
          this.Assistant.setVisible(true);
          this.Ennemi.setVisible(false);
          this.evenement();
        }
      }
    }
  }
  
  evenement(){
    if(this.camera.getBehavior(ScriptCompterBehavior).valResultat <= 0){
      this.iaArray[0] = "engagé assez de commerciaux";
      this.iaArray[1] = "engagé assez d'ouvrier'";
      this.iaArray[2] = "acheté assez de composant";
      this.iaArray[3] = "mis des enchères assez hautes";
      var rng = new RNG(String(Math.random()));
      this.Texte.setText("Votre résultat est négatif,\n \
      il va falloir s'améliorer. Avez vous \n \
      "+this.iaArray[rng.random(0, 3)] +"?");
    }else {
      this.Texte.setText("Votre résultat est positif");
    }
  }
  
  
}
Sup.registerBehavior(AssistantCompterBehavior);
