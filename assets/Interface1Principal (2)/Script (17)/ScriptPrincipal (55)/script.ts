class ScriptPrincipalBehavior extends Sup.Behavior {
  
  phaseIndex: number;
  phases : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  lblSolde : Sup.Actor;
  
  ouvrierPersonne : Sup.Actor;
  ouvrierMeuble : Sup.Actor;
  commercialPersonne : Sup.Actor;
  comptableMeuble : Sup.Actor;
  comptablePersonne : Sup.Actor;
  
  awake() {
    //On recupere tous les elements contenus dans Menu
    this.phases = Sup.getActor("Phase").getChildren();
    this.updatePhase();

    this.lblSolde = Sup.getActor("Element").getChild("Fixe").getChild("Solde");
    this.lblSolde.textRenderer.setText(solde + " E");
    Sup.getActor("Element").getChild("Fixe").getChild("TxtBureauDe").textRenderer.setText("Bureau de "+nom);
    this.ouvrierPersonne = Sup.getActor("Element").getChild("Dynamique").getChild("OuvrierPersonne");
    this.ouvrierMeuble = Sup.getActor("Element").getChild("Dynamique").getChild("OuvrierMeuble");
    this.commercialPersonne = Sup.getActor("Element").getChild("Dynamique").getChild("CommercialPersonne");
    this.comptableMeuble = Sup.getActor("Element").getChild("Dynamique").getChild("ComptableMeuble");
    this.comptablePersonne = Sup.getActor("Element").getChild("Dynamique").getChild("ComptablePersonne");
  }

  update() {
    this.keyNavigation();
    this.mouseNavigation();
    this.afficheDynamique();
  }
  
  keyNavigation(){
    
    if(Sup.Input.wasKeyJustPressed("DOWN", { autoRepeat:true })) {
      this.phaseIndex = Math.min(this.phaseIndex + 1, this.phases.length -1);
      this.updatePhase();
    }
    
    if(Sup.Input.wasKeyJustPressed("UP", { autoRepeat:true })) {
      this.phaseIndex = Math.min(this.phaseIndex - 1, this.phases.length -1);
      this.updatePhase();
    }
    //return correspond a entrer ;-)
    if(Sup.Input.wasKeyJustPressed("RETURN", { autoRepeat:true })) {
      this.phaseAction();
    }
    
    if(Sup.Input.wasKeyJustPressed("SPACE", { autoRepeat:true })) {
      this.phaseAction();
    }
  }
  
  mouseNavigation(){
    
    this.ray.setFromCamera(this.actor.camera, Sup.Input.getMousePosition());
    let hits = this.ray.intersectActors(this.phases);
    
    //isHover permet de savoir si on a le curseur dessus
    if(hits.length > 0){
      if(this.isHover != true){
        this.isHover = true;
      }
      this.phaseIndex = this.phases.indexOf(hits[0].actor);
      this.updatePhase();
      if(Sup.Input.wasMouseButtonJustPressed(0))
        this.phaseAction();
    }
    //ne pas oublier de desactiver le hover lorsque l on sort
    else{
      if(this.isHover){
        this.isHover = false;
      }
    }
    
    //un clique gauche appel la fonction
    
  }
  
  updatePhase(){
    
    for(let i = 0; i<this.phases.length;i++){
      this.phases[i].textRenderer.setOpacity(i === this.phaseIndex ? 1 : 0.7);
    }
  }
  
  phaseAction(){
    switch(jeuTour){
        case 0:
        Sup.loadScene("Interface2Personnel/Scene/PersonnelScene");
        break;
        case 1:
        Sup.loadScene("Interface3Achat/Scene/SceneAcheter");
        break;
        case 2:
        Sup.loadScene("Interface4Produire/Scene/ProduireScene");
        break;
        case 3:
        Sup.loadScene("Interface5Vendre/Scene/VendreScene");
        break;
        case 4:
        Sup.loadScene("Interface6Compter/Scene/CompterScene");
        break;
      default:
        break;
        
    }
  }
  
  afficheDynamique(){
    
    if(nbOuvrier>0){
      this.ouvrierPersonne.setVisible(true);
      this.ouvrierMeuble.setVisible(true);
    }
    else{
      this.ouvrierPersonne.setVisible(false);
      this.ouvrierMeuble.setVisible(false);
    }
    if(nbComptable>0){
      this.comptableMeuble.setVisible(true);
      this.comptablePersonne.setVisible(true);
    }
    else{
      this.comptableMeuble.setVisible(false);
      this.comptablePersonne.setVisible(false);
    }
     if(nbComptable>0){
       this.commercialPersonne.setVisible(true);
     }
    else{
      this.commercialPersonne.setVisible(false);
    }
    
   
  }
  
  
}
Sup.registerBehavior(ScriptPrincipalBehavior);
