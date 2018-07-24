class ScriptTextBarBehavior extends Sup.Behavior {
  time: number = 0;
  txtDefile : Sup.TextRenderer;
  textProgress = 0;
  strDefile : string = "";
  
  awake() {
    this.txtDefile = Sup.getActor("Element").getChild("Fixe").getChild("TexteDefile").textRenderer;
  }

  update() {
    this.time++;
    this.strDefile = "Votre entreprise "+societe+" a : "+nbEcran+" lots d'écrans, "+nbChassis+" lots de chassis "+nbComposant+" lots de composants, "+nbLotFini+" de lots de téléphones portables à vendre, ainsi que "+nbOuvrier+" ouvrier(s) "+nbCommercial+" commerciau(x) "+nbComptable+" comptable(s)."
    //this.txtDefile.setText(this.strDefile);
    if(this.time = 60){
      this.marquee();
      this.time=0;
    }
    
    
  }
  
  marquee() {
    var start_pos = this.strDefile.length;
    
    if (!this.isTextFinished()) {
      this.textProgress+=0.1;
      this.txtDefile.setText(this.strDefile.slice(0, this.textProgress));
      this.txtDefile.setText(this.strDefile.substring(this.textProgress,start_pos));
    }else{
      this.textProgress = 0;
    }
    
    
}
  
  isTextFinished = () => this.textProgress == this.strDefile.length;


}
Sup.registerBehavior(ScriptTextBarBehavior);
