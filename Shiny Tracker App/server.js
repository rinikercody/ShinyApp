const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const PORT = 3000;

var startDate = new Date();

//Message when server starts
fs.appendFile('logs/updateLog.txt',"Server started on: " + startDate + '\n', 'utf8', 
	function(err) {  
		if (err){
			throw err; 
		}
	//console.log("Server started.");
}); 

var shinySprites = fs.readdirSync('ShinySprites');

//This will have a list of all pokemon and there first type.
//Ex. pokemonColorTypes['Bagon'] will return 'Dragon';
pokemonColorTypes = [];
var pokemonTypeData = fs.readFileSync('pokemonTypes.json','utf8');
pokemonTypeData = pokemonTypeData.split('\n');
for(var i = 0; i < pokemonTypeData.length; i++){
	var arr = pokemonTypeData[i].split(',');
	if(arr[1] && arr[0]){
		pokemonColorTypes[arr[0].toUpperCase()] = arr[1].toUpperCase();
	}
}

pokemonTwoTypes = [];
var pokemonTwoTypeData = fs.readFileSync('pokemonTwoTypes.json','utf8');
pokemonTwoTypeData = pokemonTwoTypeData.split('\n');
for(var i = 0; i < pokemonTwoTypeData.length; i++){
	var arr = pokemonTwoTypeData[i].split(',');
	if(arr[1] && arr[0]){
		pokemonTwoTypes.push({name: arr[0].toUpperCase(), type1: arr[1].toUpperCase(), type2: arr[2].toUpperCase()});
	}
}

function getTwoTypeName(name){
	for(var i = 0; i < pokemonTwoTypes.length; i++){
		if(name.toUpperCase() == pokemonTwoTypes[i].name.toUpperCase()){
			return pokemonTwoTypes[i]; 
		}
	}
}


const Types = ['GHOST','ROCK','GRASS','GROUND','BUG','FIRE','DRAGON','WATER','ICE','NORMAL','DARK','ELECTRIC','FIGHTING','POISON',
'PSYCHIC','FLYING','STEEL','FAIRY'
];

const Legends = ['Articuno','Moltres','Zapdos',
			'Mewtwo','Mew','Raikou','Entei',
			'Suicune','Lugia','Ho-oh','Celebi',
			'Regirock','Regice','Registeel',
			'Kyogre','Groudon','Rayquaza',
			'Latios','Latias','Jirachi','Deoxys',
			'Uxie','Azelf','Mesprit','Dialga','Palkia',
			'Heatran','Regigigas','Giratina','Cresselia',
			'Cobalion','Terrakion','Virizion','Tornadus',
			'Thundurus','Landorus','Reshiram','Zekrom',
			'Kyurem','Xerneas','Yveltal','Zygarde',
			'Phione','Manaphy','Darkrai','Shaymin','Arceus',
			'Keldeo','Victini','Meloetta','Genesect','Diancie',
			'Hoopa','Volcanion','Magearna','Marshadow','Meltan',
			'Melmetal','Zeraora','Zarude'
			];
			
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
			
for(var i = 0; i < Legends.length; i++){
	Legends[i] = Legends[i].toUpperCase();
}

Array.prototype.myInclude = function(other){
	for(var i = 0; i < this.length; i++){
		if(this[i].name.trim().toUpperCase() === other.name.trim().toUpperCase()){
			return true;
		}
	}
	return false;
}

Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

Date.prototype.ymd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  return monthNames[this.getMonth()] + ',' + this.getFullYear();
};


function getPokemonColor(pkName){
	var opacity = 0.9;
	var type = pokemonColorTypes[pkName];
	if(type == 'GHOST'){
		return 'rgba(150,125,150,' + opacity +')';
	}
	if(type == 'ROCK'){
		return 'rgba(140,150,55,' + opacity +')';
	}
	if(type == 'GRASS'){
		return 'rgba(10,150,20,' + opacity +')';
	}
	if(type == 'GROUND'){
		return 'rgba(235,210,150,' + opacity +')';
	}
	if(type == 'BUG'){
		return 'rgba(200,255,130,' + opacity +')';
	}
	if(type == 'FIRE'){
		return 'rgba(200,50,55,' + opacity +')';
	}
	if(type == 'DRAGON'){
		return 'rgba(31,31,122,' + opacity +')';
	}
	if(type == 'WATER'){
		return 'rgba(65,135,200,' + opacity +')';
	}
	if(type == 'ICE'){
		return 'rgba(110,221,225,' + opacity +')';
	}
	if(type == 'NORMAL'){
		return 'rgba(240,240,240,' + opacity +')';
	}
	if(type == 'DARK'){
		return 'rgba(10,10,10,' + opacity +')';
	}
	if(type == 'ELECTRIC'){
		return 'rgba(255,245,120,' + opacity +')';
	}
	if(type == 'FIGHTING'){
		return 'rgba(160,45,80,' + opacity +')';
	}
	if(type == 'POISON'){
		return 'rgba(120,40,140,' + opacity +')';
	}
	if(type == 'PSYCHIC'){
		return 'rgba(200,75,200,' + opacity +')';
	}
	if(type == 'FLYING'){
		return 'rgba(30,190,200,' + opacity +')';
	}
	if(type == 'STEEL'){
		return 'rgba(185,200,220,' + opacity +')';
	}
	if(type == 'FAIRY'){
		return 'rgba(255,185,240,' + opacity +')';
	}
	return 'rgba(100,100,100,' + opacity +')';
}

