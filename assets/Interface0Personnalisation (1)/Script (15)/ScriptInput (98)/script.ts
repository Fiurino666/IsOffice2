class ScriptInputBehavior extends Sup.Behavior {
  
  timer:number=0;
  cursorActor1: Sup.Actor;
  cursorActor2: Sup.Actor;
  imgInput1: Sup.Actor;
  imgInput2: Sup.Actor;
  valeur: number = 0;
  column = 0;
  font: Sup.Font;
  listNom: string[] = ["Tom","Pilou","Slevin","Bjo","Fiuri","Poulay","Tartifle","Laylo","Tub","Karnage"];
  listEntreprise: string[] = ["Corporation","Enterprise","Starfleet","Defiant","Intrepide","Vaillant","Voyager","Antares","Cube Borg","Stargazer"];
  menus : Sup.Actor[];
  
  GenererNom: Sup.Actor;
  GenererEntreprise: Sup.Actor;
  Valider: Sup.Actor;
  LabelNom: Sup.Actor;
  LabelSociete: Sup.Actor;
  TxtGenererNom: Sup.Actor;
  TxtGenererEntreprise: Sup.Actor;
  TxtValider: Sup.Actor;
  txtPres: string;
  
  awake() {
    lirebdd();
    musicAwake();
    if (solde == 20000){
      this.menus = Sup.getActor("Element").getChild("Bouton").getChildren();
      this.cursorActor1 = Sup.getActor("Element").getChild("InputNom");
      this.font = Sup.getActor("Element").getChild("InputNom").textRenderer.getFont();
      this.cursorActor2 = Sup.getActor("Element").getChild("InputSociete");
      this.imgInput1 = Sup.getActor("Element").getChild("ImgInput1");
      this.imgInput2 = Sup.getActor("Element").getChild("ImgInput2");
      animeAssistant(Sup.getActor("Element").getChild("Assistant").spriteRenderer, true);
      this.GenererNom = Sup.getActor("Element").getChild("Bouton").getChild("GenererNom");
      this.GenererEntreprise = Sup.getActor("Element").getChild("Bouton").getChild("GenererEntreprise");
      this.Valider = Sup.getActor("Element").getChild("Bouton").getChild("Valider");
      this.TxtGenererNom = Sup.getActor("Texte").getChild("LabelGenNom");
      this.TxtGenererEntreprise = Sup.getActor("Texte").getChild("LabelGenEntreprise");
      this.TxtValider = Sup.getActor("Texte").getChild("LabelValider");
      this.LabelSociete = Sup.getActor("Texte").getChild("LabelSociete");
      this.LabelNom = Sup.getActor("Texte").getChild("LabelNom");
      Sup.log(this.valeur);
      this.initialiseBouton();
    }else{
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
    }
  }

  update() {
    updateMenu(this.menus);
    noclic(this.menus);
    musicUpdate();
    this.timer++;
    if(this.timer == 180){
      animeAssistant(Sup.getActor("Element").getChild("Assistant").spriteRenderer, true);
      this.timer=0;
    }
    Sup.log(this.valeur);
    Sup.log("this.column "+this.column);
    //si on a pas encore appuyer sur entree
    if(this.valeur == 0){
      nom = this.suppr(nom);
      this.cursorActor1.textRenderer.setText(nom);
    }
    //si on a deja appuyer une fois sur entree
    if(this.valeur == 1){
      societe = this.suppr(societe);
      this.cursorActor2.textRenderer.setText(""+societe);
      this.txtPres = "Vous venez d'investir toutes vos économies \n pour fonder votre société : " +societe+" \n \
  de fabrication de téléphone portable. \n \
  J'espère pouvoir vous être utile comme assistant. \n \
  Je m’occupe de votre comptabilité pendant les six premiers mois, \n \
  c’est dans mes fonctions d’assistant. \n \
  Ensuite ce sera à vous de gérer patron. \n \
  Appuyer sur Entrée pour continuer ...";
      this.visibleGenNom(false);
      this.visibleGenEntreprise(true);
      this.imgInput1.setVisible(false);
      this.imgInput2.setVisible(true);
    }
    
    if (Sup.Input.wasKeyJustPressed("RETURN") && nom  != "") {
      switch (this.valeur){
        case 0:{  //on appuie une fois sur entrée
          this.tresBien();
          break;
        }          
        case 1:{ //deux fois que nous avons appuyer sur entrée
          if (societe != ""){
            this.presentation();
          }else{
            this.valeur--; //on diminue la valeur pour relire le nom de société
          }
         break;
        }
        case 2:{
          apiLire();
          Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
          break;
        }
      }
      this.valeur ++;
    }
  }
  
  suppr(text:string):string{
   if (Sup.Input.wasKeyJustPressed("BACK_SPACE", { autoRepeat: true })) { //efface un caractere lorsque l'on appuie sur supprime
      this.column = text.length+1;
      this.column --;
      text = text.substring(0, this.column - 1) + text.substring(this.column);
      this.column = Math.max(0, this.column - 1);
    }
    else{
      if (text.length < 19){
        text = text + Sup.Input.getTextEntered(); //C'est ici que nous ajoutons du texte lorsque l'utilisateur tape
      }
    }
    return text;
  }
  
  initialiseBouton(){
    this.GenererNom.fMouseInput.emitter.on("leftClickReleased", () => {
      let rng = new RNG(String(Math.random()));
      nom = this.listNom[rng.random(0, 9)];
      this.tresBien();
      this.visibleGenEntreprise(true);
      this.visibleGenNom(false);
      this.valeur ++;
            
    });
    
    this.GenererEntreprise.fMouseInput.emitter.on("leftClickReleased", () => {
      let rng = new RNG(String(Math.random()));
      societe = this.listEntreprise[rng.random(0, 9)];
      this.cursorActor2.textRenderer.setText(societe);
      this.Valider.setVisible(true);
      this.TxtValider.setVisible(true);
      this.valeur ++;
    });
    
    this.Valider.fMouseInput.emitter.on("leftClickReleased", () => {
      if(this.valeur < 3){
        this.presentation();
        this.valeur ++;
      }else{
        Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      }
      
    });
  }
  
  visibleGenNom(bool:boolean){
    this.GenererNom.setVisible(bool);
    this.TxtGenererNom.setVisible(bool);
  }
  
  visibleGenEntreprise(bool:boolean){
    this.GenererEntreprise.setVisible(bool);
    this.TxtGenererEntreprise.setVisible(bool);
  }
  
  tresBien(){
    this.imgInput1.setVisible(false);
    this.imgInput2.setVisible(true);
    this.LabelNom.setVisible(false);
    this.LabelSociete.setVisible(true);
    this.visibleGenNom(false);
    this.cursorActor1.textRenderer.setText("Très bien, allons y "+nom);
  }
  
  presentation(){
    this.visibleGenNom(false);
    this.visibleGenEntreprise(false);
    this.imgInput1.setVisible(false);
    this.imgInput2.setVisible(false);
    this.LabelSociete.setVisible(false);
    this.cursorActor2.textRenderer.setText("");
    this.cursorActor1.textRenderer.setSize(30);
    this.cursorActor1.setLocalScale(0.2, 0.2, 1);
    this.cursorActor1.textRenderer.setText(this.txtPres);
    this.cursorActor1.textRenderer.setSize(42);
  }
  
}
Sup.registerBehavior(ScriptInputBehavior);
