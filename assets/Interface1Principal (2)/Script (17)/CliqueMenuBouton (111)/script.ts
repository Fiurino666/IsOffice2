class CliqueMenuBoutonBehavior extends Sup.Behavior {
  
  phaseIndex: number;
  phases : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  menu : Sup.Actor;
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });;
  
  awake() {
    musicAwake();
    const btnMenu = Sup.getActor("Element").getChild("Fixe").getChild("MenuFond").getBehavior(ButtonBehavior);
    btnMenu.onClick = () => {
      
      this.musicPlayer.play();
      //Sup.log("Je suis ici");
      Sup.loadScene("Interface7Menu/Scene/MenuScene");
    };
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
