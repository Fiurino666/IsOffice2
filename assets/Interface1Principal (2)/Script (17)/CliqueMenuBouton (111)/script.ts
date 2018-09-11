class CliqueMenuBoutonBehavior extends Sup.Behavior {
  
  phaseIndex: number;
  phases : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  btnMenu : Sup.Actor;
  btnBanque: Sup.Actor;
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });;
  
  awake() {
    musicAwake();
    this.btnMenu = Sup.getActor("Element").getChild("Fixe").getChild("MenuFond");
    
    this.btnMenu.fMouseInput.emitter.on("leftClickReleased", () => {       
      this.musicPlayer.play();
      //Sup.log("Je suis ici");
      Sup.loadScene("Interface7Menu/Scene/MenuScene");
    });
    
    this.btnBanque = Sup.getActor("Element").getChild("Fixe").getChild("BanqueFond");
    
    this.btnBanque.fMouseInput.emitter.on("leftClickReleased", () => {
      this.musicPlayer.play();
      //Sup.log("Je suis la");
      Sup.loadScene("Interface8Banque/Scene/BanqueScene");
    });
  }

  update() {
    musicUpdate();
    Mouse.update(this.actor.camera);
    
    // FIXME: Temporary debug
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      this.musicPlayer.play();
      Sup.loadScene("Interface7Menu/Scene/MenuScene");
    }
  }

  
}
Sup.registerBehavior(CliqueMenuBoutonBehavior);
