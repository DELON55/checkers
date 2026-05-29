"use strict"
 
const nunjucks = require('nunjucks');
const fs = require("fs");

const trait = function(req, res, query) {

	let marqueurs;
	let page;
	let nb = 10;
	let del = '';
	let ram = '';
	let pieces = '';
	let pions = 20;

	// declarer les variable pour lire et recuperter le fichier "plateaux.json"
	let contenu;
	let plateaux;



    // creer la grille de depaart (damier)
	let damier;

	damier = [[1,0,1,0,1,0,1,0,1,0],
	          [0,1,0,1,0,1,0,1,0,1],
			  [1,0,1,0,1,0,1,0,1,0],
			  [0,1,0,1,0,1,0,1,0,1],
			  [8,4,8,4,8,4,8,4,8,4],
			  [4,8,4,8,4,8,4,8,4,8],
			  [2,0,2,0,2,0,2,0,2,0],
			  [0,2,0,2,0,2,0,2,0,2],
			  [2,0,2,0,2,0,2,0,2,0],
			  [0,2,0,2,0,2,0,2,0,2]]

    let fichier = JSON.stringify(damier);
	fs.writeFileSync("./json/plateaux.json",fichier, "UTF-8");


	//lire et recupere le contenu du fichier "plateaux.json"
	contenu = fs.readFileSync("./json/plateaux.json", "UTF-8");
	plateaux = JSON.parse(contenu);

	// declarer la variable pour attribuer un numero a aux images de la grille
	let n=0;

	// creer mon dammier
	function delon() {
		del += '<center>';
		del += '<div class="plateaux">';
		del += '<div class="plateaux_1">';
		del += '<div class="plateaux_2">';
		
		// parcourire le le fichier "plateux.json" x et y
		for (let x = 0; x < plateaux.length; x++) {
			del += '<div class="row">';
			for (let y = 0; y < nb; y++) {
			// si le fichier "plateaux.json" contient le chiffre "1"
			//Alors placer le PION BLANC sur le dammier et mettre la couleure MARON FONCEE en arrire plan
				if (plateaux[x][y] == 1) {
					del += '<div class="block1">';
                    del += `<a href="/req_select?action=` + n
                    + `"><img src="./images/J1.png" '></a>`;

				//	del += '<img src="./images/J1.png">';
					del += '</div>';
				}	

				// si le fichier "plateaux.json" contient le chiffre "2"
				//Alors placer le PION NOIR sur le dammier et mettre la couleure MARON FONCEE en arrire plan
				else if (plateaux[x][y] == 2) {
					del += '<div class="block1">';
				//	del += '<img src="./images/J2.png">';
                    del += `<a href="/req_select?action=` + n
                    + `"><img src="./images/J2.png" '></a>`;
					del += '</div>';
				}
                // Si le fichier "plateaux.json" ne contient ni le chiffre "1" ni le chifree "2"
				// Alors executez le code ci-dessous
				else {	
					// si le fichier "plateaux.json" contient le chiffre "8"
					//Alorsi NE PLACER AUCUN  PION  sur le dammier et mettre la couleure MARON NOIRE en arrire plan
					if (plateaux[x][y] == 8){
						del += '<div class="block1">';
						del += '</div>';
					}
					
					// si le fichier "plateaux.json" contient le chiffre "4"
					//Alorsi NE PLACER AUCUN  PION  sur le dammier et mettre la couleure MARON CLAIRE en arrire plan
					else{
						del += '<div class="block2">';
						del += '</div>';

					}

				}
			n++
			}
			del += '</div>';

		}
		del += '</div>';
		del += '</div>';
		del += '</div>';
		del += '</center>';

		}
		delon();

		page = fs.readFileSync('./html/marqueur.html', 'UTF-8');

		marqueurs = {};
		marqueurs["BV"]="BIENVENUE";
		marqueurs["nom"]="";
		marqueurs.del = del;
		marqueurs.pieces = pieces;
		marqueurs.ram = ram;
		page = nunjucks.renderString(page, marqueurs);
	
	
	res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = trait;


