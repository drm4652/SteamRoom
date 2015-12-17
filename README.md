
# Steam Room 



# Requirements

- ([AngularJS](http://code.angularjs.org/1.2.1/angular.js))
- ([fullcalendar.js 2.0 and it's dependencies](http://arshaw.com/fullcalendar/download/))

# Usage

Using [bower](http://bower.io) run:

    bower install --save angular-ui-calendar

Alternatively you can add it to your `bower.json` like this:

    dependencies: {
        "angular-ui-calendar": "latest"
    }

And then run

    bower install


# Local Server to test demo
WELCOME TO STEAMROOM!

To run this app, MongoDB must be installed
navigate through the mongoDB directory and look for
a mongod(.exe for windows) file, and run it in a terminal
NOTE: MongoVUE is a useful GUI to interact with the database
-Was used to assist with creating the database ('localSteam')
-Was used to create collections that correspond to the app

Once the database is listening go to the root directory of the app
run 'node nodeServerFunc.js'
if done correctly, will print 'App listening on 3000'
if not will say 'Unable to Connect to Mongo'

to login, just have something in the username field (security was a later priority)
At the landing, selecting reserve will take you down the Reservation path,
selecting find will have you view your current reservations

Reservation path:
you'll see a calendar that can have the next 14 days available to select
a time for and then the rooms and times available will fill up in the day clicked
clicking on a time will load up the next page that will show time and date of the room
as well as what teams the user will reserve as (teams not implemented yet).
The type of room can be selected on this page
clicking reserve will create a reservation and lead to summary page

known issues:
security isn't implemented(will use LDAP)
Multiroomjs and html is not in compliance with the rest of the app
Adminjs and html is not in compliance with the rest of the app
MongoDB on OpenBSD hasn't been attempted yet, will be a risk if given that OS on the VM

current gitHub link: https://github.com/drm4652/SteamRoom


