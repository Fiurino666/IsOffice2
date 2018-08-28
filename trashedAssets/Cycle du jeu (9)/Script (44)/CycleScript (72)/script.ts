/*class CycleScriptBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  awake() {
    
  }
  
  start() {
    this.menus = Sup.getActor("Menu").getChildren();
    this.updateEnabledButton();
  }

  update() {
    this.updateEnabledButton();
  }
  
  updateEnabledButton(){
    for(let i = 0; i<this.menus.length;i++){
      let button = this.menus[i];
      button.textRenderer.setColor(0,0,0);
    }
    this.menus[jeuTour].textRenderer.setColor(237,0,0);
  }
  
}
Sup.registerBehavior(CycleScriptBehavior);*/
