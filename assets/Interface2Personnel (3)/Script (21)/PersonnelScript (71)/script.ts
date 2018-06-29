class PersonnelScriptBehavior extends Sup.Behavior {
  
  menuIndex: number;
  menus : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  //on initialise les variables locales, necessaires pour le bouton annuler
  localnbOuvrier: number = nbOuvrier.valueOf();
  localnbCommercial: number = nbCommercial.valueOf();
  localnbComptable: number = nbComptable.valueOf();
  totalCoutOuvrier : number;
  totalCoutCommercial : number;
  totalCoutComptable : number;
  
  salaireOuvrier : number = 4000;
  licencierOuvrier: number = 800;
  nbfoislicencierO: number = 0;
  
  salaireCommercial : number = 6000;
  licencierCommercial: number = 1100;
  nbfoislicencierC: number = 0;
  
  salaireComptable : number = 7000;
  licencierComptable: number = 2300;
  nbfoislicencierCC: number = 0;
  
  timer: number = 0;
  
  start(){
    
  }
  
  
  awake() {
    jeuTour = 1;
    //Sup.log(`jeuTour: ${jeuTour}`);
    this.menus = Sup.getActor("Bouton").getChildren();
    this.ray.setFromCamera(this.actor.camera, Sup.Input.getMousePosition());
    let hits = this.ray.intersectActors(this.menus);
    
    //Sup.log(`menus: ${this.menus.length}`);
    this.cliqueBouton();
    this.updateMenu(1);
  }

  update() {
    //permet de remettre l opacite a 1 par defaut
    this.updateMenu(1);
    //enleve le flip vertical du clik sur le bouton
    this.noclic();
    //pour le curseur quand il est dessus change l opacite a 0.7
    //this.mouseNavigation();
    this.timer++;
  }
  
  cliqueBouton(){
    
    //on relie les boutons
    const EmbaucherOuvrier : Sup.Actor = Sup.getActor("Bouton").getChild("EmbaucherOuvrier");
    const EmbaucherCommercial : Sup.Actor = Sup.getActor("Bouton").getChild("EmbaucherCommercial");
    const EmbaucherComptable : Sup.Actor = Sup.getActor("Bouton").getChild("EmbaucherComptable");
    const LicencierOuvrier : Sup.Actor = Sup.getActor("Bouton").getChild("LicencierOuvrier");
    const LicencierCommercial : Sup.Actor = Sup.getActor("Bouton").getChild("LicencierCommercial");
    const LicencierComptable : Sup.Actor = Sup.getActor("Bouton").getChild("LicencierComptable");
    const Valider : Sup.Actor = Sup.getActor("Bouton").getChild("Valider");
    const Annuler : Sup.Actor = Sup.getActor("Bouton").getChild("Annuler");
    const Quitter : Sup.Actor = Sup.getActor("Texte").getChild("Quit");

    const EffectifOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("EffO");
    const ValeurEmbOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("EmbO");
    const ValeurLicOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("LicO");
    const SalaireTotOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("SalO");
    const TotalOuvrier : Sup.Actor = Sup.getActor("Variable").getChild("Ouvrier").getChild("TotO");

    const EffectifCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("EffC");
    const ValeurEmbCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("EmbC");
    const ValeurLicCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("LicC");
    const SalaireTotCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("SalC");
    const TotalCommercial : Sup.Actor = Sup.getActor("Variable").getChild("Commercial").getChild("TotC");

    const EffectifComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("EffCC");
    const ValeurEmbComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("EmbCC");
    const ValeurLicComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("LicCC");
    const SalaireTotComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("SalCC");
    const TotalComptable : Sup.Actor = Sup.getActor("Variable").getChild("Comptable").getChild("TotCC");
    
    const MasseSalariale : Sup.Actor = Sup.getActor("Variable").getChild("Masse").getChild("MasseSalariale");

    //Initialise et rafraichit
    EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);
    EffectifCommercial.textRenderer.setText(this.localnbCommercial);
    EffectifComptable.textRenderer.setText(this.localnbComptable);
    
    let valO = this.localnbOuvrier*this.salaireOuvrier;
    SalaireTotOuvrier.textRenderer.setText(valO);
    this.totalCoutOuvrier = valO + this.nbfoislicencierO*this.licencierOuvrier;
    TotalOuvrier.textRenderer.setText(this.totalCoutOuvrier);
    
    let valC = this.localnbCommercial*this.salaireCommercial;
    SalaireTotCommercial.textRenderer.setText(valC);
    this.totalCoutCommercial = valC + this.nbfoislicencierC*this.licencierCommercial;
    TotalCommercial.textRenderer.setText(this.totalCoutCommercial);
    
    let valCC = this.localnbComptable*this.salaireComptable;
    SalaireTotComptable.textRenderer.setText(valCC);
    this.totalCoutComptable = valCC + this.nbfoislicencierCC*this.licencierComptable;
    TotalComptable.textRenderer.setText(this.totalCoutComptable);
    
    MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
    
    //on leur donne des instructions : Embaucher
    EmbaucherOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbOuvrier += 1;
      this.calculTotalOuvrier("plus");
      EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);
      let valO = this.localnbOuvrier*this.salaireOuvrier;
      SalaireTotOuvrier.textRenderer.setText(valO);
      this.totalCoutOuvrier = valO + this.nbfoislicencierO*this.licencierOuvrier;
      TotalOuvrier.textRenderer.setText(this.totalCoutOuvrier);
      MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      this.clicVisuel(EmbaucherOuvrier); 
      //Sup.log(`Nombre d ouvrier ${this.localnbOuvrier}`);
    });

    EmbaucherCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbCommercial += 1;
      this.calculTotalCommercial("plus");
      EffectifCommercial.textRenderer.setText(this.localnbCommercial);
      let valC = this.localnbCommercial*this.salaireCommercial;
      SalaireTotCommercial.textRenderer.setText(valC);
      this.totalCoutCommercial = valC + this.nbfoislicencierC*this.licencierCommercial;
      TotalCommercial.textRenderer.setText(this.totalCoutCommercial);
      MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      this.clicVisuel(EmbaucherCommercial);
      //Sup.log(`Nombre d commercial ${nbCommercial}`); 
    });
    
    EmbaucherComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbComptable += 1;
      this.calculTotalComptable("plus");
      EffectifComptable.textRenderer.setText(this.localnbComptable);
      let valCC = this.localnbComptable*this.salaireComptable;
      SalaireTotComptable.textRenderer.setText(valCC);
      this.totalCoutComptable = valCC + this.nbfoislicencierCC*this.licencierComptable;
      TotalComptable.textRenderer.setText(this.totalCoutComptable);
      MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      this.clicVisuel(EmbaucherComptable);
      //Sup.log(`Nombre d comptable ${nbComptable}`); 
    });
    
    //Licencier
    LicencierOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(this.localnbOuvrier > 0){
        this.localnbOuvrier -= 1;
        this.nbfoislicencierO ++;
      }
      EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);
      let valO = this.localnbOuvrier*this.salaireOuvrier;
      SalaireTotOuvrier.textRenderer.setText(valO);
      this.totalCoutOuvrier = valO + this.nbfoislicencierO*this.licencierOuvrier;
      TotalOuvrier.textRenderer.setText(this.totalCoutOuvrier);
      MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      this.clicVisuel(LicencierOuvrier);
      Sup.log(`Nombre d ouvrier ${this.localnbOuvrier}`);
    });
    
    LicencierCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(this.localnbCommercial > 0){
        this.localnbCommercial -= 1;
        this.nbfoislicencierC ++;
      }
      EffectifCommercial.textRenderer.setText(this.localnbCommercial);
      let valC = this.localnbCommercial*this.salaireCommercial;
      SalaireTotCommercial.textRenderer.setText(valC);
      this.totalCoutCommercial = valC + this.nbfoislicencierC*this.licencierCommercial;
      TotalCommercial.textRenderer.setText(this.totalCoutCommercial);
      MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      this.clicVisuel(LicencierCommercial);
      //Sup.log(`Nombre d commercial ${nbCommercial}`);
    });
    
    LicencierComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      if(this.localnbComptable > 0){
        this.localnbComptable -= 1;
        this.nbfoislicencierCC ++;
      }
      EffectifComptable.textRenderer.setText(this.localnbComptable);
      let valCC = this.localnbComptable*this.salaireComptable;
      SalaireTotComptable.textRenderer.setText(valCC);
      this.totalCoutComptable = valCC + this.nbfoislicencierCC*this.licencierComptable;
      TotalComptable.textRenderer.setText(this.totalCoutComptable);
      MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      this.clicVisuel(LicencierComptable);
      //Sup.log(`Nombre d comptable ${nbComptable}`); 
    });
    
    Annuler.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbOuvrier = nbOuvrier;
      this.localnbCommercial = nbCommercial;
      this.localnbComptable = nbComptable;
      // !!!!! A gerer rafraichir l'affichage des labels !!!!!!!
      //Initialise et rafraichit
      EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);
      EffectifCommercial.textRenderer.setText(this.localnbCommercial);
      EffectifComptable.textRenderer.setText(this.localnbComptable);

      let valO = this.localnbOuvrier*this.salaireOuvrier;
      SalaireTotOuvrier.textRenderer.setText(valO);
      this.totalCoutOuvrier = valO + this.nbfoislicencierO*this.licencierOuvrier;
      TotalOuvrier.textRenderer.setText(this.totalCoutOuvrier);

      let valC = this.localnbCommercial*this.salaireCommercial;
      SalaireTotCommercial.textRenderer.setText(valC);
      this.totalCoutCommercial = valC + this.nbfoislicencierC*this.licencierCommercial;
      TotalCommercial.textRenderer.setText(this.totalCoutCommercial);

      let valCC = this.localnbComptable*this.salaireComptable;
      SalaireTotComptable.textRenderer.setText(valCC);
      this.totalCoutComptable = valCC + this.nbfoislicencierCC*this.licencierComptable;
      TotalComptable.textRenderer.setText(this.totalCoutComptable);
      //Sup.log(`Nombre d comptable ${nbComptable}`);
    });
    
    Valider.fMouseInput.emitter.on("leftClickReleased", () => { 
      nbOuvrier=this.localnbOuvrier.valueOf();
      nbCommercial=this.localnbCommercial.valueOf();
      nbComptable=this.localnbComptable.valueOf();
      solde = solde - (this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      //Sup.log(`Nombre d comptable ${nbComptable}`); 
    });
    
    Quitter.fMouseInput.emitter.on("leftClickReleased", () => { 
      //Un timer me permet de gerer lorsque l'on clique sur le menu et qu'on reclique par inadvertance au même endroit
      if(this.timer > 120){
        jeuTour = 0;
        Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      }
      
      //Sup.log(`Nombre d comptable ${nbComptable}`); 
    });
    
  }
  
  calculTotalOuvrier(operation){
    if (operation == "plus"){
      this.totalCoutOuvrier = this.totalCoutOuvrier + this.salaireOuvrier;
    }
    else{
      this.totalCoutOuvrier = this.totalCoutOuvrier - this.licencierOuvrier;
    }
  }
  
  calculTotalCommercial(operation){
    if (operation == "plus"){
      this.totalCoutCommercial = this.totalCoutCommercial + this.salaireOuvrier;
    }
    else{
      this.totalCoutCommercial = this.totalCoutCommercial - this.licencierOuvrier;
    }
  }
  
  calculTotalComptable(operation){
    if (operation == "plus"){
      this.totalCoutComptable = this.totalCoutComptable + this.salaireOuvrier;
    }
    else{
      this.totalCoutComptable = this.totalCoutComptable - this.licencierOuvrier;
    }
  }
  
  /*
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
  }*/
    
    updateMenu( x: number){
    
      for(let i = 0; i<this.menus.length;i++){
        //Sup.log(`Nombre d i ${i}`); 
        if(this.menus[i].fMouseInput.isMouseOver){
          //Sup.log(`mouse over true `); 
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
