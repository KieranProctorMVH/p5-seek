class Vehicle {
    constructor(x, y, size) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.size = size;
        this.maxAcceleration = 1;
        this.maxSpeed = 1;
        this.maxForce = 0.1;
        this.hasCrashed = false;
    }

    show() {
        stroke(0);
        strokeWeight(1);
        fill(255);
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        triangle(-this.size, -this.size / 2, -this.size, this.size / 2, this.size, 0);
        pop();
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.set(0, 0);
    }

    canvasEdgeDetection() {
        // Hits edges on X axis.
        if ((this.position.x > width - this.size) || (this.position.x < -this.size)) {
            this.hasCrashed = true;
            this.velocity.set(0, 0);
        }

        // Hits edges on Y axis.
        if ((this.position.y > height - this.size) || (this.position.y < -this.size)) {
            this.hasCrashed = true;
            this.velocity.set(0, 0); 
        }
    }

    detectCrash(active) {
        if (active) {
            this.canvasEdgeDetection();
        }
    }

    showAids(active) {
        if (active) {

        }
    }
}