/*
function getColor(type){
	var opacity = 0.9;
	if(type == 'GHOST'){
		return 'rgba(150,125,150,' + opacity +')';
	}
	if(type == 'ROCK'){
		return 'rgba(140,150,55,' + opacity +')';
	}
	if(type == 'GRASS'){
		return 'rgba(10,150,20,' + opacity +')';
	}
	if(type == 'GROUND'){
		return 'rgba(235,210,150,' + opacity +')';
	}
	if(type == 'BUG'){
		return 'rgba(200,255,130,' + opacity +')';
	}
	if(type == 'FIRE'){
		return 'rgba(200,50,55,' + opacity +')';
	}
	if(type == 'DRAGON'){
		return 'rgba(31,31,122,' + opacity +')';
	}
	if(type == 'WATER'){
		return 'rgba(65,135,200,' + opacity +')';
	}
	if(type == 'ICE'){
		return 'rgba(110,221,225,' + opacity +')';
	}
	if(type == 'NORMAL'){
		return 'rgba(240,240,240,' + opacity +')';
	}
	if(type == 'DARK'){
		return 'rgba(10,10,10,' + opacity +')';
	}
	if(type == 'ELECTRIC'){
		return 'rgba(255,245,120,' + opacity +')';
	}
	if(type == 'FIGHTING'){
		return 'rgba(160,45,80,' + opacity +')';
	}
	if(type == 'POISON'){
		return 'rgba(120,40,140,' + opacity +')';
	}
	if(type == 'PSYCHIC'){
		return 'rgba(200,75,200,' + opacity +')';
	}
	if(type == 'FLYING'){
		return 'rgba(30,190,200,' + opacity +')';
	}
	if(type == 'STEEL'){
		return 'rgba(185,200,220,' + opacity +')';
	}
	if(type == 'FAIRY'){
		return 'rgba(255,185,240,' + opacity +')';
	}
	return 'rgba(100,100,100,' + opacity +')';
}
*/



///////////////////////////////////////////////////////////////////////////////HTML CREATION////////////////////////////////////////

