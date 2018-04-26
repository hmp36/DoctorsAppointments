const mongoose = require('mongoose');
const Bucketlist = mongoose.model('Bucketlist');
const moment = require('moment');

module.exports = {
	getAll: function (req, res) {
		BucketList.find({}, function (err, bucketlists) {
			if (err) {
				return res.status(400).json(err)
			}
			else {
				return res.json(bucketlists)
			}
		})
	},
	delete: function (req, res) {
		BucketList.findOneAndRemove({ '_id': req.params.id }, function (err, response) {
			if (err) {
				return res.status(402).json(err)
			}
			else {
				return res.json(response)
			}
		})
	},
	add: function (req, res) {
		BucketList.find({ 'date': req.body.date }, function (err, response) {
			if (err) {
				return res.status(402).json(err)
			}
			else if (response.length > 2) {
				return res.status(403).json('Doctor already has three bucketlists this day. Please select a different day.')
			}
			else {
				BucketList.find({ '_userID': req.body._userID, 'date': req.body.date }, function (err, response) {
					if (err) {
						return res.status(402).json(err)
					}
					else if (response.length > 0) {
						return res.status(403).json('You already have an bucketlist scheduled for this day. Please select a different day.')
					}
					else {
						BucketListt.find({ 'date': req.body.date, 'time': { $gt: req.body.time - 20, $lt: req.body.time + 20 } }, function (err, response) {
							if (err) {
								return res.status(402).json(err)
							}
							else if (response.length > 0) {
								return res.status(403).json('This bucketlist time is unavailable. bucketlists must be scheduled at least 20 minutes apart. Please choose a different time.')
							}
							else {
								let bucketlist = new BucketList(req.body);
								bucketlist.save(err => {
									if (err) {
										console.log(err);
										return res.status(402).json(err);
									}
									else {
										console.log(bucketlist);
										return res.json(bucketlist)
									}
								})
							}

						})
					}
				})
			}
		})
	},
}