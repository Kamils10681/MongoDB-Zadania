db.people.find().forEach(function(data) {
    db.people.update({
        "_id": data._id,
        "weight": data.weight,
		"height": data.height
    }, {
        "$set": {
            "weight": parseFloat(data.weight),
			"height": parseFloat(data.height),
			"credit.0.balance": parseFloat(data.credit[0].balance),
        }
    },
			{
			upsert: false
		});
} );

db.people.find( {$where: "this.credit.length >= 2"}).forEach(function(data) {
    db.people.update({
        "_id": data._id,
        "weight": data.weight,
		"height": data.height
    }, {
        "$set": {
            "weight": parseFloat(data.weight),
			"height": parseFloat(data.height),
			"credit.1.balance": parseFloat(data.credit[1].balance),
        }
    },
			{
			upsert: false
		});
} );


db.people.find( {$where: "this.credit.length >= 3"}).forEach(function(data) {
    db.people.update({
        "_id": data._id,
        "weight": data.weight,
		"height": data.height
    }, {
        "$set": {
            "weight": parseFloat(data.weight),
			"height": parseFloat(data.height),
			"credit.2.balance": parseFloat(data.credit[2].balance),
        }
    },
			{
			upsert: false
		});
} );

db.people.find( {$where: "this.credit.length >= 4"}).forEach(function(data) {
    db.people.update({
        "_id": data._id,
        "weight": data.weight,
		"height": data.height
    }, {
        "$set": {
            "weight": parseFloat(data.weight),
			"height": parseFloat(data.height),
			"credit.3.balance": parseFloat(data.credit[3].balance),
        }
    },
			{
			upsert: false
		});
} );

db.people.find( {$where: "this.credit.length >= 5"}).forEach(function(data) {
    db.people.update({
        "_id": data._id,
        "weight": data.weight,
		"height": data.height
    }, {
        "$set": {
            "weight": parseFloat(data.weight),
			"height": parseFloat(data.height),
			"credit.4.balance": parseFloat(data.credit[4].balance),
        }
    },
			{
			upsert: false
		});
} );