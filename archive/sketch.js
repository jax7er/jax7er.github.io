function s(p) {
    let angle, hue, sat, bri;
    let spacing = 100;
    let length = spacing / 4;
    let diagonal_px = 0;

    p.setup = function() {
        p.colorMode(p.HSB, 255)
        p.createCanvas(100, 100);
        p.windowResized();
        p.background(0);
        p.noCursor();
    }

    p.draw = function() {
        p.background(0);

        p.noFill();
        for (let x = spacing / 2; x < p.windowWidth; x += spacing) {
            for (let y = spacing / 2; y < p.windowHeight; y += spacing) {
                angle = p.atan2(p.mouseY - y, p.mouseX - x);
                hue = 255 * ((angle + p.TWO_PI) % p.TWO_PI) / p.TWO_PI;
                sat = 255 * (1 - 2 * p.sqrt(p.sq(x - p.mouseX) + p.sq(y - p.mouseY)) / diagonal_px);
                bri = 128;
                p.push();
                p.stroke(hue, sat, bri);
                p.translate(x, y);
                p.rotate(angle);
                p.line(-length, 0, length, 0);
                p.pop();
            }
        }
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth - 10, p.windowHeight - 10);
        diagonal_px = p.sqrt(p.sq(p.windowHeight) + p.sq(p.windowWidth));
    }
}

let myp5 = new p5(s, "p5bg")