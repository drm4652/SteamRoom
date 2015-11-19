	var user1 = new User("Dan", "Moody", "drm4652");
	document.getElementById("user").innerHTML = user1.username;
	var room1 = new Room(1, false, false);
	var res1 = new Reservation(user1, room1, "October 10");
	var res2 = new Reservation(user1, room1, "October 11");
	var reservations = [res1, res2];
	var output = "";
	
	for(i = 0; i < reservations.length;i++){
		output += "Thing";
	}
	document.getElementById("result").innerHTML = output;