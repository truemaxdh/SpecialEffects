if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

// Bubbles
function _point(cx, cy, r, dx, dy, c, gco, dur) {
  this.cx = cx;
  this.cy = cy;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.color = c;
  this.gco = gco;
  this.duration = dur;
}

specialEffects.fierysun = function(el) {
  console.log(el.style);
  
  var cnv = document.createElement("CANVAS");
  cnv.style.position = "relative";
  cnv.style.width = el.style.width;
  cnv.style.height = el.style.height;
  cnv.id = "cnv";
  cnv.width = cnv.style.width.replace("px","");
  cnv.height = cnv.style.height.replace("px","");
  el.appendChild(cnv);

  this.fierysun.ctx = cnv.getContext("2d");
  this.fierysun.w = cnv.width;
  this.fierysun.h =cnv.height;
  this.fierysun.r = 50 + (Math.min(cnv.width, cnv.height) - 50) * Math.random();
  this.fierysun.cx = cnv.width * Math.random();
  this.fierysun.cy = cnv.height * Math.random();
  this.fierysun.lastTimeStamp = null;
  
  this.fierysun.drawFrm();
}

specialEffects.fierysun.drawFrm = function(timeStamp) {
  var obj = specialEffects.fierysun
  if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
  if ((timeStamp - obj.lastTimeStamp) > 30) {
    obj.lastTimeStamp = timeStamp;
    obj.ctx.fillStyle = "#FF0000";
    obj.ctx.beginPath();
    
    for (var i = 0; i < 24; i++) {
      var rad = i * Math.PI / 12;
      var x = obj.cx + obj.r * Math.cos(rad);
      var y = obj.cy + obj.r * Math.sin(rad);

      // draw
      if (i == 0) {
        obj.ctx.moveTo(x, y);
      } else {
        obj.ctx.lineTo(x, y);
      }

    }
  }

  requestAnimationFrame(specialEffects.aurora.drawFrm);
}
