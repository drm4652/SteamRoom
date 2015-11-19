function pickARoom(){
	var index = Math.round((Math.random() * 100)) % 11;
	return allRooms[index].roomNumber;
}

function pickAWebcamRoom(){
	if(true){
		
	}
	else{
		return -1;
	}
}

function pickAPhonelineRoom(){
	if(true){
		
	}
	else{
		return -1;
	}	
}

function pickAnOpenRoom(resTime){
	var openRooms = allRooms;

	console.log("Mock Res Num: " + mockReservations.length);
	for(i = 0; i < mockReservations.length; i++){
		if(resTime.toLocaleString() === mockReservations[i].date.toLocaleString()){
			openRooms.splice(0, openRooms.indexOf(mockReservations[i].roomNum));
		}
	}
	console.log("Open Res Num: " + openRooms.length);
	
	if(openRooms.length > 0){
		var index = Math.round((Math.random() * 100)) % openRooms.length;
		return openRooms[index];
	}
	
	else{
		console.log("Couldn't assign room");
		return -1;
	}

}

function addReservation(reservations, conflictedReservations, rejectedReservations, startTime, duration, 
						roomType){
	
	var resRoomNum;
	var allowRes = true;
	var rejRes = false;
	
	if(roomType == 0){
		resRoomNum = pickAnOpenRoom(startTime);
		if(resRoomNum === -1){
			rejRes = true;
		}
	}
	else if(roomType == 1){
		resRoomNum = new Room(1560, false, false);
	}
	else if(roomType == 2){
		
	}
	
	for(i = 0; i < mockReservations.length; i++){
		/*
				if(faculty1.pClass.priority >= mockReservations[i].user.pClass.priority){
					allowRes = false;
				}
				else{
					rejRes = true;
				}
		*/
	}
	
	
	if(allowRes){
		var res = new Reservation(faculty1.username, "Active", "Multiroom", startTime, duration, resRoomNum);
		reservations.push(res);
	}
	else{
		var res = new Reservation(faculty1.username, "Active", "Multiroom", startTime, duration, resRoomNum);
		conflictedReservations.push(res);
	}
	
	if(rejRes){
		var res = new Reservation(faculty1.username, "Active", "Multiroom", startTime, duration, resRoomNum);
		rejectedReservations.push(res);
	}
}