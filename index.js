var heroes;

const request = async () => {
  
  const response = await fetch('https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json');
  heroes = await response.json();
  getNewSupe(heroes);
}

request();

var btnFindAnother = document.querySelector("#btnFindAnother");

btnFindAnother.onclick = function(){
  getNewSupe(heroes);
};

function getNewSupe(superheroList)
{
  var rando = Math.floor(Math.random() * superheroList.length);
  var randoSupe = superheroList[rando];

  var supeName   = randoSupe.name;
  var photo      = randoSupe.images.md;
  var appearance = randoSupe.biography.firstAppearance;
  var occupation = randoSupe.work.occupation;


  document.querySelector("#name").innerHTML = supeName;
  document.querySelector("#photo").src = photo;
  document.querySelector("#appearance").innerHTML = appearance;
  document.querySelector("#occupation").innerHTML = occupation;
}
