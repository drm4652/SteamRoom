	function loadConfirmation()
	{
		document.getElementById("numRooms").innerHTML = sessionStorage.getItem("numRooms");
		document.getElementById("dates").innerHTML = sessionStorage.getItem("dates");
		document.getElementById("startDate").innerHTML = sessionStorage.getItem("startDate");
		document.getElementById("endDate").innerHTML = sessionStorage.getItem("endDate");
		document.getElementById("startTime").innerHTML = sessionStorage.getItem("startTime");
		document.getElementById("endTime").innerHTML = sessionStorage.getItem("endTime");
		
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
	  
		var numRoomsWebcam = sessionStorage.getItem("webcamRooms");
		var numRoomsPhoneline = sessionStorage.getItem("numRoomsPhoneline");
	  
		var Reservations = [];
		var reservationsForTable = [];
		var currentDay = startDate;
		console.log("Start Date: " + startDate);
		var cap = 0;
		while(cap < 500){
			
			if(dayArray.indexOf(currentDay.getDay()) !== -1){
				Reservations.push(currentDay.toString().substring(0,10));
				
				var res = new Reservations("Current User", "Active", "Multiroom", currentDay.getTime(), "X", "X");
			}
			currentDay.setDate(currentDay.getDate()+1);
			console.log(currentDay);
			if(currentDay.getTime() === endDate.getTime()){
				break;
			}
			cap++;
		}
		console.log(endDate);

		document.getElementById("ResDates").innerHTML = Reservations;
	}
	
	function displayTableFromRes(Reservations){
		var table = document.getElementById("openResTable");
		var headerRow = table.insertRow(0);

		var userCell = headerRow.insertCell(0);
		var statusCell = headerRow.insertCell(1);
		var typeCell = headerRow.insertCell(2);
		var dateCell = headerRow.insertCell(3);
		var durationCell = headerRow.insertCell(4);
		var roomNumCell = headerRow.insertCell(5);
		
		userCell.innerHTML = "User";
		statusCell.innerHTML = "Status";
		typeCell.innerHTML = "Type";
		dateCell.innerHTML = "Date";
		durationCell.innerHTML = "Duration";
		roomNumCell.innerHTML = "Room Number";
		
	}
	
	
	function goBack(){
		window.location="singlePage.html"
	}