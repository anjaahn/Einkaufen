<?php Header("Cache-Control: max-age=3000, must-revalidate"); ?>

<!DOCTYPE html>

<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
        <title>Prononciation</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="style.css">
        <link href="https://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet">

    </head>
    <body>
  <?php
try
{
    // On se connecte à MySQL
    $bdd = new PDO('mysql:host=localhost;dbname=test;charset=utf8', 'root', '');
}
catch(Exception $e)
{
    // En cas d'erreur, on affiche un message et on arrête tout
        die('Erreur : '.$e->getMessage());
}
?>


<form action="/test4/index.php" method="post"> 
     <div>
    <label for="name">Prénom :</label>
    <input type="text" id="Prenom" name="Prenom" />
  </div>
  <div>
    <label for="name">Nom :</label>
    <input type="text" id="Nom" name="Nom" />
  </div>
  <div>
    <label for="mail">E-mail :</label>
    <input type="email" id="AdresseMail" name="AdresseMail" />
  </div>
  <div>
   <label>Langue / Idioma / Language:</label>

    <select name="Langue" id="Langue">
        <option value="">--Please choose an option--</option>
        <option value="fr">Français</option>
        <option value="es">Espagnol</option>
        <option value="de">Allemand</option>
        <option value="en">Anglais</option>
 
    </select>


  </div>

    <div>
   <label>Niveau / Nivel / Level:</label>

    <select name="Niveau" id="Niveau">
        <option value="">--Please choose an option--</option>
        <option value="a11">A1.1</option>
        <option value="a12">A1.2</option>
        <option value="a21">A2.1</option>
        <option value="a22">A2.2</option>
        <option value="a23">A2.3</option>
        <option value="b11">B1.1</option>
     </select>


  </div>

   <div class="button">
        <button type="submit">Envoyer</button>
    </div>

</form>






        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="script.js"></script>
        
    </body>
</html>