printjson("Agregacja")
db.people.aggregate({ 
	$group: {
				"_id": "$job"
			}
}).forEach(printjson);

printjson("Map-reduce")

var mapFunction = function() {
	emit(this.job, this.job);
};
				   
var reduceFunction = function(job, job) {
	
};

					  
db.people.mapReduce(
                     mapFunction,
                     reduceFunction,
                     {  
						out: "map_reduce_job"
					 }
                   )
				   
db.map_reduce_job.find({},{"_id": 1}).forEach(printjson)