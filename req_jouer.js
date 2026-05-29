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




	// declarer les variables pour obtenire "la query". Cette partie du code permet de connaitre l' emplacement x et y du pion selectionner
	let action;
	let xx;
	let yy;

	action = Number(query.action)
	xx = action % 10;
	yy = Math.floor(action / 10);
	console.log("xx:",xx,"yy:",yy);




	// declarer les variable pour lire et recuperter le fichier "plateaux.json"
	let contenu;
	let plateaux;


	//lire et recupere le contenu du fichier "plateaux.json"
	contenu = fs.readFileSync("./json/plateaux.json", "UTF-8");
	plateaux = JSON.parse(contenu);




    // declarer les variables pour lire et ecrire le fichier "select.json"
    let contenu_jouer;
    let jouer;
  
    //lire et recupere le contenu du fichier "select.json"
    contenu_jouer = fs.readFileSync("./json/jouer.json", "UTF-8");
    jouer = JSON.parse(contenu_jouer);
 
    // save number carte in "select.json"
    jouer[0][0] = action
  
    contenu_jouer = JSON.stringify(jouer);
    fs.writeFileSync("./json/jouer.json",contenu_jouer,"UTF-8");

    

	// lire echanger la valeur du "select.json" avec celui de "jouer.json" et le sauvegarder dans le fichier "plateaux.json"

    //lire et recupere le contenu du fichier "jouer.json"
    contenu_jouer = fs.readFileSync("./json/jouer.json", "UTF-8");
    jouer = JSON.parse(contenu_jouer);
 
    // convertir le nombre action en x_x et y_y du fichier "jouer.json"
    let	action_jouer = jouer[0][0]

	let x_x = action_jouer % 10;
	let y_y = Math.floor(action_jouer / 10);



    //lire et recupere le contenu du fichier "select.json"
    let contenu_select = fs.readFileSync("./json/select.json", "UTF-8");
    let select = JSON.parse(contenu_select);
 
    // convertir le nombre action en x_x et y_y du fichier "select.json"
    let	action_select = select[0][0]

	let x_x_x = action_select % 10;
	let y_y_y = Math.floor(action_select / 10);




	// ecrire dans le fichier "plateaux.json" le deplacement du pion.


	////

	contenu = fs.readFileSync("./json/plateaux.json", "UTF-8");
	plateaux = JSON.parse(contenu);

	plateaux[y_y][x_x] = plateaux[y_y_y][x_x_x];

    contenu = JSON.stringify(plateaux);
    fs.writeFileSync("./json/plateaux.json",contenu,"UTF-8");

    ///
	plateaux[y_y_y][x_x_x] = 8;

    contenu = JSON.stringify(plateaux);
    fs.writeFileSync("./json/plateaux.json",contenu,"UTF-8");




	// declarer la variable pour attribuer un numero a aux images de la grille
	let n=0;


	contenu = fs.readFileSync("./json/plateaux.json", "UTF-8");
	plateaux = JSON.parse(contenu);





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

				//	del += '<img src="../frontend/images/J1.png">';
					del += '</div>';
				}	

				// si le fichier "plateaux.json" contient le chiffre "2"
				//Alors placer le PION NOIR sur le dammier et mettre la couleure MARON FONCEE en arrire plan
				else if (plateaux[x][y] == 2) {
					del += '<div class="block1">';
				//	del += '<img src="../frontend/images/J2.png">';
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

		page = fs.readFileSync('./html/jouer.html', 'UTF-8');

		marqueurs = {};
		marqueurs["BV"]="BIENVENUE";
		marqueurs["nom"]="DELON";
		marqueurs.del = del;
		marqueurs.pieces = pieces;
		marqueurs.ram = ram;
		page = nunjucks.renderString(page, marqueurs);
	
	
	res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = trait;


