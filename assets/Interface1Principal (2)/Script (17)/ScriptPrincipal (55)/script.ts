class ScriptPrincipalBehavior extends Sup.Behavior {
  
  phaseIndex: number;
  phases : Sup.Actor[];
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  menu : Sup.Actor;
  lblSolde : Sup.Actor;
  
  awake() {
    
  }
  
  start() {
    //On recupere tous les elements contenus dans Menu
    this.phases = Sup.getActor("Phase").getChildren();
    this.updatePhase();
    this.menu = Sup.getActor("Element").getChild("Fixe").getChild("Menu");
    this.menu.textRenderer.setOpacity(1);
    this.menuClique();
    this.lblSolde = Sup.getActor("Element").getChild("Fixe").getChild("Solde");
    this.lblSolde.textRenderer.setText(solde + " E");
  }

  update() {
    this.keyNavigation();
    this.mouseNavigation();
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
    }
    //ne pas oublier de desactiver le hover lorsque l on sort
    else{
      if(this.isHover){
        this.isHover = false;
      }
    }
    
    //un clique gauche appel la fonction
    if(Sup.Input.wasMouseButtonJustPressed(0))
      this.phaseAction();
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
        Sup.loadScene("Interface3Acheter/Scene/AcheterScene");
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
  
  menuClique(){
    //pour afficher l'animation sur la clique du bouton menu
    this.ray.setFromCamera(this.actor.camera, Sup.Input.getMousePosition());
    let hits = this.ray.intersectActor(this.menu);
    if(hits.length > 0){
      if(this.isHover != true){
        this.isHover = true;
      }
      this.phaseIndex = this.phases.indexOf(hits[0].actor);
      this.menu.textRenderer.setOpacity(0.7);
      if(Sup.Input.wasMouseButtonJustPressed(0))
        Sup.loadScene("Interface7Menu/Scene/MenuScene");
    }
  }
  
}
Sup.registerBehavior(ScriptPrincipalBehavior);
