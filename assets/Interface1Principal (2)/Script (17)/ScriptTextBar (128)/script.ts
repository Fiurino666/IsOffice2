class ScriptTextBarBehavior extends Sup.Behavior {
  time: number = 0;
  txtDefile : Sup.TextRenderer;
  textProgress = 0;
  strDefile : string = "";
  strEcran : string;
  strChassis : string;
  strComposant : string;
  strOuvrier : string;
  strCommercial : string;
  strComptable : string;
  strFini : string;
  
  awake() {
    this.txtDefile = Sup.getActor("Element").getChild("Fixe").getChild("TexteDefile").textRenderer;
  }

  update() {
    this.time++;
    this.valeurString();
    this.strDefile = "Votre entreprise "+societe+" a : "+nbEcran+" "+this.strEcran+", "+nbChassis+" "+this.strChassis+", "+nbComposant+" "+this.strComposant+", "+nbLotFini+" "+this.strFini+" de téléphones portables à vendre, et "+nbOuvrier+" "+this.strOuvrier+", "+nbCommercial+" "+this.strCommercial+", "+nbComptable+" "+this.strComptable+" sont engagés dans la société."
    //this.txtDefile.setText(this.strDefile);
    if(this.time = 60){
      this.marquee();
      this.time=0;
    }
    
    
  }
  
  marquee() {
    var start_pos = this.strDefile.length;
    
    if (this.textProgress < this.strDefile.length) {
      this.textProgress+=0.1;
      this.txtDefile.setText(this.strDefile.slice(0, this.textProgress));
      this.txtDefile.setText(this.strDefile.substring(this.textProgress,start_pos));
    }else{
      this.textProgress = 0;
      Sup.log("this.textProgress = 0");
    }
    
    
}
  
  valeurString(){
    if(nbEcran < 2){
      this.strEcran = "lot d'écrans";
    }else{
      this.strEcran = "lots d'écrans";
    }
    if(nbChassis < 2){
      this.strChassis = "lot de chassis";
    }else{
      this.strChassis = "lots de chassis";
    }
    if(nbComposant < 2){
      this.strComposant = "lot de composants";
    }else{
      this.strComposant = "lots de composants";
    }
    
    if(nbOuvrier < 2){
      this.strOuvrier = "ouvrier";
    }else{
      this.strOuvrier = "ouvriers";
    }
    if(nbCommercial < 2){
      this.strCommercial = "commercial";
    }else{
      this.strCommercial = "commerciaux";
    }
    if(nbComptable < 2){
      this.strComptable = "comptable";
    }else{
      this.strComptable = "comptables";
    }
    
    if(nbLotFini < 2){
      this.strFini = "lot";
    }else{
      this.strFini = "lots";
    }
    
  }


}
Sup.registerBehavior(ScriptTextBarBehavior);
