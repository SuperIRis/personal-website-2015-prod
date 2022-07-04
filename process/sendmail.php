<?php
function _filterEmail($email)
{
    $rule = array("\r" => '',
                  "\n" => '',
                  "\t" => '',
                  '"'  => '',
                  ','  => '',
                  '<'  => '',
                  '>'  => '',
    );

    return strtr($email, $rule);
}

function _filterName($name)
{
    $rule = array("\r" => '',
                  "\n" => '',
                  "\t" => '',
                  '"'  => "'",
                  '<'  => '[',
                  '>'  => ']',
    );

    return trim(strtr($name, $rule));
}

function _filterOther($data)
{
    $rule = array("\r" => '',
                  "\n" => '',
                  "\t" => '',
    );

    return strtr($data, $rule);
}

$to      = 'holairis@gmail.com';
$subject = 'Mensaje de superiris.com';
$message = _filterName($_POST['contactname']).' - '._filterEmail($_POST['contactemail'])."\r\n"._filterOther($_POST['contactmessage']);
$headers = 'From: webmaster@superiris.com' . "\r\n" .
    'Reply-To: webmaster@superiris.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);
?> 