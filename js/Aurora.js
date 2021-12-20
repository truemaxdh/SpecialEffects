if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

// Bubbles
function _bubble(cx, cy, r, dx, dy, c, gco, dur) {
  this.cx = cx;
  this.cy = cy;
  this.r = r;
  this.dx = dx;
  this.dy = dy;
  this.color = c;
  this.gco = gco;
  this.duration = dur;
}

specialEffects.aurora = function(el) {
  console.log(el.style);
  
  const obj = this.aurora;
  obj.objName = "aurora";
  this.runningObj = obj;

  var cnv = document.createElement("CANVAS");
  cnv.style.position = "relative";
  cnv.style.width = el.style.width;
  cnv.style.height = el.style.height;
  cnv.id = "cnv";
  cnv.width = cnv.style.width.replace("px","");
  cnv.height = cnv.style.height.replace("px","");
  el.appendChild(cnv);

  this.aurora.ctx = cnv.getContext("2d");
  this.aurora.w = cnv.width;
  this.aurora.h =cnv.height;
  this.aurora.bubbles = [];
  this.aurora.lastTimeStamp = null;
  
  var cnt = 3 + Math.random() * 10;
  for (var i = 0; i < cnt; i++) {
    this.aurora.bubbles.push( 
      new _bubble(
        Math.random() * cnv.width, 
        Math.random() * cnv.height,
        Math.random() * Math.min(cnv.width, cnv.height) * 0.5 + Math.min(cnv.width, cnv.height) * 0.5,
        ((Math.random() < 0.5)?-1:1) * (Math.random() * 13 + 2),
        ((Math.random() < 0.5)?-1:1) * (Math.random() * 13 + 2),
        "" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255),
        "saturation",
        100
      )
    );
  }  
  
  this.aurora.drawFrm();
}

specialEffects.aurora.drawFrm = function(timeStamp) {
  var obj = specialEffects.aurora
  if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
  if ((timeStamp - obj.lastTimeStamp) > 30) {
    obj.lastTimeStamp = timeStamp;
    for (var i = 0; i < obj.bubbles.length; i++) {
      var b = obj.bubbles[i];

      // draw
      //ctx.globalCompositeOperation = (Math.random() < 0.998) ? "saturation" : "source-over";
      obj.ctx.globalCompositeOperation = b.gco;
      if (b.gco == "source-over")
        obj.ctx.globalAlpha = 0.2;
      else
        obj.ctx.globalAlpha = 1;

      obj.ctx.beginPath();
      const g = obj.ctx.createRadialGradient(
        b.cx, b.cy, b.r * 0.1, b.cx, b.cy, b.r
      );
      g.addColorStop(0, "rgba(" + b.color + ",1)");
      g.addColorStop(1, "rgba(" + b.color + ",0)");

      obj.ctx.fillStyle = g;
      obj.ctx.arc(b.cx, b.cy, b.r, 0, 2 * Math.PI);
      obj.ctx.fill();

      // bounce
      if ((b.cx + b.dx) < 0 || (b.cx + b.dx) >=  obj.w) b.dx *= -1;
      if ((b.cy + b.dy) < 0 || (b.cy + b.dy) >=  obj.h) b.dy *= -1;
      b.cx += b.dx;
      b.cy += b.dy;

      if (--b.duration <= 0) {
        //b.gco = (Math.random() < 0.998) ? "saturation" : "source-over";
        b.gco = (Math.random() < 0.5) ? "saturation" : "source-over";
        b.duration = Math.random() * 100 + 50;
      }
    }
  }

  if (specialEffects.runningObj.objName == obj.objName)
    requestAnimationFrame(obj.drawFrm);
}
