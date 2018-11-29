var xmlhttp;
var loader;
var myArr = JSON;

var tabA;

function myF(arr) {
  if(arr.length == 0){
    Sup.log("Aucun enregistrement n'a ete trouvé");
    jeuTour = 0;
    jeuMois = 1;
    nbOuvrier = 0;
    nbCommercial = 0;
    nbComptable = 0;

    nbLotTotalAcheter = 0;
    nbLotTotalVendu = 0;
    valAchatMar = 0;
    valSalaires = 0;
    valChargesFin = 0;
    valChargesExc = 0;
    valVentesMar = 0;
    valProduitsFin = 0;
    valProduitsExc = 0;

    valAchatMarM = 0;
    valSalairesM = 0;
    valChargesFinM = 0;
    valChargesExcM = 0;
    valVentesMarM = 0;
    valProduitsFinM = 0;
    valProduitsExcM = 0;

    nbElementM = 0;
    nbLotFiniM = 0;
    valVarStoPiM = 0;
    valResultatM = 0;
    venteEnAttenteM0 = 0;
    venteEnAttenteM1 = 0;
    venteEnAttenteM2 = 0;
    venteEnAttenteM3 = 0;
    venteEnAttenteMx = 0;
    
  }else{
     apiRecupere();
  }
} 

function apiLire(){
  var obj, dbParam, xmlhttp;
  
  obj = { "nom": nom, "societe": societe};
  dbParam = JSON.stringify(obj);//encode pour éviter les caractères interdits dans une URL
  Sup.log("parametre envoyé à l'api "+dbParam);
  
  xmlhttp = new XMLHttpRequest();
    
  xmlhttp.open("POST", "http://localhost/apiphp/Vue/charge.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.onreadystatechange = function () {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log("réponse de l'api "+xmlhttp.responseText);
      myArr = JSON.parse(xmlhttp.responseText);
      myF(myArr);
    }
  };
  xmlhttp.send("data="+dbParam);
  xmlhttp.addEventListener("load", Sup.log("charge BDD réalisé"), false);
  
}

function apiRecupere(){
  societe = myArr[0].nomSociete;
  solde = myArr[0].solde;
  
  nom = myArr[0].nomJoueur;
  jeuTour = myArr[0].tourJeux;
  jeuMois = myArr[0].moisJeux;
  nbOuvrier = myArr[0].nbOuvrierJeux;
  nbCommercial = myArr[0].nbCommercialJeux;
  nbComptable = myArr[0].nbComptableJeux;
  venteEnAttenteM0 = myArr[0].venteEnAttenteM0;
  venteEnAttenteM1 = myArr[0].venteEnAttenteM1;
  venteEnAttenteM2 = myArr[0].venteEnAttenteM2;
  venteEnAttenteM3 = myArr[0].venteEnAttenteM3;
  venteEnAttenteMx = myArr[0].venteEnAttenteMx;
  nbLotTotalAcheter = myArr[0].nbLotTotalAcheterJeux;
  nbLotTotalVendu = myArr[0].nbLotTotalVenduJeux;
  valAchatMar = myArr[0].valAchatMarBilan;
  valSalaires = myArr[0].valSalairesBilan;
  valChargesFin = myArr[0].valChargesFinBilan;
  valChargesExc = myArr[0].valChargesExcBilan;
  valVentesMar = myArr[0].valVentesMarBilan;
  valProduitsFin = myArr[0].valProduitsFinBilan;
  valProduitsExc = myArr[0].valProduitsExcBilan;
  
  valAchatMarM = myArr[0].valAchatMarMBilan;
  valSalairesM = myArr[0].valSalairesMBilan;
  valChargesFinM = myArr[0].valChargesFinMBilan;
  valChargesExcM = myArr[0].valChargesExcMBilan;
  valVentesMarM = myArr[0].valVentesMarMBilan;
  valProduitsFinM = myArr[0].valProduitsFiniMBilan;
  valProduitsExcM = myArr[0].valProduitsExcMBilan;
  
  nbElementM = myArr[0].nbElementMJeux;
  nbLotFiniM = myArr[0].nbLotFiniMJeux;
  valVarStoPiM = myArr[0].valVarStoPiMBilan;
  valResultatM = myArr[0].valResultatMBilan;
  
}


