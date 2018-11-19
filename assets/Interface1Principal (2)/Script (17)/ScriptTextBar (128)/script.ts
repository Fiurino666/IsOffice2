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
    this.strDefile = "                Année : "+jeuAnnee+", mois : "+ moisDeLannee() +", votre entreprise "+societe+" a : "+nbEcran+" "+gereS(nbEcran,"lot")+
      " "+gereS(nbEcran,"d'écran")+", "+nbChassis+" "+gereS(nbChassis,"lot")+
      " de chassis"+", "+nbComposant+" "+gereS(nbComposant,"lot")+" de "+gereS(nbComposant,"composant")+", "+nbLotFini+" "+gereS(nbLotFini,"lot")+
      " de téléphones portables à vendre, et "+nbOuvrier+" "+gereS(nbOuvrier,"ouvrier")+
      ", "+nbCommercial+" "+gereS(nbCommercial,"commercial")+", "+nbComptable+" "+gereS(nbComptable,"comptable")+" sont engagés dans la société.";
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

}
Sup.registerBehavior(ScriptTextBarBehavior);
