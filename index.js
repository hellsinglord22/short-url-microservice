const mongoose = require('mongoose'); 
const Url = require('./model/url'); 
const express = require('express'); 
const app = express(); 
const shortURLGenerator = require('./lib/shortUrlMicroservice'); 

mongoose.connect('mongodb://localhost/MicroService');
app
	.use(shortURLGenerator) 
	.use(express.static('./public'))
	.get('/new/:originalURL(*)', (request, response)=>{
		if(request.haveValidURLParams()){
			response.sendGeneratedShortURL(); 	
		} else {
			const error = {
				error: "Wrong url format, make sure you have a valid protocol and real site."
			};
			response.send(error); 
		}
	})
	.get('/:generatedURL(*)', (request, response)=>{
		response.redirectToOriginalDomain(); 
	});


app.listen(3000); 
console.log('Listening on Port 3000 ...'); 