function createHomepageHTML(){
	var codyInfo = fs.readFileSync('data/codyInfo.txt','utf8');
	var teresaInfo = fs.readFileSync('data/teresaInfo.txt','utf8');
	var codyData = codyInfo.split('\n');
	var teresaData = teresaInfo.split('\n');
	codyData.sort(); //Sort data into alphabetical order
	teresaData.sort(); 
	

	//Take data from cody text file and make it into an object
	for(var i = 0; i < codyData.length; i++){
		var obj = {
			"name" : codyData[i].trim().toUpperCase().split(',')[0],
			"date" : new Date(codyData[i].split(',')[1]),
			"comDay" : codyData[i].split(',')[2]
		}
		codyData[i] = obj;
	}
	
	//Take data from teresa text file and make it into an object
	for(var i = 0; i < teresaData.length; i++){
		var obj = {
			"name" : teresaData[i].trim().toUpperCase().split(',')[0],
			"date" : new Date(teresaData[i].split(',')[1]),
			"comDay" : teresaData[i].split(',')[2]
		}
		teresaData[i] = obj;
	}
	
	codyData.sort((a,b) => (a.date < b.date) ? 1 : -1); //Sort by date
	teresaData.sort((a,b) => (a.date < b.date) ? 1 : -1); //Sort by date
	
	codyData.forEach(function(ent,ei){ //This is to get rid of blanks cause be random end of line
		if(ent.name == ''){
			codyData.splice(ei,1);
		}
	});
	
	teresaData.forEach(function(ent,ei){
		if(ent.name == ''){
			teresaData.splice(ei,1);
		}
	});
	
	var codyUniqueCount = 0;
	var teresaUniqueCount = 0;
	
	var codyLegendsCount = 0;
	var teresaLegendsCount = 0;
	
	var date1 = new Date(); //currentDate
	
	// get total seconds between two dates
	
	var lastNonCDayShinyDateCody;
	for(var i = 0;i < codyData.length; i++){
		if(codyData[i].comDay){
			if(codyData[i].comDay.trim() != 'ComDay'){
				lastNonCDayShinyDateCody = codyData[i].date;
				break;
			}
		}
		else{
			lastNonCDayShinyDateCody = codyData[i].date;
			break; 
		}
		
		
	}
	
	var lastNonCDayShinyDateTeresa;
	for(var i = 0;i < teresaData.length; i++){
		if(teresaData[i].comDay){
			if(teresaData[i].comDay.trim() != 'ComDay'){
				lastNonCDayShinyDateTeresa = teresaData[i].date;
				break;
			}
		}
		else{
			lastNonCDayShinyDateTeresa = teresaData[i].date;
			break; 
		}
		
		
	}
	
    var resC = Math.abs(date1 - lastNonCDayShinyDateCody) / 1000;
    var daysC = Math.floor(resC / 86400);

	var resT = Math.abs(date1 - lastNonCDayShinyDateTeresa) / 1000;
    var daysT= Math.floor(resT / 86400);

	var codyCDayShinies = 0;
	for(var i = 0; i < codyData.length; i++){
		if(codyData[i].comDay){
			if(codyData[i].comDay.trim() == 'ComDay'){
				codyCDayShinies++;
			}
		}
		
		if(Legends.includes(codyData[i].name.toUpperCase())){
			codyLegendsCount++;
		}
	}
	
	var teresaCDayShinies = 0;
	for(var i = 0; i < teresaData.length; i++){
		if(teresaData[i].comDay){
			if(teresaData[i].comDay.trim() == 'ComDay'){
				teresaCDayShinies++;
			}
		}
		
		if(Legends.includes(teresaData[i].name.toUpperCase())){
			teresaLegendsCount++;
		}
	}

	var html = '';
	html += '<!DOCTYPE html>'
	html += '<html>';
	html += '	<head>';
	html += '		<title>Shiny Tracker App</title>';
	html += '		<link rel=stylesheet type=text/css href=css/stylesheet.css>'
	html += '		<link rel=stylesheet type=text/css href=css/cssReset.css>'
	html += '	</head>';
	html += '	<body>';
	html += '		<div id=wrapper>'
	
	
	html += createNavBar();
	
	html += '			<div id=infoText>';
	html += "				<div id=codyTopStats onclick=showExtraStats('cody')>"
	html += '					<h2>Cody</h2>'
	html += "           		<h2>Total Shinies: " + codyData.length + "</h2>";
	html += "					<div id=codyExtraStats style='display: none;'>"
	html += "           			<h2>Legendary Shinies: " + codyLegendsCount + "</h2>";
	html += "						<h2>cDay Shines: " + codyCDayShinies + "</h2>";
	html += "						<h2>non cDay Shines: " + (codyData.length - codyCDayShinies) + "</h2>";
	html += "                   <text>" +  daysC + " days </text>" + "<text>since last non cDay shiny.</text><br>";
	html += "					</div>";//End cody extra stats
	html += "				<div class=extraArrowContainer>"
	html += "				<text id=codyExtraArrow class=extraArrow>touch for more stats</text>";
	html += "				</div>";
	html += '				</div>'
	html += "				<div id=teresaTopStats onclick=showExtraStats('teresa')>"
	html += '					<h2>Teresa</h2>'
	html += "           		<h2>Total Shinies: " + teresaData.length + "</h2>";
	html += "					<div id=teresaExtraStats style='display: none;'>"
	html += "           		<h2>Legendary Shinies: " + teresaLegendsCount + "</h2>";
	html += "					<h2>cDay Shines: " + teresaCDayShinies + "</h2>";
	html += "					<h2>non cDay Shines: " + (teresaData.length - teresaCDayShinies) + "</h2>";
	html += "                   <text>" +  daysT + " days </text>" + "<text>since last non cDay shiny.</text><br>";
	html += "				</div>"//End showExtraStats
	html += "				<div class=extraArrowContainer>"
	html += "				<text id=teresaExtraArrow class=extraArrow>touch for more stats</text>";
	html += "				</div>";
	html += "				</div>"
	html += '			</div>'; //End infoText
	
	//Wnat bar graph around here
	
	/*
	//Have canvas here than have script draw to it at the end after data has been gatehred
	html += '<canvas id=main-canvas></canvas>';
	*/
	
	var minYear = 2017;

	var d = new Date();
	var maxYear = d.getFullYear();

	for(var year = maxYear; year > minYear; year--){
		var temp = 11;
		if(year == maxYear){
			temp = d.getMonth();
		}
		for(var month = temp; month > -1; month--){
			html += '<div class=monthContainer>';
			html += '	<div id=monthHeader>'
			html += '		<text class=monthText>' + monthNames[month] + ' ' + year + ' </text><br>'
			html += '	</div>'; //End monthHeader

			var codyShinyMonthCount = 0;
			var codyUniqueMonthCount = 0;
			html += '	<div class=codyMonth>'
			for(var i = 0; i < codyData.length; i++){
				if(codyData[i].date.getFullYear() == year && codyData[i].date.getMonth() == month){
					codyShinyMonthCount++;
					codyUniqueMonthCount++;
					var color = getPokemonColor(codyData[i].name.trim().toUpperCase());
					html += '		<div class=pokemonBox style="background-color: ' + color + '">';
					html += '			<div class=nameTextContainer>'
					//if(!teresaData.myInclude(codyData[i])){
					//	html += '       	<text class=unique>' + codyData[i].name + '</text>';
					//}
					//else{
						html += '			<text>' + codyData[i].name + '</text>'
					//}
					html += '			</div>'; //End nameTextContainer
					
					var pkmPic = codyData[i].name.trim().toLowerCase()
					html += '					<img id=c' + pkmPic + ' src="ShinySprites/' + pkmPic + '.png" alt=c' + codyData[i].name + ' onclick=showNormal("c'+ pkmPic + '")>'
					html += '					<text id=cs' + pkmPic + ' style="display: none">Shiny</text>' //This is just to track the image
					
					//html += '			<img src="ShinySprites/' + codyData[i].name.trim().toLowerCase() + '.png" alt=c' + codyData[i].name + '>'
					if(determineDuplicate(codyData,i)){
						codyUniqueMonthCount--;
						html += '		<div id=duplicateText>'
						html += '			<text>D</text>'
						html += '		</div>'
					}
					
					html += '<div id=dayCaught>'
					if(codyData[i].comDay){
						if(codyData[i].comDay.trim() == 'ComDay'){
							html += 'cDay: ';
						}
					}
					html +=  codyData[i].date.getDate();
					html += '</div>'//End dayCaught
					
						html += '		</div>' //End pokemonBox
				}		
			}	
			html += '</div>' //End cody month



			var teresaShinyMonthCount = 0;
			var teresaUniqueMonthCount = 0;
			html += '<div class=teresaMonth>'
			for(var i = 0; i < teresaData.length; i++){
				if(teresaData[i].date.getFullYear() == year && teresaData[i].date.getMonth() == month){
					teresaShinyMonthCount++;
					teresaUniqueMonthCount++;
					var color = getPokemonColor(teresaData[i].name.trim().toUpperCase());
					html += '				<div class=pokemonBox style="background-color: ' + color + '">';
					html += '					<div class=nameTextContainer>'
					//if(!codyData.myInclude(teresaData[i])){
					//	html += '               	<text class=unique>' + teresaData[i].name + '</text>';
					//}
					//else{
						html += '					<text>' + teresaData[i].name + '</text>'
					//}
					html += '					</div>'; //End nameTextContainer
					
					var pkmPic = teresaData[i].name.trim().toLowerCase()
		html += '	<img id=t' + pkmPic + ' src="ShinySprites/' + pkmPic + '.png" alt=c' + teresaData[i].name + ' onclick=showNormal("t'+ pkmPic + '")>'
		html += '	<text id=ts' + pkmPic + ' style="display: none">Shiny</text>' //This is just to track the image
					
					//html += '					<img src="ShinySprites/' + teresaData[i].name.trim().toLowerCase() + '.png" alt=c' + teresaData[i].name + '>'
					if(determineDuplicate(teresaData,i)){
						teresaUniqueMonthCount--;
						html += '				<div id=duplicateText>'
						html += '					<text>D</text>'
						html += '				</div>'
					}
					
					html += '<div id=dayCaught>'
					if(teresaData[i].comDay){
						if(teresaData[i].comDay.trim() == 'ComDay'){
							html += 'cDay: ';
						}
					}
					html +=  teresaData[i].date.getDate();
					html += '</div>'//End dayCaught
				html += '				</div>' //End pokemonBox
				}
			}
			html += '</div>' //End teresaMonth


			html += '<div class=endMonthInfo>';
			
			html += '<div class=endMonthSection>';
			html += '	<text>Cody</text><br>'; 
			html += '	<text>Teresa</text>';
			html += '</div>'
			
			html += '<div class=endMonthSection style="text-align: center">';
			html += '	<text style="color: silver">Total: ' + codyShinyMonthCount + '</text><br>'; 
			html += '	<text style="color: silver">Total: ' + teresaShinyMonthCount + '</text>';
			html += '</div>'
			
			html += '<div class=endMonthSection style="text-align: right">';
			html += '	<text style="color: gold"> New: ' + codyUniqueMonthCount + '</text><br>';
			html += '	<text style="color: gold"> New: ' + teresaUniqueMonthCount + '</text>';
			html += '</div>'
			html += '</div>'; //End endMonthInfo

			html += '</div>' //End monthContainer
		} //End month forloop
	} //End year forloop	
	html += '           </div>'; //End wrapper
	html += '		<script src="scripts/scripts.js"></script>';
	html += '		<script src="scripts/chartScripts.js"></script>';
	html += '	</body>';
	html += '</html>';
	
	return html;
}

