var faculty = new PermissionClass(1);
var student = new PermissionClass(2);

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

var date1 = new Date(2015, 11, 25, 12, 0, 0, 0);

var res1 = new Reservation(student1 ,"Active","Individual",date1, 2, room1);