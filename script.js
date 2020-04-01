var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

// tableau dynamique des phrases
var lesPhrases = ['Schuhe', 'Spiegel', 'Sport', 'Günstig', 'Stiefel', 'Kosten', 'Schuhgröße', 'Ich kaufe die Schuhe', 'Ich möchte Sportschuhe', 'Wie viel kosten die Schuhe'];
var test = lesPhrases;

//tableau dynamique des phrases correctes
var corect = [];
//tableau dynamique des phrases incorrectes
var incorect= [];
// variable pour stoquer la dernière phrase correcte et incorrecte
var corectSt = '';
var incorectSt = '';
// Variable qui lie les textbox du html
var TestTextBox = $('#testtext');
var Textbox = $('#textbox');
var instructions = $('#instructions');
var instructions2 = $('#instructions2');
var instructions3 = $('#instructions3');
var corectP = $('#corect');
var incorectP = $('#incorect');
var progression = $('#progression');
var enCours = $('#enCours');
var ajoutText = $('#ajoutText');
var PhraseAAjouter;
var change;
//  variable qui contient le texte enregistré
var Content = '';
// des compteur
var compteur = 0;
var compteurOk = 0;
var compteurPasOk = 0;
var NextCompteur = 0;
// variable qui recupere le contenu du tableau de phrase, à l'indice actuel
var Phrase = test[compteur];
// rempli la text box avec la valeur
TestTextBox.val(Phrase);
// paramètre de la librayri recognition
recognition.continuous = false;
recognition.lang = 'de-DE';
// autres variable
var ResultatTest = '';
var ResultatAudio = '';
var Random;
var Max;
var corrects;
var incorects;
var p;
var p2;
var variableRecuperee;
var synth = window.speechSynthesis;
var voiceSelect = 'Google Deutsch (de-DE)';
var pitch ;
var rate = 0.8;
var voices = [];

function toggleVisibility(elmt)
{
   if(typeof elmt == "string")
      elmt = document.getElementById(elmt);
   if(elmt.style.visibility == "hidden")
      elmt.style.visibility = "visible";
   //else
     // elmt.style.visibility = "hidden";
}

function populateVoiceList() {
  voices = synth.getVoices(3);

}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

if (!('webkitSpeechRecognition' in window))  alert("non supportée");
else {
p = document.getElementById("corect")
String.prototype.ucFirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1);}

p2= document.getElementById("incorect")
String.prototype.ucFirst=function(){return  this.substr(0,1).toUpperCase()+this.substr(1);}
//String.prototype.charAt=function(int){return this.charAt(int);}

// fonction qui test l'xistence d'un élément dans un tableau

function TestTable(incorect, faux) {
    if (incorect.indexOf(faux) === -1) {
       
       return 1;
    } else if (incorect.indexOf(faux) > -1) {
       return 0;
    }
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


recognition.onresult = function(event) {

	Content='';
  var current = event.resultIndex;

  var transcript = event.results[current][0].transcript;
 
    Content += transcript;
    Content=Content.ucFirst();
    Textbox.val(Content);
  
};



recognition.onstart = function() { 
  instructions.text('Die Spracherkennenung ist aktiviert...');
  instructions2.text(''); 
 instructions3.text(''); 
  ResultatAudio='';

}


recognition.onspeechend = function() {
  instructions.text('Pause...');
}

recognition.onspeechstart = function() {
  instructions.text('Nimmt gerade auf...');
}

recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.text('');  
  }
}



