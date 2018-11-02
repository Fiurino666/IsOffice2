var xmlhttp;
var loader;
var myArr = JSON;

function myF(arr) {
  if(arr.length == 0){
    Sup.log("Aucun enregistrement n'a ete trouver");
  }else{
     apiRecupere();
  }
    
} 


function apiLire(){
  
  xmlhttp = new XMLHttpRequest();
  var url = "http://localhost/apiphp/Vue/charge.php?nom="+nom+"&societe="+societe;
  
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myArr = JSON.parse(this.responseText);
        myF(myArr);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
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

function apiEnregistre(){
  var myJSON = { "nomJoueur": nom, "mdpJoueur": nom+"2"};
  
  var myString;
  

/*
  myArr[0].nomSociete = societe;
  myArr[0].solde = solde;
  myArr[0].nomJoueur = nom;
  myArr[0].tourJeux = jeuTour;
  myArr[0].moisJeux = jeuMois;
  myArr[0].nbOuvrierJeux = nbOuvrier;
  myArr[0].nbCommercialJeux = nbCommercial;
  myArr[0].nbComptableJeux = nbComptable;
  
  myArr[0].nbLotTotalAcheterJeux = nbLotTotalAcheter;
  myArr[0].nbLotTotalVenduJeux = nbLotTotalVendu;
  myArr[0].valAchatMarBilan = valAchatMar;
  myArr[0].valSalairesBilan = valSalaires;
  myArr[0].valChargesFinBilan = valChargesFin;
  myArr[0].valChargesExcBilan = valChargesExc;
  myArr[0].valVentesMarBilan = valVentesMar;
  myArr[0].valProduitsFiniBilan = valProduitsFini;
  myArr[0].valProduitsExcBilan = valProduitsExc;
  
  myArr[1].valAchatMarBilan = valAchatMarM;
  myArr[1].valSalairesBilan = valSalairesM;
  myArr[1].valChargesFinBilan = valChargesFinM;
  myArr[1].valChargesExcBilan = valChargesExcM;
  myArr[1].valVentesMarBilan = valVentesMarM;
  myArr[1].valProduitsFiniBilan = valProduitsFinM;
  myArr[1].valProduitsExcBilan = valProduitsExcM;
  
  myArr[1].nbElementMJeux = nbElementM;
  myArr[1].nbLotFiniMJeux = nbLotFiniM;
  myArr[1].valVarStoPiMBilan = valVarStoPiM;
  myArr[1].valResultatMBilan = valResultatM;

   */
}

function apiSauve(){
  var obj, dbParam, xmlhttp;
  
  obj = { "nomJoueur": nom, "mdpJoueur": nom+"2"};
  dbParam = JSON.stringify(obj);//encode pourafin d'éviter caractères interdits dans une URL
  Sup.log(dbParam);
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost/apiphp/Vue/sauve.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send("data="+dbParam);
  xmlhttp.addEventListener("load", Sup.log("sauvegarder"), false);
  }

