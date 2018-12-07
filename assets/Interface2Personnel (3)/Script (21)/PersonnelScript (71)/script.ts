class PersonnelScriptBehavior extends Sup.Behavior {

  menus : Sup.Actor[];
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });
  //on initialise les variables locales, necessaires pour le bouton annuler
  localnbOuvrier: number = nbOuvrier.valueOf();
  localnbCommercial: number = nbCommercial.valueOf();
  localnbComptable: number = nbComptable.valueOf();
  totalCoutOuvrier : number = 0;
  totalCoutCommercial : number = 0;
  totalCoutComptable : number = 0;

  salaireOuvrier : number = 1100;
  licencierOuvrier: number = 750;
  nbfoislicencierO: number = 0;
  
  salaireCommercial : number = 1600;
  licencierCommercial: number = 950;
  nbfoislicencierC: number = 0;
  
  salaireComptable : number = 1950;
  licencierComptable: number = 1150;
  nbfoislicencierCC: number = 0;
  
  //le timer permet de ne pas revenir au menu precedent lors de deux clics trop proche
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
  
  txtEmbCompta : Sup.Actor;
  txtLicCompta : Sup.Actor;
  
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
    this.txtEmbCompta = Sup.getActor("Texte").getChild("EmbaucherComptable");
    this.txtLicCompta = Sup.getActor("Texte").getChild("LicencierComptable");
    //Sup.log(`menus: ${this.menus.length}`);
    this.cliqueBouton();
    updateMenu(this.menus);
    this.comptaDesactive6Mois();
  }

  update() {
    //permet de remettre l opacite a 1 par defaut
    updateMenu(this.menus);
    //enleve le flip vertical du click sur le bouton
    noclic(this.menus);
    //pour le curseur quand il est dessus change l opacite a 0.7
    //mouseNavigation();
    this.timer++;
    musicUpdate();
  }
  
  cliqueBouton(){

    //Initialise et rafraichit
    this.initialiseBouton();
    
    //on leur donne des instructions : Embaucher
    this.EmbaucherOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.calculClick("ouvrier", "plus");
    });

    this.EmbaucherCommercial.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.calculClick("commercial", "plus");
    });
    
    this.EmbaucherComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.calculClick("comptable", "plus");
    });
    
    //Licencier
    this.LicencierOuvrier.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.calculClick("ouvrier", "moins");
    });
    
    this.LicencierCommercial.fMouseInput.emitter.on("leftClickReleased", () => {
      this.musicPlayer.play();
      this.calculClick("commercial", "moins");
    });
    
    this.LicencierComptable.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.calculClick("comptable", "moins"); 
    });
    
    this.Annuler.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      this.localnbOuvrier = nbOuvrier;
      this.localnbCommercial = nbCommercial;
      this.localnbComptable = nbComptable;
      this.initialiseBouton();
    });
    
    this.Valider.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      nbOuvrier=this.localnbOuvrier.valueOf();
      nbCommercial=this.localnbCommercial.valueOf();
      nbComptable=this.localnbComptable.valueOf();
      solde = solde - (this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    });
    
    this.Quitter.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      //Un timer me permet de gerer lorsque l'on clique sur le menu et qu'on reclique par inadvertance au même endroit
      if(this.timer > valTimer){
        jeuTour = 0;
        Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      }
    });
    
  }
  
  initialiseBouton(){
    this.EffectifOuvrier.textRenderer.setText(this.localnbOuvrier.toLocaleString());
    this.EffectifCommercial.textRenderer.setText(this.localnbCommercial.toLocaleString());
    this.EffectifComptable.textRenderer.setText(this.localnbComptable.toLocaleString());
    
    let valO = this.localnbOuvrier*this.salaireOuvrier;
    this.SalaireTotOuvrier.textRenderer.setText(valO.toLocaleString());
    this.totalCoutOuvrier = valO + this.nbfoislicencierO*this.licencierOuvrier;
    this.TotalOuvrier.textRenderer.setText(this.totalCoutOuvrier);
    
    let valC = this.localnbCommercial*this.salaireCommercial;
    this.SalaireTotCommercial.textRenderer.setText(valC.toLocaleString());
    this.totalCoutCommercial = valC + this.nbfoislicencierC*this.licencierCommercial;
    this.TotalCommercial.textRenderer.setText(this.totalCoutCommercial);
    
    let valCC = this.localnbComptable*this.salaireComptable;
    this.SalaireTotComptable.textRenderer.setText(valCC.toLocaleString());
    this.totalCoutComptable = valCC + this.nbfoislicencierCC*this.licencierComptable;
    this.TotalComptable.textRenderer.setText(this.totalCoutComptable);
    
    this.ValeurEmbOuvrier.textRenderer.setText(this.salaireOuvrier.toLocaleString());
    this.ValeurEmbCommercial.textRenderer.setText(this.salaireCommercial.toLocaleString());
    this.ValeurEmbComptable.textRenderer.setText(this.salaireComptable.toLocaleString());
    
    this.ValeurLicOuvrier.textRenderer.setText(this.licencierOuvrier);
    this.ValeurLicCommercial.textRenderer.setText(this.licencierCommercial);
    this.ValeurLicComptable.textRenderer.setText(this.licencierComptable.toLocaleString());
    let varFre = this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable;
    this.MasseSalariale.textRenderer.setText(varFre.toLocaleString());
  }
  
  calculClick(employe: string, operation: string){
    switch(employe){
      case "ouvrier":
        if (operation == "plus"){ //on teste l'ajout d'un employé
          this.totalCoutOuvrier = this.totalCoutOuvrier + this.salaireOuvrier;
          this.localnbOuvrier += 1;
          clicVisuel(this.EmbaucherOuvrier);
        }
        else if (operation == "moins"){//si ce n'est pas l'ajout c'est donc le moins qu'on teste
            this.totalCoutOuvrier = this.totalCoutOuvrier - this.licencierOuvrier;
            if(this.localnbOuvrier > 0){
              this.localnbOuvrier -= 1;
              this.nbfoislicencierO ++;
            }
            clicVisuel(this.LicencierOuvrier);//cette fonction fait un flip vertical sur l'image du bouton
        }
        this.EffectifOuvrier.textRenderer.setText(this.localnbOuvrier);//on rafraichi l'affichage du nombre d'ouvrier
        let valO = this.localnbOuvrier*this.salaireOuvrier;
        this.SalaireTotOuvrier.textRenderer.setText(valO.toLocaleString());
        //la methode toLocaleString permet un affichage des nombres avec un séparateur de millier 
        this.totalCoutOuvrier = valO + this.nbfoislicencierO*this.licencierOuvrier;
        this.TotalOuvrier.textRenderer.setText(this.totalCoutOuvrier);
        this.MasseSalariale.textRenderer.setText(valSalaires);
        break;        
      case "commercial":
        if (operation == "plus"){
          this.totalCoutCommercial = this.totalCoutCommercial + this.salaireOuvrier;
          this.localnbCommercial += 1;
          clicVisuel(this.EmbaucherCommercial);
        }
        else if (operation == "moins"){
            this.totalCoutCommercial = this.totalCoutCommercial - this.licencierOuvrier;
            if(this.localnbCommercial > 0){
              this.localnbCommercial -= 1;
              this.nbfoislicencierC ++;
            }
            clicVisuel(this.LicencierCommercial);
        }
        this.EffectifCommercial.textRenderer.setText(this.localnbCommercial);
        let valC = this.localnbCommercial*this.salaireCommercial;
        this.SalaireTotCommercial.textRenderer.setText(valC.toLocaleString());
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
        else if (operation == "moins"){
          this.totalCoutComptable = this.totalCoutComptable - this.licencierOuvrier;
          if(this.localnbComptable > 0){
            this.localnbComptable -= 1;
            this.nbfoislicencierCC ++;
          }
          clicVisuel(this.LicencierComptable);
        }
        this.EffectifComptable.textRenderer.setText(this.localnbComptable);
        let valCC = this.localnbComptable*this.salaireComptable;
        this.SalaireTotComptable.textRenderer.setText(valCC.toLocaleString());
        this.totalCoutComptable = valCC + this.nbfoislicencierCC*this.licencierComptable;
        this.TotalComptable.textRenderer.setText(this.totalCoutComptable);
        this.MasseSalariale.textRenderer.setText(this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable);
        break;        
      default:
        break;
    }
    valSalaires = this.totalCoutOuvrier+this.totalCoutCommercial+this.totalCoutComptable;
    Sup.log(valSalaires);
  }
  
  comptaDesactive6Mois(){
    if (jeuMois <= 7 && jeuAnnee == anneeDepart){
      this.EmbaucherComptable.setVisible(false);
      this.LicencierComptable.setVisible(false);
      this.txtEmbCompta.setVisible(false);
      this.txtLicCompta.setVisible(false);
    } else{
      this.EmbaucherComptable.setVisible(true);
      this.LicencierComptable.setVisible(true);
      this.txtEmbCompta.setVisible(true);
      this.txtLicCompta.setVisible(true);
    }
  }
  

}
Sup.registerBehavior(PersonnelScriptBehavior);
