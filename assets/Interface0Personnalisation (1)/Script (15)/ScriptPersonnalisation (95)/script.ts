class ScriptPersonnalisationBehavior extends Sup.Behavior {
  
  text1 = "";
  text2 = "";
  cursorActor1: Sup.Actor;
  cursorActor2: Sup.Actor;
  column1 = 0;
  column2 = 0;
  cursorWidth: number;
  
  awake() {
    
    this.cursorActor1 = Sup.getActor("Element").getChild("InputNom");
    this.cursorActor1.textRenderer.setText(this.text1);
    this.cursorActor2 = Sup.getActor("Element").getChild("InputSociete");
    this.cursorActor2.textRenderer.setText(this.text2);
    
  }

  update() {
    this.upfonc(this.cursorActor1, this.text1, this.column1);
    this.upfonc(this.cursorActor2, this.text2, this.column2);
    
  }
  
  upfonc(cursorActor, text, column){
    let textEntered = Sup.Input.getTextEntered();
    if (textEntered.length > 0) {
      for (let character of textEntered) {
        text = text.substring(0, column) + character + text.substring(column);
        column++;
      }
      cursorActor.textRenderer.setText(text);
      
    }
    
  }
  

}
Sup.registerBehavior(ScriptPersonnalisationBehavior);
