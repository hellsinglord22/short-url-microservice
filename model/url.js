var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var urlSchema = new Schema({
	originalURL: {type: String}, 
	generatedURL: {type: String}	
});

urlSchema.methods.print = function(){
	console.log('This url entery original url: ', this.originalURL); 
	console.log('This url generated short url: ', this.generatedURL); 
};


urlSchema.methods.saveShortUrl = function(generatedShortUrl, callback){
	this.shortUrl = generatedShortUrl; 
	this.save(function(error){
		if (error) callback(error); 
		else callback(null); 
	});
}


var Url = mongoose.model('URL', urlSchema);


module.exports = Url; 