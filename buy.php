<?php
$to = $_POST['email'];
$subject = 'Olive Pizza Order Summary';
$name = $_POST['name'];
$email = "skaterboi509@hotmail.com";

$body = <<<EMAIL
  Hello $name! Thanks for ordering pizza from OlivePizza.
  Your email is $to

  Reminder, you said it was ok to not have the selected order in this email :)

EMAIL;

$header = "From: $email";


mail($to, $subject, $body, $header);

header("Location:index.html");

?>

