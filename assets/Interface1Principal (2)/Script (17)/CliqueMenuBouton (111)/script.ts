class CliqueMenuBoutonBehavior extends Sup.Behavior {
  
  phaseIndex: number;
  phases : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  menu : Sup.Actor;
  
  awake() {
    const btnMenu = Sup.getActor("Element").getChild("Fixe").getChild("MenuFond").getBehavior(ButtonBehavior);
    btnMenu.onClick = () => {
      //Sup.log("Je suis ici");
      Sup.loadScene("Interface7Menu/Scene/MenuScene");
    };
  }

  update() {
  Mouse.update(this.actor.camera);
    
    // FIXME: Temporary debug
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      Sup.loadScene("Interface7Menu/Scene/MenuScene");
    }
  }
  
  /*
  menuClique(){
    //pour afficher l'animation sur le clique du bouton menu
    this.ray.setFromCamera(this.actor.camera, Sup.Input.getMousePosition());
    let hits = this.ray.intersectActor(this.menu);
    
    if(Sup.Input.wasMouseButtonJustPressed(0) && hits.length>0){
      Sup.loadScene("Interface7Menu/Scene/MenuScene");
      Sup.log("rentre dans le if test 022");
    }
  }*/
  
}
Sup.registerBehavior(CliqueMenuBoutonBehavior);
