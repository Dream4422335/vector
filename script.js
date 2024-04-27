window.onload = function() {
    buttonclick();
};

function generatePairs() { 
    var pair = [
        [0, 0],
        [5, 3] 
    ];

    for (var i = 0; i < 3; i++) {
        var uniquePair = generateUniquePair(pair);
        pair.push(uniquePair);
    }

    var temp = pair[1];
    pair[1] = pair[4];
    pair[4] = temp;

    return pair;
}

function generateUniquePair(existingPairs) {
    var a, b;
    var isUnique = false;

    while (!isUnique) {

        if (existingPairs.length === 2) {
            a = Math.floor(Math.random() * 4) + 1;
        }
        if (existingPairs.length === 3) {
            a = Math.floor(Math.random() * 3) + 2;
        }
        if (existingPairs.length === 4) {
            a = Math.floor(Math.random() * 3) + 1;
        }
        b = Math.floor(Math.random() * 4);

        var isPairUnique = true;
        for (var j = 0; j < existingPairs.length; j++) {
            if (existingPairs[j][0] === a && existingPairs[j][1] === b) {
                isPairUnique = false;
                break;
            }
        }

        if (isPairUnique) {
            isUnique = true;
        }
    }

    return [a, b];
}

function createCircles(pairs) {
    var rectangle = document.getElementById('rectangle');
    rectangle.innerHTML = '';

    var grid = document.createElement('div');
    grid.className = 'grid';

    for (var i = 0; i < 5; i++) {
        var pairss = pairs[i];
        var a = pairss[0];
        var b = pairss[1];

        var circle = document.createElement('div');
        circle.className = 'circle';

        var text = document.createTextNode(i + 1);
        circle.appendChild(text);

        var gridX = a;
        var gridY = b;

        circle.style.gridColumn = gridX + 1;
        circle.style.gridRow = gridY + 1;

        if (i === 0 || i === 4) {
            circle.style.backgroundColor = 'black';
        } else {
            circle.style.backgroundColor = 'red';
        }
        grid.appendChild(circle);
    }

    rectangle.appendChild(grid);
}

var pairs;

function buttonclick() {
    var pairs = generatePairs();
    createCircles(pairs);
    createCanvasLines(pairs); 
}

function createCanvasLines(pairs) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   
    var lineColors = ['blue', 'green', 'purple', 'orange'];
    var lineWidth = 2;

    for (var i = 0; i < pairs.length - 1; i++) {
        var startX = (pairs[i][0] + 1.5) * 90; 
        var startY = (pairs[i][1] + 1.5) * 90; 
        var endX = (pairs[i + 1][0] + 1.5) * 90; 
        var endY = (pairs[i + 1][1] + 1.5) * 90; 

        ctx.beginPath();
        ctx.moveTo(startX, startY); 
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = lineColors[i]; 
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

var currentLineIndex = 0;

function buttonclick() {
    pairs = generatePairs();
    createCircles(pairs);
    currentLineIndex = 0; 
    drawLine(currentLineIndex); 
}

var pairs = []; 
var lineColors = ['blue', 'green', 'purple', 'orange', 'gray']; 


function nextLine() {
    currentLineIndex++;
    if (currentLineIndex < pairs.length - 1) {
        drawLine(currentLineIndex);
    }
}


function drawLine(index) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

 
    for (var i = 0; i < index; i++) {
        ctx.beginPath();
        ctx.moveTo((pairs[i][0] + 1.5) * 80, (pairs[i][1] + 1.5) * 80);
        ctx.lineTo((pairs[i + 1][0] + 1.5) * 80, (pairs[i + 1][1] + 1.5) * 80);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo((pairs[index][0] + 1.5) * 80, (pairs[index][1] + 1.5) * 80);
    ctx.lineTo((pairs[index + 1][0] + 1.5) * 80, (pairs[index + 1][1] + 1.5) * 80);
    ctx.strokeStyle = lineColors[index];
    ctx.lineWidth = 2;
    ctx.stroke();
}

var w=0,h=0;


function enterw(n){
    w = n;
    var imageElement = document.getElementById('imageToShow');
}

function enterh(n){
    h = n;
}

function submit(){
    checktrue(w,h,currentLineIndex);
}

function ChangeToNegativeButton(w,h){
    w = -w;
    h = -h;
}

function ChangeImageToNegative() {
    var posx = document.getElementsByClassName("positionx");
    var posy = document.getElementsByClassName("positiony");
    var negx = document.getElementsByClassName("negativex");
    var negy = document.getElementsByClassName("negativey");
    
    toggleDisplay(posx, negx);
    toggleDisplay(posy, negy);
}

function toggleDisplay(showElements, hideElements) {
    for (var i = 0; i < showElements.length; i++) {
        if (showElements[i].style.display === "block") {
            showElements[i].style.display = "none";
            hideElements[i].style.display = "block";
        } else {
            showElements[i].style.display = "block";
            hideElements[i].style.display = "none";
        }
    }
}

function negativeButton() {
    ChangeToNegativeButton(w,h);
    ChangeImageToNegative();
}

function checktrue(w,h){
    var ww = pairs[currentLineIndex+1][0] - pairs[currentLineIndex][0];
    var hh = pairs[currentLineIndex+1][1] - pairs[currentLineIndex][1];

    if(ww == w && hh == h)
    {
        nextLine();
    }
}

function nextLine() {
    currentLineIndex++;
    if (currentLineIndex < pairs.length - 1) {
        drawLine(currentLineIndex);
    } else {
        alert("เก่งมากน้อง");
    }
}

