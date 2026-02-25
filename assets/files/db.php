<?php
$host = "sql109.infinityfree.com";     // from InfinityFree
$user = "if0_40972765";      // MySQL username
$pass = "SdzvO5gvrt";       // MySQL password
$db   = "if0_40972765_contact_messages";  // database name

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Database connection failed");
}
?>
