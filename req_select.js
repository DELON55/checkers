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
	let contenu_select;
	let select;

	let contenu_joueur;
	let joueur;

	//lire et recupere le contenu du fichier "joueur.json"
	contenu_joueur = fs.readFileSync("./json/joueur.json", "UTF-8");
	joueur = JSON.parse(contenu_joueur);

	//get the number of user(1 or 2)
	joueur[0] = plateaux[yy][xx]

	contenu_joueur = JSON.stringify(joueur);
	fs.writeFileSync("./json/joueur.json",contenu_joueur,"UTF-8");


	//lire et recupere le contenu du fichier "joueur.json"
	contenu_joueur = fs.readFileSync("./json/joueur.json", "UTF-8");
	joueur = JSON.parse(contenu_joueur);

    console.log("joueur", joueur[0])
	
	let y_play1;
	let x_1_play1;
	let x_2_play1;

	let y_play2;
	let x_1_play2;
	let x_2_play2;

	let joueur_1_x1 = false;
	let joueur_1_x2 = false;

	let joueur_2_x1 = false;
	let joueur_2_x2 = false;


	if(joueur[0] == "1"){
		y_play1 = yy + 1;
		if(xx == 0){	
			x_1_play1 = xx + 1;
			x_2_play1 = xx + 1;
		}

		if(xx == 9){	
			x_1_play1 = xx - 1;
			x_2_play1 = xx - 1;
		}

		else{
			x_1_play1 = xx - 1;
			x_2_play1 = xx + 1;
		}
     

		contenu = fs.readFileSync("./json/plateaux.json", "UTF-8");
		plateaux = JSON.parse(contenu);
     

		console.log("exit")
		
		console.log("joueure1:x1:",plateaux[y_play1][x_1_play1]);

		console.log("joueure1:x2:",plateaux[y_play1][x_2_play1]);

		if(plateaux[y_play1][x_1_play1]== 8){
//		if(plateaux[y_play1][x_1_play1] !== 1 && plateaux[y_play1][x_2_play1] !==2){
			console.log("yes1")

			plateaux[y_play1][x_1_play1] = 6	
			joueur_1_x1 = true;
			

		}else if(plateaux[y_play1][x_1_play1]== 2){
//		if(plateaux[y_play1][x_1_play1] !== 1 && plateaux[y_play1][x_2_play1] !==2){
			console.log("yes1")

			if(y_play1 < 10 && 0< x_1_play1<9){
				plateaux[y_play1 + 1][x_1_play1 - 1] = 6	
				joueur_1_x1 = true;
			}
		}





	//	if(plateaux[y_play1][x_2_play1] !== 1 && plateaux[y_play1][x_2_play1] !==2){
		if(plateaux[y_play1][x_2_play1] == 8){
			console.log("yes2")

			plateaux[y_play1][x_2_play1] = 6	
			joueur_1_x2 = true;


		}else if(plateaux[y_play1][x_2_play1] == 2){

			console.log("yes2")
			
			if(y_play1 <10 && 0 < x_2_play1 < 9){
				plateaux[y_play1 + 1][x_2_play1 + 1] = 6	
				joueur_1_x2 = true;
			}

		}


		contenu = JSON.stringify(plateaux);
		fs.writeFileSync("./json/plateaux.json",contenu,"UTF-8");

//		plateaux[y_play1][x_1_play1] = 6	
//		plateaux[y_play1][x_2_play1] = 6


	}



	if(joueur[0] == "2"){	
		y_play2 = yy - 1;
 
		if(xx == 0){	
			x_1_play2 = xx + 1;
			x_2_play2 = xx + 1;
		}

		if(xx == 9){	
			x_1_play2 = xx - 1;
			x_2_play2 = xx - 1;
		}

		else{
			x_1_play2 = xx - 1;
			x_2_play2 = xx + 1;
		}

		contenu = fs.readFileSync("./json/plateaux.json", "UTF-8");
		plateaux = JSON.parse(contenu);



		console.log("joueure2:x1:",plateaux[y_play2][x_1_play2]);

		console.log("joueure1:x2:",plateaux[y_play2][x_2_play2]);


	//	if(plateaux[y_play2][x_1_play2] !== 1 && plateaux[y_play2][x_2_play2] !==2){
		if(plateaux[y_play2][x_1_play2] == 8){
			plateaux[y_play2][x_1_play2] = 6	
			joueur_2_x1 = true;
		 
		}else if(plateaux[y_play2][x_1_play2]== 1){
//		if(plateaux[y_play1][x_1_play1] !== 1 && plateaux[y_play1][x_2_play1] !==2){
			console.log("yes1")

			if(y_play2 < 10 && 0< x_1_play2<9){
				plateaux[y_play2 - 1][x_1_play2 - 1] = 6	
				joueur_2_x1 = true;
			}
		}




	//	if(plateaux[y_play2][x_2_play2] !== 1 && plateaux[y_play2][x_2_play2] !==2){
		if(plateaux[y_play2][x_2_play2] == 8){
			plateaux[y_play2][x_2_play2] = 6	
			joueur_2_x2 = true;
		 
		}else if(plateaux[y_play2][x_2_play2] == 1){
//		if(plateaux[y_play1][x_1_play1] !== 1 && plateaux[y_play1][x_2_play1] !==2){
			console.log("yes1")

			if(y_play2 < 10 && 0< x_2_play2 <9){
				plateaux[y_play2 - 1][x_2_play2 + 1] = 6	
				joueur_2_x2 = true;
			}
		}


	//	plateaux[y_play2][x_1_play2] = 6	
	//	plateaux[y_play2][x_2_play2] = 6

//		plateaux[x_1_play2][x_1_play2] = 6	
//		plateaux[x_2_play2][x_2_play2] = 6
		
		contenu = JSON.stringify(plateaux);
		fs.writeFileSync("./json/plateaux.json",contenu,"UTF-8");
	}



	//lire et recupere le contenu du fichier "select.json"
	contenu_select = fs.readFileSync("./json/select.json", "UTF-8");
	select = JSON.parse(contenu_select);

   // save number carte in "select.json"
    select[0][0] = action

	contenu_select = JSON.stringify(select);
	fs.writeFileSync("./json/select.json",contenu_select,"UTF-8");






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
                    del += `<img src="./images/J1.png"/>`;

				//	del += '<img src="../frontend/images/J1.png">';
					del += '</div>';
				}	

				// si le fichier "plateaux.json" contient le chiffre "2"
				//Alors placer le PION NOIR sur le dammier et mettre la couleure MARON FONCEE en arrire plan
				else if (plateaux[x][y] == 2) {
					del += '<div class="block1">';
				//	del += '<img src="../frontend/images/J2.png">';
                    del += `<img src="./images/J2.png"/>`;
					del += '</div>';
				}
                // Si le fichier "plateaux.json" ne contient ni le chiffre "1" ni le chifree "2"
				// Alors executez le code ci-dessous
				else {	
					// si le fichier "plateaux.json" contient le chiffre "8"
					//Alorsi NE PLACER AUCUN  PION  sur le dammier et mettre la couleure MARON NOIRE en arrire plan
					if (plateaux[x][y] == 8 || plateaux[x][y] == 6){
						if(plateaux[x][y] == 6){
							del += '<div class="block3">';
                    		del += `<a href="/req_jouer?action=` + n
                    		+ `"><img src="./images/carre3.png" '></a>`;
							del += '</div>';
						}
						else{

							del += '<div class="block1">';
                    		del += `<img src="./images/carre.png">`;
							del += '</div>';
						}	
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

		page = fs.readFileSync('./html/select.html', 'UTF-8');

		marqueurs = {};
		marqueurs["BV"]="BIENVENUE";
		marqueurs["nom"]="DELON";
		marqueurs.del = del;
		marqueurs.pieces = pieces;
		marqueurs.ram = ram;
		page = nunjucks.renderString(page, marqueurs);
	
		

		if(joueur[0] == 1){
			contenu = fs.readFileSync("./json/plateaux.json", "UTF-8");
			plateaux = JSON.parse(contenu);

			
		   	if(joueur_1_x1 == true){
				plateaux[y_play1][x_1_play1] = 8	
			}

//			plateaux[y_play1][x_1_play1] = 8	

		   	if(joueur_1_x2 == true){
				plateaux[y_play1][x_2_play1] = 8
            }


//		plateaux[x_1_play2][x_1_play2] = 6	
//		plateaux[x_2_play2][x_2_play2] = 6
		
			contenu = JSON.stringify(plateaux);
			fs.writeFileSync("./json/plateaux.json",contenu,"UTF-8");

		}

		if(joueur[0] == 2){
			contenu = fs.readFileSync("./json/plateaux.json", "UTF-8");
			plateaux = JSON.parse(contenu);


		   	if(joueur_2_x1 == true){
				plateaux[y_play2][x_1_play2] = 8	
			}

		   	if(joueur_2_x2 == true){
				plateaux[y_play2][x_2_play2] = 8
			}


//		plateaux[x_1_play2][x_1_play2] = 6	
//		plateaux[x_2_play2][x_2_play2] = 6
		
			contenu = JSON.stringify(plateaux);
			fs.writeFileSync("./json/plateaux.json",contenu,"UTF-8");

		}


	res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(page);
    res.end();
};

module.exports = trait;


