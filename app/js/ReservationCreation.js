function pickARoom(){
	var index = Math.round((Math.random() * 100)) % 11;
	return allRooms[index].roomNumber;
}

function pickAWebcamRoom(res){
	if(webcamRooms.length > 0){
		var pickedRoom = webcamRooms[0];
		webcamRooms.splice(0, 1);
		return pickedRoom;
	}
	else{
		res.error = "There are no webcam rooms available at this time."
		return -1;
	}
}

function pickAPhonelineRoom(res){
	if(phonelineRooms.length > 0){
		var pickedRoom = phonelineRooms[0];
		phonelineRooms.splice(0, 1);
		return pickedRoom;
	}
	else{
		res.error = "There are no phoneline rooms available at this time."
		return -1;
	}	
}

function resetPhonelineRooms(){
	var phonelineRooms = [];
	phonelineRooms.push(room3);
	phonelineRooms.push(room4);
	return phonelineRooms;
}

function resetWebcamRooms(){
	var webcamRooms = [];
	webcamRooms.push(room1);
	webcamRooms.push(room2);
	return webcamRooms;
}

function resetNonExtraRoom(){
	var nonExtraRooms = [];
	nonExtraRooms.push(room5);
	nonExtraRooms.push(room6);
	nonExtraRooms.push(room7);
	nonExtraRooms.push(room8);
	nonExtraRooms.push(room9);
	nonExtraRooms.push(room10);
	nonExtraRooms.push(room11);
	return nonExtraRooms;
}

function pickAnOpenRoom(roomsLeft){

	if(roomsLeft.length > 0){
		return roomsLeft[0];
	}
	else{
		console.log("Couldn't assign room");
		return -1;
	}
}

function pickANonExtraRoom(res){
	if(nonExtraRooms.length > 0){
		var pickedRoom = nonExtraRooms[0];
		nonExtraRooms.splice(0, 1);
		return pickedRoom;
	}
	else if(webcamRooms.length > 0){
		var pickedRoom = webcamRooms[0];
		webcamRooms.splice(0, 1);
		return pickedRoom;
	}
	else if(phonelineRooms.length > 0){
		var pickedRoom = phonelineRooms[0];
		phonelineRooms.splice(0, 1);
		return pickedRoom;
	}
	else{
		res.error = "There are no rooms available at this time.";
		return -1;
	}
}

function returnAllRooms(){
	var tempRes = [];
	tempRes.push(room1);
	tempRes.push(room2);
	tempRes.push(room3);
	tempRes.push(room4);
	tempRes.push(room5);
	tempRes.push(room6);
	tempRes.push(room7);
	tempRes.push(room8);
	tempRes.push(room9);
	tempRes.push(room10);
	tempRes.push(room11);
	return tempRes;
}

function addReservation(reservations, conflictedReservations, rejectedReservations, 
				startTime, duration, numRooms, phoneline, webcam){
	var openRooms = returnAllRooms();
	webcamRooms = resetWebcamRooms();
	phonelineRooms = resetPhonelineRooms();
	nonExtraRooms = resetNonExtraRoom();
	var resRoomNum;
	var allowRes = true;
	var rejRes = false;
	var phonelineCounter = 0;
	var webcamCounter = 0;

	for(i = 0; i < mockReservations.length; i++){
		if(startTime.toLocaleString() === mockReservations[i].date.toLocaleString()){
			
			for(a = 0; a < webcamRooms.length; a++){
				if(mockReservations[i].roomNum.roomNumber == webcamRooms[a].roomNumber){
					webcamRooms.splice(webcamRooms.indexOf(mockReservations[i].roomNum), 1);
					console.log("Found Webcam room");
				}
			}
			for(b = 0; b < phonelineRooms.length; b++){
				if(mockReservations[i].roomNum.roomNumber == phonelineRooms[b].roomNumber){
					phonelineRooms.splice(phonelineRooms.indexOf(mockReservations[i].roomNum), 1);
					console.log("Found Phoneline room");
				}
			}
			for(c = 0; c < nonExtraRooms.length; c++){
				if(mockReservations[i].roomNum.roomNumber == nonExtraRooms[c].roomNumber){
					nonExtraRooms.splice(nonExtraRooms.indexOf(mockReservations[i].roomNum), 1);
					console.log("Found Nonextra room");
				}
			}
		}
	}
	
	var res;
	for(b = 0; b < numRooms; b++){

		res = new Reservation(faculty1.username, "Active", "Multiroom", startTime, duration, null);
	
		if(phonelineCounter < phoneline){
			resRoomNum = pickAPhonelineRoom(res);
			phonelineCounter++;
		}
		else if(webcamCounter < webcam){
			resRoomNum = pickAWebcamRoom(res);
			webcamCounter++;
		}
		else{
			resRoomNum = pickANonExtraRoom(res);
		}
		
		
		if(resRoomNum === -1){
			allowRes = false;
			resRoomNum = fullRooms;
		}
		
		res.roomNum = resRoomNum;
		if(allowRes){
			reservations.push(res);
		}
		else{
			numConflicts++;
			conflictedReservations.push(res);
		}
		
		if(rejRes){
			rejectedReservations.push(res);
		}
		
		allowRes = true;
	}

}