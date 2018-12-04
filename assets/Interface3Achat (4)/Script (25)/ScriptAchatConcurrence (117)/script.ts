
class ScriptAchatConcurrenceBehavior extends Sup.Behavior {
  //Pour définir les intentions d'achat des entreprises concurrentes
  iaArray = new Array(3);
  affiche = new Array(6);
  txtAffiche = new Array(6);
  boutonTableau = new Array(16);
  texteTableau = new Array(16);
  enchereSprite = new Array(16);
  enchereTexte = new Array(16);
  enchereAffine = new Array(24);
  qInfo : Sup.Actor;
  timer : number = 0;
  iaTotal : number = 0;
  etape1 : Sup.Actor;
  etape2 : Sup.Actor;
  etape3 : Sup.Actor;
  etape4 : Sup.Actor;
  etape5 : Sup.Actor;
  valeur : number = 1;
  element2 : string;
  boutonNombre : Sup.Actor;
  texteNombre : Sup.Actor;
  camera : Sup.Actor;
  emitter : EventEmitter;
  //Pour savoir combien d'element le joueur veut acheter
  lotNombre : number; //pour calculer les intentions d'achat il propose une intention
  lotDivise : number; //stock le total des ordis plus celui du joueur divisé par 3
  lotChoisi : number; //nombre de lot que le joueur a choisi pour un fabricant
  prixEnchere : number; //quel prix a été proposé par le joueur pour l'enchere
  elementAchat : number; //combien d'élément le joueur a pu effectivement acheter a ce fabricant
  elementAchatTotal : number = 0; //combien d'élément le joueur a pu effectivement acheter a tous les fabricants ce tour
  prixAchat : number; //le prix des achats a ce fabricant
  IAprixAchat: number[] = new Array(3); //pour stocker les prix d'achat formulé par l'IA en tableau
  IAlotChoisi: number[] = new Array(3); //pareil que IAprixEnchere mais pour le nombre de lot
  IAelementAchat: number[] = new Array(3);//stocke le nombre d'achat de chaque IA pour l'affichage
  premiereFois:boolean = false; //pour éviter de créer les event emitter sur click plusieurs fois
  deuxiemeFois:boolean = false; //pour éviter de créer les event emitter sur click plusieurs fois
  troisiemeFois:boolean = false;
  fab1 : string;
  fab2 : string;
  fab3 : string;
  delaiTime : number = 25;
  musicPlayer = Sup.Audio.playSound("Interface1Principal/Sound/Clique", 0.1, { loop: false });
  
  awake(){
    musicAwake();
    //pour gerer l'ajout continue de 16 boutons
    EventEmitter.defaultMaxListeners = 20;
    this.affecteActor();
    this.affichageElement();
    this.randomize();
    for (let u = 0; u <3; u++){
      this.affiche[u] = "L'entreprise "+ entrepriseConc[u] +" a prévu d'acheter " +this.iaArray[u]+" "+gereS(this.iaArray[u],"lot")+".";
      Sup.log("affiche "+u+" : "+this.affiche[u]);
      this.iaTotal = this.iaTotal + this.iaArray[u];
    }
    Sup.log(this.iaTotal);
    this.visibleEnchere(false);
    this.afficheNBNombre(15);
    updateMenu(this.boutonNombre.getChildren());
    this.qInfo.textRenderer.setText(solde.toLocaleString() + " E"); //pour mettre a jour le solde a chaque achat
  }

  update(){
    musicUpdate();
    //permet de remettre l opacite a 1 par defaut
    updateMenu(this.boutonNombre.getChildren());
    //enleve le flip vertical du clik sur le bouton
    noclic(this.boutonNombre.getChildren());
    this.affichageConcurrence();
    this.timer ++;
    updateMenu(this.enchereSprite);
    noclic(this.enchereSprite);
    if (Sup.Input.isKeyDown("NUMPAD0")) {
      boolVisibleEcran = false;
      boolVisibleComposant = false;
      boolVisibleChassis = false;
      Sup.log("Astuce");
      this.quitteEcran();
    }
  }
  
