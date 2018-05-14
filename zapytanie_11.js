printjson("Agregacja")
db.people.aggregate({ 
	$group : {
		_id: "$sex",
		avgHeight: { $avg: "$height" },
		avgWeight: { $avg: "$weight" }
	}
}).pretty();

printjson("Map-reduce")

var mapFunction = function(){
	var key = this.sex;
	var values = {	sex: this.sex,
					weight: this.weight,
					height: this.height,
					count:1
				};
	emit(key, values);
};

var reduceFunction = function(key, values){
	var reduceObject = {
		sex: key,
		weight: 0,
		height: 0,
		count: 0
	};
	
	values.forEach(function(value){
		reduceObject.count += value.count;
		reduceObject.weight += value.weight;
		reduceObject.height += value.height;
	});
	
	return reduceObject;
};

var finalizeFunction = function(key, reduceValue){
	reduceValue.avgWeight = reduceValue.weight/reduceValue.count;
	reduceValue.avgHeight = reduceValue.height/reduceValue.count;
	
	return reduceValue;
};



db.people.mapReduce(mapFunction,
reduceFunction,
{
	out: "AvgPeopleList",
	finalize: finalizeFunction
});

db.AvgPeopleList.find({}, {"value.avgWeight":1, "value.avgHeight":1}).pretty();