function apiSauve(){
  tabA = JSON.stringify({
    nomSociete: societe,
    nomJoueur: nom,
    mdpJoueur: nom+"2",
    tourJeux: jeuTour,
    moisJeux: jeuMois,
    nbOuvrierJeux: nbOuvrier,
    nbCommercialJeux: nbCommercial,
    nbComptableJeux: nbComptable,
    nbElementMJeux: nbElementM,
    nbLotFiniMJeux: nbLotFiniM,
    nbLotTotalAcheterJeux: nbLotTotalAcheter,
    nbLotTotalVenduJeux: nbLotTotalVendu,

    valAchatMarBilan: valAchatMar,
    valSalairesBilan: valSalaires,
    valChargesFinBilan: valChargesFin,
    valChargesExcBilan: valChargesExc,
    valVentesMarBilan: valVentesMar,
    valProduitsFinBilan: valProduitsFin,
    valProduitsExcBilan: valProduitsExc,
  
    valAchatMarMBilan: valAchatMarM,
    valSalairesMBilan: valSalairesM,
    valChargesFinMBilan: valChargesFinM,
    valChargesExcMBilan: valChargesExcM,
    valVentesMarMBilan: valVentesMarM,
    valProduitsFinMBilan: valProduitsFinM,
    valProduitsExcMBilan: valProduitsExcM,
    valVarStoPiMBilan: valVarStoPiM,
    valResultatMBilan: valResultatM,
    
    solde: solde,
    venteEnAttenteM0: venteEnAttenteM0,
    venteEnAttenteM1: venteEnAttenteM1,
    venteEnAttenteM2: venteEnAttenteM2,
    venteEnAttenteM3: venteEnAttenteM3,
    venteEnAttenteMx: venteEnAttenteMx
  });
  Sup.log("Tableau associatif "+tabA);
  
  sauveQuelBase("Societe");
  Sup.log("sauvegarde totale réalisée");
}

function sauveQuelBase(nomBase : string){
  
  /*
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost/apiphp/Vue/sauve.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xmlhttp.onreadystatechange = function () {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      let myJ = JSON.parse(tabA);
    }
  };
  xmlhttp.send("data="+encodeURI(tabA));
  */  
  
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost/apiphp/Vue/sauve"+nomBase+".php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xmlhttp.onreadystatechange = function () {
    var myJsonObject = JSON.parse(tabA);
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      if (nomBase == "Societe"){
        myJsonObject.idSociete = xmlhttp.responseText;
        Sup.log("idSociete = "+xmlhttp.responseText);
        tabA = JSON.stringify(myJsonObject);
        sauveQuelBase("Joueur");
        Sup.log("tableau dans societe = "+tabA);
      }else if (nomBase == "Joueur"){
          myJsonObject.idJoueur = xmlhttp.responseText;
          Sup.log("idJoueur = "+xmlhttp.responseText);
          tabA = JSON.stringify(myJsonObject);
          sauveQuelBase("Jeux");
          Sup.log("tableau dans joueur = "+tabA);
          }else if (nomBase == "Jeux"){
            myJsonObject.idJeux = xmlhttp.responseText;
            Sup.log("idJeux = "+xmlhttp.responseText);
            tabA = JSON.stringify(myJsonObject);
            sauveQuelBase("Possede");
            Sup.log("tableau dans jeux = "+tabA);
            }else if (nomBase == "Possede"){
                tabA = JSON.stringify(myJsonObject);
                sauveQuelBase("Bilan");
                Sup.log("tableau dans possede = "+tabA);
              }else if (nomBase == "Bilan"){
                  Sup.log("tableau dans bilan = "+tabA);
                }
      xmlhttp.addEventListener("load", Sup.log("sauvegarde "+nomBase+" réalisé"), false);
    }
  };
  xmlhttp.send("data="+encodeURI(tabA));
  
}
  
