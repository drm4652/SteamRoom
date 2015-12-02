function pickARoom(){
	var index = Math.round((Math.random() * 100)) % 11;
	return allRooms[index].roomNumber;
}

function pickAWebcamRoom(){
	if(webcamRooms.length > 0){
		var pickedRoom = webcamRooms[0];
		webcamRooms.splice(0, 1);
		return pickedRoom;
	}
	else{
		return -1;
	}
}

function pickAPhonelineRoom(){
	if(phonelineRooms.length > 0){
		var pickedRoom = phonelineRooms[0];
		phonelineRooms.splice(0, 1);
		return pickedRoom;
	}
	else{
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

function pickANonExtraRoom(){
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
		console.log("Couldn't assign room");
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
	
	console.log(webcamRooms.length);
	console.log(phonelineRooms.length);
	console.log(nonExtraRooms.length);

	for(i = 0; i < mockReservations.length; i++){
		if(startTime.toLocaleString() === mockReservations[i].date.toLocaleString()){
			if(webcamRooms.indexOf(mockReservations[i].roomNum) == -1){
				console.log("webcam");
				webcamRooms.splice(webcamRooms.indexOf(mockReservations[i].roomNum), 1);
			}
			if(phonelineRooms.indexOf(mockReservations[i].roomNum) == -1){
				console.log("phoneline");
				phonelineRooms.splice(phonelineRooms.indexOf(mockReservations[i].roomNum), 1);
			}
			if(nonExtraRooms.indexOf(mockReservations[i].roomNum) == -1){
				console.log("non extra");
				nonExtraRooms.splice(nonExtraRooms.indexOf(mockReservations[i].roomNum), 1);
			}
		}
	}
	
	console.log(webcamRooms.length);
	console.log(phonelineRooms.length);
	console.log(nonExtraRooms.length);
	
	for(b = 0; b < numRooms; b++){

		if(phonelineCounter < phoneline){
			resRoomNum = pickAPhonelineRoom();
			phonelineCounter++;
		}
		else if(webcamCounter < webcam){
			resRoomNum = pickAWebcamRoom();
			webcamCounter++;
		}
		else{
			resRoomNum = pickANonExtraRoom();
		}
		
		
		if(resRoomNum === -1){
			allowRes = false;
			resRoomNum = fullRooms;
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
		
		allowRes = true;
	}

}