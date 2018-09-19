class ScriptCompterBehavior extends Sup.Behavior {
  
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });
  //le timer permet de ne pas revenir au menu precedent lors de deux clics trop proche
  timer: number = 0;
  
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
  
  valVarStock : number;
  
  awake() {
    jeuTour=0;

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
    this.premierMois();
    this.initialiseBouton();
    this.cliqueBouton();
  }

  update() {
    
  }
  
  cliqueBouton(){
    this.Suivant.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("FinDuMois");
      jeuMois++;
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      
      valAchatMarM = valAchatMar; //Les achats de marchandises.
      valSalairesM = valSalaires; //les charges salariales.
      valChargesFinM = valChargesFin; //les charges financieres présente les intérêts des emprunts en cours
      valChargesExcM = valChargesExc; //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur
      valVentesMarM = valVentesMar; //les ventes de marchandises
      valProduitsFinM = valProduitsFini; //les produits financiers lorsque l'on fait un emprunt
      valProduitsExcM = valProduitsExc;
            
      valAchatMar = 0; //Les achats de marchandises.
      valSalaires = 0; //les charges salariales.
      valChargesFin = 0; //les charges financieres présente les intérêts des emprunts en cours
      valChargesExc = 0; //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur
      valVentesMar = 0; //les ventes de marchandises
      valProduitsFini = 0; //les produits financiers lorsque l'on fait un emprunt
      valProduitsExc = 0;
    });
  }
  
  initialiseBouton(){
    Sup.log("valAchatMar "+valAchatMar);
    this.AchatMar.setText(valAchatMar);
    if(valAchatMar!=0){
      this.calculVarStockPiece();
      
      this.VarStoPi.setText(this.valVarStock);
        
    }else{
      this.VarStoPi.setText(0);
    }    
    this.Salaires.setText(valSalaires);
    this.ChargesFin.setText(valChargesFin);
    this.ChargesExc.setText(valChargesExc);
    let valChargesTot = valAchatMar-this.valVarStock+valSalaires+valChargesFin+valChargesExc;
    this.VentesMar.setText(valVentesMar);
    this.ProduitsFini.setText(valProduitsFini);
    this.ProduitsExc.setText(valProduitsExc);
    let valProduitTot = valVentesMar+valProduitsFini+valProduitsExc;
    this.ProduitsTot.setText(valProduitTot);
    let valResultat = valProduitTot-valChargesTot;
    this.Resultat.setText(valResultat);
    
    this.ChargesTot.setText(valChargesTot + valResultat);
  }
  
  calculVarStockPiece(){
    let valMoyenneAchatElement = (valAchatMar/(nbEcran+nbChassis+nbComposant+(nbLotFini*3)));
    Sup.log("valMoyenneAchatElement " + valMoyenneAchatElement);
    this.valVarStock = Math.round((nbElementM - (nbEcran+nbChassis+nbComposant)) * valMoyenneAchatElement);
  }
  
  premierMois(){
    if(jeuMois==0){
      this.AchatMarM.setText(0);
      this.VarStoPiM.setText(0);
      this.SalairesM.setText(0);
      this.ChargesFinM.setText(0);
      this.ChargesExcM.setText(0);
      this.ResultatM.setText(0);
      this.ChargesTotM.setText(0);
      this.ProduitsTotM.setText(0);
      this.VentesMarM.setText(0);
      this.ProduitsFinM.setText(0);
      this.ProduitsExcM.setText(0);
    }
  }  
  
}
Sup.registerBehavior(ScriptCompterBehavior);
