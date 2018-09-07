/////////// A sauvegarder dans la base \\\\\\\\\\\\\\
//Pour savoir a quel tour de jou nous en sommes
var jeuTour: number = 0;
//Une fois tous les tour de jeu effectué nous avons finis un mois
var jeuMois: number = 0;
//je définis les noms des entreprises concurrentes
var entrepriseConc = new Array("Appel", "Tomorola", "Xiamio");
//les variables globales necessaires au fonctionnement de l'entreprise
var nbOuvrier: number = 0;
var nbCommercial: number = 0;
var nbComptable: number = 0;
var nbEcran: number = 0;
var nbChassis: number = 0;
var nbComposant: number = 0;
var nbLotFini: number = 0;

var solde: number = 20000;

var valAchatMar: number = 0; //Les achats de marchandises.
var valSalaires: number = 0; //les charges salariales.
var valChargesFin: number = 0; //les charges financieres présente les intérêts des emprunts en cours
var valChargesExc: number = 0; //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur
var valVentesMar: number = 0; //les ventes de marchandises
var valProduitsFin: number = 0; //les produits financiers lorsque l'on fait un emprunt
var valProduitsExc: number = 0; //évènements aléatoires impactant positivement notre solde

///////////                            \\\\\\\\\\\\\\

//variables personnalisés par le joueur sur l'interface 0
var nom: string  = "";
var societe: string  = "";

//pour la musique
var musicMuted = false;
var musicPlayer = Sup.Audio.playSound("Global/Sound/Intro", 0.1, { loop: true });;

//défini le temps entre deux cliques
var valTimer: number = 70;

//savoir quel element a été cliqué
var element : String;

//savoir si les valeurs on été cliqués
var boolVisibleEcran : boolean = true;
var boolVisibleChassis : boolean = true;
var boolVisibleComposant : boolean = true;
var boolClique: boolean;

function mouseOnHover(camera: Sup.Camera, boutons: Sup.Actor[]){
  let ray = new Sup.Math.Ray();
  ray.setFromCamera(camera, Sup.Input.getMousePosition());
  let hits = this.ray.intersectActors(boutons);
  if(hits.length > 0){
    updateMenu(boutons);
  }
}

function updateMenu(boutons: Sup.Actor[]){
  for(let i = 0; i<boutons.length;i++){
      //Sup.log(`Nombre d i ${i}`); 
      if(boutons[i].fMouseInput.isMouseOver){
        //Sup.log(`mouse over true `); 
        boutons[i].spriteRenderer.setOpacity(0.7);
     }
     if(!boutons[i].fMouseInput.isMouseOver){
      boutons[i].spriteRenderer.setOpacity(1);
     }
  }
}
  
function clicVisuel(act: Sup.Actor) {
  act.spriteRenderer.setVerticalFlip(true);
}

function noclic(boutons: Sup.Actor[]) {
  for(let i = 0; i < boutons.length; i++){
    boutons[i].spriteRenderer.setVerticalFlip(false);
  }
}

function musicAwake(){
  if (musicMuted) musicPlayer.pause();
}

function musicUpdate(){
  if (Sup.Input.wasKeyJustPressed("PAUSE")) {
    musicMuted = !musicMuted;
    if (musicMuted) musicPlayer.pause();
    else musicPlayer.play();
  }
}

function setboolVisibleEcran(boolClique){
  boolVisibleEcran = boolClique;
  Sup.log("this.boolVisibleEcran modifié à "+boolVisibleEcran);
}

function setboolVisibleChassis(boolClique){
  boolVisibleChassis = boolClique;
  Sup.log("this.setboolVisibleChassis modifié à "+boolVisibleChassis);
}

function setboolVisibleComposant(boolClique){
  boolVisibleComposant = boolClique;
  Sup.log("this.boolVisibleComposant modifié à "+boolVisibleComposant);
}

function animeAssistant(assistant: Sup.SpriteRenderer, anime:boolean){
  if(anime){
    assistant.setAnimation("Animation", false);
  }else{
    assistant.setAnimation("Pas", true);
  }
}

function gereS(nb: number, str:string){
  if(str == "commercial"){  //exception pour commercial
    if(nb<2){
      return "commercial";
    }else{
      return "commerciaux";
    }    
  }
  if(nb<2){
    str = str;
  }else{
    str = str + "s";
  }
  return str;
}

class BanqueScript extends Sup.Behavior {
  
}

function Banque(){
  var bs = new BanqueScript();
  
  
}