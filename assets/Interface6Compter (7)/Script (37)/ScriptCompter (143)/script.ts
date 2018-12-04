class ScriptCompterBehavior extends Sup.Behavior {
  
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });
  //le timer permet de ne pas revenir au menu precedent lors de deux clics trop proche
  timer: number = 0;
  boolMusicPlayBefore : boolean;
  camera : Sup.Actor;
  //on declare les boutons
  Suivant : Sup.Actor;
  
  //les affichages de texte
  AchatMar : Sup.TextRenderer;
  VarStoPi : Sup.TextRenderer;
  Salaires : Sup.TextRenderer;
  ChargesFin : Sup.TextRenderer;
  ChargesExc : Sup.TextRenderer;
  Resultat : Sup.TextRenderer;
  ChargesTot : Sup.TextRenderer;
  
  ProduitsTot : Sup.TextRenderer;
  VentesMar : Sup.TextRenderer;
  ProduitsFini : Sup.TextRenderer;
  ProduitsExc : Sup.TextRenderer; 
  
  AchatMarM : Sup.TextRenderer;
  VarStoPiM : Sup.TextRenderer;
  SalairesM : Sup.TextRenderer;
  ChargesFinM : Sup.TextRenderer;
  ChargesExcM : Sup.TextRenderer;
  ResultatM : Sup.TextRenderer;
  ChargesTotM : Sup.TextRenderer;
  
  ProduitsTotM : Sup.TextRenderer;
  VentesMarM : Sup.TextRenderer;
  ProduitsFinM : Sup.TextRenderer;
  ProduitsExcM : Sup.TextRenderer;
  
  valVarStock : number = 0;
  valResultat : number = 0;
  
  awake() {
    solde += venteEnAttenteM0;
    venteEnAttenteM0 = 0;
    this.Suivant = Sup.getActor("Texte").getChild("Suivant");
    this.AchatMar = Sup.getActor("Element").getChild("ValTexte").getChild("AchatMar").textRenderer;
    this.VarStoPi = Sup.getActor("Element").getChild("ValTexte").getChild("VarStoPi").textRenderer;
    this.Salaires = Sup.getActor("Element").getChild("ValTexte").getChild("Salaires").textRenderer;
    this.ChargesFin = Sup.getActor("Element").getChild("ValTexte").getChild("ChargesFin").textRenderer;
    this.ChargesExc = Sup.getActor("Element").getChild("ValTexte").getChild("ChargesExc").textRenderer;
    this.Resultat = Sup.getActor("Element").getChild("ValTexte").getChild("Resultat").textRenderer;
    this.ChargesTot = Sup.getActor("Element").getChild("ValTexte").getChild("ChargesTot").textRenderer;
    this.ProduitsTot = Sup.getActor("Element").getChild("ValTexte").getChild("ProduitsTot").textRenderer;
    this.VentesMar = Sup.getActor("Element").getChild("ValTexte").getChild("VentesMar").textRenderer;
    this.ProduitsFini = Sup.getActor("Element").getChild("ValTexte").getChild("ProduitsFini").textRenderer;
    this.ProduitsExc = Sup.getActor("Element").getChild("ValTexte").getChild("ProduitsExc").textRenderer;
    this.camera = Sup.getActor("Camera");
    
    this.AchatMarM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("AchatMarM-1").textRenderer;
    this.VarStoPiM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("VarStoPiM-1").textRenderer;
    this.SalairesM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("SalairesM-1").textRenderer;
    this.ChargesFinM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("ChargesFinM-1").textRenderer;
    this.ChargesExcM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("ChargesExcM-1").textRenderer;
    this.ResultatM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("ResultatM-1").textRenderer;
    this.ChargesTotM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("ChargesTotM-1").textRenderer;
    this.ProduitsTotM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("ProduitsTotM-1").textRenderer;
    this.VentesMarM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("VentesMarM-1").textRenderer;
    this.ProduitsFinM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("ProduitsFinM-1").textRenderer;
    this.ProduitsExcM = Sup.getActor("Element").getChild("ValTexteM-1").getChild("ProduitsExcM-1").textRenderer;
    this.affecteMois();
    this.initialiseBouton();
    this.cliqueBouton();
    this.applauseOrNot();
    gererEmprunt();
  }

  update() {
    musicUpdate();
  }
  
  cliqueBouton(){
    this.Suivant.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("Evenement special");
      
      valAchatMarM = valAchatMar; //Les achats de marchandises.
      valSalairesM = valSalaires; //les charges salariales.
      valChargesFinM = valChargesFin; //les charges financieres présente les intérêts des emprunts en cours
      valChargesExcM = valChargesExc; //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur
      valVentesMarM = valVentesMar; //les ventes de marchandises
      valProduitsFinM = valProduitsFin; //les produits financiers lorsque l'on fait un emprunt
      valProduitsExcM = valProduitsExc; //les produits exceptionnels servent aux evenements aleatoire lorsqu'on reçoit de l'argent
      
      
      valAchatMar = 0; //Les achats de marchandises.
      valSalaires = 0; //les charges salariales.
      //valChargesFin = 0; //les charges financieres présente les intérêts des emprunts en cours //desactiver pour ne pas reinitialiser l emprunt en cours
      valChargesExc = 0; //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur
      valVentesMar = 0; //les ventes de marchandises
      valProduitsFin = 0; //les produits financiers lorsque l'on fait un emprunt
      valProduitsExc = 0; //les produits exceptionnels servent aux evenements aleatoire lorsqu'on reçoit de l'argent
      
      valVarStoPiM = this.valVarStock;
      valResultatM = this.valResultat;
      this.valVarStock=0;
      this.valResultat=0;
      musicMuted =  this.boolMusicPlayBefore;
      this.decaleGain();
      nbLotTotalVendu = 0;
      this.camera.moveY(11);
    });
  }
  
  initialiseBouton(){
    gererEmprunt();
    Sup.log("valAchatMar "+valAchatMar);
    this.AchatMar.setText(valAchatMar.toLocaleString());
    if(valAchatMar!=0){
      this.calculVarStockPiece();
      this.VarStoPi.setText(this.valVarStock);
    }else{
      this.VarStoPi.setText(0);
    }
    this.Salaires.setText(valSalaires.toLocaleString());
    this.ChargesFin.setText(valChargesFin.toLocaleString());
    this.ChargesExc.setText(valChargesExc.toLocaleString());
    let valChargesTot = valAchatMar+this.valVarStock+valSalaires+valChargesFin+valChargesExc;
    this.VentesMar.setText(valVentesMar.toLocaleString());
    this.ProduitsFini.setText(valProduitsFin.toLocaleString());
    this.ProduitsExc.setText(valProduitsExc.toLocaleString());
    let valProduitTot = valVentesMar+valProduitsFin+valProduitsExc;
    this.ProduitsTot.setText(valProduitTot.toLocaleString());
    this.valResultat = valProduitTot-valChargesTot;
    this.Resultat.setText(this.valResultat.toLocaleString());
    if (!empruntCeMois){ //on teste si ce n'est pas le premier mois qu'on emprunte
      valProduitsFin = 0;
    }
    let varAff = valChargesTot + this.valResultat;
    this.ChargesTot.setText(varAff.toLocaleString());
    
  }
  
  calculVarStockPiece(){
    this.valVarStock = Math.round(valAchatMar/nbLotTotalAcheter * (nbEcran+nbChassis+nbComposant));
    this.valVarStock = -this.valVarStock;
  }
  
  affecteMois(){
      this.AchatMarM.setText(valAchatMarM.toLocaleString());
      this.VarStoPiM.setText(valVarStoPiM.toLocaleString());
      this.SalairesM.setText(valSalairesM.toLocaleString());
      this.ChargesFinM.setText(valChargesFinM.toLocaleString());
      this.ChargesExcM.setText(valChargesExcM.toLocaleString());
      this.ResultatM.setText(valResultatM.toLocaleString());
      let varAff1 = valAchatMarM+valVarStoPiM+valSalairesM+valChargesFinM+valChargesExcM+valResultatM;
      this.ChargesTotM.setText(varAff1.toLocaleString());
      let varAff2 = valVentesMarM+valProduitsFinM+valProduitsExcM
      this.ProduitsTotM.setText(varAff2.toLocaleString());
      this.VentesMarM.setText(valVentesMarM.toLocaleString());
       this.ProduitsFinM.setText(valProduitsFinM.toLocaleString());
      this.ProduitsExcM.setText(valProduitsExcM.toLocaleString());
  }
  
  applauseOrNot(){
     //pour la musique d'applaudissement ou de cri
    if (musicMuted = false){   
        this.boolMusicPlayBefore = true;
    }else{
        this.boolMusicPlayBefore = false;
    }
    musicMuted = true;
    musicAwake();
    if(this.valResultat >0){
      var musicPlayer = Sup.Audio.playSound("Interface6Compter/Sound/Applause", 0.1, { loop: false });
      musicPlayer.play();
    }else{
      var musicPlayer1 = Sup.Audio.playSound("Interface6Compter/Sound/Coeur", 0.1, { loop: false });
      var musicPlayer2 = Sup.Audio.playSound("Interface6Compter/Sound/Souffle", 0.1, { loop: false });
      var musicPlayer3 = Sup.Audio.playSound("Interface6Compter/Sound/Cri", 0.1, { loop: false });
      musicPlayer1.play();
      musicPlayer2.play();
      musicPlayer3.play();
    }
  }
  
  decaleGain(){
    if(nbComptable >= 1 || (jeuMois <= 7 && jeuAnnee == anneeDepart)){
    venteEnAttenteM0 = venteEnAttenteM1;
    venteEnAttenteM1 = venteEnAttenteM2;
    venteEnAttenteM2 = venteEnAttenteM3;
    venteEnAttenteM3 = venteEnAttenteMx;
    solde += venteEnAttenteM0;
    }
  }
  
}
Sup.registerBehavior(ScriptCompterBehavior);
