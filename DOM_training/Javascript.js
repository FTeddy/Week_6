var docHeading = document.getElementById('fill-me');
docHeading.innerHTML = 'HALO!';

var docPara = document.getElementsByClassName('change-p');
for (var i = 0; i < docPara.length; i++) {
  docPara[i].innerHTML = 'HALO JUGA! ';
}

var docHeadingTwo = document.getElementsByTagName("h2");
  for (var j = 0; j < docHeadingTwo.length; j++) {
  docHeadingTwo[j].innerHTML = "Apa Kabar!";
}