  //crée des valeurs random pour simuler la concurrence
  randomize(){
    var rng = new RNG(String(Math.random()));
    for (let i = 0; i <3; i++){
      this.iaArray[i] = rng.random(0, 15);
      Sup.log(this.iaArray[i]);
    }
  }
  
  //transforme les textes pour un affichage different
  affichageElement(){
    switch(element){
      case "ecran":
        this.element2 = "d'écran";
        this.fab1 = "Yama";
        this.fab2 = "Fony";
        this.fab3 = "Sansun";
        Sup.log("ecran");
        boolVisibleEcran = false;
        break;
      
      case "chassis":
        this.element2 = "de chassis";
        this.fab1 = "HTD";
        this.fab2 = "Viko";
        this.fab3 = "Rouce";
        Sup.log("chassis");
        boolVisibleChassis = false;
        break;
      
      case "composant":
        this.element2 = "de composant";
        this.fab1 = "Wouaie";
        this.fab2 = "Tatel";
        this.fab3 = "Twuyin";
        Sup.log("composant");
        boolVisibleComposant = false;
        break;
      
      default:
        Sup.log("test 796");
        break;
    }
  }
 
  affichageConcurrence(){
    //Sup.log("valeur "+this.valeur);
      switch (this.valeur){
          case 1:    //si on a pas encore appuyer sur entree
            this.etape1.textRenderer.setColor(242,26,64);
            this.etape2.textRenderer.setColor(255,255,255);
            this.etape3.textRenderer.setColor(255,255,255);
            this.etape4.textRenderer.setColor(255,255,255);
            this.etape5.textRenderer.setColor(255,255,255);
            this.txtAffiche[0].textRenderer.setText("Combien de lots "+ this.element2 +" voulez-vous acheter ?");
            this.visibleNombre(true);
            this.visibleTxt(false);
            Sup.log("valeur "+this.valeur);
            if(!this.premiereFois){
              for (let i=0; i<16; i++){
                  this.boutonTableau[i].fMouseInput.emitter.once("leftClickReleased", () => {
                    this.musicPlayer.play();
                    //affecte a lotnombre selon le montant du bouton cliqué
                    this.lotNombre = i;
                    this.calculIA();
                    //permet d'allez à l'affichage suivant
                    this.valeur ++;
                    Sup.log("premier click");
                    this.timer = 0;
                  } ); 
                }
                this.premiereFois = true;
            }
            break;

          case 2:  //si on a deja appuyer une fois sur entree
            this.etape1.textRenderer.setColor(255,255,255);
            this.etape2.textRenderer.setColor(242,26,64);
            this.etape3.textRenderer.setColor(255,255,255);
            this.etape4.textRenderer.setColor(255,255,255);
            this.etape5.textRenderer.setColor(255,255,255);
            
            this.visibleNombre(false);
            this.txtAffiche[0].textRenderer.setText(this.affiche[0]);
            this.txtAffiche[1].setVisible(true);
            this.txtAffiche[1].textRenderer.setText(this.affiche[1]);
            this.txtAffiche[2].setVisible(true);
            this.txtAffiche[2].textRenderer.setText(this.affiche[2]);
            this.txtAffiche[3].setVisible(true);
            this.txtAffiche[3].textRenderer.setText("Votre entreprise "+societe+" a prévu d'acheter "+this.lotNombre+ " "+gereS(this.lotNombre, "lot")+".");
            this.txtAffiche[4].setVisible(true);
            this.txtAffiche[4].textRenderer.setText("Les intentions d'achat du marché sont estimées à "+this.iaTotal+" / 3 soit : "+ this.lotDivise +" "+gereS(this.lotDivise, "lot")+".");
            this.txtAffiche[5].setVisible(true);
            this.txtAffiche[5].textRenderer.setText("Cliquez pour continuer");
            //Sup.log("valeur "+this.valeur);
            //si le joueur appuie sur entrer ou alors qu'il appuie sur le click gauche de la souris et que le timer soit superieur a 70
            if ((Sup.Input.wasKeyJustPressed("RETURN") || (Sup.Input.wasMouseButtonJustPressed(0)) && this.timer > this.delaiTime)) {
              this.musicPlayer.play();
              this.valeur ++;
              Sup.log("deuxieme click");
              for (let i=0; i<16; i++){
                //utile afin de supprimer le once precedent de l emittevent s'il n'a ps ete cliquer
                this.boutonTableau[i].fMouseInput.emitter.removeAllListeners("leftClickReleased");
              }
              this.timer = 0;
              this.visibleTxt(false);
            }
            break;

          case 3:
            this.etape1.textRenderer.setColor(255,255,255);
            this.etape2.textRenderer.setColor(255,255,255);
            this.etape3.textRenderer.setColor(242,26,64);
            this.etape4.textRenderer.setColor(255,255,255);
            this.etape5.textRenderer.setColor(255,255,255);
            this.etapeF(this.fab1);
            break;

          case 4:
            this.etape1.textRenderer.setColor(255,255,255);
            this.etape2.textRenderer.setColor(255,255,255);
            this.etape3.textRenderer.setColor(255,255,255);
            this.etape4.textRenderer.setColor(242,26,64);
            this.etape5.textRenderer.setColor(255,255,255);
            this.etapeF(this.fab2);
            break;
          
          case 5:
            this.etape1.textRenderer.setColor(255,255,255);
            this.etape2.textRenderer.setColor(255,255,255);
            this.etape3.textRenderer.setColor(255,255,255);
            this.etape4.textRenderer.setColor(255,255,255);
            this.etape5.textRenderer.setColor(242,26,64);
            this.etapeF(this.fab3);
            
            //this.afficheNBNombre();  
            //Sup.log("valeur "+this.valeur);
            break;
          
          case 6:
            //Sup.log("valeur "+this.valeur);
            switch(element){
              case "ecran":{
                setboolVisibleEcran(false);
                nbEcran += this.elementAchatTotal;
                break;
              }
              case "chassis":{
                setboolVisibleChassis(false);
                nbChassis += this.elementAchatTotal;
                break;
              }
              case "composant":{
                setboolVisibleComposant(false);
                nbComposant += this.elementAchatTotal;
                break;
              }
              default:{
                Sup.log("test 007");
              }
            }
            
            this.valeur = 1;
            //Sup.getActor("SceneAcheter").getBehavior(ScriptAchatClickBehavior).timer = 0;
            Sup.log("JE DETRUIS CE BEHAVIOR");
            this.camera.getBehavior(ScriptAchatConcurrenceBehavior).destroy();
            this.quitteEcran();
            break;

          default:
            Sup.log("test switch 585");
            break;
    }
  }
  //cacher ou montrer les boutons de 0 a 15
  visibleNombre(boolVisible){ 
    this.boutonNombre.setVisible(boolVisible);
    this.texteNombre.setVisible(boolVisible);
    //Sup.log("visibleNombre: "+boolVisible);
  }
  
