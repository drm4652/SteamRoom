/**
 * calendarDemoApp - 0.9.0
 */
 
angular.module('reservationService', [])
	.factory('Reservations', ['$http', function($http){
		return {
			post: function(data){
				
				return $http.post('/calendar', data);
			}
		}
	}]);

var calendarDemoApp = angular.module('calendarDemoApp', ['ui.calendar', 'ui.bootstrap' , 'reservationService']);

	var globalDate = '';
	var globalTime = '';
	var dateSaver = '';

calendarDemoApp.controller('CalendarCtrl',
   ['$scope', '$compile', '$timeout', 'uiCalendarConfig', '$http', 'Reservations', function($scope, $compile, $timeout, uiCalendarConfig, $http, Reservations) {
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
	var dateSaver = '';

    $scope.changeTo = 'Hungarian';
    /* event source that pulls from google.com */
    $scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
			
    };
	
    /* event source that contains custom events on the scope */
    $scope.events = [
      //{title: 'Click for Google',start: new Date(y, m, 28, 10),url: 'http://google.com/'}
	];
		
    /* event source that calls a function on every view switch */
    $scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
    };

	/*alert on DateClick */
	$scope.alertOnDateClick = function(date, jsEvent, view, start, end, allDay, cell){
		//dateSaver = $scope.alertMessage = ('Clicked on: ' + date.format());

		dateSaver = date.format();
		var today = moment();
		var todayCheck = moment(today).format('YYYY-MM-DD');
		var todayDay = moment(today).format('DD');
		todayDay = parseInt(todayDay);
		
		var selectionStart = date.format();
		
		//retrieving epoch format
		selectionStart = Date.parse(selectionStart);
		today = Date.parse(today);
		
		//create a variable that is 14 days in epoch format
		var epoch14Days = 1209600000;
		var dateAdded = today + epoch14Days;
		
		


		
		var view = $('#myCalendar1').fullCalendar('getView');
        $scope.alertMessage = dateSaver;
		globalDate = dateSaver;
		localStorage.setItem("globalDate", globalDate);
		
		yearClicked = date.format('YYYY');
		yearClicked = parseInt(yearClicked);
		monthClicked = date.format('MM');
		monthClicked = parseInt(monthClicked) - 1;
		dayClicked = date.format('DD');
		dayClicked = parseInt(dayClicked);
		
		//ensure that the date clicked isnt 14 days past current dates
		var lessThan14 = true;
		if(selectionStart < dateAdded ){
			var lessThan14 = true;
		}
		else{
			var lessThan14 = false;
		}

		
		if(lessThan14){
			if(dateSaver == todayCheck || selectionStart > today){
				//$http.post
				
				$('#myCalendar1').fullCalendar( 'changeView', 'agendaDay' );
				$('#myCalendar1').fullCalendar( 'gotoDate', date.format());
				
				
				for(timeIncrement = 7; timeIncrement < 23; timeIncrement++){
					$http.dateCheck = new Date(yearClicked, monthClicked, dayClicked, timeIncrement);
					$http.dateCheck = moment($http.dateCheck);
					//console.log($http.dateCheck);
					
					var pushEvents = function(usedRooms) {
						//console.log(usedRooms);
						var availableRooms= 11 - usedRooms;
						console.log(availableRooms); //prints rooms available
						$scope.events.push({
							id: timeIncrement,
							title: 'Rooms Available [' + availableRooms + ']',
							start: new Date(yearClicked, monthClicked, dayClicked, timeIncrement),
							url: 'http://localhost:3000/reservationCheck'
						});
						console.log(timeIncrement);
						console.log($http.dateCheck);
						//if(timeIncrement == 23)
					};
					
					
					//TODO get Async calls working correctly
					// $scope.roomsUsed = function(){
						// $http.times = [];
						// for(timeIncrement = 7; timeIncrement < 23; timeIncrement++) {
							// $http.dateCheck = new Date(yearClicked, monthClicked, dayClicked, timeIncrement);
							// console.log($http.dateCheck);
							//$http.dateCheck = moment($http.dateCheck);
							// $http.times.push($http.dateCheck);
						// }
						// console.log($http.times);
						// return Reservations.post({times: $http.times})
						// .then(function(data) {
							// $scope.reservations = data.data;
							// $scope.loading = true;
							// console.log(data.data); //prints reserved rooms
							// return pushEvents($scope.reservations);
						// }).catch(function(err) {
							// console.log(err)
						// });
					// };
					
					pushEvents(1);
					//$scope.roomsUsed();
				
				}
				
			}
			else{
				//if(view.name == 'month'){
					alert("You have clicked a previous date.");
				//}
				//else{
				//	alert("You have clicked a previous time slot");
				//}
			}
		}
		else{
			alert("You can only reserve 14 days in advance.")
		}
};
	
	
	
    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
		globalTime = date.id;
		localStorage.setItem("globalTime", globalTime);
    };
    /* alert on Drop */
     $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };
    /* add and removes an event source of choice */
    $scope.addRemoveEventSource = function(sources,source) {
      var canAdd = 0;
      angular.forEach(sources,function(value, key){
        if(sources[key] === source){
          sources.splice(key,1);
          canAdd = 1;
        }
      });
      if(canAdd === 0){
        sources.push(source);
      }
    };
    /* add custom event*/
    $scope.addEvent = function() {
      $scope.events.push({
        title: 'Open Sesame',
        //start: new Date(yearClicked, monthClicked, dayClicked),
        //end: new Date(yearClicked, monthClicked, dayClicked),
        className: ['openSesame']
      });
    };
    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      $timeout(function() {
        if(uiCalendarConfig.calendars[calendar]){
          uiCalendarConfig.calendars[calendar].fullCalendar('render');
        }
      });
    };
	/* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
	
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 650,
        editable: false,
		selectable: true,
        header:{
          left: 'month',
          center: 'title',
          right: 'today prev,next'
        },
		//hides the next/prev/today button when agendaDay view
		viewRender: function(view){
			$('#myCalendar1').fullCalendar('removeEvents');
			//var fullCalendarDayContainers = $theCalendar.find( 'td[class*="fc-day"]' );
			//foundDay = $currentContainer;

			//dateSaver.addClass( 'selected-day' );
			if(view.name == 'agendaDay'){
				$("#myCalendar1 .fc-next-button").hide();
				$("#myCalendar1 .fc-prev-button").hide();
				$("#myCalendar1 .fc-today-button").hide();
			}
			else{
				$("#myCalendar1 .fc-next-button").show();
				$("#myCalendar1 .fc-prev-button").show();
				$("#myCalendar1 .fc-today-button").show();
			}
		},
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender,
		dayClick: $scope.alertOnDateClick,
		timeClick: $scope.alertTest,
		eventWipe: $scope.eventWipe
      }
    };

    
    /* event sources array*/
    $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
	$scope.eventSources3 = [$scope.alertOnDateClick, $scope.alertTest, $scope.eventWipe];
}]);
/* EOF */