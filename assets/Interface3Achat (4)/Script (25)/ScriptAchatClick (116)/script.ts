//savoir quel element a été cliqué
var element : String;
//savoir si les valeurs on été cliqués
var boolVisibleEcran : boolean = true;
var boolVisibleChassis : boolean = true;
var boolVisibleComposant : boolean = true;

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
  
  timer: number = 0;
  
  awake() {
    this.menus1 = Sup.getActor("Vue1").getChild("Element").getChildren();
    this.btnEcran = Sup.getActor("Vue1").getChild("Element").getChild("Ecran");
    this.btnChassis = Sup.getActor("Vue1").getChild("Element").getChild("Chassis");
    this.btnComposant = Sup.getActor("Vue1").getChild("Element").getChild("Composant");
    this.txtEcran = Sup.getActor("Vue1").getChild("Texte").getChild("TxtEcran");
    this.txtChassis = Sup.getActor("Vue1").getChild("Texte").getChild("TxtChassis");
    this.txtComposant = Sup.getActor("Vue1").getChild("Texte").getChild("TxtComposant");
    this.camera = Sup.getActor("Camera");
    this.quitChoix = Sup.getActor("Vue1").getChild("Texte").getChild("Quit");
    
    //this.menus2 = Sup.getActor("Vue2").getChild("Element").getChildren();
    this.quitElement = Sup.getActor("Vue2").getChild("Texte").getChild("Quit");
  }
  
  start() {
    this.initialise();
    this.btnEcran.fMouseInput.emitter.on("leftClickReleased", () => { 
      //on cache les boutons utilises
      this.btnEcran.setVisible(false);
      this.txtEcran.setVisible(false);
      //variable qui permet de savoir quel bouton a ete cliquer
      element = "ecran";
      //on deplace la camera vers le haut pour la suite
      this.camera.moveY(11);
      //on charge le script qui permet de continuer l'achat selon le choix du joueur
      this.camera.addBehavior(ScriptAchatConcurrenceBehavior);
    });
    this.btnChassis.fMouseInput.emitter.on("leftClickReleased", () => { 
      Sup.log(" behChassis");
      this.btnChassis.setVisible(false);
      this.txtChassis.setVisible(false);
      element = "chassis";
      this.camera.moveY(11);
      this.camera.addBehavior(ScriptAchatConcurrenceBehavior);
    });
    this.btnComposant.fMouseInput.emitter.on("leftClickReleased", () => { 
      Sup.log(" behaComposant");
      this.btnComposant.setVisible(false);
      this.txtComposant.setVisible(false);
      element = "composant";
      this.camera.moveY(11);
      this.camera.addBehavior(ScriptAchatConcurrenceBehavior);
    });
    this.quitChoix.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.quitteEcran(1);
    });
    this.quitElement.fMouseInput.emitter.on("leftClickReleased", () => { 
      Sup.log(" behaEcran");
      this.camera.moveY(-11);
      this.camera.getBehavior(ScriptAchatConcurrenceBehavior).destroy;
      this.testSortie();
    });
    
  }

  update() {
    this.timer ++;
    updateMenu(this.menus1);
    noclic(this.menus1);
    //updateMenu(this.menus2);
    //noclic(this.menus2);
    
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
    
    
    
    element = "";
  }
  
  quitteEcran(param){
    if(this.timer > 90){
      jeuTour = param;
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    }
  }
  
  testSortie(){
    //on teste si on a cliquer sur les trois elements
    if(!boolVisibleEcran && !boolVisibleComposant && !boolVisibleChassis){
      //permet de quitter la partie achat pour passer a production etape 3
      boolVisibleEcran = true;
      boolVisibleComposant = true;
      boolVisibleChassis = true;
      this.quitteEcran(2);
    }
  }
}
Sup.registerBehavior(ScriptAchatClickBehavior);
