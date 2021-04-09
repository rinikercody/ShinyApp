var fs = require('fs');

var rawData = fs.readFileSync('pokemon.csv','utf8');
var data = rawData.split('\n');
var outputData = [];
fs.writeFileSync('pokemonTypes.json','');
for(var i = 1; i < data.length; i++){
	//console.log(data[i]);
	var arr = data[i].split(',');
	outputData[arr[1]] = arr[2];
	fs.appendFileSync('pokemonTypes.json',arr[1] + ',' + arr[2] + '\n');
	//fs.appendFileSync('pokemonTwoTypes.json',arr[1] + ',' + arr[2] + ',' + arr[3] + '\n');
}
//console.log(outputData['Bagon']);
console.log(outputData);
