<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include "db.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $subject = mysqli_real_escape_string($conn, $_POST["subject"]);
    $message = mysqli_real_escape_string($conn, $_POST["message"]);

    $sql = "INSERT INTO tb_msgs 
            (name, email, subject, message)
            VALUES 
            ('$name', '$email', '$subject', '$message')";

    if (mysqli_query($conn, $sql)) {
        echo "
        <script>
            alert('Message sent successfully 💌');
            window.location.href='index.html';
        </script>
        ";
    } else {
        echo "
        <script>
            alert('Something went wrong ❌');
            window.history.back();
        </script>
        ";
    }
}
?>
