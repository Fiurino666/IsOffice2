class ScriptTextAchatBehavior extends Sup.Behavior {
  timer: number = 0;
  txtDefile : Sup.TextRenderer;
  textProgress = 0;
  strDefile : string = "";
  
  awake() {
    this.txtDefile = Sup.getActor("Vue2").getChild("Texte").getChild("Defile").textRenderer;
  }

  update() {
    this.timer++;
    this.strDefile = "           Votre entreprise "+societe+" a : "+nbEcran+" "+gereS(nbEcran,"lot")+" "+gereS(nbEcran,"d'écran")+", "+nbChassis+" "+gereS(nbChassis,"lot")+
      " de chassis"+", "+nbComposant+" "+gereS(nbComposant,"lot")+" de "+gereS(nbComposant,"composant")+", "+nbLotFini+" "+gereS(nbLotFini,"lot")+
      " de téléphones portables à vendre.";
    //this.txtDefile.setText(this.strDefile);
    if(this.timer = 60){
      this.marquee();
      this.timer=0;
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
      this.strDefile = "           Votre entreprise "+societe+" a : "+nbEcran+" "+gereS(nbEcran,"lot")+" "+gereS(nbEcran,"d'écran")+", "+nbChassis+" "+gereS(nbChassis,"lot")+
      " de chassis"+", "+nbComposant+" "+gereS(nbComposant,"lot")+" de "+gereS(nbComposant,"composant")+", "+nbLotFini+" "+gereS(nbLotFini,"lot")+
      " de téléphones portables à vendre.";
      Sup.log("this.textProgress = 0");
    }   
  }
  
  relance(){
      this.timer = 0;
      this.strDefile = "";
      this.textProgress = 0;
      this.txtDefile.setText("");  
  }

}
Sup.registerBehavior(ScriptTextAchatBehavior);
