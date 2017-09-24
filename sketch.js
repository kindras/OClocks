/* 
Tentative to reproduce John Maeda's classic 12 o'clocks (number 4).
http://cmuems.com/2016/60212/lectures/lecture-09-09b-clocks/maedas-clocks/
Inspiration for dev: Daniel Shiffman's coding train:
https://www.youtube.com/user/shiffman
*/

/* 
Define numbers to display
-000----1----222---333-----4--55555--666--77777--888---999-    
0---0--11---2---2-3---3---44--5-----6---------7-8---8-9---9
0---0---1-------2-----3--4-4--5555--6666------7-8---8-9---9
0---0---1------2----33--4--4------5-6---6----7---888--9---9
0---0---1-----2-------3-44444-----5-6---6---7---8---8--9999
0---0---1----2--------3----4--5---5-6---6---7---8---8-----9
-000--11111-22222--333-----4---555---666----7----888---999-
*/
const numbers =
[[ 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0 ]
,[ 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0 ]
,[ 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1 ]
,[ 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0 ]
,[ 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0 ]
,[ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0 ]
,[ 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0 ]
,[ 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0 ]
,[ 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0 ]
,[ 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0 ]];

var prevSeconds;
var hueR;   
var step = 30;
var prev = [];              
const spacing = 2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    colorMode(HSB);

    hueR = 50;
    prevSeconds = second();

    prev.push({ hours: hour(), minutes: minute(), seconds: second(), color:hueR });
}

function draw() {
    const hours = hour();
    const minutes = minute();
    const seconds = second();
    let displayed;

    if(seconds != prevSeconds) {
        prevSeconds = seconds;
        if(prev.length > 60) {
            prev.shift();
        }
        hueR += 7;
        prev.push({ hours: hours, minutes: minutes, seconds: seconds, color: hueR });

        hueR = hueR % 255;
    }
    background(01);
    translate(50 + spacing * prev.length, height/2 + 250 - spacing * prev.length);

    for (var index = 0; index < prev.length; ++index) {

        const element = prev[index];
        if(index == prev.length - 1) { stroke(color(0, 0, 255)); strokeWeight(3); }
        else { stroke(color(element.color, 255, 127)); strokeWeight(1); }
        noFill();

        displayed = numbers[floor(element.hours / 10)];
        if(displayed != 0) {
            drawArray(displayed, 0);
        }
        displayed = numbers[element.hours % 10];
        drawArray(displayed, 6 * step);

        displayed = numbers[floor(element.minutes / 10)];
        if(displayed != 0) {
            drawArray(displayed, 16 * step);
        }
        displayed = numbers[element.minutes % 10];
        drawArray(displayed, 22 * step);

        displayed = numbers[floor(element.seconds / 10)];
        if(displayed != 0) {
            drawArray(displayed, 32 * step);
        }
        displayed = numbers[element.seconds % 10];
        drawArray(displayed, 38 * step);

        drawRectangle(13 * step, 2 * step);
        drawRectangle(13 * step, 5 * step);

        drawRectangle(29 * step, 2 * step);
        drawRectangle(29 * step, 5 * step);

        translate(-spacing,spacing);
    }
}

function drawRectangle(startX, startY) {
    beginShape();
    vertex(startX, startY );
    vertex(startX + step,startY);
    vertex(startX + step,startY + step);
    vertex(startX,startY + step );
    endShape(CLOSE);
}

function drawArray(toDisplay, offset) {
    for(let i = 0; i < 5; ++i) {
        for(let j = 0; j < 7; ++j) {
            if(toDisplay[j*5+i]) {
                drawRectangle(offset + i*step, j*step);
            }
        }
    }
}
