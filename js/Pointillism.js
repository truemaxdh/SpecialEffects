if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
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
  obj.x = 0;
  obj.y = 0;
  obj.d = Math.min(obj.w, obj.h) / 50;
  obj.lastTimeStamp = null;
  obj.imgOri = new Image();
  obj.imgOri.src = "images/20170727_130136.jpg";
  obj.ctx.drawImage(obj.imgOri, 0, 0, obj.w, obj.h);
  
  obj.drawFrm = function(timeStamp) {
    if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
    if ((timeStamp - obj.lastTimeStamp) > 30) {
      obj.lastTimeStamp = timeStamp;

      // draw
      obj.ctx.beginPath();
      var color = obj.ctx.getImageData(obj.x + obj.d / 2, obj.y + obj.d / 2, 1, 1).data;
      obj.ctx.fillStyle="rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
      obj.ctx.rect(obj.x, obj.y, obj.d, obj.d);       
      obj.ctx.fill();
      
      obj.x += obj.d;
      
      if (obj.x > obj.w) {
        obj.x = 0;
        obj.y += obj.d;
        if (obj.y > obj.h) {
          obj.y = 0;
        }
      }
    }

    requestAnimationFrame(obj.drawFrm);
  }
  obj.drawFrm();
}


