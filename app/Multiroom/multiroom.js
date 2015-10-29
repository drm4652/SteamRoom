
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
	if(!checkChronological(startDateValue, endDateValue)){
		document.getElementById("errors").innerHTML += "Start Date must be before End Date<br>";
	}
			var startTime = "";
		var endTime = "";
		
		startTime = document.getElementById("startTime").value;
		endTime = document.getElementById("endTime").value;
				console.log(startTime);
	
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
	  
	  var date1day = parseInt(date1.substring(0,slashArray1[0]));
	  var date1month = parseInt(date1.substring(slashArray1[0]+1,slashArray1[1]));
	  var date1year = parseInt(date1.substring(slashArray1[1]+1, slashArray1[2]));
	  
	  var date2day = parseInt(date2.substring(0,slashArray2[0]));
	  var date2month = parseInt(date2.substring(slashArray2[0]+1,slashArray2[1]));
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