recognition.onend = function() { 
  instructions.text('Spracherkennung ist deaktiviert');
  Content=Content.ucFirst();
  ResultatAudio = Content;
    for(i=0; i<=Phrase.length;i++)
    {
      if (Phrase.charAt(i) == ResultatAudio.charAt(i)) compteurOk++;
      else compteurPasOk++;
    }

  if (Content== ''){
    instructions.text('Die Spracherkennung ist aktiviert');
    ResultatAudio=''
  }
  else if (compteurPasOk >= 3) {

   instructions.text('Der Satz wurde nicht erkannt. Probier es nochmal');
   instructions2.text(''); 
      ResultatTest= 'Pas OK';

      incorrects= test.slice(compteur, compteur+1);
      
      // on test que l'élément n'est pas déja dans incorect[] et que incorect[] n'est pas vide.
      if (TestTable(incorect,Phrase) == 1 && incorect.length != 0 )
      {
      incorect.push(Phrase);
      p2.innerText += " " + Phrase + " -- ";
      incorectP.text(p2.innerText);
      }

      if(TestTable(incorect,Phrase) == 0) instructions2.text('Leider nein.');

      if (incorect.length == 0 )
      {
      incorect.push(Phrase);
      p2.innerText +=" " + Phrase + " -- ";
        incorectP.text(p2.innerText);
      }

      sleep(1500);
      Textbox.val('');
     // recognition.start();
      enCours.text(ResultatAudio);

  }

  else{



  // on compare le résultat à la phrase du tableau
  // la c'est non
  // Test si la reponse est correct, // on compare le résultat à la phrase du tableau
  // la c'est oui
  if (compteurPasOk < 3 && compteurPasOk >0) {
    instructions2.text('Probier es nochmal. DU hast ' +compteurPasOk + ' Fehler');
    ResultatTest= 'Pas OK';

      incorrects= test.slice(compteur, compteur+1);
      
      // on test que l'élément n'est pas déja dans incorect[] et que incorect[] n'est pas vide.
      if (TestTable(incorect,Phrase) == 1 && incorect.length != 0 )
      {
      incorect.push(Phrase);
      p2.innerText += " " + Phrase + " -- ";
      incorectP.text(p2.innerText);
      }

      if(TestTable(incorect,Phrase) == 0) instructions2.text('Probier es nochmal');

      if (incorect.length == 0 )
      {
      incorect.push(Phrase);
      p2.innerText += " " + Phrase + " -- ";
        incorectP.text(p2.innerText);
      }


  sleep(1500);   
  Textbox.val('');
//  recognition.start();

  }


  if (ResultatAudio === Phrase) { 
    ResultatTest= 'OK';
    corrects= test.slice(compteur, compteur+1);
    //test si un élément de corect[] répondu existe deja dans incorect[], si oui: rien / sinon on l'ajoute
    if(TestTable(incorect,Phrase)==1) 
      {
      corect.push(corrects);
      p.innerText += corrects + " -- "+ ' ';
      corrects= p.innerText ;
      corectP.text(corrects);
      }
    instructions2.text(' Bravo'); 
    corrects=corect[compteur];
    compteur = compteur + 1; 
    Phrase= test[compteur];
    sleep(1000);
    TestTextBox.val(Phrase);
    Textbox.val('');
    

        
    }
    // futur bar de progression
   progression.text(compteur + ' / ' + test.length);
      // test si on arrive à lq fin
    if(compteur===test.length){ instructions2.text('Genial! Du bist fertig.');
                                change=document.getElementById('change-btn');
                                toggleVisibility(change);
                              }

  instructions.text('Sehr gut! Du hast ' + compteur + ' von ' + test.length +' richtig. Drück wieder auf Hören! ');
  enCours.text(ResultatAudio);
  ResultatAudio='';


  }
  compteurPasOk=0;
  compteurOk=0;
}

// bouton start

$('#start-btn').on('click', function(e) {
  if (Content.length) {
    Content += ' ';
  }
  recognition.start();
  sleep(500)
});


Textbox.on('input', function() {
  Content = $(this).val();
})


// nouveau bouton pour tout recommencer
$('#clear-all-btn').on('click', function(e) {
  Content = '';
  transcript='';
  for (let i=0; i<= corect.length; i++)
  {
  	corect.pop(i)
  }
  for (let i=0; i<= incorect.length; i++)
  {
  	incorect.pop(i)
  }
  Textbox.val(Content);
//  recognition.onend();
  instructions2.text('Contenu réinitialisé');
  corectP.text('');
  incorectP.text('');
  ResultatAudio= '';
  enCours.text(ResultatAudio);
  ResultatTest='';
  compteur=0;
  NextCompteur=0;
  test= lesPhrases;
  Phrase = test[compteur];
  TestTextBox.val(Phrase);
  progression.text(compteur + ' / ' + test.length);

});

