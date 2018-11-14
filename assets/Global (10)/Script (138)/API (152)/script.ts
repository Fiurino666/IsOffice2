var xmlhttp;
var loader;
var myArr = JSON;

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
    valProduitsFini = 0;
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
  }else{
     apiRecupere();
  }
} 

function apiLire(){
  var obj, dbParam, xmlhttp;
  
  obj = { "nom": nom, "societe": societe};
  dbParam = JSON.stringify(obj);//encode pour éviter les caractères interdits dans une URL
  Sup.log(dbParam);
  
  xmlhttp = new XMLHttpRequest();
    
  xmlhttp.open("POST", "http://localhost/apiphp/Vue/charge.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.onreadystatechange = function () {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log(xmlhttp.responseText);
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
  
  nbLotTotalAcheter = myArr[0].nbLotTotalAcheterJeux;
  nbLotTotalVendu = myArr[0].nbLotTotalVenduJeux;
  valAchatMar = myArr[0].valAchatMarBilan;
  valSalaires = myArr[0].valSalairesBilan;
  valChargesFin = myArr[0].valChargesFinBilan;
  valChargesExc = myArr[0].valChargesExcBilan;
  valVentesMar = myArr[0].valVentesMarBilan;
  valProduitsFini = myArr[0].valProduitsFiniBilan;
  valProduitsExc = myArr[0].valProduitsExcBilan;
  
  valAchatMarM = myArr[1].valAchatMarBilan;
  valSalairesM = myArr[1].valSalairesBilan;
  valChargesFinM = myArr[1].valChargesFinBilan;
  valChargesExcM = myArr[1].valChargesExcBilan;
  valVentesMarM = myArr[1].valVentesMarBilan;
  valProduitsFinM = myArr[1].valProduitsFiniBilan;
  valProduitsExcM = myArr[1].valProduitsExcBilan;
  
  nbElementM = myArr[1].nbElementMJeux;
  nbLotFiniM = myArr[1].nbLotFiniMJeux;
  valVarStoPiM = myArr[1].valVarStoPiMBilan;
  valResultatM = myArr[1].valResultatMBilan;

  
}

function apiEnregistre(){
  
  

}

function apiSauve(){
  var obj, xmlhttp, xmlhttp2, xmlhttp3, xmlhttp4, xmlhttp5;
  
  var tabA = JSON.stringify({
    nomSociete: societe,
    solde: solde,
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
    
    ceMoisBilan: 1,
    valAchatMarBilan: valAchatMar,
    valSalairesBilan: valSalaires,
    valChargesFinBilan: valChargesFin,
    valChargesExcBilan: valChargesExc,
    valVentesMarBilan: valVentesMar,
    valProduitsFiniBilan: valProduitsFini,
    valProduitsExcBilan: valProduitsExc
    });
  
  var tabB = JSON.stringify({
    ceMoisBilan: 0,
    valAchatMarBilan: valAchatMarM,
    valSalairesBilan: valSalairesM,
    valChargesFinBilan: valChargesFinM,
    valChargesExcBilan: valChargesExcM,
    valVentesMarBilan: valVentesMarM,
    valProduitsFiniBilan: valProduitsFinM,
    valProduitsExcBilan: valProduitsExcM,
    valVarStoPiMBilan: valVarStoPiM,
    valResultatMBilan: valResultatM
  });
  
  Sup.log("a"+tabA);
  Sup.log("b"+tabB);
  
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost/apiphp/Vue/sauveSociete.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xmlhttp.onreadystatechange = function () {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      let myJ = JSON.parse(tabA);
      myJ.idSociete = xmlhttp.responseText;
      tabA = JSON.stringify(myJ);
    }
  };
  
  xmlhttp.send("data="+encodeURI(tabA));
  xmlhttp.addEventListener("load", Sup.log("sauvegarde societe réalisé"), false);
  
  
  xmlhttp2 = new XMLHttpRequest();
  xmlhttp2.open("POST", "http://localhost/apiphp/Vue/sauveJoueur.php");
  xmlhttp2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp2.onreadystatechange = function () {
    if(xmlhttp2.readyState === 4 && xmlhttp2.status === 200) {
      let myJ = JSON.parse(tabA);
      myJ.idJoueur = xmlhttp2.responseText;
      tabA = JSON.stringify(myJ);
    }
  };
  xmlhttp2.send("data="+encodeURI(tabA));
  xmlhttp2.addEventListener("load", Sup.log("sauvegarde joueur réalisé"), false);
  
  xmlhttp3 = new XMLHttpRequest();
  xmlhttp3.open("POST", "http://localhost/apiphp/Vue/sauveJeux.php");
  xmlhttp3.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp3.onreadystatechange = function () {
    if(xmlhttp3.readyState === 4 && xmlhttp3.status === 200) {
      let myJ = JSON.parse(tabA);
      myJ.idJeux = xmlhttp3.responseText;
      tabA = JSON.stringify(myJ);
    }
  };
  xmlhttp3.send("data="+encodeURI(tabA));
  xmlhttp3.addEventListener("load", Sup.log("sauvegarde jeux réalisé"), false);
  
  xmlhttp4 = new XMLHttpRequest();
  xmlhttp4.open("POST", "http://localhost/apiphp/Vue/sauvePossede.php");
  xmlhttp4.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  
  xmlhttp4.onreadystatechange = function () {
    if(xmlhttp4.readyState === 4 && xmlhttp4.status === 200) {
      let myJ = JSON.parse(tabA);
      myJ.idJeux = xmlhttp4.responseText;
      tabA = JSON.stringify(myJ);
    }
  };
  
  xmlhttp4.send("data="+encodeURI(tabA));
  xmlhttp4.addEventListener("load", Sup.log("sauvegarde possede réalisé"), false);
  
  xmlhttp5 = new XMLHttpRequest();
  xmlhttp5.open("POST", "http://localhost/apiphp/Vue/sauveBilan.php");
  xmlhttp5.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp5.send("data="+encodeURI(tabA));
  xmlhttp5.addEventListener("load", Sup.log("sauvegarde bilan réalisé"), false);
}


  
