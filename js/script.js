const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
let play = true;

canvas.width = innerWidth;
canvas.height = innerHeight;

let firstPlanet, secondPlanet, speed;

const getPlanetForOptions = (radius, velocity, orbitRadius, color) =>
    new Planet(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        color,
        velocity / 1000,
        orbitRadius
    );

let planets;

function init() {
    planets = [];

    planets.push(getPlanetForOptions(35, 0, 0, 'yellow')); // sun

    maximumRadius = 325;
    // considering 425px as maximum orbit radius because of screen size
    orbitSize = maximumRadius / secondPlanet.distance_in_au * firstPlanet.distance_in_au + 35; // Adding sun radius

    if(secondPlanet.orbital_duration_in_years > 80){
      factor = 0.5;
    } else if(secondPlanet.orbital_duration_in_years < 1){
      factor = 100;
    } else if(secondPlanet.orbital_duration_in_years < 20){
      factor = 20;
    } else {
      factor = 1;
    }

    // console.log(orbitSize)
    planets.push(getPlanetForOptions(25, secondPlanet.orbital_duration_in_years * factor, orbitSize, firstPlanet.color));
    planets.push(getPlanetForOptions(25, firstPlanet.orbital_duration_in_years * factor, maximumRadius, secondPlanet.color));

}

// Animation Loop
function animate() {
    
    if(play){
      play = requestAnimationFrame(animate);
    }
  
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgb(0, 0, 0)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    

    firstPlanetPath = planets[1].path
    secondPlanetPath = planets[2].path

    for (let i = 0; i < firstPlanetPath.length; i++) {
       c.beginPath();
       c.moveTo(firstPlanetPath[i].x, firstPlanetPath[i].y);
       c.lineTo(secondPlanetPath[i].x, secondPlanetPath[i].y);
       c.strokeStyle = 'rgba(255, 77, 0, 0.09)';
       c.stroke();
    }

    planets.forEach(planet => {
      planet.updatePosition();
    });    
}

$(document).ready(function(){
  $.each(data, function (key, data) {
    $('<option/>').val(key).text(key).appendTo('#firstPlanet');
    $('<option/>').val(key).text(key).appendTo('#secondPlanet');
  });

  $('#startBtn').click(function(){
    firstPlanet = data[$('#firstPlanet').val()];
    secondPlanet = data[$('#secondPlanet').val()];
    speed = $('#speed').val();
    play = true;

    init();
    animate();
  });

  $('#stopBtn').click(function(){
    play = false;
    window.cancelAnimationFrame(false);
  });

  $('#resumeBtn').click(function(){
    play = true;
    animate();
  });
});