// bouton suivant
$('#next-btn').on('click', function(e) {
// Max recupère la taille du tableau
// on compare la valeur de notre compteur à celle de la taille du tableau
if(compteur + 1< test.length) {
// tant que c'est inférieur; on passe à la phrase suivante
  if(TestTable(incorect,Phrase) == 1 && test.length >= incorect.length) 
  {
    incorect.push(Phrase);
    p2.innerText += " " + Phrase + " -- ";
    incorectP.text(p2.innerText);
  }
  ResultatAudio='';
  enCours.text('');
  Content = '';
  Textbox.val(Content);
  // Random= Math.floor(Math.random() * Max);
  compteur= compteur + 1;
  Phrase= test[compteur];
  NextCompteur = compteur +1;
  if (compteur<test.length) instructions2.text('ok. Weiter mit Satz (' + NextCompteur +').');
  TestTextBox.val(Phrase);
  progression.text(compteur + ' / ' + test.length);
}
// sinon c'est la fin !
else {
    compteur++;
    if (compteur==test.length) {
    progression.text(compteur + ' / ' + test.length);
    incorect.push(Phrase);
    p2.innerText += " " + Phrase + " -- ";
    incorectP.text(p2.innerText);
    compteur++;
  }

  instructions2.text('--------- DU HAST ALLE SÄTZE AUSGESPROCHEN ('+test.length+') . Sehr gut!  ---------');
  change=document.getElementById('change-btn');
  toggleVisibility(change);
  Phrase= '';
  TestTextBox.val(Phrase);
}


});
// bouton ecouter
$('#listen-btn').on('click', function(e) {
   event.preventDefault();

  var utterThis = new SpeechSynthesisUtterance(test[compteur]);
  pitch=rate.value;
  utterThis.voice = voices[3]
  utterThis.rate = rate;
  synth.speak(utterThis);
});


$('#ajout-btn').on('click', function(e) {
 
PhraseAAjouter = document.getElementById('ajoutText').value;

if (TestTable(test,PhraseAAjouter)==1) {
  test.push(PhraseAAjouter);
  instructions3.text("La phrase : \"" + PhraseAAjouter + "\" a bien été ajoutée à la liste !");
 PhraseAAjouter='';
  ajoutText.val('');
}
else {
 instructions3.text("La phrase : \"" + PhraseAAjouter + "\" existe déjà dans la liste ! ");
 PhraseAAjouter='';
 ajoutText.val('');
}

});



$('#change-btn').on('click', function(e) {

  Content = '';
  transcript='';
 

  // différent plutot que inf ou egal
 
  test=[];
  test= incorect.slice(0, incorect.length +1);
  while(incorect.length != 0){incorect.pop(0);}
  while(corect.length != 0){corect.pop(0);}

  Textbox.val(Content);
  instructions.text('Très bien nous allons revoir tes anciennes erreurs.');
  instructions2.text('Contenu mis à jour !');
  corectP.text('');
  incorectP.text('');
  ResultatAudio= '';
  enCours.text(ResultatAudio);
  ResultatTest='';
  compteur=0;
  Phrase = test[compteur];
  TestTextBox.val(Phrase);
  progression.text('');
  NextCompteur=0;



});

}

/*
$mysqli = new mysqli("127.0.0.1", "user", "password", "database", 3306);
if ($mysqli->connect_errno) {
    echo "Echec lors de la connexion à MySQL : (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

echo $mysqli->host_info . "\n";
?>


mysqli.default_host=192.168.2.27
mysqli.default_user=root
mysqli.default_pw=""
mysqli.default_port=3306
mysqli.default_socket=/tmp/mysql.sock
$mysqli->set_charset('utf8');
**/
