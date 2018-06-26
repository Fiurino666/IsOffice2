class PersonnelScriptBehavior extends Sup.Behavior {
  
  menuIndex: number;
  menus : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  
  //on relie les boutons
  EmbaucherOuvrier : Sup.Actor = Sup.getActor("Bouton").getChild("EmbaucherOuvrier");
  EmbaucherCommercial : Sup.Actor = Sup.getActor("Bouton").getChild("EmbaucherCommercial");
  EmbaucherComptable : Sup.Actor = Sup.getActor("Bouton").getChild("EmbaucherComptable");
  LicencierOuvrier : Sup.Actor = Sup.getActor("Bouton").getChild("LicencierOuvrier");
  LicencierCommercial : Sup.Actor = Sup.getActor("Bouton").getChild("LicencierCommercial");
  LicencierComptable : Sup.Actor = Sup.getActor("Bouton").getChild("LicencierComptable");
  Valider : Sup.Actor = Sup.getActor("Bouton").getChild("Valider");
  Annuler : Sup.Actor = Sup.getActor("Bouton").getChild("Annuler");
    
  EffectifOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("EffO");
  ValeurEmbOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("EmbO");
  ValeurLicOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("LicO");
  SalaireTotOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("SalO");
  TotalOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("TotO");
    
  EffectifCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("EffC");
  ValeurEmbCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("EmbC");
  ValeurLicCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("LicC");
  SalaireTotCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("SalC");
  TotalCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("TotC");
    
  EffectifComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("EffCC");
  ValeurEmbComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("EmbCC");
  ValeurLicComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("LicCC");
  SalaireTotComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("SalCC");
    
  MasseSalariale : Sup.Actor = Sup.getActor("Variable").getChild("Masse").getChild("MasseSalariale");
  
  //on initialise les variables locales, necessaires pour le bouton annuler
  localnbOuvrier: number = nbOuvrier;
  localnbCommercial: number = nbCommercial;
  localnbComptable: number = nbComptable;
  
  awake() {
    jeuTour = 1;
    Sup.log(`jeuTour: ${jeuTour}`);
    
  }
  
  start() {
    this.cliqueBouton();
    this.menus = Sup.getActor("Bouton").getChildren();
    
    this.updateMenu(1);
  }

  update() {
    //permet de remettre l opacite a 1 par defaut
    this.updateMenu(1);
    //enleve le flip vertical du clik sur le bouton
    this.noclic();
    //pour le curseur quand il est dessus change l opacite a 0.7
    this.mouseNavigation();
  }
  
  cliqueBouton(){
    
    //on leur donne des instructions : Embaucher
    this.EmbaucherOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbOuvrier += 1;
      this.EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);
      this.clicVisuel(this.EmbaucherOuvrier);
      //Sup.log(`Nombre d ouvrier ${nbOuvrier}`);
    });

    this.EmbaucherCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbCommercial += 1;
      this.EffectifCommercial.textRenderer.setText(this.localnbCommercial);
      this.clicVisuel(this.EmbaucherCommercial);
      //Sup.log(`Nombre d commercial ${nbCommercial}`); 
    });
    
    this.EmbaucherComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbComptable += 1;
      this.EffectifComptable.textRenderer.setText(this.localnbComptable);
      this.clicVisuel(this.EmbaucherComptable);
      //Sup.log(`Nombre d comptable ${nbComptable}`); 
    });
    
    //Licencier
    this.LicencierOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(this.localnbOuvrier > 0){
        this.localnbOuvrier -= 1;
      }
      this.EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);
      this.clicVisuel(this.LicencierOuvrier);
      //Sup.log(`Nombre d ouvrier ${nbOuvrier}`);
    });
    
    this.LicencierCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(this.localnbCommercial > 0){
        this.localnbCommercial -= 1;
      }
      this.EffectifCommercial.textRenderer.setText(this.localnbCommercial);
      this.clicVisuel(this.LicencierCommercial);
      //Sup.log(`Nombre d commercial ${nbCommercial}`);
    });
    
    this.LicencierComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(this.localnbComptable > 0){
        this.localnbComptable -= 1;
      }
      this.EffectifComptable.textRenderer.setText(this.localnbComptable);
      this.clicVisuel(this.LicencierComptable);
      //Sup.log(`Nombre d comptable ${nbComptable}`); 
    });
    
    this.Annuler.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbOuvrier = nbOuvrier;
      this.localnbCommercial = nbCommercial;
      this.localnbComptable = nbComptable;
      // !!!!! A gerer rafraichir l'affichage des labels !!!!!!!
      //Sup.log(`Nombre d comptable ${nbComptable}`);
    });
    
    this.Valider.fMouseInput.emitter.on("leftClickReleased", () => { 
      nbOuvrier=this.localnbOuvrier;
      nbCommercial=this.localnbCommercial;
      nbComptable=this.localnbComptable;
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
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
      this.updateMenu(0.7);
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
