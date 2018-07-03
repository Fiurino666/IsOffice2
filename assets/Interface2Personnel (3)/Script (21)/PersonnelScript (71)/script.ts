class PersonnelScriptBehavior extends Sup.Behavior {

  menus : Sup.Actor[];

  //on initialise les variables locales, necessaires pour le bouton annuler
  localnbOuvrier: number = nbOuvrier.valueOf();
  localnbCommercial: number = nbCommercial.valueOf();
  localnbComptable: number = nbComptable.valueOf();
  totalCoutOuvrier : number;
  totalCoutCommercial : number;
  totalCoutComptable : number;

  salaireOuvrier : number = 600;
  licencierOuvrier: number = 450;
  nbfoislicencierO: number = 0;
  
  salaireCommercial : number = 1000;
  licencierCommercial: number = 650;
  nbfoislicencierC: number = 0;
  
  salaireComptable : number = 800;
  licencierComptable: number = 550;
  nbfoislicencierCC: number = 0;
  
  timer: number = 0;
  
   //on declare les boutons
  EmbaucherOuvrier : Sup.Actor;
  EmbaucherCommercial : Sup.Actor;
  EmbaucherComptable : Sup.Actor;
  LicencierOuvrier : Sup.Actor;
  LicencierCommercial : Sup.Actor;
  LicencierComptable : Sup.Actor;
  Valider : Sup.Actor;
  Annuler : Sup.Actor;
  Quitter : Sup.Actor;

  EffectifOuvrier : Sup.Actor;
  ValeurEmbOuvrier : Sup.Actor;
  ValeurLicOuvrier : Sup.Actor;
  SalaireTotOuvrier : Sup.Actor;
  TotalOuvrier : Sup.Actor;

  EffectifCommercial : Sup.Actor;
  ValeurEmbCommercial : Sup.Actor;
  ValeurLicCommercial : Sup.Actor;
  SalaireTotCommercial : Sup.Actor;
  TotalCommercial : Sup.Actor;

  EffectifComptable : Sup.Actor;
  ValeurEmbComptable : Sup.Actor;
  ValeurLicComptable : Sup.Actor;
  SalaireTotComptable : Sup.Actor;
  TotalComptable : Sup.Actor;

  MasseSalariale : Sup.Actor;
  
  start(){
    
  }
  
  awake() {
    jeuTour = 1;
    //Sup.log(`jeuTour: ${jeuTour}`);
    this.menus = Sup.getActor("Bouton").getChildren();
    this.EmbaucherOuvrier = Sup.getActor("Bouton").getChild("EmbaucherOuvrier");
    this.EmbaucherCommercial = Sup.getActor("Bouton").getChild("EmbaucherCommercial");
    this.EmbaucherComptable = Sup.getActor("Bouton").getChild("EmbaucherComptable");
    this.LicencierOuvrier = Sup.getActor("Bouton").getChild("LicencierOuvrier");
    this.LicencierCommercial = Sup.getActor("Bouton").getChild("LicencierCommercial");
    this.LicencierComptable = Sup.getActor("Bouton").getChild("LicencierComptable");
    this.Valider = Sup.getActor("Bouton").getChild("Valider");
    this.Annuler = Sup.getActor("Bouton").getChild("Annuler");
    this.Quitter = Sup.getActor("Texte").getChild("Quit");

    this.EffectifOuvrier = Sup.getActor("Variable").getChild("Ouvrier").getChild("EffO");
    this.ValeurEmbOuvrier = Sup.getActor("Variable").getChild("Ouvrier").getChild("EmbO");
    this.ValeurLicOuvrier = Sup.getActor("Variable").getChild("Ouvrier").getChild("LicO");
    this.SalaireTotOuvrier = Sup.getActor("Variable").getChild("Ouvrier").getChild("SalO");
    this.TotalOuvrier = Sup.getActor("Variable").getChild("Ouvrier").getChild("TotO");

    this.EffectifCommercial = Sup.getActor("Variable").getChild("Commercial").getChild("EffC");
    this.ValeurEmbCommercial = Sup.getActor("Variable").getChild("Commercial").getChild("EmbC");
    this.ValeurLicCommercial = Sup.getActor("Variable").getChild("Commercial").getChild("LicC");
    this.SalaireTotCommercial = Sup.getActor("Variable").getChild("Commercial").getChild("SalC");
    this.TotalCommercial = Sup.getActor("Variable").getChild("Commercial").getChild("TotC");

    this.EffectifComptable = Sup.getActor("Variable").getChild("Comptable").getChild("EffCC");
    this.ValeurEmbComptable = Sup.getActor("Variable").getChild("Comptable").getChild("EmbCC");
    this.ValeurLicComptable = Sup.getActor("Variable").getChild("Comptable").getChild("LicCC");
    this.SalaireTotComptable = Sup.getActor("Variable").getChild("Comptable").getChild("SalCC");
    this.TotalComptable = Sup.getActor("Variable").getChild("Comptable").getChild("TotCC");

    this.MasseSalariale = Sup.getActor("Variable").getChild("Masse").getChild("MasseSalariale");
    
    //Sup.log(`menus: ${this.menus.length}`);
    this.cliqueBouton();
    updateMenu(this.menus);
  }

  update() {
    //permet de remettre l opacite a 1 par defaut
    updateMenu(this.menus);
    //enleve le flip vertical du clik sur le bouton
    noclic(this.menus);
    //pour le curseur quand il est dessus change l opacite a 0.7
    //mouseNavigation();
    this.timer++;
  }
  
  cliqueBouton(){

    //Initialise et rafraichit
    this.initialiseBouton();
    
    //on leur donne des instructions : Embaucher
    this.EmbaucherOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.calculClick("ouvrier", "plus");
    });

    this.EmbaucherCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.calculClick("commercial", "plus");
    });
    
    this.EmbaucherComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.calculClick("comptable", "plus");
    });
    
    //Licencier
    this.LicencierOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.calculClick("ouvrier", "moins");
    });
    
    this.LicencierCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.calculClick("commercial", "moins");
    });
    
    this.LicencierComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.calculClick("comptable", "moins"); 
    });
    
    this.Annuler.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.localnbOuvrier = nbOuvrier;
      this.localnbCommercial = nbCommercial;
      this.localnbComptable = nbComptable;
      this.initialiseBouton();
    });
    
    this.Valider.fMouseInput.emitter.on("leftClickReleased", () => { 
      nbOuvrier=this.localnbOuvrier.valueOf();
      nbCommercial=this.localnbCommercial.valueOf();
      nbComptable=this.localnbComptable.valueOf();
      solde = solde - (this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    });
    
    this.Quitter.fMouseInput.emitter.on("leftClickReleased", () => { 
      //Un timer me permet de gerer lorsque l'on clique sur le menu et qu'on reclique par inadvertance au même endroit
      if(this.timer > 90){
        jeuTour = 0;
        Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      }
    });
    
  }
  
  initialiseBouton(){
    this.EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);
    this.EffectifCommercial.textRenderer.setText(this.localnbCommercial);
    this.EffectifComptable.textRenderer.setText(this.localnbComptable);
    
    let valO = this.localnbOuvrier*this.salaireOuvrier;
    this.SalaireTotOuvrier.textRenderer.setText(valO);
    this.totalCoutOuvrier = valO + this.nbfoislicencierO*this.licencierOuvrier;
    this.TotalOuvrier.textRenderer.setText(this.totalCoutOuvrier);
    
    let valC = this.localnbCommercial*this.salaireCommercial;
    this.SalaireTotCommercial.textRenderer.setText(valC);
    this.totalCoutCommercial = valC + this.nbfoislicencierC*this.licencierCommercial;
    this.TotalCommercial.textRenderer.setText(this.totalCoutCommercial);
    
    let valCC = this.localnbComptable*this.salaireComptable;
    this.SalaireTotComptable.textRenderer.setText(valCC);
    this.totalCoutComptable = valCC + this.nbfoislicencierCC*this.licencierComptable;
    this.TotalComptable.textRenderer.setText(this.totalCoutComptable);
    
    this.ValeurEmbOuvrier.textRenderer.setText(this.salaireOuvrier);
    this.ValeurEmbCommercial.textRenderer.setText(this.salaireCommercial);
    this.ValeurEmbComptable.textRenderer.setText(this.salaireComptable);
    
    this.ValeurLicOuvrier.textRenderer.setText(this.licencierOuvrier);
    this.ValeurLicCommercial.textRenderer.setText(this.licencierCommercial);
    this.ValeurLicComptable.textRenderer.setText(this.licencierComptable);
    
    this.MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
  }
  
  calculClick(employe, operation){
    switch(employe){
      case "ouvrier":
        if (operation == "plus"){
          this.totalCoutOuvrier = this.totalCoutOuvrier + this.salaireOuvrier;
          this.localnbOuvrier += 1;
          clicVisuel(this.EmbaucherOuvrier);
        }
        else{
          this.totalCoutOuvrier = this.totalCoutOuvrier - this.licencierOuvrier;
          
          if(this.localnbOuvrier > 0){
            this.localnbOuvrier -= 1;
            this.nbfoislicencierO ++;
          }
          clicVisuel(this.LicencierOuvrier);
        }
        this.EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);
        let valO = this.localnbOuvrier*this.salaireOuvrier;
        this.SalaireTotOuvrier.textRenderer.setText(valO);
        this.totalCoutOuvrier = valO + this.nbfoislicencierO*this.licencierOuvrier;
        this.TotalOuvrier.textRenderer.setText(this.totalCoutOuvrier);
        this.MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
        break;
        
      case "commercial":
        if (operation == "plus"){
          this.totalCoutCommercial = this.totalCoutCommercial + this.salaireOuvrier;
          this.localnbCommercial += 1;
          clicVisuel(this.EmbaucherCommercial);
        }
        else{
          this.totalCoutCommercial = this.totalCoutCommercial - this.licencierOuvrier;
          if(this.localnbCommercial > 0){
            this.localnbCommercial -= 1;
            this.nbfoislicencierC ++;
          }
          clicVisuel(this.LicencierCommercial);
        }
        this.EffectifCommercial.textRenderer.setText(this.localnbCommercial);
        let valC = this.localnbCommercial*this.salaireCommercial;
        this.SalaireTotCommercial.textRenderer.setText(valC);
        this.totalCoutCommercial = valC + this.nbfoislicencierC*this.licencierCommercial;
        this.TotalCommercial.textRenderer.setText(this.totalCoutCommercial);
        this.MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
        break;
        
      case "comptable":
        if (operation == "plus"){
          this.totalCoutComptable = this.totalCoutComptable + this.salaireOuvrier;
          this.localnbComptable += 1;
          clicVisuel(this.EmbaucherComptable);
        }
        else{
          this.totalCoutComptable = this.totalCoutComptable - this.licencierOuvrier;
          if(this.localnbComptable > 0){
            this.localnbComptable -= 1;
            this.nbfoislicencierCC ++;
          }
          clicVisuel(this.LicencierComptable);
        }
        this.EffectifComptable.textRenderer.setText(this.localnbComptable);
        let valCC = this.localnbComptable*this.salaireComptable;
        this.SalaireTotComptable.textRenderer.setText(valCC);
        this.totalCoutComptable = valCC + this.nbfoislicencierCC*this.licencierComptable;
        this.TotalComptable.textRenderer.setText(this.totalCoutComptable);
        this.MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
        break;
        
      default:
        break;
    }
  }
  

}
Sup.registerBehavior(PersonnelScriptBehavior);
