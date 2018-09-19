class ScriptProduireBehavior extends Sup.Behavior {
  quit : Sup.Actor;
  affiche1 : Sup.Actor;
  affiche2 : Sup.Actor;
  strAffiche1 : string="";
  strAffiche2 : string="";
  timer: number = 0;
  numCalc : number = 0;
  
  awake() {
    ////////////////////////////// 
    /*
    nbOuvrier = 1;
    nbEcran = 9;
    nbChassis = 8;
    nbComposant = 8;
    nbLotFini = 0; 
    */
    /////////////////////////////////
    this.quit = Sup.getActor("Texte").getChild("Quit");
    musicAwake();
    this.affiche1 = Sup.getActor("Texte").getChild("TxtOutput1");
    this.affiche2 = Sup.getActor("Texte").getChild("TxtOutput2");
    this.calcProduction();
    this.afficheOuvrier();
  }
  
  start(){
    this.quit.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.quitteEcran(1);
    });
  }

  update() {
    this.timer ++;
    musicUpdate();
  }
  
  afficheOuvrier(){
    this.strAffiche1 = "Vous avez "+ nbOuvrier + " "+gereS(nbOuvrier, "ouvrier")+" dans l'entreprise, \n vous pouvez produire au maximum "+ (nbOuvrier*3) +" "+gereS(nbOuvrier*3, "lot")+".\n Votre stock initial est de "+nbLotFini+" "+gereS(nbLotFini, "lot")+".";
    this.affiche1.textRenderer.setText(this.strAffiche1);
    this.productionFinale(); //C'est ici que l'on ajoute les lots finis ce tour ci au stock precedent pour l'afficher ensuite
    this.strAffiche2 = "Votre production ce tour ci est de "+this.numCalc+" "+gereS(this.numCalc, "lot")+". \n Vous avez donc en stock "+nbLotFini+ " "+gereS(nbLotFini, "lot")+".";
    this.affiche2.textRenderer.setText(this.strAffiche2);
  }
  
  calcProduction(){
    if(nbOuvrier>0){
      while(nbEcran>0 && nbChassis>0 && nbComposant>0 && this.numCalc<(nbOuvrier*3)){
        this.numCalc++;
        nbEcran--;
        nbChassis--;
        nbComposant--;
        Sup.log("Et un lot de fabriqué, un!");
      } 
      
    }
    
  }
  
  productionFinale(){
    Sup.log("productionFinale nbLotFini avant "+nbLotFini);
    nbLotFini += this.numCalc;
    Sup.log("productionFinale nbLotFini après "+nbLotFini);
  }
  
  quitteEcran(param){
    if(this.timer > 90){
      jeuTour = 3;
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    }
  }
  
}
Sup.registerBehavior(ScriptProduireBehavior);
