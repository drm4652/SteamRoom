var faculty = new PermissionClass(1);
var student = new PermissionClass(2);
var numConflicts = 0;
var confirmedRes;
var balls = 5;
var student1 = new User("Daniel", "Moody", "drm4652", student);
var faculty1 = new User("Larry", "Kiser", "lmr8394", faculty);

var room1 = new Room(1560, true, false);
var room2 = new Room(1561, true, false);
var room3 = new Room(1562, false, true);
var room4 = new Room(1563, false, true);
var room5 = new Room(1564, false, false);
var room6 = new Room(1565, false, false);
var room7 = new Room(1660, false, false);
var room8 = new Room(1661, false, false);
var room9 = new Room(1662, false, false);
var room10 = new Room(1663, false, false);
var room11 = new Room(1665, false, false);

var fullRooms = new Room("FULL", "---", "---");

var allRooms = [];
allRooms.push(room1);
allRooms.push(room2);
allRooms.push(room3);
allRooms.push(room4);
allRooms.push(room5);
allRooms.push(room6);
allRooms.push(room7);
allRooms.push(room8);
allRooms.push(room9);
allRooms.push(room10);
allRooms.push(room11);

var webcamRooms = [];
var phonelineRooms = [];
webcamRooms.push(room1);
webcamRooms.push(room2);
phonelineRooms.push(room3);
phonelineRooms.push(room4);

var nonExtraRooms = [];
nonExtraRooms.push(room5);
nonExtraRooms.push(room6);
nonExtraRooms.push(room7);
nonExtraRooms.push(room8);
nonExtraRooms.push(room9);
nonExtraRooms.push(room10);
nonExtraRooms.push(room11);

var date1 = new Date(2015, 11, 14, 8, 0, 0, 0);

var mockReservations = [];
var res1 = new Reservation(student1 ,"Active","Individual",date1, 2, room1);
var res2 = new Reservation(student1 ,"Active","Individual",date1, 2, room2);
var res3 = new Reservation(student1 ,"Active","Individual",date1, 2, room3);
var res4 = new Reservation(student1 ,"Active","Individual",date1, 2, room4);
var res5 = new Reservation(student1 ,"Active","Individual",date1, 2, room5);
var res6 = new Reservation(student1 ,"Active","Individual",date1, 2, room6);
var res7 = new Reservation(student1 ,"Active","Individual",date1, 2, room7);
var res8 = new Reservation(student1 ,"Active","Individual",date1, 2, room8);
var res9 = new Reservation(student1 ,"Active","Individual",date1, 2, room9);
var res10 = new Reservation(student1 ,"Active","Individual",date1, 2, room10);
var res11 = new Reservation(student1 ,"Active","Individual",date1, 2, room11);


mockReservations.push(res1);
mockReservations.push(res2);


mockReservations.push(res3);
mockReservations.push(res4);

mockReservations.push(res5);
mockReservations.push(res6);

mockReservations.push(res7);
mockReservations.push(res8);
mockReservations.push(res9);
mockReservations.push(res10);
mockReservations.push(res11);
