const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const Spot = require('../models/spots.js')

//ROUTE TO MY SPOTS INDEX

router.get('/', async (req,res) => {

	try {

		const foundUser = await User.findOne({'username': req.session.username})
		const spots = foundUser.spots

		res.render('spots/index.ejs', {
			spots: spots
		})

	} catch (err) {

		res.send(err)
	}


});

//ROUTE TO GET USERS 

router.get('/new', async (req, res) => {

	//get users

	try {
		const foundUser = await User.findOne({username: req.session.username})
		res.render('spots/new.ejs',{
			message: req.session.message
		})

	} catch (err) {
		res.send(err)
	}
})

//ROUTE TO ADD SPOT


router.post('/', async (req, res) => {
    try {
        
        const foundUser = await User.findOne({'username': req.session.username})
        const addedSpot = await Spot.create(req.body);
        foundUser.spots.push(addedSpot);
        foundUser.save((err, data) => {
            res.redirect ('/myspots')
        })
    } catch (err) {
        res.send(err)
    }   
});

//ROUTE TO SHOW PAGE

router.get('/:id', async (req, res) => {
		
	try {

		const foundSpot = await Spot.findById(req.params.id)
		const foundUser = await User.findOne({'spots._id': req.params.id})
		
		res.render('spots/show.ejs', {
			spot: foundSpot, 
			user: foundUser 
		})

	} catch (err) {
		res.send(err)
	}
})



// EDIT PAGE 
router.get('/:id/edit', async (req, res) => {
    try {
        const foundSpot = await Spot.findById(req.params.id);
        const foundSpotUser = await User.findOne({'spots._id': req.params.id});
        res.render('spots/edit.ejs', {
            spot: foundSpot,
            userSpot: foundSpotUser
        })
    } catch(err) {
        res.send(err)
    }
})

//POST ROUTE

router.put('/:id', async (req, res, next) => {
	try {
		// get user from session
		const foundUser = await User.findOne({'username': req.session.username})

		// get spot from spots collection matching :id
		const updatedSpot = await Spot.findByIdAndUpdate(req.params.id, req.body, {new: true});

		foundUser.spots.id(req.params.id).spotname = req.body.spotname		
		// foundUser.spots.id(req.params.id).remove();
		// foundUser.spots.push(updatedSpot);
		foundUser.save((err, data) => {
			res.redirect('/myspots/' + req.params.id)
			
		});

		// res.send(updatedSpot)
		// res.redirect('/myspots')

	} catch (err) {
		next(err);
	}
})


//ROUTE TO LOG OUT
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err) {
			console.log("That didn't work. Session still running. ", err)
		} else {
			console.log("Logout Succesful. Session Destroyed")
			res.redirect('/')
		}
	})	
})


//ROUTE TO DELETE PAGE

router.delete('/:id', async(req, res)  => {
    try{
    const deletedSpot = await Spot.findByIdAndRemove(req.params.id);
    const foundUser = await User.findOne({'spots._id': req.params.id});
        foundUser.spots.id(req.params.id).remove();
        foundUser.save((err, data) => {
            res.redirect('/myspots');
        });
    } catch(err) {
        res.send(err)
    }
})



module.exports = router;

