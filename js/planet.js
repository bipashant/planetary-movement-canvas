class Planet {
  constructor(x, y, radius, color, velocity, orbitRadius, show) {
      this.x = x;
      this.y = y;
      this.startX = x;
      this.startY = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
      this.radian = 0;
      this.orbitRadius = orbitRadius;
      this.path = [];
      this.show = show;
  }

  draw() {
      if(this.show){
        // Planet Path
        c.beginPath();
        c.lineWidth = 2;
        c.arc(
            this.startX,
            this.startY,
            this.orbitRadius,
            0,
            Math.PI * 2,
            false
        );
        c.strokeStyle = 'rgba(255, 255, 255, 0.55)';
        c.stroke();

        // Planet
      
        c.shadowBlur = 15;
        c.shadowColor = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.shadowBlur = 0;
      }
      
  }

  updatePosition() {
      this.draw();
      if (this.velocity > 0) {
          this.radian += this.velocity;
          this.x = this.startX + Math.cos(this.radian) * this.orbitRadius;
          this.y = this.startY + Math.sin(this.radian) * this.orbitRadius;
          this.path.push({x: this.x, y: this.y});
      }
  }
}