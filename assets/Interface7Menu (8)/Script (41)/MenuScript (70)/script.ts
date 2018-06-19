class MenuScriptBehavior extends Sup.Behavior {
  
  menuIndex: number;
  menus : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  
  awake() {
    
  }

  start() {
    this.cliqueBouton();
    this.menus = Sup.getActor("Boutons").getChildren();
    
    this.updateMenu(1);
  }
  
  update() {
    
  }
  
  cliqueBouton(){
    
    //on relie les boutons
    const btnNouvellePartie : Sup.Actor = Sup.getActor("Boutons").getChild("btnNouvellePartie");
    const btnCharger : Sup.Actor = Sup.getActor("Boutons").getChild("btnCharger");
    const btnSauvegarder : Sup.Actor = Sup.getActor("Boutons").getChild("btnSauvegarder");
    const btnBanque : Sup.Actor = Sup.getActor("Boutons").getChild("btnBanque");
    const btnFermerMenu : Sup.Actor = Sup.getActor("Boutons").getChild("btnFermerMenu");
    const btnQuitterJeu : Sup.Actor = Sup.getActor("Boutons").getChild("btnQuitterJeu");
    const btnCredits : Sup.Actor = Sup.getActor("Boutons").getChild("btnCredits");
    const btnSiteInternet : Sup.Actor = Sup.getActor("Boutons").getChild("btnSiteInternet");
    const btnTutoriel : Sup.Actor = Sup.getActor("Boutons").getChild("btnTutoriel");
    
    //on leur donne des instructions : Embaucher
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
    });
    
    btnQuitterJeu.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.clicVisuel(btnQuitterJeu); 
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
  }
  
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
    act.spriteRenderer.setVerticalFlip(true)
  }
  
  noclic() {
    for(let i = 0; i < this.menus.length; i++){
      this.menus[i].spriteRenderer.setVerticalFlip(false)
    }
  }
  
}
Sup.registerBehavior(MenuScriptBehavior);
