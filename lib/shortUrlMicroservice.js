const validator = require('validator'); 
const generator = require('./generator');
const Url = require('../model/url');

const default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: true,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
};

module.exports = function(request, response, next) {
	request.haveValidURLParams = function() {
		const params = request.params; 
		return validator.isURL(params[0], default_url_options);
	}

	response.sendGeneratedShortURL = function() {
   		var host = request.host; 
		generator.generateShortURL(host)
		.then(function(generatedShortURL){
			let urlEnteryObject = {
				originalURL: request.params[0], 
				generatedURL: generatedShortURL	
			}; 
			let url = new Url(urlEnteryObject); 
			url
			.save((error)=>{
				if (error) throw error; 
				else console.log('everything is saved');
			});
			response.send(urlEnteryObject);
		})
		.catch(function(error){
			throw error; 
		}); 
	}


	response.redirectToOriginalDomain = function() {
		const path = request.params[0];
		const host = request.host;  
		const protocal = 'http://'; 
		const generatedURL = protocal + host + '/' + path; 
		
		Url.findOne({
			generatedURL	
		}, 
		(error, result)=>{
			if (error) throw error; 
			const { originalURL } = result; 
			response.redirect(originalURL);
		});
	}

	next(); 
}