class PrefabBoutonBehavior extends Sup.Behavior {
  bouton: Sup.Actor;
  textRndr: Sup.TextRenderer;
  
  awake() {
    this.bouton = this.actor;
    this.bouton.setVisible(false);
    this.textRndr = this.bouton.getChild("Texte").textRenderer;
  }

  update() {
    
  }
  
  show(text: string, iconVisible: boolean) {

      this.bouton.setVisible(iconVisible);
      //this.textRndr.setText(text);
      this.bouton.getChild("Texte").textRenderer.setText(text);
      Sup.log(text);
    
    
  }
  
  
}
Sup.registerBehavior(PrefabBoutonBehavior);
