	function loadConfirmation()
	{
		document.getElementById("numRooms").innerHTML = sessionStorage.getItem("numRooms");
		document.getElementById("dates").innerHTML = sessionStorage.getItem("dates");
		document.getElementById("startDate").innerHTML = sessionStorage.getItem("startDate");
		document.getElementById("endDate").innerHTML = sessionStorage.getItem("endDate");
		document.getElementById("startTime").innerHTML = sessionStorage.getItem("startTime");
		document.getElementById("endTime").innerHTML = sessionStorage.getItem("endTime");
		
		sessionStorage.setItem("roomBreakdown", sessionStorage.getItem("webcamRooms") + "/" + sessionStorage.getItem("numRoomsPhoneline"));
		document.getElementById("roomBreakdown").innerHTML = sessionStorage.getItem("roomBreakdown");
		
		var date1 = sessionStorage.getItem("startDate");
		var date2 = sessionStorage.getItem("endDate");
		var datesSelected = sessionStorage.getItem("dateSelected");

		findAndDisplayRes(date1, date2, datesSelected);
	}
	
	function findAndDisplayRes(date1, date2, datesSelected){
		var slashArray1 = [];
		var slashArray2 = [];
	  
		for(i = 0; i < date1.length; i++){
			if(date1[i]=='/'){
				slashArray1.push(i);
			}
		}
	  
		for(i = 0; i < date2.length; i++){
			if(date2[i]=='/'){
				slashArray2.push(i);
			}
		}
	  
		var date1day = parseInt(date1.substring(slashArray1[0]+1, slashArray1[1]));
		var date1month = parseInt(date1.substring(0,slashArray1[0])-1);
		var date1year = parseInt(date1.substring(slashArray1[1]+1, slashArray1[2]));
	  
		var date2day = parseInt(date2.substring(slashArray2[0]+1, slashArray2[1]));
		var date2month = parseInt(date2.substring(0,slashArray2[0])-1);
		var date2year = parseInt(date2.substring(slashArray2[1]+1, slashArray2[2]));
	  
		var startDate = new Date();
		startDate.setDate(date1day);
		startDate.setMonth(date1month);
		startDate.setFullYear(date1year);
		var endDate = new Date();
		endDate.setDate(date2day);
		endDate.setMonth(date2month);
		endDate.setFullYear(date2year);
	  
		var dayArrayJSON = sessionStorage.getItem("daysSelected");
		var dayArray = [];
		for(i = 0; i < dayArrayJSON.length; i++){
			if(dayArrayJSON[i] !== ','){
				dayArray.push(parseInt(dayArrayJSON[i]));
			}
		}
	  
		var numRooms = sessionStorage.getItem("numRooms");
		var numRoomsWebcam = sessionStorage.getItem("webcamRooms");
		var numRoomsPhoneline = sessionStorage.getItem("numRoomsPhoneline");
		
		
		var startTime = sessionStorage.getItem("startTime");
		if(startTime.length === 3){
			var startSuff = startTime.substring(startTime.length-2, startTime.length);
			startTime = parseInt(startTime.substring(0,1));
		}
		else{
			var startSuff = startTime.substring(startTime.length-2, startTime.length);
			startTime = parseInt(startTime.substring(0,2));
		}
		
		var endTime = sessionStorage.getItem("endTime");
		if(endTime.length === 3){
			var endSuff = endTime.substring(endTime.length-2, endTime.length);
			endTime = parseInt(endTime.substring(0,1));
		}
		else{
			var endSuff = endTime.substring(endTime.length-2, endTime.length);
			endTime = parseInt(endTime.substring(0,2));
		}
		
		var startNum = startTime;
		var endNum = endTime;
		if(startSuff == "pm"){
			if(startTime !== 12){
				startNum = startTime + 12;
			}
		}
		if(endSuff == "pm"){
			if(endTime !== 12){
				endNum = endTime + 12;
			}
		}
	  
	    var duration = endNum - startNum;
	  
		var Reservations = [];
		var reservationsForTable = [];
		var conflictedReservations = [];
		var rejectedReservations = [];
		var currentDay = startDate;

		var cap = 0;
		while(cap < 500){
			
			if(dayArray.indexOf(currentDay.getDay()) !== -1){
				currentDay.setHours(startTime);
				currentDay.setMinutes(0);
				currentDay.setSeconds(0);
				currentDay.setMilliseconds(0);
				addReservation(reservationsForTable, conflictedReservations, rejectedReservations, 
								currentDay.toLocaleString(), duration, numRooms, numRoomsPhoneline, numRoomsWebcam);

			}
			
			if(currentDay.toLocaleDateString() === endDate.toLocaleDateString()){
				break;
			}
			currentDay.setDate(currentDay.getDate()+1);
			cap++;
		}

		
		displayTableFromRes(reservationsForTable, "openResTable", numRooms);
		displayTableFromRes(rejectedReservations, "rejResTable", numRooms);
		displayConflictTableFromRes(conflictedReservations, "confResTable", numRooms);
	}
	
	function displayTableFromRes(resToTable, tableID, numRooms){
		var table = document.getElementById(tableID);
		var headerRow = table.insertRow(0);
		headerRow.setAttribute("bgcolor", "#98A0A8");	

		var userCell = headerRow.insertCell(0);
		var statusCell = headerRow.insertCell(1);
		var typeCell = headerRow.insertCell(2);
		var dateCell = headerRow.insertCell(3);
		var durationCell = headerRow.insertCell(4);
		var roomNumCell = headerRow.insertCell(5);
		var phonelineCell = headerRow.insertCell(6);
		var webcamCell = headerRow.insertCell(7);
		
		userCell.innerHTML = "<b>User</b>";
		statusCell.innerHTML = "<b>Status</b>";
		typeCell.innerHTML = "<b>Type</b>";
		dateCell.innerHTML = "<b>Date</b>";
		durationCell.innerHTML = "<b>Duration</b>";
		roomNumCell.innerHTML = "<b>Room Number</b>";
		phonelineCell.innerHTML = "<b>Phoneline</b>";
		webcamCell.innerHTML = "<b>Webcam</b>";
		
		var rowCounter = 0;
		var colorFlip = true;
		for(i = 1; i <= resToTable.length; i++){
			var newRow = table.insertRow(i);
			
			if(rowCounter <= numRooms - 1){
				if(colorFlip){
					newRow.setAttribute("bgcolor", "#c8d1d6");	
				}
				else{
					newRow.setAttribute("bgcolor", "#fafafa");	
				}
				rowCounter++;
			}
			if(rowCounter == numRooms){
				colorFlip = !colorFlip;
				rowCounter = 0;
			}
			
			var userCell = newRow.insertCell(0);
			var statusCell = newRow.insertCell(1);
			var typeCell = newRow.insertCell(2);
			var dateCell = newRow.insertCell(3);
			var durationCell = newRow.insertCell(4);
			var roomNumCell = newRow.insertCell(5);
			var phonelineCell = newRow.insertCell(6);
			var webcamCell = newRow.insertCell(7);
		
			userCell.innerHTML = resToTable[i-1].user;
			statusCell.innerHTML = resToTable[i-1].status;
			typeCell.innerHTML = resToTable[i-1].type;
			dateCell.innerHTML = resToTable[i-1].date;
			durationCell.innerHTML = resToTable[i-1].duration;
			roomNumCell.innerHTML = resToTable[i-1].roomNum.roomNumber;
			phonelineCell.innerHTML = resToTable[i-1].roomNum.webcam;
			webcamCell.innerHTML = resToTable[i-1].roomNum.phoneLine;
		
		}
	}

	function displayConflictTableFromRes(resToTable, tableID, numRooms){
		var table = document.getElementById(tableID);
		var headerRow = table.insertRow(0);
		headerRow.setAttribute("bgcolor", "#98A0A8");	

		var userCell = headerRow.insertCell(0);
		var statusCell = headerRow.insertCell(1);
		var typeCell = headerRow.insertCell(2);
		var dateCell = headerRow.insertCell(3);
		var durationCell = headerRow.insertCell(4);
		var roomNumCell = headerRow.insertCell(5);
		var phonelineCell = headerRow.insertCell(6);
		var webcamCell = headerRow.insertCell(7);
		
		userCell.innerHTML = "<b>User</b>";
		statusCell.innerHTML = "<b>Status</b>";
		typeCell.innerHTML = "<b>Type</b>";
		dateCell.innerHTML = "<b>Date</b>";
		durationCell.innerHTML = "<b>Duration</b>";
		roomNumCell.innerHTML = "<b>Room Number</b>";
		phonelineCell.innerHTML = "<b>Phoneline</b>";
		webcamCell.innerHTML = "<b>Webcam</b>";
		
		
		for(i = 1; i <= resToTable.length*2; i++){
			if(i % 2 == 1){
				var newRow = table.insertRow(i);
				
				var userCell = newRow.insertCell(0);
				var statusCell = newRow.insertCell(1);
				var typeCell = newRow.insertCell(2);
				var dateCell = newRow.insertCell(3);
				var durationCell = newRow.insertCell(4);
				var roomNumCell = newRow.insertCell(5);
				var phonelineCell = newRow.insertCell(6);
				var webcamCell = newRow.insertCell(7);

				userCell.innerHTML = resToTable[Math.ceil((i/2)-1)].user;
				statusCell.innerHTML = resToTable[Math.ceil((i/2)-1)].status;
				typeCell.innerHTML = resToTable[Math.ceil((i/2)-1)].type;
				dateCell.innerHTML = resToTable[Math.ceil((i/2)-1)].date;
				durationCell.innerHTML = resToTable[Math.ceil((i/2)-1)].duration;
				roomNumCell.innerHTML = resToTable[Math.ceil((i/2)-1)].roomNum.roomNumber;
				phonelineCell.innerHTML = resToTable[Math.ceil((i/2)-1)].roomNum.webcam;
				webcamCell.innerHTML = resToTable[Math.ceil((i/2)-1)].roomNum.phoneLine;
			}
			else{
				var errorRow = table.insertRow(i);
				errorRow.setAttribute("bgcolor", "#ffc8c8");
				
				var errorCell = errorRow.insertCell(0);
				errorCell.colSpan = 8;
				
				errorCell.innerHTML = resToTable[(i/2)-1].error;
			}
		}
		
	}
	
	
	function goBack(){
		window.location="singlePage.html"
	}