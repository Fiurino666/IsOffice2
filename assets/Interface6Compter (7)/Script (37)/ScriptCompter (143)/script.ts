class ScriptCompterBehavior extends Sup.Behavior {
  
  menus : Sup.Actor[];
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.05, { loop: false });;
  //le timer permet de ne pas revenir au menu precedent lors de deux clics trop proche
  timer: number = 0;
  
  
  awake() {
    
    jeuTour = 5;
    this.initialiseBouton();
    this.cliqueBouton();
    
    
  }

  update() {
    this.initialiseBouton();
    updateMenu(this.menus);
    noclic(this.menus);
    this.timer++;
  }
  
  cliqueBouton(){
    
  }
  
  initialiseBouton(){
    
  }
  
  
}
Sup.registerBehavior(ScriptCompterBehavior);
