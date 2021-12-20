if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

// snow
class _snow {
  constructor(cx, cy, r, dy) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.dy = dy;
  }
}

specialEffects.fallingSnows = function(el) {
  console.log(el.style);
  
  const obj = this.fallingSnows;
  obj.objName = "fallingSnows";
  this.runningObj = obj;

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
  var obj = specialEffects.fallingSnows;
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
    obj.ctx.strokeStyle="#ccc";
    
    for (var i = 0; i < obj.snows.length; i++) {
      var b = obj.snows[i];
      obj.ctx.lineWidth = b.r * 0.7;
      for (var j = 0; j < 3; j++) {        
        obj.ctx.beginPath();
        var rad = j * Math.PI / 3;
        obj.ctx.moveTo(b.cx - Math.cos(rad) * b.r, b.cy - Math.sin(rad) * b.r);
        obj.ctx.lineTo(b.cx + Math.cos(rad) * b.r, b.cy + Math.sin(rad) * b.r);
        obj.ctx.stroke();
      }
      b.cy += b.dy;
      if (b.cy > obj.h) {
        obj.snows.splice(i--, 1);
      }
    }
    
    //console.log(obj.snows.length);
    if (obj.snows.length < 100 && Math.random() < 0.2) {
      obj.snows.push( 
        new _snow(
          Math.random() * obj.w, 
          0,
          Math.min(obj.w, obj.h) * (Math.random() * 0.015 + 0.005),
          (obj.h * 0.005 + Math.random() * obj.h * 0.02)
        )
      );
      //console.log(obj.snows);
    }  

  }

  if (specialEffects.runningObj.objName == obj.objName)
    requestAnimationFrame(obj.drawFrm);
}
