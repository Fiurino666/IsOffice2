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
  }

  update() {
    this.column = Sup.Input.getTextEntered().length;
    
    //si on a pas encore appuyer sur entree
    if(this.valeur == 0){
      this.suppr(nom);
      nom = nom + Sup.Input.getTextEntered();
      this.cursorActor1.textRenderer.setText(""+nom);
    }
    
    //si on a deja appuyer une fois sur entree
    if(this.valeur == 1){
      this.suppr(societe);
      societe = societe + Sup.Input.getTextEntered();
      this.cursorActor2.textRenderer.setText(""+societe);
      this.imgInput1.setVisible(false);
      this.imgInput2.setVisible(true);
    }
    
    if (Sup.Input.wasKeyJustPressed("RETURN")) {
      switch (this.valeur){
          //on appuie deux fois sur entree
        case 0:
          Sup.getActor("Texte").getChild("LabelNom").setVisible(false);
          Sup.getActor("Texte").getChild("LabelSociete").setVisible(true);
          this.cursorActor1.textRenderer.setText("Très bien, allons y "+nom);
          
          
          break;
          //troisieme fois que nous avons appuyer sur entree
        case 1:
          this.imgInput2.setVisible(false);
          Sup.getActor("Texte").getChild("LabelSociete").setVisible(false);
          this.cursorActor2.textRenderer.setText("");
          this.cursorActor1.textRenderer.setSize(36);
          this.cursorActor1.setLocalScale(0.2, 0.2, 1);
          this.cursorActor1.textRenderer.setText("Je suis Henri votre assistant, \n notre entreprise " +societe+"\n fabrique des télephones portables. \n A vous de gérer maintenant! \n Appuyer sur Entrée pour la suite");
          break;
        case 2:
          Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
          break;
      }
      this.valeur ++;
    }
  }
  
  suppr(text){
    //supprimer caractere ne marche pas
    if (Sup.Input.wasKeyJustPressed("BACK_SPACE", { autoRepeat: true })) {
      this.column --;
      text = text.substring(0, this.column - 1) + text.substring(this.column);
      this.column = Math.max(0, this.column - 1);
    }
    
  }
  
  
}
Sup.registerBehavior(ScriptInputBehavior);
