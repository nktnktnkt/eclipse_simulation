var motion = 0;

var r = 50;
var g = 120;
var b = 255;
var a = 0;
var change = 0;
var curve = 0;
var starX = new Array(20);
var starY = new Array(20);
var starS = new Array(20);
var starT = new Array(20);

var n = 1;

var moon;
var moon2;
var corona;

function preload() {
  moon = loadImage("moon.png");
  moon2 = loadImage("moon2.png");
  corona = loadImage("corona.png");
  
}

function setup() {
  createCanvas(800, 600);
  for(var i = 0; i < height/8; i++){
    fill(abs(r) +(i*2), abs(g) +i, abs(b) +i); //sky color
    noStroke();
    rect(0, 0 +(i*8), width, height);
  }
  for(var i = 0; i < starX.length; i++) { //star X position
    starX[i] = random(width);
  }
  for(var i = 0; i < starY.length; i++) { //star Y position
    starY[i] = random(height);
  }
  for(var i = 0; i < starS.length; i++) { // innitial star size
    starS[i] = map(random(4), 0, 4, 1, 4); 
  }
}

function draw() {
  n = n + .01;
  if( n > PI) {
    n = 0;
  }
  motion = constrain(mouseX, 0, width); //map(sensorVal, 50, 127, width, 0);
  change = map(motion, 0 + (width*.025), width - (width*.025), -PI, PI);
  r = map(motion, 0, width, -120*(sin(change)*1.5), 120*(sin(change)*1.5)); 
  g = map(motion, 0, width, -120, 120);
  b = map(motion, 0, width, -255, 255);
  a = map(motion, 0, width, 0, PI); 
  curve = map(motion, 0, width, -PI, PI);
  
  for(var i = 0; i < height/8; i++){
    fill(abs(r) +(i*2), abs(g) +i, abs(b) +i, abs(curve)*50); //sky color
    noStroke();
    rect(0, 0 +(i*8), width, height);
  }
  stroke(255, 0);
  for(var i = 0; i < starT.length; i++) { //STARS TWINKLE
    starT[i] = noise(n)*10 + (random(10)*.2); 
  }
  for(var i = 0; i < starX.length; i++) { //STARS
    stroke(255, map(abs(sin(a))*(i*10), 0, i*10, -255, sin(a)*255));
    strokeWeight(starS[i] + starT[i]);
    point(starX[i], starY[i]);
    for (var t = 10; t > 0; t--) { //STAR GLOW
      stroke(255, abs(sin(a)*(i*4))/(t*4));
      strokeWeight(starS[i] + starT[i] + (t*2));
      point(starX[i], starY[i]);
    }
  }
  noStroke();
  imageMode(CENTER);
  tint(255,150,100, abs(sin(a))*(abs(tan(a)*.25)*200) - (abs(sin(n*20)*50)));
  image(corona, width*.5, height*.5, width +(abs(sin(n*20)*20)), height +(abs(cos(n*20)*20)));
  for(var i = 8; i > 1; i--) { //SUN
    fill(255,100, 100, i*4);
    ellipse(width*.5, height*.5, height*.5 + i*8 + (sin(random(a)*10)*30),height*.5 + i*8 + (sin(random(a)*10)*30)); 
    
    fill(255 - i, 255 - (i*4), 255 - (i*10), 255 - (i*8));
    ellipse(width*.5 + (sin(random(sin(n)*100)*random(3))) + (sin(i*4*-change)*10), height*.5 + (cos(random(cos(n)*100)*random(3))), height*.5 + random(10) + (i*1.3*abs(change)*4) - (cos(-change*i)*4), height*.5 + random(10) + (i*1.3*abs(change)*4) - (cos(-change*i)*4));
  }
  
  imageMode(CENTER); //MOON 
  tint(map(abs(r), 0, 255, 100, 255), 50, 50, 255);
  image(moon, motion, height*.5 + (curve*32), height*.5 - (height*.01), height*.5 - (height*.01));
  tint(abs(r*1.3),abs(g*1.2), abs(b), abs(sin(change*.5))*255);
  image(moon2, motion, height*.5 + (curve*32), height*.5 - (height*.01), height*.5 - (height*.01));
  
  
}