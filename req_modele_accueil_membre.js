 // Traitement de "req_afficher_modele_accueil_membre"
  
  "use strict";
   
   const fs = require("fs");
   const nunjucks = require("nunjucks");;
 
   const trait = function (req, res, query) {

 let marqueurs;
 let page ;
 // AFFICHAGE DE  modele_acueil_membre

      page = fs.readFileSync('modele_accueil_membre.html', 'utf-8');
  
      marqueurs = {};
      marqueurs.erreur = "";
      marqueurs.pseudo = "";
      page = nunjucks.renderString(page, marqueurs);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(page);
      res.end();
  };
  
  module.exports = trait;

