var myImage; //mermaid
var myImage2; //fish1
var myImage3; //fish3
var mybackground;
var mySong;
var analyzer;
var distance = 10;
var ang = 0;  //start angle
var wid;  //amplitude wave
var hw = 40; //height wave
var period = 300;
var plusx;
var yvalues;  //array for different height values

function preload(){
  myImage = loadImage('./assets/mermaid2.png');
  myImage2 = loadImage('./assets/fish.png');
  myImage3 = loadImage('./assets/fish2.png');
  mybackground = loadImage('./assets/underwater.jpg');
  mySong = loadSound('./assets/Roglok_-_05_-_Radetzky_March_303.mp3');
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  wid = width + 15;
  plusx = (TWO_PI/3 / period) * distance;
  yvalues = new Array(floor(wid/distance));

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {


//background
backgroundImage(mybackground);

//song
var volume = 0;
if (mouseX > width/2) {
  background(33, 229, 254,20);
  if (mySong.isPlaying() == false) {
    mySong.play();
  }
//get the volume and remap it to a bigger value
  volume = analyzer.getLevel();
  volume = map(volume,0,1,0,height);
} else {
  background(255, 175, 238,100);
  mySong.stop();
}

//pixel color ellipse
push();
var thisX = random(0,width);
var thisY = random(0,height);
var col = get(thisX, thisY);
fill(col);
noStroke();
ellipse(thisX, thisY, random(0,60), random(0,60));
pop();

//waves call function
amplitudeWave();
displayWave();
amplitudeWave2();
displayWave2();
amplitudeWave3();
displayWave3();

//mermaid
image(myImage, width/2+volume/2, height/3+volume/4, myImage.width*0.7+volume/5, myImage.height*0.7+volume/5);
//fish1
image(myImage2, width/3-volume, height/2+volume/3, myImage2.width/7+volume/12, myImage2.height/7+volume/12);
//fish2
image(myImage3, width/5+volume/2, height/3+volume/3, myImage3.width/7+volume/7.5, myImage3.height/7+volume/7.5);

//bubbles
stroke(255,100);
strokeWeight(2);
fill(255,50);
ellipse(width/8+volume,height/3+volume/15,volume/14);
ellipse(width/15+volume/20,2*height/3+volume/5,volume/16);
ellipse(width/10+volume,height-volume/5,volume/10);
ellipse(4*width/5+volume/2,height/2-volume/4,volume/16);
ellipse(3*width/4+volume/3,4*height/5+volume/2,volume/10);
ellipse(width/2+volume,6*height/7+volume/15,volume/14);

}

function amplitudeWave() {
  var vol = analyzer.getLevel();
  ang += vol/2;
  var x = ang;
  //sin
  for (var a = 0; a < yvalues.length; a++) {
    yvalues[a] = sin(x)*hw;
    x+=plusx;
  }
}

function displayWave() {
  noStroke();
  fill(255,200);
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*distance, height/5+yvalues[x], random(0,14), 10);
  }
}

function amplitudeWave2() {
  var vol = analyzer.getLevel();
  ang += vol/2;
  var x = ang;
  //sin2
  for (var a = 0; a < yvalues.length; a++) {
    yvalues[a] = cos(x)*hw;
    x+=plusx;
  }
}

function displayWave2() {
  noStroke();
  fill(255,140);
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*distance, height/4.8+yvalues[x],random(0,10),10);
  }
}

function amplitudeWave3() {
  var vol = analyzer.getLevel();
  ang += vol;
  var x = ang;
  //sin2
  for (var a = 0; a < yvalues.length; a++) {
    yvalues[a] = sin(x)*wid/2;
    x+=plusx;
  }
}

function displayWave3() {
  noStroke();
  fill(255,100);
  for (var x = 0; x < yvalues.length; x++) {
    ellipse(x*distance, height/4+yvalues[x], random(0,25), random(0,25));
  }
}

function backgroundImage(mybackground) {
  push();
  translate(width/2,height/2);
  imageMode(CENTER);
  let scale = Math.max(width/mybackground.width,height/mybackground.height);
  image(mybackground,0,0,mybackground.width*scale,mybackground.height*scale)
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
