if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.smoke = function(el) {
  console.log(el.style);
  
  var cnv = document.createElement("CANVAS");
  cnv.style.position = "relative";
  cnv.style.width = el.style.width;
  cnv.style.height = el.style.height;
  cnv.id = "cnv";
  cnv.width = cnv.style.width.replace("px","");
  cnv.height = cnv.style.height.replace("px","");
  el.appendChild(cnv);

  var obj = this.smoke;
  obj.ctx = cnv.getContext("2d");
  obj.w = cnv.width;
  obj.h = cnv.height;
  obj.lastTimeStamp = null;
  
  let Wind = function(x, y) {
    this.f_x = 0;
    this.f_y = 0;
    this.f_max = 0.001;
    this.f_min = -0.001;
    this.cx = x;
    this.cy = y;
    this.update = function(ctx) {
      this.f_x += Math.random() * 0.00001 - 0.000005;
      this.f_y += Math.random() * 0.00001 - 0.000005;
      if (this.f_x > this.f_max) this.f_x = this.f_max;
      if (this.f_x < this.f_min) this.f_x = this.f_min;
      if (this.f_y > this.f_max) this.f_y = this.f_max;
      if (this.f_y < this.f_min) this.f_y = this.f_min;
    }
    this.render = function(ctx) {
      let lineToX = this.cx + this.f_x * 300000;
      let lineToY = this.cy + this.f_y * 300000;
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle="lightblue";
      ctx.fillStyle="blue";
      ctx.arc(this.cx, this.cy, 4, 0, 4 * Math.PI);
      ctx.moveTo(this.cx, this.cy);
      ctx.lineTo(lineToX, lineToY);
      ctx.arc(lineToX, lineToY, 2, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
    }
  }
  
  let Particle = function(x, y, particles) {
    this.x = x;
    this.y = y;
    this.r = 15 + Math.random() * 10;
    this.acc_x = 0;
    this.acc_y = 0;
    this.vel_x = Math.random() * 0.5 - 0.25;
    this.vel_y = -0.4 - Math.random() * 0.6;
    this.m = 1;
    this.lifeSpan = 1000;
    this.particles = particles;
    this.applyForce = function(f_x, f_y) {
      this.acc_x += f_x / this.m;
      this.acc_y += f_y / this.m;
    }
    this.update = function() {
      --this.lifeSpan;
      this.x += this.vel_x;
      this.y += this.vel_y;
      this.vel_x += this.acc_x;
      this.vel_y += this.acc_y;
    }
    this.render = function(ctx) {
      ctx.beginPath();
      ctx.fillStyle="rgba(255, 255, 255, 0.05)";
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  let ParticleSystem = function(cx, cy) {
    this.cx = cx;
    this.cy = cy;
    this.particles = [];
    this.addParticle = function() {
      this.particles.push(new Particle(this.cx, this.cy, this.particles));
    }
    this.applyForce = function(f_x, f_y) {
      for(let i = 0; i < this.particles.length; i++) {
        this.particles[i].applyForce(f_x, f_y);
      }
    }
    this.update = function() {
      for(let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].update();
        if (this.particles[i].lifeSpan <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }
    this.render = function(ctx) {
      for(let i = 0; i < this.particles.length; i++) {
        this.particles[i].render(ctx);
      }
    }
  }
  
  obj.particleSystem = new ParticleSystem(cnv.width / 2, cnv.height * 4 / 5);
  obj.wind = new Wind(cnv.width / 2, cnv.height / 5);
  
  obj.drawFrm = function(timeStamp) {
    if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
    if ((timeStamp - obj.lastTimeStamp) > 20) {
      obj.lastTimeStamp = timeStamp;

      obj.ctx.fillStyle="black";
      obj.ctx.rect(0, 0, obj.w, obj.h);
      obj.ctx.fill();
      
      obj.particleSystem.addParticle();
      obj.particleSystem.render(obj.ctx);
      obj.wind.render(obj.ctx);
      
      obj.particleSystem.applyForce(obj.wind.f_x, obj.wind.f_y);
      obj.particleSystem.update();
      obj.wind.update();
    }
    
    requestAnimationFrame(obj.drawFrm);
  }
  
  requestAnimationFrame(obj.drawFrm);
}
