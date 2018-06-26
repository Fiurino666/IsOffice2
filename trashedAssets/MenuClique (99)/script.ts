class MenuCliqueBehavior extends Sup.Behavior {
  
  menu : Sup.Actor;
  ray = new Sup.Math.Ray();
  isHover: boolean = false;
  phaseIndex: number;
  phases : Sup.Actor[];
  
  awake() {
    
  }

  update() {

  }
  
  
  
}
Sup.registerBehavior(MenuCliqueBehavior);
