'use strict';

let express            = require('express');
let app	    	       = express();  //defining our app using express
let bodyParser 	       = require('body-parser');
let Bear	       = require('./models/bear.js');

//configure app to get data from POST or URL
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

let mongoose		= require('mongoose');
mongoose.connect('mongodb://localhost/noderest');


const PORT = process.env.PORT || 8080;

//routes for our API
var router = express.Router();

//middleware to use for all requests
router.use(function(req,res,next){

	console.log('Something is happening');
	next();
});

router.get('/',function(req,res){
	res.json({message:'Welcome to our kickass app'});
});

//routes that end in /bears

router.route('/bears').post(function(req,res){
	
	let bear = new Bear();
	bear.name = req.body.name;

	bear.save((err)=>{
		
		if(err)
			throw err;

		res.json({message:'Bear created'});
	});
	
	}).get(function(req,res){
		
		Bear.find(function(err,bears){
			if(err)
				throw err;

			res.json(bears);
		});
	
});


//routes that end in /bears/:bear_id

router.route('/bears/:bear_id').get(function(req,res){
	
		Bear.findById(req.params.bear_id,function(err,bear){
		
			if(err)
				throw err;
		
			res.json(bear);
		});
	
	}).put(function(req,res){
		
		Bear.findById(req.params.bear_id,function(err,bear){			
			if(err)
				throw err;
			
			bear.name = req.body.name;


			bear.save((err)=>{

				if(err)
					throw err;

				res.json({message:'Bear updated'});
			});
		});	
	}).delete(function(req,res){
		
		Bear.remove({_id:req.params.bear_id},function(err,bear){

			if(err)
				throw err;

			res.json({message:'Successfully delete'});
	});
});

app.use('/api',router);


//start server
app.listen(PORT);

console.log('Server is started at port '+PORT);