  //cache ou affiche les encheres
  visibleEnchere(boolVisible: boolean){
    for (let i=0; i<16; i++){
      this.enchereSprite[i].setVisible(boolVisible);
      this.enchereTexte[i].setVisible(boolVisible);
    }
    //Sup.log("visibleEnchere: "+boolVisible);
  }
  //pour afficher ou cacher les txtAffiche de 1 à 5, le 0 reste toujours visible
  visibleTxt(bool: boolean){
    for (let i = 1; i <6; i++){
      this.txtAffiche[i].setVisible(bool);
      //Sup.log("visibleTxt: "+bool);
    }
  }
  //affiche les lots d'élements qui nous sont disponibles
  afficheNBNombre(num:number){
    this.visibleNombre(true);
    //Sup.log("afficheNBNombre() lotdivise = "+this.lotDivise);
    this.cacheNBNombre();
    for(let i=0; i<num+1; i++){
      this.boutonTableau[i].setVisible(true);
      this.texteTableau[i].setVisible(true);
    }
  }
  
  cacheNBNombre(){
    for(let i=0; i<16; i++){
      this.boutonTableau[i].setVisible(false);
      this.texteTableau[i].setVisible(false);
    }
  }
  
  //on définit les variables pour chaque acteur
  affecteActor(){
    this.qInfo = Sup.getActor("Vue2").getChild("Texte").getChild("QInfo");
    this.etape1 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt1");
    this.etape2 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt2");
    this.etape3 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt3");
    this.etape4 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt4");
    this.etape5 = Sup.getActor("Vue2").getChild("Texte").getChild("TxtAffichage").getChild("Txt5");
    for (let i = 0; i <6; i++){
      this.txtAffiche[i] = Sup.getActor("Vue2").getChild("Texte").getChild("TxtOutput"+i.toString());
    }
    this.boutonNombre = Sup.getActor("Vue2").getChild("Element").getChild("Bouton");
    this.texteNombre = Sup.getActor("Vue2").getChild("Element").getChild("Texte");
    this.camera = Sup.getActor("Camera");
    this.boutonTableau = Sup.getActor("Vue2").getChild("Element").getChild("Bouton").getChildren();
    this.texteTableau = Sup.getActor("Vue2").getChild("Element").getChild("Texte").getChildren();
    this.enchereSprite = Sup.getActor("Vue2").getChild("Element").getChild("Enchere").getChild("Sprite").getChildren();
    this.enchereTexte  = Sup.getActor("Vue2").getChild("Element").getChild("Enchere").getChild("Texte").getChildren();
    
    for (let i = 0; i <16; i++){
      let toto:string = "Sprite"+i.toString();
      new fMouseInput (this.boutonTableau[i]);
      this.boutonTableau[i].fMouseInput.setCameraActorName("Camera");
      new fMouseInput (this.enchereSprite[i]);
      this.enchereSprite[i].fMouseInput.setCameraActorName("Camera");
    }
  }
  
