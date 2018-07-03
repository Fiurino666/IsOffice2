class ScriptAchatClickBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  btnEcran : Sup.Actor;
  btnChassis : Sup.Actor;
  btnComposant : Sup.Actor;
  camera = new Sup.Actor("Camera");
  
  awake() {
    this.menus = Sup.getActor("Vue1").getChild("Element").getChildren();
    this.btnEcran = Sup.getActor("Vue1").getChild("Element").getChild("Ecran");
    this.btnChassis = Sup.getActor("Vue1").getChild("Element").getChild("Chassis");
    this.btnComposant = Sup.getActor("Vue1").getChild("Element").getChild("Composant");
  }
  
  start() {
    const behaEcran = this.btnEcran.getBehavior(ButtonBehavior);
    behaEcran.onClick = () => {
      Sup.log(" behaEcran");
      this.camera.moveY(11);
    };
    const behChassis = this.btnChassis.getBehavior(ButtonBehavior);
    behChassis.onClick = () => {
      Sup.log(" behChassis");
      clicVisuel(this.btnChassis);
    };
    const behaComposant = this.btnComposant.getBehavior(ButtonBehavior);
    behaComposant.onClick = () => {
      Sup.log(" behaComposant");
      clicVisuel(this.btnComposant);
    };
  }

  update() {
    updateMenu(this.menus);
    noclic(this.menus);
  }
}
Sup.registerBehavior(ScriptAchatClickBehavior);
