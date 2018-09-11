class ScriptCompterBehavior extends Sup.Behavior {
  
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });;
  //le timer permet de ne pas revenir au menu precedent lors de deux clics trop proche
  timer: number = 0;
  
  //on declare les boutons
  Suivant : Sup.Actor;
  
  //les affichages de texte
  AchatMar : Sup.TextRenderer;
  Salaires : Sup.TextRenderer;
  ChargesFin : Sup.TextRenderer;
  ChargesExc : Sup.TextRenderer;
  Resultat : Sup.TextRenderer;
  ChargesTot : Sup.TextRenderer;
  ProduitsTot : Sup.TextRenderer;
  VentesMar : Sup.TextRenderer;
  ProduitsFin : Sup.TextRenderer;
  ProduitsExc : Sup.TextRenderer;
  
  awake() {
    jeuTour=0;

    this.Suivant = Sup.getActor("Texte").getChild("Suivant");
    this.AchatMar = Sup.getActor("Element").getChild("ValTexte").getChild("AchatMar").textRenderer;
    this.Salaires = Sup.getActor("Element").getChild("ValTexte").getChild("Salaires").textRenderer;
    this.ChargesFin = Sup.getActor("Element").getChild("ValTexte").getChild("ChargesFin").textRenderer;
    this.ChargesExc = Sup.getActor("Element").getChild("ValTexte").getChild("ChargesExc").textRenderer;
    this.Resultat = Sup.getActor("Element").getChild("ValTexte").getChild("Resultat").textRenderer;
    this.ChargesTot = Sup.getActor("Element").getChild("ValTexte").getChild("ChargesTot").textRenderer;
    this.ProduitsTot = Sup.getActor("Element").getChild("ValTexte").getChild("ProduitsTot").textRenderer;
    this.VentesMar = Sup.getActor("Element").getChild("ValTexte").getChild("VentesMar").textRenderer;
    this.ProduitsFin = Sup.getActor("Element").getChild("ValTexte").getChild("ProduitsFin").textRenderer;
    this.ProduitsExc = Sup.getActor("Element").getChild("ValTexte").getChild("ProduitsExc").textRenderer;
    
    this.initialiseBouton();
    this.cliqueBouton();
  }

  update() {
    this.initialiseBouton();
    this.timer++;
  }
  
  cliqueBouton(){
    this.Suivant.fMouseInput.emitter.on("leftClickReleased", () => { 
      this.musicPlayer.play();
      Sup.log("FinDuMois");
      jeuMois++;
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    });
  }
  
  initialiseBouton(){
    Sup.log(valAchatMar);
    this.AchatMar.setText(valAchatMar);
    this.Salaires.setText(valSalaires);
    this.ChargesFin.setText(valChargesFin);
    this.ChargesExc.setText(valChargesExc);
    this.Resultat.setText(solde);
    this.ChargesTot.setText(valAchatMar+valSalaires+valChargesFin+valChargesExc+solde);
    
    this.VentesMar.setText(valVentesMar);
    this.ProduitsFin.setText(valProduitsFin);
    this.ProduitsExc.setText(valProduitsExc);
    this.ProduitsTot.setText(valVentesMar+valProduitsFin+valProduitsExc);
    
  }
  
  
  
}
Sup.registerBehavior(ScriptCompterBehavior);
