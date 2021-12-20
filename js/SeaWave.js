// unitWave
class _wave {
  constructor(h) {
    this.h = h;
    this.cy = Math.random() * h;
    this.r = getRndInt(h * 0.2, h);
    this.dy = ((Math.random() < 0.5) ? 1 : -1) * getRndInt(h * 0.0001, h * 0.01);
  }

  move() {
    this.cy += this.dy;
    this.cy %= this.h;
    if (Math.random() < 0.1) {
      this.dy *= -1;
    }
  }
  
  render(ctx) {
    const w = ctx.canvas.width;
    let grd = ctx.createLinearGradient(0, 0, 0, this.r * 2);
    grd.addColorStop(0, "rgba(0,0,255,0.1)");
    grd.addColorStop(0.5, "rgba(255,255,255,0.1)");
    grd.addColorStop(1, "rgba(0,0,255,0.1)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, this.cy - this.r, w, this.r * 2);
  }
}


if (typeof specialEffects === 'undefined' || !specialEffects) {
    specialEffects = {};
  }
  
  specialEffects.seaWave = function(el) {
    console.log(el.style);
    
    var cnv = document.createElement("CANVAS");
    cnv.style.position = "relative";
    cnv.style.width = el.style.width;
    cnv.style.height = el.style.height;
    cnv.id = "cnv";
    cnv.width = cnv.style.width.replace("px","");
    cnv.height = cnv.style.height.replace("px","");
    el.appendChild(cnv);
  
    const obj = this.seaWave; 
    obj.ctx = cnv.getContext("2d");
    obj.w = cnv.width;
    obj.h = cnv.height;
    obj.cnt = getRndInt(10, 50);
    //obj.cnt = 1;
    obj.waves = [];
    
    obj.init = ()=>{
      while(obj.waves.length < obj.cnt) {
        obj.waves.push(new _wave(obj.h));
      }
    }

    obj.drawFrm = (timeStamp)=>{
      if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
      if ((timeStamp - obj.lastTimeStamp) > 30) {
        obj.lastTimeStamp = timeStamp;
        
        obj.ctx.fillStyle = "white";
        obj.ctx.fillRect(0, 0, obj.w, obj.h);
        obj.waves.forEach((wave)=>{
          wave.render(obj.ctx);
          wave.move();
        });
      }
    
      requestAnimationFrame(obj.drawFrm);
    }

    obj.init();
    obj.drawFrm();
  }
  
  