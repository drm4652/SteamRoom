<<<<<<< HEAD
# ui-calendar directive [![Build Status](https://travis-ci.org/angular-ui/ui-calendar.svg?branch=master)](https://travis-ci.org/angular-ui/ui-calendar)

[![Join the chat at https://gitter.im/angular-ui/ui-calendar](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/angular-ui/ui-calendar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A complete AngularJS directive for the Arshaw FullCalendar.

# Requirements

- ([AngularJS](http://code.angularjs.org/1.2.1/angular.js))
- ([fullcalendar.js 2.0 and it's dependencies](http://arshaw.com/fullcalendar/download/))
- optional - ([gcal-plugin](http://arshaw.com/js/fullcalendar-1.5.3/fullcalendar/gcal.js))

# Usage

Using [bower](http://bower.io) run:

    bower install --save angular-ui-calendar

Alternatively you can add it to your `bower.json` like this:

    dependencies: {
        "angular-ui-calendar": "latest"
    }

And then run

    bower install

This will copy the ui-calendar files into your `components` folder, along with its dependencies. Load the script and style files in your application:

    <link rel="stylesheet" href="bower_components/fullcalendar/dist/fullcalendar.css"/>
    <!-- jquery, moment, and angular have to get included before fullcalendar -->
    <script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" src="bower_components/moment/min/moment.min.js"></script>
    <script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
    <script type="text/javascript" src="bower_components/angular-ui-calendar/src/calendar.js"></script>
    <script type="text/javascript" src="bower_components/fullcalendar/dist/fullcalendar.min.js"></script>
    <script type="text/javascript" src="bower_components/fullcalendar/dist/gcal.js"></script>

Add the calendar module as a dependency to your application module:

    var app = angular.module('App', ['ui.calendar'])

Apply the directive to your div elements. The calendar must be supplied an array of documented event sources to render itself:

    <div ui-calendar ng-model="eventSources"></div>

Define your model in a scope e.g.

    $scope.eventSources = [];


# Local Server to test demo

    grunt serve


