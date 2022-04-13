class Obstacle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    show() {
        stroke(0);
        strokeWeight(1);
        fill(255, 255, 255);
        push();
        rect(x, y, width, height);
        pop();
    }
}