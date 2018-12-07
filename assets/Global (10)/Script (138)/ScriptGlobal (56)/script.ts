//Sup.Storage.clear(); //Activer le clear si changement dans le fichier
var anneeDepart : number = 2000;
/////////// A sauvegarder dans la base \\\\\\\\\\\\\\

//variables personnalisés par le joueur sur l'interface 0

var nom: string  = Sup.Storage.getJSON("nom", "");
var societe: string  = Sup.Storage.getJSON("societe", "");

var jeuTour: number = Sup.Storage.getJSON("jeuTour", 0);
//Une fois tous les tour de jeu effectué nous avons finis un mois
var jeuMois: number = Sup.Storage.getJSON("jeuMois", 1);
var jeuAnnee: number = Sup.Storage.getJSON("jeuAnnee", anneeDepart);
//je définis les noms des entreprises concurrentes
var entrepriseConc = new Array("Appel", "Mokia", "Xiamio");
//les variables globales necessaires au fonctionnement de l'entreprise
var nbOuvrier: number = Sup.Storage.getJSON("nbOuvrier", 0);
var nbCommercial: number = Sup.Storage.getJSON("nbCommercial", 0);
var nbComptable: number = Sup.Storage.getJSON("nbComptable", 0);
var nbEcran: number = Sup.Storage.getJSON("nbEcran", 0);
var nbChassis: number = Sup.Storage.getJSON("nbChassis", 0);
var nbComposant: number = Sup.Storage.getJSON("nbComposant", 0);
var nbElementM: number = Sup.Storage.getJSON("nbElementM", 0); //sert a ajouter le nombre d'element acheter le mois precedent pour Compter
var nbLotFini: number = Sup.Storage.getJSON("nbLotFini", 0); //nombre de lot construit ce tour ci
var nbLotFiniM: number = Sup.Storage.getJSON("nbLotFiniM", 0); //nombre de lot construit le mois precedent
var nbLotTotalAcheter : number = Sup.Storage.getJSON("nbLotTotalAcheter", 0); // lot de telephone portable qu on a acheter ce tour ci, sert dans compter pour calculer la moyenne
var nbLotTotalVendu : number = Sup.Storage.getJSON("nbLotTotalVendu", 0); // lot de telephone portable on a vendu ce tour ci, sert dans vendre et dans compter
var venteEnAttenteM0: number = Sup.Storage.getJSON("venteEnAttenteM0", 0); //sert entre Vendre et Compter, totalise ce que le comptable va donner du mois derniers
var venteEnAttenteM1: number = Sup.Storage.getJSON("venteEnAttenteM1", 0); //lorsque l'on vend et que l'on est payé dans un mois cela apparait ici
var venteEnAttenteM2: number = Sup.Storage.getJSON("venteEnAttenteM2", 0); //vente paye dans deux mois
var venteEnAttenteM3: number = Sup.Storage.getJSON("venteEnAttenteM3", 0); // trois mois
var venteEnAttenteMx: number = Sup.Storage.getJSON("venteEnAttenteMx", 0); //pas de comptable, on vend mais on ne reçoit pas l'argent, il faut engagé un comptable
var solde: number = Sup.Storage.getJSON("solde", 20000);

var valAchatMar: number = Sup.Storage.getJSON("valAchatMar", 0); //Les achats de marchandises.
var valSalaires: number = Sup.Storage.getJSON("valSalaires", 0); //les charges salariales.
var valChargesFin: number = Sup.Storage.getJSON("valChargesFin", 0); //les charges financieres présente les intérêts des emprunts en cours
var valChargesExc: number = Sup.Storage.getJSON("valChargesExc", 0); //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur
var valVentesMar: number = Sup.Storage.getJSON("valVentesMar", 0); //les ventes de marchandises
var valProduitsFin: number = Sup.Storage.getJSON("valProduitsFin", 0); //les produits financiers lorsque l'on fait un emprunt
var valProduitsExc: number = Sup.Storage.getJSON("valProduitsExc", 0); //évènements aléatoires impactant positivement notre solde

var valAchatMarM: number = Sup.Storage.getJSON("valAchatMarM", 0); //Les achats de marchandises M-1
var valSalairesM: number = Sup.Storage.getJSON("valSalairesM", 0); //les charges salariales M-1
var valChargesFinM: number = Sup.Storage.getJSON("valChargesFinM", 0); //les charges financieres présente les intérêts des emprunts en cours M-1
var valChargesExcM: number = Sup.Storage.getJSON("valChargesExcM", 0); //les charges exceptionnelles est utile lors des évènements aléatoires qui peuvent survenir en notre défaveur M-1
var valVentesMarM: number = Sup.Storage.getJSON("valVentesMarM", 0); //les ventes de marchandises M-1
var valProduitsFinM: number = Sup.Storage.getJSON("valProduitsFinM", 0); //les produits financiers lorsque l'on fait un emprunt M-1
var valProduitsExcM: number = Sup.Storage.getJSON("valProduitsExcM", 0); //évènements aléatoires impactant positivement notre solde M-1
var valVarStoPiM: number = Sup.Storage.getJSON("valVarStoPiM", 0); //stocke le nombre de piece en stock du mois dernier
var valResultatM: number = Sup.Storage.getJSON("valResultatM", 0); //stocke le resultat du mois dernier

