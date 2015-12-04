
var dateSelected;
dateSelected = [false,false,false,false,false,false,false];
var numDateSelected = 0;
var numRooms = 0;

function dateClick(number) {
    var x = document.getElementById("dateTable").getElementsByTagName("td");
	
	if(dateSelected[number] === false){
		x[number].style.backgroundColor = "#a7cce5";
		dateSelected[number] = true;
		numDateSelected++;
	}
	else{
	    x[number].style.backgroundColor = "#B2B2B2";
		dateSelected[number] = false;
		numDateSelected--;
	}
}


function validateForm(){

	document.getElementById("error1").innerHTML = "";
    document.getElementById("error2").innerHTML = "";
	document.getElementById("error3").innerHTML = "";
	document.getElementById("error4").innerHTML = "";
	document.getElementById("error5").innerHTML = "";
	document.getElementById("error6").innerHTML = "";
	document.getElementById("error7").innerHTML = "";
	
	numRooms = parseInt(document.getElementById("numRooms").value);
	if(numRooms === ""){
		document.getElementById("error1").innerHTML = "The numbers of rooms can not be empty<br>";
	}
	else if(numRooms >= 12 || numRooms <= 0){
	    document.getElementById("error1").innerHTML = "The numbers of rooms must be greater than 0 but less 12<br>";
	}
	else if(isNaN(numRooms)){
		document.getElementById("error1").innerHTML = "The numbers of rooms is not a number<br>";
	}
	
	
	var startDate = document.getElementById("startDate");
	var startDateValue = startDate.value;
	var endDate = document.getElementById("endDate");
	var endDateValue = endDate.value;
	document.getElementById("error3").innerHTML = checkDate(startDate);
	document.getElementById("error3").innerHTML += checkDate(endDate);
	if(!checkChronological(startDateValue, endDateValue)){
		document.getElementById("error3").innerHTML = "Start Date must be before End Date<br>";
	}
	if(startDateValue !== ""){
		document.getElementById("error3").innerHTML += checkPast(startDateValue);
	}
	
	var startTime = "";
	var endTime = "";
		
	startTime = document.getElementById("startTime").value;
	endTime = document.getElementById("endTime").value;
	startHalf = startTime.substring(startTime.length-2, startTime.length);
	startNum = startTime.substring(0, startTime.length-2);
	endHalf = endTime.substring(endTime.length-2, endTime.length);
	endNum = endTime.substring(0, endTime.length-2);
	
	startNum = parseInt(startNum);
	endNum = parseInt(endNum);
	if(startHalf === "pm" && startNum != 12){
		startNum += 12;
		console.log(startNum);
	}
	if(endHalf === "pm" && endNum != 12){
		endNum += 12;
		console.log(endNum);
	}
	
	if(startNum >= endNum){
		document.getElementById("error4").innerHTML = "Start time must be before End time<br>";
	}
	
	if(numDateSelected === 0){
		document.getElementById("error5").innerHTML = "Atleast one day should be selected<br>";
	}
	
	var numRoomsWebcam = parseInt(document.getElementById("numRoomsWebcam").value);
	var numRoomsPhoneline = parseInt(document.getElementById("numRoomsPhoneline").value);
	
	if(numRoomsWebcam + numRoomsPhoneline > numRooms){
		document.getElementById("error7").innerHTML = "Can not request more modified rooms than total rooms requested.";
	}
	
	if(document.getElementById("error1").innerHTML == "" &&
	   document.getElementById("error2").innerHTML == "" &&
	   document.getElementById("error3").innerHTML == "" &&
	   document.getElementById("error4").innerHTML == "" &&
	   document.getElementById("error5").innerHTML == "" &&
	   document.getElementById("error6").innerHTML == "" &&
	   document.getElementById("error7").innerHTML == ""	){
		localStorage.setItem("numRooms", numRooms);
		
		var days = "";
		var array = [];
		for(i = 0; i < dateSelected.length;i++){
			if(dateSelected[i]){
				array.push(i);
				if(i === 0){
					days += "Sunday<br>";
				}
				if(i === 1){
					days += "Monday<br>";
				}
				if(i === 2){
					days += "Tuesday<br>";
				}
				if(i === 3){
					days += "Wednesday<br>";
				}
				if(i === 4){
					days += "Thursday<br>";
				}
				if(i === 5){
					days += "Friday<br>";
				}
				if(i === 6){
					days += "Saturday<br>";
				}
			}
		}
		localStorage.setItem("dates", days);
		localStorage.setItem("startDate", startDateValue);
		localStorage.setItem("endDate", endDateValue);
		

		var stringArray = JSON.stringify(array);
		localStorage.setItem("daysSelected", array);

		localStorage.setItem("startTime", startTime);
		localStorage.setItem("endTime", endTime);
		
		localStorage.setItem("webcamRooms", numRoomsWebcam);
		localStorage.setItem("numRoomsPhoneline", numRoomsPhoneline);
		
		window.location="multiroomFinal.html";
	}
	
}

 function checkDate(field)
  {
    var allowBlank = false;
    var minYear = 2015;

    var errorMsg = "";
    var name = field.id;
    // regular expression to match required date format
    re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

	
	
    if(field.value != '') {
      if(regs = field.value.match(re)) {
        if(regs[2] < 1 || regs[2] > 31) {
          errorMsg = name + ": Invalid value for day: " + regs[2] + "<br>";
        } else if(regs[1] < 1 || regs[1] > 12) {
          errorMsg = name + ": Invalid value for month: " + regs[1] + "<br>";
        } else if(regs[3] < minYear) {
          errorMsg = name + ": Invalid value for year: " + regs[3] + ". Can not be in the past<br>";
        } else if(regs[2] == 29 && regs[1] == 2 && regs[3] % 4 != 0){
		  console.log("omg invalid leap year");
		  errorMsg = name + ": Invalid leap year<br>";
		} else if(regs[2] == 31 && (regs[1] == 2 || regs[1] == 4 || regs[1] == 9 || regs[1] == 11)){
		  errorMsg = name + ": Invalid day for month<br>";
		} else if(regs[2] == 30 && regs[1] == 2){
		  errorMsg = name + ": Invalid day for month<br>";
		}
      } else {
        errorMsg = name + ": Invalid date format: " + field.value + "<br>";
      }
    } else if(!allowBlank) {
      errorMsg = name + ": Empty date not allowed!<br>";
    }

	return errorMsg;
  }

  function checkChronological(date1, date2){
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
	  var date1month = parseInt(date1.substring(0,slashArray1[0]));
	  var date1year = parseInt(date1.substring(slashArray1[1]+1, slashArray1[2]));
	  
	  var date2day = parseInt(date2.substring(slashArray2[0]+1, slashArray2[1]));
	  var date2month = parseInt(date2.substring(0,slashArray2[0]));
	  var date2year = parseInt(date2.substring(slashArray2[1]+1, slashArray2[2]));
	  
	  if(date1year > date2year){
		  return false;
	  }
	  else if(date1year === date2year){
		  if(date1month > date2month){
			  return false;  
		  }
		  else if(date1month === date2month){
			  if(date1day > date2day){
				  return false;
			  }
		  }
	  }
	  
	  return true;
  }
  
  function checkPast(date1){ 
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth()+1;
	var year = d.getFullYear();
		
	var slashArray1 = [];
	  
	for(i = 0; i < date1.length; i++){
		if(date1[i]=='/'){
			slashArray1.push(i);
		}
	}

	var date1day = parseInt(date1.substring(slashArray1[0]+1, slashArray1[1]));
	var date1month = parseInt(date1.substring(0,slashArray1[0]));
	var date1year = parseInt(date1.substring(slashArray1[1]+1, slashArray1[2]));
			
	console.log("Current Date: " + day + ", Start Date: " + date1day);
	console.log("Current Month: " + month + ", Start Month: " + date1month);
	console.log("Current Year: " + year + ", Start Date: " + date1year);
		
	
	if(date1year < year){
		return "Date can not be in the past(year)";
	}
	else if(date1year === year){
		if(date1month < month){
			return "Date can not be in the past(month)";
		}
		else if(date1month === month){
			if(date1day < day){
				return "Date can not be in the past(day)";
			}
		}
	}

	return "";
  }