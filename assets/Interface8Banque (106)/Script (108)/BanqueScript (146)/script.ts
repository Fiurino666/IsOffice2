class BanqueScriptBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.1, { loop: false });;
  btnFermerBanque : Sup.Actor;
  
  awake() {
    musicAwake();
    this.menus = Sup.getActor("Bouton").getChildren();
    this.btnFermerBanque = Sup.getActor("Texte").getChild("Quit");
  }
  
  start() {
  //on relie les boutons et on leur attribue l'action du click
    this.btnFermerBanque.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log(" Quit");
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      });
  }

  update() {
    musicUpdate();
    //updateMenu(this.menus);
    //noclic(this.menus);
  }
}
Sup.registerBehavior(BanqueScriptBehavior);
