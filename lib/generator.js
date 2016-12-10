const shortid = require('shortid'); 

function _generateKey(){
	var key = ''; 
	var error = ''; 

	return new Promise(function(resolve, reject){
		key = shortid.generate(); 
		if (key == null || !shortid.isValid(key)){
			error = new ReferenceError('Generated key is not valid'); 
			reject(error); 
		} else{
			resolve(key); 	
		}
	});
} 

function generateShortURL(host){
	var error = ''; 
	var generatedShortURL = ''; 

	return new Promise(function(resolve, reject){
		if (host == null || host == ''){
			error = new ReferenceError('You must provide a host name'); 
			reject(error); 
		} else{
			_generateKey()
			.then(function(key){
				generatedShortURL = 'http://' + host + '/' + key; 	
				resolve(generatedShortURL); 
			})
			.catch(function(error){
				reject(error); 
			});
		}
	});
}

module.exports.generateShortURL = generateShortURL;