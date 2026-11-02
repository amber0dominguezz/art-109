
function setup() {
    const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.addClass('site-background-canvas');
    angleMode(DEGREES);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(227, 185, 231)

    rotateX(60)
    scale(min(windowWidth, windowHeight) / 400)

    noFill()
    stroke(255)

    for (var i = 0; i < 50; i++) {

        var r = map(sin(frameCount / 2), -1, 1, 100, 255)
        var g = map(i, 0, 20, 100, 200)
        var b = map(cos(frameCount), -1, 1, 200, 100)

        stroke(r, g, b)

        rotate(5)

        beginShape()
        for (var j = 0; j < 360; j += 60) {
            var rad = i * 3
            var x = rad * cos(j)
            var y = rad * sin(j)
            var z = sin(frameCount * 2 + i * 5) * 50

            vertex(x, y, z)
        }
        endShape(CLOSE)
    }
}
