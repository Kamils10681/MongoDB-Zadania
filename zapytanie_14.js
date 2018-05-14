
printjson("Agregacja")
db.people.aggregate({ 
	$group : 
	{
		_id: "$nationality",
		avgBMI: { $avg: {$pow: [{$divide: ["$weight", "$height"]}, 2]} },
		minBMI: { $min: {$pow: [{$divide: ["$weight", "$height"]}, 2]} },
		maxBMI: { $max: {$pow: [{$divide: ["$weight", "$height"]}, 2]} }
	}
}).forEach(printjson);
			
printjson("Map-reduce")
			
var mapFunction = function() {
	var key = this.nationality;
	var value = { 
		count: 1, 
		bmi: Math.pow((this.weight/this.height), 2)
	};
    emit(key, value);
};
				   
var reduceFunction = function(key, reduceValue) {
	var avgBmi = 0.0;
	reducedVal = { count: 0, avgBMI: avgBmi, minBMI : 1, maxBMI: 0 };
	for (var i = 0; i < reduceValue.length; i++) {
		if (reduceValue[i].bmi) {
			reducedVal.avgBMI += reduceValue[i].bmi;
			reducedVal.count += reduceValue[i].count;
		}
		if (reducedVal.minBMI > reduceValue[i].bmi)
			reducedVal.minBMI = reduceValue[i].bmi;
		if (reducedVal.maxBMI < reduceValue[i].bmi)
			reducedVal.maxBMI = reduceValue[i].bmi;
	}
    return reducedVal;
};

var finalizeFunction = function (key, reducedVal) {
    reducedVal.avgBMI = (reducedVal.avgBMI/reducedVal.count);
	return reducedVal;
};
					  
db.people.mapReduce(mapFunction,
                    reduceFunction,
                    {  
						out: "map_reduce",
						finalize: finalizeFunction
					})
				   
db.map_reduce.find({}, {"_id": 1, "value.avgBMI" : 1, "value.minBMI" : 1, "value.maxBMI": 1, "value.count" : 1}).forEach(printjson)	