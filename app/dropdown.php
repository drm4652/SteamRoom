<?php $sql = mysql_query("SELECT username FROM users");
	while ($row = mysql_fetch_array($sql)){
		echo "<option value=\"team1\">" . $row['username'] . "</option>";
	}
?>