  //rajoute notre intention d'achat à celui des ordis
  calculIA(){
    Sup.log("lotNombre ds calculIA ="+this.lotNombre);
    Sup.log("iatotal ds calculIA ="+this.iaTotal);
    this.iaTotal = this.iaTotal+this.lotNombre;
    Sup.log("calculIA fait: "+this.iaTotal);
    this.lotDivise = this.iaTotal/3;
    this.lotDivise = Math.floor(this.lotDivise);
    Sup.log("lotDivise fin ="+this.lotDivise);
  }
  
  //recupere le lot voulu et le prix d'enchere pour savoir si l'ordi a des encheres plus hautes
  enchere(){
    Sup.log("calcul enchere effectue");
    Sup.log("prixAchat: "+this.prixAchat);
    this.enchereIA();
    let lotProvisoire = this.lotDivise;
    //on intialise pour l'affichage
    this.IAelementAchat[0] = 0;
    this.IAelementAchat[1] = 0;
    this.IAelementAchat[2] = 0;
    
    //test si l'ordi a placer des encheres superieur au joueur
    if ((this.IAprixAchat[0]>this.prixAchat) && lotProvisoire>0){
      if(lotProvisoire >= this.IAlotChoisi[0] ){
        lotProvisoire = lotProvisoire - this.IAlotChoisi[0];
        this.IAelementAchat[0] = this.IAlotChoisi[0];
      }else{
        this.IAelementAchat[0] = lotProvisoire;
        lotProvisoire = 0;
      }
    }
    
    if ((this.IAprixAchat[1]>this.prixAchat) && lotProvisoire>0){
      if(lotProvisoire >= this.IAlotChoisi[1] ){
        lotProvisoire = lotProvisoire - this.IAlotChoisi[1];
        this.IAelementAchat[1] = this.IAlotChoisi[1];
      }else{
        this.IAelementAchat[1] = lotProvisoire;
        lotProvisoire = 0;
      }
    }
    
    if ((this.IAprixAchat[2]>this.prixAchat) && lotProvisoire>0){
      if(lotProvisoire >= this.IAlotChoisi[2] ){
        lotProvisoire = lotProvisoire - this.IAlotChoisi[2];
        this.IAelementAchat[2] = this.IAlotChoisi[2];
      }else{
        this.IAelementAchat[2] = lotProvisoire;
        lotProvisoire = 0;
      }
    }
    
    //si le joueur a placer des encheres superieur a l'ordi ou qu'il reste des lots a prendre
    if(lotProvisoire >= this.lotChoisi ){
      lotProvisoire = lotProvisoire - this.lotChoisi;
      this.elementAchat = this.lotChoisi;
    }else{
      this.elementAchat = lotProvisoire;
      lotProvisoire = 0;
    }
    Sup.log("elementAchat : "+this.elementAchat);
    //je gere l'affichage pour que l'ordi achete les composants aprés le joueur
    Sup.log("lotProvisoire"+lotProvisoire);
    Sup.log("this.IAelementAchat[0] "+this.IAelementAchat[0]);
    Sup.log("this.IAelementAchat[1] "+this.IAelementAchat[1]);
    Sup.log("this.IAelementAchat[2] "+this.IAelementAchat[2]);
    Sup.log("this.elementAchat "+this.elementAchat);
    
  }
  