//Determines if the current shiny is the same as one the player has caught in the past 
function determineDuplicate(data,i){
	var count = 0;
	var low = 1000;
	for(var j = 0; j < data.length; j++){
		if(data[j].name == data[i].name){
			count++;
			if(count > 1){
				if(j > i){
					return true;
				}
			}
		}
	}	
	return false;
}

function createNavBar(){
	var html = '';
	html += '				<div id=mainPageHeadContainer>'
	html += '					<a href=/ class=biggerText>Home</a>'
	html += '					<a href=/VS class=biggerText>VS</a>'
	html += '					<a href=/viewCody class=smallerText>Cody Pokemon</a>'
	html += '					<a href=/viewTeresa class=smallerText>Teresa Pokemon</a>'
	html += '					<a href=/pokeInfo class=biggerText>Info</a>';
	html += '				</div>';
	return html;
	
}

Weather = ['CLEAR','RAINY','PCLOUDY','CLOUDY','WINDY','SNOW','FOG'];

function getWeatherTypes(type){
	if(type == 'GHOST'){
		return 'Fog';
	}
	if(type == 'ROCK'){
		return 'Partly Cloudy';
	}
	if(type == 'GRASS'){
		return 'Clear';
	}
	if(type == 'GROUND'){
		return 'Clear';
	}
	if(type == 'BUG'){
		return 'Rain';
	}
	if(type == 'FIRE'){
		return 'Clear';
	}
	if(type == 'DRAGON'){
		return 'Windy';
	}
	if(type == 'WATER'){
		return 'Rain';
	}
	if(type == 'ICE'){
		return 'Snow';
	}
	if(type == 'NORMAL'){
		return 'Partly Cloudy';
	}
	if(type == 'DARK'){
		return 'Fog';
	}
	if(type == 'ELECTRIC'){
		return 'Rain';
	}
	if(type == 'FIGHTING'){
		return 'Cloudy';
	}
	if(type == 'POISON'){
		return 'Cloudy';
	}
	if(type == 'PSYCHIC'){
		return 'Windy';
	}
	if(type == 'FLYING'){
		return 'Windy';
	}
	if(type == 'STEEL'){
		return 'Snow';
	}
	if(type == 'FAIRY'){
		return 'Cloudy';
	}
}

