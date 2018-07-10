class ScriptProduireBehavior extends Sup.Behavior {
  quit : Sup.Actor;
  
  timer: number = 0;
  
  awake() {
    this.quit = Sup.getActor("Texte").getChild("Quit");
  }
  
  start(){
    this.quit.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.quitteEcran(1);
    });
  }

  update() {
    this.timer ++;
  }
  
  quitteEcran(param){
    if(this.timer > 90){
      jeuTour = param;
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    }
  }
  
}
Sup.registerBehavior(ScriptProduireBehavior);
