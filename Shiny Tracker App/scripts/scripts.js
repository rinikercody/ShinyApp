var canvas = document.getElementById('main-canvas');
var ctx = canvas.getContext('2d');

canvas.width = 100;
canvas.height = 100;
ctx.fillStyle = 'red';
ctx.fillRect(0,0,100,100);


function validate(form) {
		//I want to return the name of the of the pokemon in the message to but i need to figure that out
		return confirm('Are you sure you want to remove ' + form.name + '?');
}

function showExtraStats(person){
		if(person == 'cody'){
			var stats = document.getElementById('codyExtraStats');
			var extraArrow = document.getElementById('codyExtraArrow');
			
			if(stats.style.display == 'none'){
				stats.style.display = 'inline';
				extraArrow.innerHTML = 'touch for less stats';
			}
			else{
				stats.style.display = 'none';
				extraArrow.innerHTML = 'touch for more stats';
			}
		}
		
		if(person == 'teresa'){
			var stats = document.getElementById('teresaExtraStats');
			var extraArrow = document.getElementById('teresaExtraArrow');
			
			if(stats.style.display == 'none'){
				stats.style.display = 'inline';
				extraArrow.innerHTML = 'touch for less stats';
			}
			else{
				stats.style.display = 'none';
				extraArrow.innerHTML = 'touch for more stats';
			}
		}
}

function showNormal(pkm){
	if(pkm.charAt(0) == 'c'){
		var pic = document.getElementById(pkm);
		pkm = pkm.substring(1); //Remove c from pkm
		
		var shinyCheck = document.getElementById('cs' + pkm);
		if(shinyCheck.innerHTML == 'Shiny'){
			shinyCheck.innerHTML = 'Normal';
			pic.src = 'NormalSprites/' + pkm + '.png';
		}
		else{
			shinyCheck.innerHTML = 'Shiny';
			pic.src = 'ShinySprites/' + pkm + '.png';
		}
	}
	else{
		var pic = document.getElementById(pkm);
		pkm = pkm.substring(1); //Remove c from pkm
		
		var shinyCheck = document.getElementById('ts' + pkm);
		if(shinyCheck.innerHTML == 'Shiny'){
			shinyCheck.innerHTML = 'Normal';
			pic.src = 'NormalSprites/' + pkm + '.png';
		}
		else{
			shinyCheck.innerHTML = 'Shiny';
			pic.src = 'ShinySprites/' + pkm + '.png';
		}
	}
	

	
}