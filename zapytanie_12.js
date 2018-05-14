printjson("Agregacja")

db.people.aggregate([
	{$unwind : "$credit"},
		{$group : {
		_id: "$credit.currency",
		totalAmount: {$sum: "$credit.balance"}
		}}
]).forEach(printjson);

	
printjson("Map-reduce")
	
var mapFunction = function() {
	this.credit.forEach(function (credit)
	{
		emit(credit.currency, credit.balance);
	});
};
				   
var reduceFunction = function(currency, balance) {
    return Array.sum(balance);
};

					  
db.people.mapReduce(
                     mapFunction,
                     reduceFunction,
                     {  
						out: "map_reduce_balance"
					 }
                   )
				   
db.map_reduce_balance.find().forEach(printjson)