function createPokemonInfoPage(pkm){
	var html = '';
	
	html += '<!DOCTYPE html>'
	html += '<html>';
	html += '	<head>';
	html += '		<title>Shiny Tracker App</title>';
	html += '		<link rel=stylesheet type=text/css href=css/cssReset.css>'
	html += '		<link rel=stylesheet type=text/css href=css/stylesheet.css>'
	html += '	</head>';
	html += '	<body>';
	html += '		<div id=wrapper>'
	
	html += createNavBar();
	
	html += '			<div id=addPokemonFormContainer>'
	html += '				<form method=POST>'
	html += '					<select id=newPokemonSelect name=pokemonSelect>'
	html += '               		<option>Select Pokemon</option>'
	for(var i = 0; i < shinySprites.length; i++){
	html += '               		<option>' + shinySprites[i].split('.')[0] + '</option>'
	}
	html += '               	</select><br>'
	html += '					<button type=submit id=addButton name=addPokemon value=Search>Search Pokemon</button>'
	html += '</form>'
	html += '			</div>'; //End head container
	
	
	var color = getPokemonColor(pkm.toUpperCase());
	html += '<div class=pkmBoxContainer>';
	html += '			<div class=pokemonBox style="background-color: ' + color + '">';
	html += '					<div class=nameTextContainer>'
	html += '						<text>' + pkm.trim().toUpperCase() + '</text>'
	html += '					</div>';
	var pkmPic = pkm.trim().toLowerCase()
	html += '					<img id=c' + pkmPic + ' src="NormalSprites/' + pkmPic + '.png" alt=c' + '' + ' onclick=showNormal("c'+ pkmPic + '")>'
		
	html += '					<text id=cs' + pkmPic + ' style="display: none">Shiny</text>' //This is just to track the image
	html += '			</div></br>' //End pokemonBox
	
	var pttd = getTwoTypeName(pkm);
	html += '<text>' + pttd.type1 + '</text>';
	if(pttd.type2.length > 2){
		html += '<text>,' + pttd.type2 + '</text>';
	}
	html += '</div>'
	html += '<br/>';
	
	html += '					<select id=pokemonTypeSelect onchange="location = this.value;">'
	html += '               		<option>Jump To Type</option>'
	for(var i = 0; i < Types.length; i++){
	html += '<option value="#' + Types[i] + '">' + Types[i] + '</option>';
	}
	html += '               	</select><br>'
	
	
	for(var j = 0; j < Types.length; j++){
	html += '<div class=typeSection id=' + Types[j] + 'Section style="background-color:' + getPokemonColor(Types[j]) + '">';
	html += '<text class=typeText>' + Types[j] + '</text><text style="font-size: 24px"> - ' + getWeatherTypes(Types[j]) + '</text><br>';
	html += '<a id=' + Types[j] + ' name=' + Types[j] + '></a>';
	for(var i = 0; i < pokemonTwoTypes.length; i++){
		var p = pokemonTwoTypes[i];
		if(p.type1.toUpperCase() == Types[j] || p.type2.toUpperCase() == Types[j]){
			pkm = p.name;
			color = getPokemonColor(pkm.toUpperCase());
			html += '<div class=pkmBoxContainer>';
			html += '			<div class=pokemonBox style="background-color: ' + color + '">';
			html += '					<div class=nameTextContainer>'
			html += '						<text>' + pkm.trim().toUpperCase() + '</text>'
			html += '					</div>';
			pkmPic = pkm.trim().toLowerCase()
			html += '					<img id=c' + pkmPic + ' src="NormalSprites/' + pkmPic + '.png" alt=c' + '' + ' onclick=showNormal("c'+ pkmPic + '")>'
				
			html += '					<text id=cs' + pkmPic + ' style="display: none">Shiny</text>' //This is just to track the image
			html += '			</div></br>' //End pokemonBox
			
			html += '<text>' + p.type1 + '</text>';
			if(p.type2.length > 2){
				html += '<text>,' + p.type2 +  '</text>';
			}
			
			html += '</div>' //end pokemon box Container
		}		
	}
		html += '</div>' //End typeSection;
	}

	html += '</div>' //end wrapper;
	html += '</body>';
	html += '</html>';
	
	return html;
}

function createAddForm(){
	var html = '';
	html += '			<div id=addPokemonFormContainer>'
	html += '				<form method=POST>'
	html += '					<select id=newPokemonSelect name=pokemonSelect>'
	html += '               		<option>Select Pokemon</option>'
	for(var i = 0; i < shinySprites.length; i++){
	html += '               		<option>' + shinySprites[i].split('.')[0] + '</option>'
	}
	html += '               	</select><br>'
	html += '					<button type=submit id=addButton name=addPokemon value=Add Pokemon>Add Pokemon</button>'
	html += "					<label for='communityDayCheckBox' class='communityDayLabel'>&nbsp;cDay Shiny</label>"
	html += "					<input type='checkbox' class='communityDayCheckbox' id='communityDayCheck' name='communityDayCheck' value='communityDayCheck'>"
	
	html += '				</form>'
	html += '			</div>'; //End head container
	return html;
}

