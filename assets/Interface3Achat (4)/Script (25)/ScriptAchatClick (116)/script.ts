class ScriptAchatClickBehavior extends Sup.Behavior {
  
  menus1 : Sup.Actor[];
  menus2 : Sup.Actor[];
  btnEcran : Sup.Actor;
  btnChassis : Sup.Actor;
  btnComposant : Sup.Actor;
  camera : Sup.Actor;
  quitChoix : Sup.Actor;
  quitElement : Sup.Actor;
  txtEcran : Sup.Actor;
  txtChassis : Sup.Actor;
  txtComposant : Sup.Actor;
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.1, { loop: false });;
  timer: number;
    
  awake() {
    musicAwake();
    this.menus1 = Sup.getActor("Vue1").getChild("Element").getChildren();
    this.btnEcran = Sup.getActor("Vue1").getChild("Element").getChild("Ecran");
    this.btnChassis = Sup.getActor("Vue1").getChild("Element").getChild("Chassis");
    this.btnComposant = Sup.getActor("Vue1").getChild("Element").getChild("Composant");
    this.txtEcran = Sup.getActor("Vue1").getChild("Texte").getChild("TxtEcran");
    this.txtChassis = Sup.getActor("Vue1").getChild("Texte").getChild("TxtChassis");
    this.txtComposant = Sup.getActor("Vue1").getChild("Texte").getChild("TxtComposant");
    this.camera = Sup.getActor("Camera");
    this.quitChoix = Sup.getActor("Vue1").getChild("Texte").getChild("Quit");
    this.initialise();
    //this.menus2 = Sup.getActor("Vue2").getChild("Element").getChildren();
    this.quitElement = Sup.getActor("Vue2").getChild("Texte").getChild("Quit");
    this.timer = 0;
    element = "";
    boolClique = true;
    
  }
  
  update() {
    musicUpdate();
    this.timer ++;
    updateMenu(this.menus1);
    noclic(this.menus1);
    //updateMenu(this.menus2);
    //noclic(this.menus2);
    //this.testSortie();
    this.initialise();
    if ((this.timer = 25) && boolClique){
      this.attribuClique();
      boolClique = false;
    }    
  }  
  
  //rend au demarrage de la fenetre tous les boutons visibles
  initialise(){
    if(boolVisibleEcran){
      this.btnEcran.setVisible(true);
      this.txtEcran.setVisible(true);
    }
    else{
      this.btnEcran.setVisible(false);
      this.txtEcran.setVisible(false);
    }
    if(boolVisibleComposant){
      this.btnComposant.setVisible(true);
      this.txtComposant.setVisible(true);
    }
    else{
      this.btnComposant.setVisible(false);
      this.txtComposant.setVisible(false);
    }
    if(boolVisibleChassis){
      this.btnChassis.setVisible(true);
      this.txtChassis.setVisible(true);
    }
    else{
      this.btnChassis.setVisible(false);
      this.txtChassis.setVisible(false);
    }
}
  
  quitteEcran(param){
    if(this.timer > valTimer){
      jeuTour = param;
      Sup.log("quitteEcran "+param);
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      this.timer = 0;
    }
  }
  
  testSortie(){
    //on teste si on a cliquer sur les trois elements
    if(!boolVisibleEcran && !boolVisibleComposant && !boolVisibleChassis){
      //permet de quitter la partie achat pour passer a production etape 3
      boolVisibleEcran = true;
      boolVisibleComposant = true;
      boolVisibleChassis = true;
      this.initialise();
      this.quitteEcran(2);      
    }
  }
  
  defTimer(timer: number){
    this.timer = timer;
  }
  
  attribuClique(){
    this.btnEcran.fMouseInput.emitter.once("leftClickReleased", () => {
      this.elementClique("ecran");
    });
    this.btnChassis.fMouseInput.emitter.once("leftClickReleased", () => { 
      this.elementClique("chassis");
    });
    this.btnComposant.fMouseInput.emitter.once("leftClickReleased", () => {
      this.elementClique("composant");
    });
    
    //on gere le clique sur les textes aussi
    this.txtEcran.fMouseInput.emitter.once("leftClickReleased", () => {
     this.elementClique("ecran");
    });
    this.txtChassis.fMouseInput.emitter.once("leftClickReleased", () => { 
      this.elementClique("chassis");
    });
    this.txtComposant.fMouseInput.emitter.once("leftClickReleased", () => {
      this.elementClique("composant");
    });

    this.quitElement.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" behaEcran");
      this.camera.moveY(-11);
      this.testSortie();
    });
  }
  
  elementClique(ele: string){
    //pour savoir quel element a ete cliquer on le transmet a la variable globale
    element = ele;
    //on deplace la camera vers le haut pour la suite
    this.camera.moveY(11);
    //on charge le script qui permet de continuer l'achat selon le choix du joueur
    this.camera.addBehavior(ScriptAchatConcurrenceBehavior);
    //on charge le script pour faire defiler le texte
    this.camera.addBehavior(ScriptTextAchatBehavior);
  }
  
}
Sup.registerBehavior(ScriptAchatClickBehavior);
