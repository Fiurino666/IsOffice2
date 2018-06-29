class MenuScriptBehavior extends Sup.Behavior {
  
  menuIndex: number;
  menus : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  
  start() {
  //on relie les boutons
    const btnNouvellePartie = Sup.getActor("Bouton").getChild("btnNouvellePartie").getBehavior(ButtonBehavior);
    btnNouvellePartie.onClick = () => {
        Sup.log(" btnNouvellePartie");
      };
    const btnCharger = Sup.getActor("Bouton").getChild("btnCharger").getBehavior(ButtonBehavior);
    btnCharger.onClick = () => {
      Sup.log(" btnCharger");
    };
    const btnSauvegarder = Sup.getActor("Bouton").getChild("btnSauvegarder").getBehavior(ButtonBehavior);
    btnSauvegarder.onClick = () => {
      Sup.log(" btnSauvegarder");
    };
    const btnFermerMenu = Sup.getActor("Bouton").getChild("btnFermerMenu").getBehavior(ButtonBehavior);
    btnFermerMenu.onClick = () => {
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    };
    const btnQuitterJeu = Sup.getActor("Bouton").getChild("btnQuitterJeu").getBehavior(ButtonBehavior);
    btnQuitterJeu.onClick = () => {
      Sup.log(" btnQuitterJeu");
    };
    const btnCredits = Sup.getActor("Bouton").getChild("btnCredits").getBehavior(ButtonBehavior);
    btnCredits.onClick = () => {
      Sup.log(" btnCredits");
    };
    const btnScore = Sup.getActor("Bouton").getChild("btnScore").getBehavior(ButtonBehavior);
    btnCredits.onClick = () => {
      Sup.log(" btnCredits");
    };
    const btnSiteInternet = Sup.getActor("Bouton").getChild("btnSiteInternet").getBehavior(ButtonBehavior);
    btnSiteInternet.onClick = () => {
      Sup.log(" btnSiteInternet");
    };
    const btnTutoriel = Sup.getActor("Bouton").getChild("btnTutoriel").getBehavior(ButtonBehavior);
    btnTutoriel.onClick = () => {
      Sup.log(" btnTutoriel");
    };
  }
  
  awake() {
    
    //this.menus = Sup.getActor("Bouton").getChildren();
    //this.updateMenu(1);
  }

  
  update() {
    Mouse.update(this.actor.camera);
  }
  

    
    //on leur donne des instructions : Embaucher
    /*
    btnNouvellePartie.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnNouvellePartie);
    });

    btnCharger.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnCharger);
    });
    
    btnSauvegarder.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnSauvegarder);
    });

    btnBanque.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnBanque);
    });
    
    btnFermerMenu.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnFermerMenu);
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    });
    
    btnQuitterJeu.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnQuitterJeu); 
      Sup.exit();
    });
    
    btnCredits.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnCredits); 
    });
    
    btnSiteInternet.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnSiteInternet); 
    });
    
    btnTutoriel.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnTutoriel); 
    });
  
  
  mouseNavigation(){
    
    this.ray.setFromCamera(this.actor.camera, Sup.Input.getMousePosition());
    let hits = this.ray.intersectActors(this.menus);

    if(hits.length > 0){
      if(this.isHover != true){
        this.isHover = true;
      }
      this.menuIndex = this.menus.indexOf(hits[0].actor);
      this.updateMenu( 0.7);
    }
    else{
      if(this.isHover){
        this.isHover = false;
      }
    }
  }
    
    updateMenu( x: number){
    
      for(let i = 0; i<this.menus.length;i++){
        Sup.log(`Nombre d i ${i}`); 
        if(this.menus[i].fMouseInput.isMouseOver){
          Sup.log(`mouse over true `); 
          this.menus[i].spriteRenderer.setOpacity(x);
       }
         if(!this.menus[i].fMouseInput.isMouseOver){
          this.menus[i].spriteRenderer.setOpacity(1);
         }

      }
    }
  
  clicVisuel(act: Sup.Actor) {
    act.spriteRenderer.setVerticalFlip(true);
  }
  
  noclic() {
    for(let i = 0; i < this.menus.length; i++){
      this.menus[i].spriteRenderer.setVerticalFlip(false);
    }*/
  
  
}
Sup.registerBehavior(MenuScriptBehavior);