function makePokemonBox(box,name){
	html = '';
	for(var i = 0; i < box.length; i++){
		if(box[i].name){
		var color = getPokemonColor(box[i].name.toUpperCase());
		html += '			<div class=pokemonBox style="background-color: ' + color + '">';
		html += '				<form id=removeButton name=' + box[i] + ' method=POST>'
		html += '					<div class=nameTextContainer>'
		html += '						<text>' + box[i].name.trim().toUpperCase() + '</text>'
		html += '					</div>';
		html += '					<input type=text class=hiddenInput name=pkName value="' + box[i] + '"</input>';
		var pkmPic = box[i].name.trim().toLowerCase()
		
		
		if(name == 'cody'){
			html += '					<img id=c' + pkmPic + ' src="ShinySprites/' + pkmPic + '.png" alt=c' + box[i].name + ' onclick=showNormal("c'+ pkmPic + '")>'
			html += '					<text id=cs' + pkmPic + ' style="display: none">Shiny</text>' //This is just to track the image
		}
		if(name == 'teresa'){
			html += '					<img id=t' + pkmPic + ' src="ShinySprites/' + pkmPic + '.png" alt=t' + box[i].name + ' onclick=showNormal("t'+ pkmPic + '")>'
			html += '					<text id=ts' + pkmPic + ' style="display: none">Shiny</text>' //This is just to track the image
		}
		html += '					<div id=dateText>'
		html += '						<text>'+ box[i].date.ymd() +'</text>'
		html += '					</div>'
		html += '				</form>'
		html += '			</div>' //End pokemonBox
		}
	}
	return html;
}

function createCodyViewHTML(sortBy){
	var codyInfo = fs.readFileSync('data/codyInfo.txt','utf8');
	var codyData = codyInfo.split('\n');
	for(var i = 0; i < codyData.length; i++){
		var obj = {
			"name" : codyData[i].trim().toUpperCase().split(',')[0],
			"date" : new Date(codyData[i].split(',')[1])
		}
		codyData[i] = obj;
	}
	
	if(sortBy == 'alphabet'){
		codyData.sort((a,b) => (a.name > b.name) ? 1 : -1); //Sort by date
	}
	
	if(sortBy == 'date'){
		codyData.sort((a,b) => (a.date > b.date) ? 1 : -1); //Sort by date
	}

	var html = ''
	html += '<!DOCTYPE html>'
	html += '<html>';
	html += '	<head>';
	html += '		<title>Shiny Tracker App</title>';
	html += '		<link rel=stylesheet type=text/css href=css/cssReset.css>'
	html += '		<link rel=stylesheet type=text/css href=css/stylesheet.css>'
	html += '	</head>';
	html += '	<body>';
	html += '		<div id=wrapper>'
	
	html += createNavBar();
	
	html += createAddForm();
	
	
	html += '			<div id=sortByBox>';
	if(sortBy == 'date'){
		html += '				<a href=viewCodyDate class=sortByLink style="background-color: #4d4dff;">Date Old-New</a>';
	}
	else{
		html += '				<a href=viewCodyDate class=sortByLink>Date Old-New</a>';
	}
	
	if(sortBy == 'alphabet'){
		html += '				<a href=viewCodyAlphabet class=sortByLink style="background-color: #4d4dff;">A-Z</a>';
	}
	else{
		html += '				<a href=viewCodyAlphabet class=sortByLink>A-Z</a>';
	}
	html += '			</div>'
	
	html += '			<div id=codyViewPokemon>'
	
	html += makePokemonBox(codyData,'cody');
		
	html += '			</div>'; //End codyViewPokemon
	html += '       </div>'; //End Wrapper
	html += '		<script src="scripts/scripts.js"></script>';
	html += '   </body>';
	html += '</html>';
	return html;
}

function createTeresaViewHTML(sortBy){
	var teresaInfo = fs.readFileSync('data/teresaInfo.txt','utf8');
	var teresaData = teresaInfo.split('\n');
	
	for(var i = 0; i < teresaData.length; i++){
		var obj = {
			"name" : teresaData[i].trim().toUpperCase().split(',')[0],
			"date" : new Date(teresaData[i].split(',')[1])
		}
		teresaData[i] = obj;
	}

	if(sortBy == 'alphabet'){
		teresaData.sort((a,b) => (a.name > b.name) ? 1 : -1); //Sort by date
	}
	
	if(sortBy == 'date'){
		teresaData.sort((a,b) => (a.date > b.date) ? 1 : -1); //Sort by date
	}

	var html = ''
	html += '<!DOCTYPE html>'
	html += '<html>';
	html += '	<head>';
	html += '		<title>Shiny Tracker App</title>';
	html += '		<link rel=stylesheet type=text/css href=css/cssReset.css>'
	html += '		<link rel=stylesheet type=text/css href=css/stylesheet.css>'
	html += '	</head>';
	html += '	<body>';
	html += '		<div id=wrapper>'
	
	html += createNavBar();
	
	html += createAddForm();
	
	
	html += '<div id=sortByBox>';
	if(sortBy == 'date'){
		html += '				<a href=viewTeresaDate class=sortByLink style="background-color: purple;">Date Old-New</a>';
	}
	else{
		html += '				<a href=viewTeresaDate class=sortByLink>Date Old-New</a>';
	}
	
	if(sortBy == 'alphabet'){
		html += '				<a href=viewTeresaAlphabet class=sortByLink style="background-color: purple;">A-Z</a>';
	}
	else{
		html += '				<a href=viewTeresaAlphabet class=sortByLink>A-Z</a>';
	}
	html += '			</div>'
	
	
	html += '		<div id=teresaViewPokemon>'
	
	html += makePokemonBox(teresaData,'teresa');	
	
	html += '			</div>'; //End teresaViewPokemon
	html += '       </div>'; //End Wrapper
	html += '   </body>';
	html += '		<script src="scripts/scripts.js"></script>';
	html += '</html>';
	return html;
}

