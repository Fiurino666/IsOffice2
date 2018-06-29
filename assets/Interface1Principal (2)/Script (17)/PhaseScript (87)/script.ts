class PhaseScriptBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  menuIndex: number = 0;
  
  awake() {
        this.menus = Sup.getActor("Phase").getChildren();
    this.updateEnabledButton();
  }

  update() {
    this.updateEnabledButton();
  }
  
  updateEnabledButton(){
    for(let i = 0; i<this.menus.length;i++){
      this.menus[i].textRenderer.setColor(232,225,255);
    }
    this.menus[jeuTour].textRenderer.setColor(237,0,0);
  }
  
}
Sup.registerBehavior(PhaseScriptBehavior);
