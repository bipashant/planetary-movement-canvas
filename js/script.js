const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
firstColor = '#e76f51';
secondColor = '#e76f51';
// canvas.setAttribute('width', '438');
// canvas.setAttribute('height', '462');
SCALING_FACTOR = 20;

c.canvas.width = SCALING_FACTOR * canvas.width;
c.canvas.height = SCALING_FACTOR * canvas.height;

c.scale(SCALING_FACTOR, SCALING_FACTOR);

let play = true;
let showPlanets = true;
let whiteBackground = false;
let opacity = 0.02;
let count = 0;

canvas.width = innerWidth;
canvas.height = innerHeight;

let firstPlanet, secondPlanet, speed;

const getPlanetForOptions = (radius, velocity, orbitRadius, color, show) =>
    new Planet(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        color,
        velocity / 1000,
        orbitRadius,
        show
    );

let planets;

function init() {
    planets = [];

    planets.push(getPlanetForOptions(35, 0, 0, 'yellow', showPlanets)); // sun

    maximumRadius = 300;
    // considering 425px as maximum orbit radius because of screen size
    orbitSize = maximumRadius / secondPlanet.distance_in_au * firstPlanet.distance_in_au + 35; // Adding sun radius

    if(secondPlanet.orbital_duration_in_years > 80){
      factor = 1;
    } else if(secondPlanet.orbital_duration_in_years < 1){
      factor = 400;
    } else if(secondPlanet.orbital_duration_in_years < 20){
      factor = 40;
    } else {
      factor = 4;
    }

    // console.log(orbitSize)
    planets.push(getPlanetForOptions(25, secondPlanet.orbital_duration_in_years * factor, orbitSize, firstPlanet.color, showPlanets));
    planets.push(getPlanetForOptions(25, firstPlanet.orbital_duration_in_years * factor, maximumRadius, secondPlanet.color, showPlanets));

}

function drawLines(){
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  if(whiteBackground){
    c.fillStyle = 'rgb(256, 256, 256)';
  }else{
    c.fillStyle = 'rgb(0, 0, 0)';
  }
  
  c.fillRect(0, 0, canvas.width, canvas.height);
  

  firstPlanetPath = planets[1].path
  secondPlanetPath = planets[2].path

  for (let i = 0; i < count; i++) {
     c.beginPath();
     
    //  c.beginPath();
    //  c.arc(firstPlanetPath[i].x, firstPlanetPath[i].y, 2, 0, Math.PI * 2, false);
    //  c.fillStyle = hexToRgbA('#FF8AAE');
    //  c.fill();

     c.moveTo(firstPlanetPath[i].x, firstPlanetPath[i].y);

     midPointX = (firstPlanetPath[i].x + secondPlanetPath[i].x) / 2
     midPointY = (firstPlanetPath[i].y + secondPlanetPath[i].y) / 2

     c.lineTo(midPointX, midPointY);
     c.strokeStyle = hexToRgbA(firstColor);
     c.stroke();

    //  c.beginPath();
    //  c.arc(midPointX, midPointY, 2, 0, Math.PI * 1, false);
    //  c.fillStyle = hexToRgbA('#FF8AAE');
    //  c.fill();
     
    //  c.beginPath();
    //  c.arc(midPointX, midPointY, 2, 180, Math.PI * 2, false);
    //  c.fillStyle = hexToRgbA('#9ADCFF');
    //  c.fill();
     
     c.beginPath();
     c.moveTo(midPointX, midPointY);
     c.lineTo(secondPlanetPath[i].x, secondPlanetPath[i].y);
     c.strokeStyle = hexToRgbA(secondColor);
     c.stroke();

      c.beginPath();
      c.arc(secondPlanetPath[i].x, secondPlanetPath[i].y, 2, 0, Math.PI * 2, false);
      c.fillStyle = hexToRgbA(secondColor);
      c.fill();
  }
}

// Animation Loop
function animate() {
    
    if(play){
      play = requestAnimationFrame(animate);
    }
  
    drawLines();
    count += 1;

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
    count = 0;
    init();
    animate();
  });

  $('#stopBtn').click(function(){
    play = false;
    window.cancelAnimationFrame(false);
    $('#count').val(count);
  });

  $('#resumeBtn').click(function(){
    play = true;
    animate();
  });

  $('#changeBackground').click(function(){
    whiteBackground = !whiteBackground;
    drawLines();  
  });

  $('#opacity').change(function(){
    opacity = $('#opacity').val()/100;
    drawLines()
  })

  $('#count').change(function(){
    count = parseInt($('#count').val());
    drawLines()
  })

  
  
});

function hexToRgbA(hex){
  var c;

  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ opacity + ')';
  }
  throw new Error('Bad Hex');
}