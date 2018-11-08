var xmlhttp;
var loader;
var myArr = JSON;

function myF(arr) {
  if(arr.length == 0){
    Sup.log("Aucun enregistrement n'a ete trouvé");
    jeuTour = 0;
    jeuMois = 0 ;
    nbOuvrier = 0 ;
    nbCommercial = 0 ;
    nbComptable = 0 ;

    nbLotTotalAcheter = 0 ;
    nbLotTotalVendu = 0;
    valAchatMar = 0 ;
    valSalaires = 0 ;
    valChargesFin = 0 ;
    valChargesExc = 0;
    valVentesMar = 0;
    valProduitsFini = 0 ;
    valProduitsExc = 0;

    valAchatMarM = 0;
    valSalairesM = 0 ;
    valChargesFinM = 0 ;
    valChargesExcM = 0 ;
    valVentesMarM = 0 ;
    valProduitsFinM = 0 ;
    valProduitsExcM = 0 ;

    nbElementM = 0;
    nbLotFiniM = 0;
    valVarStoPiM = 0 ;
    valResultatM = 0 ;
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
  solde = myArr[0].solde ;
  nom = myArr[0].nomJoueur ;
  jeuTour = myArr[0].tourJeux;
  jeuMois = myArr[0].moisJeux ;
  nbOuvrier = myArr[0].nbOuvrierJeux ;
  nbCommercial = myArr[0].nbCommercialJeux ;
  nbComptable = myArr[0].nbComptableJeux ;
  
  nbLotTotalAcheter = myArr[0].nbLotTotalAcheterJeux ;
  nbLotTotalVendu = myArr[0].nbLotTotalVenduJeux ;
  valAchatMar = myArr[0].valAchatMarBilan ;
  valSalaires = myArr[0].valSalairesBilan ;
  valChargesFin = myArr[0].valChargesFinBilan ;
  valChargesExc = myArr[0].valChargesExcBilan ;
  valVentesMar = myArr[0].valVentesMarBilan ;
  valProduitsFini = myArr[0].valProduitsFiniBilan ;
  valProduitsExc = myArr[0].valProduitsExcBilan ;
  
  valAchatMarM = myArr[1].valAchatMarBilan ;
  valSalairesM = myArr[1].valSalairesBilan ;
  valChargesFinM = myArr[1].valChargesFinBilan ;
  valChargesExcM = myArr[1].valChargesExcBilan ;
  valVentesMarM = myArr[1].valVentesMarBilan ;
  valProduitsFinM = myArr[1].valProduitsFiniBilan ;
  valProduitsExcM = myArr[1].valProduitsExcBilan ;
  
  nbElementM = myArr[1].nbElementMJeux ;
  nbLotFiniM = myArr[1].nbLotFiniMJeux ;
  valVarStoPiM = myArr[1].valVarStoPiMBilan ;
  valResultatM = myArr[1].valResultatMBilan ;

  
}

function apiSauve(){
  var obj, dbParam, xmlhttp;
  
  obj = { "nomJoueur": nom, "mdpJoueur": nom+"2"};
  dbParam = JSON.stringify(obj);//encode pour éviter les caractères interdits dans une URL
  Sup.log(dbParam);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost/apiphp/Vue/sauve.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send("data="+dbParam);
  xmlhttp.addEventListener("load", Sup.log("sauvegarde BDD réalisé"), false);
  }