  enchereIA(){
    //on initialise le tableau de prix des encheres avec des nombres aleatoires
    var rng = new RNG(String(Math.random()));
    Sup.log("this.lotDivise "+this.lotDivise);
    for (let i = 0; i <3; i++){
      this.enchereAffine = [300,350,400,450,300,350,400,450,500,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800]; //repeter certaines valeurs permettent d'affiner pour rester dans des variables acceptables
      this.IAprixAchat[i] = this.enchereAffine[rng.random(0, 23)];
      this.IAlotChoisi[i] = (rng.random(0, this.lotDivise));
      Sup.log("this.IAprixAchat["+i+"] avant tri"+this.IAprixAchat[i]);
      Sup.log("this.IAlotChoisi["+i+"] oOo oOo oOo "+this.IAlotChoisi[i]);
    }
    //on trie le tableau
    this.IAprixAchat.sort(function(a, b){return b - a});
    for (let i = 0; i <3; i++){
      Sup.log("this.IAprixAchat["+i+"] apres tri"+this.IAprixAchat[i]);
    }
  }
  
  etapeF(fab){
    //Sup.log("etapeF passe");
    if(!this.deuxiemeFois){
      this.txtAffiche[0].textRenderer.setText("Combien de lots "+ this.element2 +" voulez-vous acheter chez le fabricant "+fab+" ?");
      if(this.lotDivise>15){ this.lotDivise = 15;}
      this.afficheNBNombre(this.lotDivise);
      this.visibleTxt(false);
    }
           
    //Sup.log("valeur "+this.valeur);
      if(!this.deuxiemeFois && (this.timer > this.delaiTime)){
        Sup.log("deuxiemeFois est faux");
        //le bouton 0 n'affiche pas le montant des encheres
        this.boutonTableau[0].fMouseInput.emitter.once("leftClickReleased", () => {
            this.musicPlayer.play();
            Sup.log("troisieme click, bouton 0");
             //affecte a lotnombre selon le montant du bouton cliqué
            this.lotChoisi = 0;
            this.visibleNombre(false);
            this.prixEnchere = 0;
            Sup.log("lotChoisi: "+this.lotChoisi);
            this.enchere();
            this.txtAffiche[0].textRenderer.setText("Il y a "+this.lotDivise+" "+gereS(this.lotDivise,"lot")+" à acheter");
            this.visibleTxt(true);
            for (let i=0; i<3; i++){
              if(this.IAelementAchat[i] > 0){
                this.txtAffiche[i+1].textRenderer.setText("L'entreprise "+entrepriseConc[i]+" a acheté "+this.IAelementAchat[i]+" "+gereS(this.IAelementAchat[i],"lot")+" au prix de "+this.IAprixAchat[i]+" €");
              }
              else{
                this.txtAffiche[i+1].textRenderer.setText("L'entreprise "+entrepriseConc[i]+" a proposé une enchère au prix de "+this.IAprixAchat[i]+" € mais n'a pas pu remporter de lot");
              }              
            }
            this.txtAffiche[4].textRenderer.setText("Vous n'avez pas enchéri ce tour");
            this.prixAchat = 0;
            this.elementAchat = 0;
             //affiche les boutons suivants
            this.troisiemeFois = true;
            for (let j=0; j<16; j++){
              this.boutonTableau[j].fMouseInput.emitter.removeAllListeners("leftClickReleased");
            }
         });
        //les boutons de 1 a 15
       for (let i=1; i<16; i++){
          this.boutonTableau[i].fMouseInput.emitter.once("leftClickReleased", () => {
            this.musicPlayer.play();
            Sup.log("troisieme click");
             //affecte a lotnombre selon le montant du bouton cliqué
            this.lotChoisi = i;
            Sup.log("lotChoisi: "+this.lotChoisi);
             //affiche les boutons suivants
            this.txtAffiche[0].textRenderer.setText("A quel prix ?");
            this.visibleEnchere(true);
            this.visibleNombre(false);
            this.cacheNBNombre();
            this.timer = 0;
            this.troisiemeFois = true;
            for (let j=0; j<16; j++){
              this.boutonTableau[j].fMouseInput.emitter.removeAllListeners("leftClickReleased");
            }
         });
        }
        this.deuxiemeFois = true;
        Sup.log("deuxiemeFois est vrai");
      }

      if(this.troisiemeFois && (this.timer > this.delaiTime)){
        for (let i=0; i<16; i++){
          this.enchereSprite[i].fMouseInput.emitter.once("leftClickReleased", () => {
            this.musicPlayer.play();
            Sup.log("quatrieme click");
            this.prixEnchere = i;
            this.prixAchat = (this.prixEnchere+1)*50;
            this.visibleEnchere(false);
            this.enchere();
            this.txtAffiche[0].textRenderer.setText("Il y a "+this.lotDivise+" "+gereS(this.lotDivise,"lot")+" à acheter");
            this.visibleTxt(true);
            for (let i=0; i<3; i++){
              if(this.IAelementAchat[i] > 0){
                this.txtAffiche[i+1].textRenderer.setText("L'entreprise "+entrepriseConc[i]+" a acheté "+this.IAelementAchat[i]+" "+gereS(this.IAelementAchat[i],"lot")+" au prix de "+this.IAprixAchat[i]+" €");
              }
              else{
                this.txtAffiche[i+1].textRenderer.setText("L'entreprise "+entrepriseConc[i]+" a proposé une enchère au prix de "+this.IAprixAchat[i]+" € mais n'a pas pu remporter de lot.");
              }
            }
            if(this.elementAchat > 0){
              let varAff = this.elementAchat*this.prixAchat;
              this.txtAffiche[4].textRenderer.setText("Vous avez acheté "+this.elementAchat+" "+gereS(this.elementAchat,"lot")+" à "+this.prixAchat+" € soit "+varAff.toLocaleString()+" €");
            }
            else{
              this.txtAffiche[4].textRenderer.setText("Vous avez proposé une enchère à "+this.prixAchat+" € mais vous n'avez remporté aucun lot.");
            }
            this.txtAffiche[5].textRenderer.setText("Cliquez pour continuer");
            //C'est ici que l'on valide l'achat dans le jeu en enlevant le montant du solde et en ajoutant le lot acheter a l'entreprise
            this.elementAchatTotal = this.elementAchatTotal + this.elementAchat;
            for (let i=0; i<16; i++){
              this.enchereSprite[i].fMouseInput.emitter.removeAllListeners("leftClickReleased");
            }
            this.timer = 0;
            Sup.log("Il y a "+this.lotDivise+" lots à acheter");
            nbLotTotalAcheter += this.elementAchat;
            Sup.log("Vous avez acheté "+this.elementAchat+" lots à "+this.prixAchat+" €");
          });
        }
        this.troisiemeFois = false;
      }    
    
      if(this.txtAffiche[0].textRenderer.getText() == "Il y a "+this.lotDivise+" lots à acheter"){
        if (Sup.Input.wasKeyJustPressed("RETURN") || (Sup.Input.wasMouseButtonJustPressed(0) && this.timer > this.delaiTime)) {
          this.musicPlayer.play();
          this.valeur ++;
          valAchatMar += this.prixAchat*this.elementAchat;
          solde = solde - this.prixAchat*this.elementAchat;
          //il faut reinitialiser les variables 
          this.deuxiemeFois = false;
          this.troisiemeFois = false;
          this.elementAchat = 0;
          this.prixAchat = 0;
          this.prixEnchere = 0;
          this.visibleNombre(false);
          for (let i=0; i<16; i++){
            this.enchereSprite[i].fMouseInput.emitter.removeAllListeners("leftClickReleased");
          }
          this.timer = 0;
        }
      }
    this.qInfo.textRenderer.setText(solde.toLocaleString() + " E"); //pour mettre a jour le solde a chaque achat
    
  }
  
