<?
$name=$_POST['name'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$message=$_POST['message'];


$ToEmail = "secretariat@filbcs.org.au, all_cts@filbcs.org.au";
$ToSubject = "Message from FilBCS Website";

$EmailBody =   "Name: $name\n 
		Email: $email\n
		Phone: $phone\n
		Message: $message\n
		
		
		Note to CTs: This is FYI only - please leave responses to the current allocated secretariat or designated CT.";
		
$Message = $EmailBody;

$headers .= "Content-type: text; charset=iso-8859-1\r\n";
$headers .= "From: Website <web@filbcs.org.au>"."\r\n";
$headers .= "Reply-To: ".$name." <".$email."> \r\n";

if(check_email_address($email) ||  contains_numbers($phone)){
   mail($ToEmail,$ToSubject,$Message, $headers);
}

function contains_numbers($String){
    return preg_match('/\d/', $String) > 0;
}  

function check_email_address($email) {
  // First, we check that there's one @ symbol, 
  // and that the lengths are right.
  if (!ereg("^[^@]{1,64}@[^@]{1,255}$", $email)) {
    // Email invalid because wrong number of characters 
    // in one section or wrong number of @ symbols.
    return false;
  }
  // Split it into sections to make life easier
  $email_array = explode("@", $email);
  $local_array = explode(".", $email_array[0]);
  for ($i = 0; $i < sizeof($local_array); $i++) {
    if(!ereg("^(([A-Za-z0-9!#$%&'*+/=?^_`{|}~-][A-Za-z0-9!#$%&'*+/=?^_`{|}~\.-]{0,63})|(\"[^(\\|\")]{0,62}\"))$",$local_array[$i])) {
      return false;
    }
  }
  // Check if domain is IP. If not, 
  // it should be valid domain name
  if (!ereg("^\[?[0-9\.]+\]?$", $email_array[1])) {
    $domain_array = explode(".", $email_array[1]);
    if (sizeof($domain_array) < 2) {
        return false; // Not enough parts to domain
    }
    for ($i = 0; $i < sizeof($domain_array); $i++) {
      if
(!ereg("^(([A-Za-z0-9][A-Za-z0-9-]{0,61}[A-Za-z0-9])|([A-Za-z0-9]+))$",$domain_array[$i])) {
        return false;
      }
    }
  }
  return true;
}

?>