function generatePairs() { //make start point (0,0) and end point (5,3)
    var pairs = [
        [0, 0],
        [5, 3] 
    ];

    for (var i = 0; i < 3; i++) {
        var uniquePair = generateUniquePair(pairs);
        pairs.push(uniquePair);
    }

    var temp = pairs[1];
    pairs[1] = pairs[4];
    pairs[4] = temp;

    return pairs;
}

function generateUniquePair(existingPairs) { // generate pair that never exist before
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

function createCircles(pairs) { // make circle at the location base on pair
    var rectangle = document.getElementById('rectangle');
    rectangle.innerHTML = '';

    var grid = document.createElement('div');
    grid.className = 'grid';

    for (var i = 0; i < 5; i++) {
        var pair = pairs[i];
        var a = pair[0];
        var b = pair[1];

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

function buttonclick() {
    var pairs = generatePairs();
    createCircles(pairs);
    createCanvasLines(pairs); // Call function to draw lines
}

function createCanvasLines(pairs) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define the line colors and widths
    var lineColors = ['blue', 'green', 'purple', 'orange'];
    var lineWidth = 2;

    for (var i = 0; i < pairs.length - 1; i++) {
        var startX = (pairs[i][0] + 1.5) * 80; // x-coordinate of the starting point (middle of the circle)
        var startY = (pairs[i][1] + 1.5) * 80; // y-coordinate of the starting point (middle of the circle)
        var endX = (pairs[i + 1][0] + 1.5) * 80; // x-coordinate of the ending point (middle of the circle)
        var endY = (pairs[i + 1][1] + 1.5) * 80; // y-coordinate of the ending point (middle of the circle)

        ctx.beginPath();
        ctx.moveTo(startX, startY); // Move to the middle of the starting circle
        ctx.lineTo(endX, endY); // Draw line to the middle of the next circle
        ctx.strokeStyle = lineColors[i]; // Set line color
        ctx.lineWidth = lineWidth; // Set line width
        ctx.stroke();
    }
}

var currentLineIndex = 0;

function buttonclick() {
    pairs = generatePairs();
    createCircles(pairs);
    currentLineIndex = 0; // Reset current line index
    drawLine(currentLineIndex); // Draw the first line initially
}

var pairs = []; // Initialize pairs globally
var lineColors = ['blue', 'green', 'purple', 'orange', 'gray']; // Define line colors, with the last color being gray

function nextLine() {
    currentLineIndex++;
    if (currentLineIndex < pairs.length - 1) {
        drawLine(currentLineIndex);
    }
}

function drawLine(index) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw previous lines with a gray trace
    for (var i = 0; i < index; i++) {
        ctx.beginPath();
        ctx.moveTo((pairs[i][0] + 1.5) * 80, (pairs[i][1] + 1.5) * 80);
        ctx.lineTo((pairs[i + 1][0] + 1.5) * 80, (pairs[i + 1][1] + 1.5) * 80);
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw current line
    ctx.beginPath();
    ctx.moveTo((pairs[index][0] + 1.5) * 80, (pairs[index][1] + 1.5) * 80);
    ctx.lineTo((pairs[index + 1][0] + 1.5) * 80, (pairs[index + 1][1] + 1.5) * 80);
    ctx.strokeStyle = lineColors[index];
    ctx.lineWidth = 2;
    ctx.stroke();
}