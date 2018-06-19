class PersonnelScriptBehavior extends Sup.Behavior {
  
  menuIndex: number;
  menus : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  
  awake() {
    jeuTour = 1;
    Sup.log(`jeuTour: ${jeuTour}`);
  }
  
  start() {
    this.cliqueBouton();
    this.menus = Sup.getActor("Boutons").getChild("Rectangle").getChildren();
    
    this.updateMenu(1);
  }

  update() {
    //permet de remettre l opacite a 1 par defaut
    this.updateMenu(1);
    //enleve le flip vertical du clik sur le bouton
    this.noclic();
    
    //pour que le fait de passer le curseur dessus change l opacite a 0.7
    this.mouseNavigation();
  }
  
  cliqueBouton(){
    
    //on relie les boutons
    const EmbaucherOuvrier : Sup.Actor = Sup.getActor("Boutons").getChild("Rectangle").getChild("btnEmbaucherOuvrier");
    const EmbaucherCommercial : Sup.Actor = Sup.getActor("Boutons").getChild("Rectangle").getChild("btnEmbaucherCommercial");
    const EmbaucherComptable : Sup.Actor = Sup.getActor("Boutons").getChild("Rectangle").getChild("btnEmbaucherComptable");
    const LicencierOuvrier : Sup.Actor = Sup.getActor("Boutons").getChild("Rectangle").getChild("btnLicencierOuvrier");
    const LicencierCommercial : Sup.Actor = Sup.getActor("Boutons").getChild("Rectangle").getChild("btnLicencierCommercial");
    const LicencierComptable : Sup.Actor = Sup.getActor("Boutons").getChild("Rectangle").getChild("btnLicencierComptable");
    
    const AfficheOuvrier : Sup.Actor = Sup.getActor("Labels").getChild("AfficheOuvrier");
    const AfficheCommercial : Sup.Actor = Sup.getActor("Labels").getChild("AfficheCommercial");
    const AfficheComptable : Sup.Actor = Sup.getActor("Labels").getChild("AfficheComptable");
    
    //on leur donne des instructions : Embaucher
    EmbaucherOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      nbOuvrier += 1;
      AfficheOuvrier.textRenderer.setText(nbOuvrier);
      this.clicVisuel(EmbaucherOuvrier);
      //Sup.log(`Nombre d ouvrier ${nbOuvrier}`);
    });

    EmbaucherCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      nbCommercial += 1;
      AfficheCommercial.textRenderer.setText(nbCommercial);
      this.clicVisuel(EmbaucherCommercial);
      //Sup.log(`Nombre d commercial ${nbCommercial}`); 
    });
    
    EmbaucherComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      nbComptable += 1;
      AfficheComptable.textRenderer.setText(nbComptable);
      this.clicVisuel(EmbaucherComptable);
      //Sup.log(`Nombre d comptable ${nbComptable}`); 
    });
    
    //Licencier
    LicencierOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(nbOuvrier > 0){
        nbOuvrier -= 1;
      }
      AfficheOuvrier.textRenderer.setText(nbOuvrier);
      this.clicVisuel(LicencierOuvrier);
      //Sup.log(`Nombre d ouvrier ${nbOuvrier}`);
    });
    
    LicencierCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(nbCommercial > 0){
        nbCommercial -= 1;
      }
      AfficheCommercial.textRenderer.setText(nbCommercial);
      this.clicVisuel(LicencierCommercial);
      //Sup.log(`Nombre d commercial ${nbCommercial}`);
    });
    
    LicencierComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(nbComptable > 0){
        nbComptable -= 1;
      }
      AfficheComptable.textRenderer.setText(nbComptable);
      this.clicVisuel(LicencierComptable);
      //Sup.log(`Nombre d comptable ${nbComptable}`); 
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
Sup.registerBehavior(PersonnelScriptBehavior);
