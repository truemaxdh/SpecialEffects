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

specialEffects.pointillism = function(el) {
  console.log(el.style);
  
  var cnv = document.createElement("CANVAS");
  cnv.style.position = "relative";
  cnv.style.width = el.style.width;
  cnv.style.height = el.style.height;
  cnv.id = "cnv";
  cnv.width = cnv.style.width.replace("px","");
  cnv.height = cnv.style.height.replace("px","");
  el.appendChild(cnv);

  var obj = this.pointillism;
  obj.ctx = cnv.getContext("2d");
  obj.w = cnv.width;
  obj.h =cnv.height;
  obj.imgOri = new Image();
  obj.imgOri.src = "images/20170727_130136.jpg";
  obj.lastTimeStamp = null;
  
  obj.drawFrm = function(timeStamp) {
    var obj = this.pointillism;
    if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
    if ((timeStamp - obj.lastTimeStamp) > 1000) {
      obj.lastTimeStamp = timeStamp;

      // clear
      obj.ctx.globalCompositeOperation = "source-over";
      obj.ctx.beginPath();
      obj.ctx.fillStyle="black";
      obj.ctx.rect(0, 0, obj.w, obj.h);
      obj.ctx.fill();

      // draw
      obj.ctx.drawImage(obj.imgOri, 0, 0);
      obj.ctx.beginPath();
      var d = Math.min(obj.imgOri.width, obj.imgOri.height) / 50;
      for (var y = d; y < obj.imgOri.height; y+=d) {
        for (var x = d; x < obj.imgOri.width; x+=d) {
          var color = obj.ctx.getImageData(x, y, 1, 1);
          obj.ctx.fillStyle="rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
          obj.ctx.rect(x - d / 2, y - d / 2, d, d);       
        }
      }
      obj.ctx.fill();
    }

    requestAnimationFrame(obj.drawFrm);
  }
  obj.drawFrm();
}