  initialise(){
    this.timer = 0;
    this.lotNombre = 0;
    this.lotDivise = 0;
    this.lotChoisi = 0;
    this.prixEnchere = 0;
    this.elementAchat = 0;
    this.elementAchatTotal = 0;
    this.prixAchat = 0;
    this.premiereFois = false; 
    this.deuxiemeFois = false;
    this.troisiemeFois = false;
    this.iaTotal = 0;
    this.valeur = 1;
    this.IAprixAchat = null; 
    this.IAprixAchat = new Array(3);
    this.IAlotChoisi = null; 
    this.IAlotChoisi = new Array(3);
    this.IAelementAchat = null; 
    this.IAelementAchat = new Array(3);
    this.iaArray = null; 
    this.iaArray = new Array(3);
    this.affiche = null; 
    this.affiche = new Array(6);
    this.txtAffiche = null; 
    this.txtAffiche = new Array(6);
    this.boutonTableau = null; 
    this.boutonTableau = new Array(16);
    this.texteTableau = null; 
    this.texteTableau = new Array(16);
    this.enchereSprite = null; 
    this.enchereSprite = new Array(16);
    this.enchereTexte = null; 
    this.enchereTexte = new Array(16);
    this.affecteActor();
    Sup.log("initialise");
  }
  
  quitteEcran(){
    this.camera.moveY(-11);
    if(!boolVisibleEcran && !boolVisibleComposant && !boolVisibleChassis){
      //permet de quitter la partie achat pour passer a production etape 3
      Sup.log("DESTRUCTION COME BACK");
      boolVisibleEcran = true;
      boolVisibleComposant = true;
      boolVisibleChassis = true;
      jeuTour = 2;
      Sup.loadScene("Interface1Principal/Scene/PrincipalScene");
      //this.camera.getBehavior(ScriptAchatClickBehavior).destroy();
      /////////////////////////////////////////////////////////////////////////
      // ScriptAchatClickBehavior.apply.defTimer(0); ////
      ////////////////////////////////////////////////////////////////////////////
    }
  }
  
  relanceDefilement(){
    //permet de relancer l'affichage lorsqu'on achete
    this.camera.getBehavior(ScriptTextAchatBehavior).relance();
  }
  
  
}
Sup.registerBehavior(ScriptAchatConcurrenceBehavior);
