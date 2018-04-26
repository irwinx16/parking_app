router.get('/',  (req,res) => {

	// try {

		// queryForStuff is similar to a promise becauseyou can chain .then onto it
		const queryForStuff = User.findOne({'username': req.session.username})

		// this is a Mongoose Query object
		console.log(queryForStuff)

		// this is a promise
		const myPromise = queryForStuff.exec()

		console.log("here is the promise: ----------------", myPromise)

		myPromise.then(function(data) {
			console.log("data", data); 
			res.render('spots/index.ejs', {
				spots: data.spots
			})
		}).catch(err=>{console.log("err", err); res.send('error', err) })
		// const spots = foundUser.spots

// 
	// } catch (err) {

		// res.send(err)
	// }

});