
var dateSelected;
dateSelected = [false,false,false,false,false,false,false];
var numDateSelected = 0;
timeSelected = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
var numTimeSelected = 0;
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

function timeClick(number) {

    var x = document.getElementById("timeTable").getElementsByTagName("td");
	
	if(timeSelected[number] === false && numTimeSelected < 2){
		x[number].style.backgroundColor = "#a7cce5";
		timeSelected[number] = true;
		numTimeSelected++;
	}
	else if(timeSelected[number] == true){
	    x[number].style.backgroundColor = "#B2B2B2";
		timeSelected[number] = false;
		numTimeSelected--;
	}

}

function validateForm(){

	document.getElementById("errors").innerHTML = "";
	
	
	numRooms = parseInt(document.getElementById("numRooms").value);
	if(numRooms === ""){
		document.getElementById("errors").innerHTML = "The numbers of rooms can not be empty<br>";
	}
	else if(numRooms >= 12 || numRooms <= 0){
	    document.getElementById("errors").innerHTML = "The numbers of rooms must be greater than 0 but less 12<br>";
	}
	else if(isNaN(numRooms)){
		document.getElementById("errors").innerHTML = "The numbers of rooms is not a number<br>";
	}
	
	if(numDateSelected === 0){
		document.getElementById("errors").innerHTML += "Atleast one day should be selected<br>";
	}
	
	var startDate = document.getElementById("startDate");
	var startDateValue = startDate.value;
	var endDate = document.getElementById("endDate");
	var endDateValue = endDate.value;
	document.getElementById("errors").innerHTML += checkDate(startDate);
	document.getElementById("errors").innerHTML += checkDate(endDate);
	
	if(numTimeSelected !== 2){
		document.getElementById("errors").innerHTML += "You must select a start time and end time.";
	}

	if(document.getElementById("errors").innerHTML === ""){
		sessionStorage.setItem("numRooms", numRooms);
		
		var days = "";
		for(i = 0; i < dateSelected.length;i++){
			if(dateSelected[i]){
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
		sessionStorage.setItem("dates", days);
		sessionStorage.setItem("startDate", startDateValue);
		sessionStorage.setItem("endDate", endDateValue);
		
		var startTime = "";
		var endTime = "";
		
		for(i = 0; i < timeSelected.length;i++){
			if(timeSelected[i]){
				if(i === 0){
					if(startTime === ""){
						startTime = "8am";
					}
				}
				if(i === 1){
					if(endTime === "" && startTime !== ""){
						endTime = "9am";
					}
					if(startTime === ""){
						startTime = "9am";
					}
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
		sessionStorage.setItem("startTime", startTime);
		sessionStorage.setItem("endTime", endTime);
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

	//console.log("" + (regs[2] === 29) + (regs[1] === 2) + (regs[3] % 4 !== 0));
	
    if(field.value != '') {
      if(regs = field.value.match(re)) {
        if(regs[2] < 1 || regs[2] > 31) {
          errorMsg = name + ": Invalid value for day: " + regs[2] + "<br>";
        } else if(regs[1] < 1 || regs[1] > 12) {
          errorMsg = name + ": Invalid value for month: " + regs[1] + "<br>";
        } else if(regs[3] < minYear) {
          errorMsg = name + ": Invalid value for year: " + regs[3] + ". Can not be in the past<br>";
        } else if(regs[2] === 29 && regs[1] === 2 && regs[3] % 4 !== 0){
		  errorMsg = name + ": Invalid leap year<br>";
		} else if(regs[2] === 31 && (regs[1] === 2 || regs[1] === 4 || regs[1] === 9 || regs[1]=== 11)){
		  errorMsg = name + ": Invalid day for month<br>";
		} else if(regs[2] === 30 && regs[2] === 2){
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