function createVSHTML(){
	
	var codyInfo = fs.readFileSync('data/codyInfo.txt','utf8');
	var teresaInfo = fs.readFileSync('data/teresaInfo.txt','utf8');
	var codyData = codyInfo.split('\n');
	var teresaData = teresaInfo.split('\n');
	codyData.sort(); //Sort data into alphabetical order
	teresaData.sort();
	
	for(var i = 0; i < codyData.length; i++){
		codyData[i] = codyData[i].split(',')[0].trim().toUpperCase();
	}
	
	for(var i = 0; i < teresaData.length; i++){
		teresaData[i] = teresaData[i].split(',')[0].trim().toUpperCase();
	}

	
	var codyUniqueCount = 0;
	var teresaUniqueCount = 0;
	
	//This array should contain a list of pokemon which cody has or teresa has and there should be not dublicates
	var bothData = codyData.concat(teresaData).unique();
	bothData.sort();
	
	var html = ''
	html += '<!DOCTYPE html>'
	html += '<html>';
	html += '	<head>';
	html += '		<title>Shiny Tracker App</title>';
	html += '		<link rel=stylesheet type=text/css href=css/cssReset.css>'
	html += '		<link rel=stylesheet type=text/css href=css/stylesheet.css>'
	html += '	</head>';
	html += '	<body>';
	html += '		<div id=wrapper>'
	
	html += createNavBar();
	
	html += '<div id=vsContainer>'
	html += "<h1 style='font-size: 48px; color: white; font-family: arial;'>Cody &nbsp; &nbsp; Teresa</h1>"
	for(var i = 0; i < bothData.length; i++){
		if(bothData[i] && bothData[i].length > 1){
		var color = getPokemonColor(bothData[i].toUpperCase());
		
		html += '<div id=vsContainer>'
		
		if(codyData.includes(bothData[i])){
			html += '		<div class=pokemonBox style="background-color: ' + color + '">';
			html += '			<div class=nameTextContainer>'
			html += '			<text>' + bothData[i] + '</text>'
			html += '			</div>'; //End nameTextContainer
			html += '			<img src="ShinySprites/' + bothData[i].trim().toLowerCase() + '.png" alt=c' + bothData[i] + '>'
			html += '		</div>'; //End pokemon box
		}
		else{
			html += '		<div class=pokemonBox style="background-color: gray">';
			html += '			<div class=nameTextContainer>'
			html += '			<text>' + bothData[i] + '</text>'
			html += '			</div>'; //End nameTextContainer
			html += '			<img src="X.png" alt=c' + bothData[i] + '>'
			html += '		</div>'; //End pokemon box
		}
		
		if(teresaData.includes(bothData[i])){
			html += '		<div class=pokemonBox style="background-color: ' + color + '">';
			html += '			<div class=nameTextContainer>'
			html += '			<text>' + bothData[i] + '</text>'
			html += '			</div>'; //End nameTextContainer
			html += '			<img src="ShinySprites/' + bothData[i].trim().toLowerCase() + '.png" alt=c' + bothData[i] + '>'
			html += '		</div>'; //End pokemon box
		}
		else{
			html += '		<div class=pokemonBox style="background-color: gray">';
			html += '			<div class=nameTextContainer>'
			html += '			<text>' + bothData[i] + '</text>'
			html += '			</div>'; //End nameTextContainer
			html += '			<img src="X.png" alt=c' + bothData[i] + '>'
			html += '		</div>'; //End pokemon box
		}
		
		html += '</div><br>' //End vsContainer
		}
	}
	
	html += '       </div>'; //End wrapper
	html += '   </body>';
	html += '</html>';
	return html;
}

function createRulesHTML(){
	var html = '';
	html += '<!DOCTYPE html>'
	html += '<html>';
	html += '	<head>';
	html += '		<title>Shiny Tracker App</title>';
	html += '		<link rel=stylesheet type=text/css href=css/stylesheet.css>'
	html += '		<link rel=stylesheet type=text/css href=css/cssReset.css>'
	html += '	</head>';
	html += '	<body>';
	html += '		<div id=wrapper>'
	
	html += createNavBar();
	
	html += '		<div id=ruleText>';
	html += '			<div class=ruleContainer>'
	html += '				<text>A shiny will need to be caught for it to be counted, this makes things easier.</text><br>';
	html += "				<text class=ruleSubText>If you don't want a shiny to be counted than don't catch it!</text><br>";
	html += "			</div>";
	html += '			<div class=ruleContainer>'
	html += "				<text>Community day shinies are counted seperatly so catch as many as you want!</text><br>";
	html += "				<text class=ruleSubText>Spotlight hour pokemon are treated as normal shinies not community day shines</text><br>";
	html += '			</div>'
	html += '			<div class=ruleContainer>'
	html += '				<text>A pokemon and its evolution count as two seperate pokemon.</text><br>';
	html += '				<text class=ruleSubText>So if you have a Sneasel and a Weavile they will be counted as two different pokemon.</text>'
	html += '			</div>'
	html +=	'		</div>';
	html += '	</body>';
	html += '</html>';
	return html;
}

