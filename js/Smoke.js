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
  obj.cx = cnv.width / 2;
  obj.cy = cnv.height / 2;
  obj.lastTimeStamp = null;
  
  let Particle = function(particles) {
    this.x = obj.cx;
    this.y = obj.cy;
    this.r = 4;
    this.acc_x = 0;
    this.acc_y = 0;
    this.vel_x = Math.random() * 0.1 - 0.05;
    this.vel_y = -0.2;
    this.m = 1;
    this.lifeSpan = 100;
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
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
  
  let ParticleSystem = function() {
    this.particles = [];
    this.addParticle = function() {
      this.particles.push(new Particle());
      console.log(this.particles.length);
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
      ctx.fillStyle="white";
      for(let i = 0; i < this.particles.length; i++) {
        this.particles[i].render(ctx);
      }
    }
  }
  
  obj.particleSystem = new ParticleSystem();
  
  obj.drawFrm = function(timeStamp) {
    if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
    if ((timeStamp - obj.lastTimeStamp) > 30) {
      obj.lastTimeStamp = timeStamp;

      obj.ctx.fillStyle="black";
      obj.ctx.rect(0, 0, obj.w, obj.h);
      obj.ctx.fill();
      
      obj.particleSystem.addParticle();
      obj.particleSystem.render(obj.ctx);
      obj.particleSystem.update();
    }
    
    requestAnimationFrame(obj.drawFrm);
  }
  
  requestAnimationFrame(obj.drawFrm);
}
