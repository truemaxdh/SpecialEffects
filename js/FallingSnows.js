if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

// snow
function _snow(cx, cy, r, dy) {
  this.cx = cx;
  this.cy = cy;
  this.r = r;
  this.dy = dy;
}

specialEffects.fallingSnows = function(el) {
  console.log(el.style);
  
  var cnv = document.createElement("CANVAS");
  cnv.style.position = "relative";
  cnv.style.width = el.style.width;
  cnv.style.height = el.style.height;
  cnv.id = "cnv";
  cnv.width = cnv.style.width.replace("px","");
  cnv.height = cnv.style.height.replace("px","");
  el.appendChild(cnv);

  this.fallingSnows.ctx = cnv.getContext("2d");
  this.fallingSnows.w = cnv.width;
  this.fallingSnows.h =cnv.height;
  this.fallingSnows.snows = [];
  this.fallingSnows.lastTimeStamp = null;
  
  this.fallingSnows.drawFrm();
}

specialEffects.fallingSnows.drawFrm = function(timeStamp) {
  var obj = specialEffects.fallingSnows
  if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
  if ((timeStamp - obj.lastTimeStamp) > 30) {
    obj.lastTimeStamp = timeStamp;
    
    // clear
    obj.ctx.globalCompositeOperation = "source-over";
    obj.ctx.beginPath();
    obj.ctx.fillStyle="black";
    obj.ctx.rect(0, 0, obj.w, obj.h);
    obj.ctx.fill();
    
    // draw
    obj.ctx.globalCompositeOperation = "lighter";
    obj.ctx.shadowBlur = 3;
    obj.ctx.shadowColor = "black";
    obj.ctx.beginPath();
    for (var i = 0; i < obj.snows.length; i++) {
      var b = obj.snows[i];
      for (var i = 0; i < 3; i++) {
        var rad = i * Math.PI / 3;
        obj.ctx.moveTo(b.cx - Math.cos(rad) * b.r, b.cy - Math.sin(rad) * b.r);
        obj.ctx.lineTo(b.cx + Math.cos(rad) * b.r, b.cy + Math.sin(rad) * b.r);
      }
      b.cy += b.dy;
      if (b.cy > obj.h) {
        obj.snows.splice(i--);
      }
    }
    obj.ctx.stroke();
    
    if (Math.random() < 0.05) {
      obj.snows.push( 
        new _snow(
          Math.random() * cnv.width, 
          Math.random() * cnv.height,
          Math.min(cnv.width, cnv.height) * (Math.random() * 0.05 + 0.01),
          (1 + Math.random() * cnv.height * 0.05)
        )
      );
    }  

  }

  requestAnimationFrame(specialEffects.fallingSnows.drawFrm);
}
