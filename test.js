const generator = require('./lib/generator'); 
const express = require('express'); 
const app = express(); 
const microService = require('./lib/shortUrlMicroservice'); 
const mongoose = require('mongoose'); 




console.log('listening on port 3000');
