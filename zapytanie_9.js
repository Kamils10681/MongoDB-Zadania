db.people.update({first_name:"Antonio"},
	{"$set": {hobby: "ping-pong"}},
	{"multi": true}
)