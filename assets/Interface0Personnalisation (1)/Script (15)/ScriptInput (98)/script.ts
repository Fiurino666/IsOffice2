class ScriptInputBehavior extends Sup.Behavior {
  
  
  cursorActor1: Sup.Actor;
  cursorActor2: Sup.Actor;
  imgInput1: Sup.Actor;
  imgInput2: Sup.Actor;
  valeur: number = 0;
  column = 0;
  font: Sup.Font;
  
  awake() {
    this.cursorActor1 = Sup.getActor("Element").getChild("InputNom");
    this.font = Sup.getActor("Element").getChild("InputNom").textRenderer.getFont();
    this.cursorActor2 = Sup.getActor("Element").getChild("InputSociete");
    Sup.getActor("Texte").getChild("LabelSociete").setVisible(false);
    this.imgInput1 = Sup.getActor("Element").getChild("ImgInput1");
    this.imgInput2 = Sup.getActor("Element").getChild("ImgInput2");
    musicAwake();
  }

  update() {
    musicUpdate();
    
    Sup.log("this.column "+this.column);
    //si on a pas encore appuyer sur entree
    if(this.valeur == 0){
      nom = this.suppr(nom);
      this.cursorActor1.textRenderer.setText(""+nom);
    }
    
    
    //si on a deja appuyer une fois sur entree
    if(this.valeur == 1){
      societe = this.suppr(societe);
      this.cursorActor2.textRenderer.setText(""+societe);
      this.imgInput1.setVisible(false);
      this.imgInput2.setVisible(true);
    }
    
    if (Sup.Input.wasKeyJustPressed("RETURN") || Sup.Input.wasMouseButtonJustPressed(2)) {
      switch (this.valeur){
          //on appuie deux fois sur entree
        case 0:{
          Sup.getActor("Texte").getChild("LabelNom").setVisible(false);
          Sup.getActor("Texte").getChild("LabelSociete").setVisible(true);
          this.cursorActor1.textRenderer.setText("Très bien, allons y "+nom);
          break;
        }
          
          //troisieme fois que nous avons appuyer sur entree
        case 1:{
          this.imgInput2.setVisible(false);
          Sup.getActor("Texte").getChild("LabelSociete").setVisible(false);
          this.cursorActor2.textRenderer.setText("");
          this.cursorActor1.textRenderer.setSize(36);
          this.cursorActor1.setLocalScale(0.2, 0.2, 1);
          this.cursorActor1.textRenderer.setText("Je suis Henri votre assistant personnel, \n notre entreprise " +societe+"\n fabrique des téléphones portables. \n À vous de gérer maintenant patron ! \n Appuyer sur Entrée ou cliquer pour la suite ...");
          break;
        }
        case 2:{
          Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
          break;
        }
      }
      this.valeur ++;
    }
  }
  
  suppr(text):string{
    //supprimer caractere ne marche pas
   if (Sup.Input.wasKeyJustPressed("BACK_SPACE", { autoRepeat: true })) {
      this.column = text.length+1;
      this.column --;
      text = text.substring(0, this.column - 1) + text.substring(this.column);
      this.column = Math.max(0, this.column - 1);
    }
    else{
      text = text + Sup.Input.getTextEntered();
    }
    return text;
  }
  
  
}
Sup.registerBehavior(ScriptInputBehavior);
