class ScriptPersoBehavior extends Sup.Behavior {

  text1 = "";
  text2 = "";
  font: Sup.Font;
  column1 = 0;
  column2 = 0;
  cursorActor1: Sup.Actor;
  cursorActor2: Sup.Actor;
  cursorWidth: number;
  blinkTimer = 0;
  static blinkDuration = 20;
  
  awake() {
    this.font = Sup.getActor("Element").getChild("InputNom").textRenderer.getFont();
    
    Sup.getActor("Element").getChild("InputNom").textRenderer.setText(this.text1);
    Sup.getActor("Element").getChild("InputSociete").textRenderer.setText(this.text2);
    this.column1 = this.text1.length;
    this.column2 = this.text2.length;
    this.cursorActor1 = Sup.getActor("Element").getChild("InputNom");
    this.cursorActor1.textRenderer.setOpacity(0.5);
    this.cursorActor2 =Sup.getActor("Element").getChild("InputSociete");
    this.cursorActor2.textRenderer.setOpacity(0.5);
    this.cursorWidth = this.font.getTextWidth("|");
  }

  update() {
    this.upfonc(this.cursorActor1, this.text1, this.column1);
    this.upfonc(this.cursorActor2, this.text2, this.column2);
  }
  
  upfonc(cursorActor, text, column){
    // Typing
    let textEntered = Sup.Input.getTextEntered();
    if (textEntered.length > 0) {
      for (let character of textEntered) {
        text = text.substring(0, column) + character + text.substring(column);
        column++;
      }
      this.refunc(cursorActor, text, column);
    }
    
    // Erasing
    if (Sup.Input.wasKeyJustPressed("BACK_SPACE", { autoRepeat: true })) {
      text = text.substring(0, column - 1) + text.substring(column);
      column = Math.max(0, column - 1);
      this.refunc(cursorActor, text, column);
    }

    if (Sup.Input.wasKeyJustPressed("DELETE", { autoRepeat: true })) {
      text = text.substring(0, column) + text.substring(column + 1);
      this.refunc(cursorActor, text, column);
    }
    
    // Moving around
    if (Sup.Input.wasKeyJustPressed("LEFT", { autoRepeat: true })) { column = Math.max(0, column - 1); this.refunc(cursorActor, text, column); }
    if (Sup.Input.wasKeyJustPressed("RIGHT", { autoRepeat: true })) { column = Math.min(text.length, column + 1); this.refunc(cursorActor, text, column); }
    if (Sup.Input.wasKeyJustPressed("HOME", { autoRepeat: true })) { column = 0; this.refunc(cursorActor, text, column); }
    if (Sup.Input.wasKeyJustPressed("END", { autoRepeat: true })) { column = text.length; this.refunc(cursorActor, text, column); }
    
    // Make cursor blink
    this.blinkTimer++;
    if (this.blinkTimer === ScriptPersoBehavior.blinkDuration) {
      this.blinkTimer = 0;
      cursorActor.setVisible(!cursorActor.getVisible());
    }
    
    if(cursorActor === this.cursorActor1){
      this.text1 = text;
      this.column1 = column;
    }
    if(cursorActor === this.cursorActor2){
      this.text2 = text;
      this.column2 = column;
    }
  }
  
  refunc(cursorActor, text, column){
    this.blinkTimer = 0;
    cursorActor.setVisible(true);

    cursorActor.textRenderer.setText(text);
    let offset = this.font.getTextWidth(text.substring(0, column));
    if (cursorActor.textRenderer.getAlignment() === "left") offset -= this.font.getTextWidth(text) / 2;
    cursorActor.setLocalX(offset - this.cursorWidth / 2);
    
    if(cursorActor === this.cursorActor1){
      this.text1 = text;
      this.column1 = column;
    }
    if(cursorActor === this.cursorActor2){
      this.text2 = text;
      this.column2 = column;
    }
  }
  
  }
Sup.registerBehavior(ScriptPersoBehavior);