//Main function, handles all user request
function handleRequest(req,res){	
	if(req.method === 'GET'){
		var url = req.url//.split('?')[0]; //This has to do with canceling submit forms, it will return the url than a werid string so i have to split it
		if(url === '/server.js' || url === 'server.js'){
			res.statusCode = 404;
			res.end("File not found");
		}
		if(url === '/'){
			var html = createHomepageHTML();
			var visitDate = new Date();
			
			//I'm using the synchronus version since it shouldn't matter since this date is never read by the program
			fs.appendFile('logs/updateLog.txt',"IP: " + req.connection.remoteAddress + " visited the site on: " + visitDate + '\n', 'utf8', 
				function(err) {  
					if (err){
						throw err; 
					}
				//console.log("Someone visited site on: " + visitDate);
				console.log("IP: " + req.connection.remoteAddress + " visited on: " + visitDate.toLocaleString());
				//console.log(req.connection.remoteAddress);
			}); 
			res.end(html);
		}
		else if(url == '/viewCody'  || url == '/viewCodyAlphabet'){
			var html = createCodyViewHTML('alphabet');
			res.end(html);
		}
		else if(url == '/viewCodyDate'){
			var html = createCodyViewHTML('date');
			res.end(html);
		}
		else if(url == '/viewTeresa' || url == '/viewTeresaAlphabet'){
			var html = createTeresaViewHTML('alphabet');
			res.end(html);
		}
		else if(url == '/viewTeresaDate'){
			var html = createTeresaViewHTML('date');
			res.end(html);
		}
		else if(url == '/VS'){
			var html = createVSHTML();
			res.end(html);
		}
		else if(url == '/rules'){
			var html = createRulesHTML();
			res.end(html);
		}
		else if(url == '/pokeInfo'){
			var html = createPokemonInfoPage('abra');
			res.end(html);
		}
		else{
			serveFile(req.url.substring(1),res); //cut of / on request
		}
	}
	
	if(req.method === 'POST'){
		console.log("IP: " + req.connection.remoteAddress + " sent a POST request");
		var body = '';
		req.on('data', function(data){
			body += data;
		});
		
		req.on('end', function(){
			var post = qs.parse(body);
			var url = req.url//.split('?')[0];
			if(url == '/pokeInfo'){
				var str = '';
				var codyInfo = fs.readFileSync('data/codyInfo.txt','utf8');
					if(post.pokemonSelect != 'Select Pokemon'){
						var str = post.pokemonSelect;
					}
				var html = createPokemonInfoPage(str);
				res.end(html);
			}
			if(url == '/viewCody'){
				if(post.RM){
					//console.log(post.pkName);
					var codyInfo = fs.readFileSync('data/codyInfo.txt','utf8');
					var codyData = codyInfo.split('\n');
					for(var i = 0; i < codyData.length; i++){
						codyData[i] = codyData[i].trim();
					}
					var index = codyData.indexOf(post.pkName);
					if(index > -1){
						codyData.splice(index,1);
					}
					//console.log(codyData);
					var str = '';
					for(var i = 0; i < codyData.length; i++){
						str += codyData[i];
						if(i < codyData.length - 1){
							str += '\n';
						}
					}
					fs.writeFileSync('data/codyInfo.txt',str,'utf8');
				}
				else{ //Add
					var codyInfo = fs.readFileSync('data/codyInfo.txt','utf8');
					if(post.pokemonSelect != 'Select Pokemon'){
						var d = new Date(); 
						var str = post.pokemonSelect + ',' + d.toString();
						if(post.communityDayCheck){
							str += ',ComDay';
						}
						else{
							str += ',NCD';
						}
						str += '\n' + codyInfo;
						
						fs.writeFileSync('data/codyInfo.txt',str,'utf8');
						
						//I'm using the synchronus version since it shouldn't matter since this date is never read by the program
						fs.appendFile('logs/updateLog.txt',"Cody Got a shiny " + post.pokemonSelect + " on: " + d + '\n', 'utf8', 
							function(err) {  
								if (err){
									throw err; 
								}
								console.log("Cody Got a shiny pokemon on: " + d); 
						}); 
						
					}
				}
				var html = createCodyViewHTML();
				res.end(html);
			}
			if(url == '/viewTeresa'){
				if(post.RM){
					var teresaInfo = fs.readFileSync('data/teresaInfo.txt','utf8');
					var teresaData = teresaInfo.split('\n');
					for(var i = 0; i < teresaData.length; i++){
						teresaData[i] = teresaData[i].trim();
					}
					var index = teresaData.indexOf(post.pkName);
					if(index > -1){
						teresaData.splice(index,1);
					}
					var str = '';
					for(var i = 0; i < teresaData.length; i++){
						str += teresaData[i];
						if(i < teresaData.length - 1){
							str += '\n';
						}
					}
					fs.writeFileSync('data/teresaInfo.txt',str,'utf8');
				}
				else{ //Add
					var teresaInfo = fs.readFileSync('data/teresaInfo.txt','utf8');
					if(post.pokemonSelect != 'Select Pokemon'){
						var d = new Date();
						var str = post.pokemonSelect + ',' + d.toString();
						if(post.communityDayCheck){
							str += ',ComDay';
						}
						else{
							str += ',NCD';
						}
						str  += '\n' + teresaInfo;
						fs.writeFileSync('data/teresaInfo.txt',str,'utf8');
						
						//I'm using the synchronus version since it shouldn't matter since this date is never read by the program
						fs.appendFile('logs/updateLog.txt',"Teresa Got a shiny " + post.pokemonSelect + " on: " + d  + '\n', 'utf8', 
							function(err) {  
								if (err){
									throw err; 
								}
								console.log("Teresa Got a shiny pokemon on: " + d); 
						}); 
					}
				}
				var html = createTeresaViewHTML();
				res.end(html);
			}
		});
	}
}

//Loads files when requested
function serveFile(path,res){
	fs.readFile(path, function(err,data){
		if(err){
			res.statusCode = 404;
			res.end("File not found");
			return;
		}
		res.end(data);
	});
}

//Start server
var server = http.createServer(handleRequest);
server.listen(PORT, function(){
	console.log("Listening at port " , PORT);
});
