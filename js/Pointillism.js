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
  obj.d = Math.max(obj.w, obj.h) / 25;
  obj.lastTimeStamp = null;
  obj.imgOri = new Image();
  obj.imgOri.src = "images/20170727_130136.jpg";
  obj.imgOri.onload = function() {
    var scale = Math.min(obj.w / obj.imgOri.width, obj.h / obj.imgOri.height);
    var w = obj.imgOri.width * scale;
    var h = obj.imgOri.height * scale;
    var l = (obj.w - w) / 2;
    var t = (obj.h - h) / 2;
    obj.ctx.drawImage(obj.imgOri, l, t, w, h);
    obj.imgData = obj.ctx.getImageData(0, 0, obj.w, obj.h).data;
    obj.drawFrm();
  }
  
  obj.drawFrm = function(timeStamp) {
    if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
    if ((timeStamp - obj.lastTimeStamp) > 30) {
      obj.lastTimeStamp = timeStamp;

      obj.ctx.fillStyle="black";
      obj.ctx.rect(0, obj.y, obj.w, obj.d);
      obj.ctx.fill();

      while (obj.x < obj.w) {
        // draw
        obj.ctx.beginPath();
        var r = Math.floor(obj.d / 2);
        var cx = cx1 = Math.floor(obj.x) + r;
        var cy = cy1 = Math.floor(obj.y) + r;
        if (cx >= obj.w) cx1 = obj.w - 1;
        if (cy >= obj.h) cy1 = obj.h - 1;
        var pos = 4 * (cy1 * obj.w + cx1);
        obj.ctx.fillStyle="rgb(" + obj.imgData[pos++] + "," + obj.imgData[pos++] + "," + obj.imgData[pos++] + ")";
        obj.ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        obj.ctx.fill();

        obj.x += obj.d;
      }
      
      obj.x = 0;
      obj.y += obj.d;
      if (obj.y > obj.h) {
        obj.y = 0;
        obj.d = Math.max(obj.w, obj.h) / (10 + Math.random() * 90);
        setTimeout(obj.drawFrm, 1000);
        return;
      }
    }

    requestAnimationFrame(obj.drawFrm);
  }
  
}