///////////                            \\\\\\\\\\\\\\

//pour la musique
var musicMuted = false;
var musicPlayer = Sup.Audio.playSound("Global/Sound/Intro", 0.1, { loop: true });

//défini le temps entre deux cliques
var valTimer: number = 70;

//savoir quel element a été cliqué
var element : String;

//savoir si les valeurs on été cliqués
var boolVisibleEcran : boolean = true;
var boolVisibleChassis : boolean = true;
var boolVisibleComposant : boolean = true;
var boolClique: boolean;

// partie banque\\
var varMoisREmp : number = 0; //sert dans la banque le nombre de mois restant de l'emprunt
var varMoisFinEmp: number = 0; //a savoir quel mois se fini l'emprunt
var varAnFinEmp: number = 0; //quel annne se fini l emprunt

var empruntDC : boolean = false; //a tester pour savoir si l'emprunt a deja été commence
var empruntCeMois: boolean = false; //emprunt de ce mois

Sup.Input.on("exit", () => {
  ecrireFichier();
});


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
     }else{
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

function ecrireFichier(){
  
  Sup.Storage.setJSON("solde", solde);
  Sup.Storage.setJSON("venteEnAttenteM0", venteEnAttenteM0);
  Sup.Storage.setJSON("venteEnAttenteM1", venteEnAttenteM1);
  Sup.Storage.setJSON("venteEnAttenteM2", venteEnAttenteM2);
  Sup.Storage.setJSON("venteEnAttenteM3", venteEnAttenteM3);
  Sup.Storage.setJSON("venteEnAttenteMx", venteEnAttenteMx);
  Sup.Storage.setJSON("jeuTour", jeuTour);
  Sup.Storage.setJSON("jeuMois", jeuMois);
  Sup.Storage.setJSON("nbOuvrier", nbOuvrier);
  Sup.Storage.setJSON("nbCommercial", nbCommercial);
  Sup.Storage.setJSON("nbComptable", nbComptable);
  Sup.Storage.setJSON("nbEcran", nbEcran);
  Sup.Storage.setJSON("nbChassis", nbChassis);
  Sup.Storage.setJSON("nbComposant", nbComposant);
  Sup.Storage.setJSON("nbElementM", nbElementM);
  
  Sup.Storage.setJSON("nbLotFini", nbLotFini);
  Sup.Storage.setJSON("nbLotFiniM", nbLotFiniM);
  Sup.Storage.setJSON("nbLotTotalAcheter", nbLotTotalAcheter);
  Sup.Storage.setJSON("nbLotTotalVendu", nbLotTotalVendu);
  
  Sup.Storage.setJSON("nom", nom);
  Sup.Storage.setJSON("societe", societe);
  
  Sup.Storage.setJSON("valAchatMar", valAchatMar);
  Sup.Storage.setJSON("valSalaires", valSalaires);
  Sup.Storage.setJSON("valChargesFin", valChargesFin);
  Sup.Storage.setJSON("valChargesExc", valChargesExc);
  Sup.Storage.setJSON("valVentesMar", valVentesMar);
  Sup.Storage.setJSON("valProduitsFin", valProduitsFin);
  Sup.Storage.setJSON("valProduitsExc", valProduitsExc);
  
  Sup.Storage.setJSON("valAchatMarM", valAchatMarM);
  Sup.Storage.setJSON("valSalairesM", valSalairesM);
  Sup.Storage.setJSON("valChargesFinM", valChargesFinM);
  Sup.Storage.setJSON("valChargesExcM", valChargesExcM);
  Sup.Storage.setJSON("valVentesMarM", valVentesMarM);
  Sup.Storage.setJSON("valProduitsFinM", valProduitsFinM);
  Sup.Storage.setJSON("valProduitsExcM", valProduitsExcM);
  Sup.Storage.setJSON("valVarStoPiM", valVarStoPiM);
  Sup.Storage.setJSON("valResultatM", valResultatM);
  
}

function moisDeLannee(){
  if(jeuMois==1){
    return "janvier";
  } else if (jeuMois==2){
    return "février"; 
    } else if (jeuMois==3){
      return "mars"; 
        } else if (jeuMois==4){
        return "avril"; 
          }else if (jeuMois==5){
          return "mai"; 
            }else if (jeuMois==6){
              return "juin"; 
              }else if (jeuMois==7){
              return "juillet"; 
                }else if (jeuMois==8){
                return "aout"; 
                  }else if (jeuMois==9){
                  return "septembre"; 
                    }else if (jeuMois==10){
                    return "octobre"; 
                      }else if (jeuMois==11){
                      return "novembre"; 
                        }else{
                        return "décembre"; 
                        }
}

function gererEmprunt(){ //sert dans initialisation du scriptCompter
  if (varMoisREmp > 0){
    varMoisREmp --;
  }
  if(jeuMois==varMoisFinEmp && jeuAnnee==varAnFinEmp){
    empruntDC = false;
    valChargesFin = 0;
  }
}
