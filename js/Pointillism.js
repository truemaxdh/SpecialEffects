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
  obj.sliceCnt = 25;
  obj.plusMinus = 1;
  obj.lastTimeStamp = null;
  obj.imgOri = new Image();
  obj.imgOri.src = "images/20170727_130136.jpg";
  obj.imgOri.onload = function() {
    var scale = Math.min(obj.w / obj.imgOri.width, obj.h / obj.imgOri.height);
    var w = obj.imgOri.width * scale;
    var h = obj.imgOri.height * scale;
    var l = (obj.w - w) / 2;
    var t = (obj.h - h) / 2;
    obj.ctx.fillStyle="beige";
    obj.ctx.rect(0, 0, obj.w, obj.h);
    obj.ctx.fill();
    obj.ctx.drawImage(obj.imgOri, l, t, w, h);
    obj.imgData = obj.ctx.getImageData(0, 0, obj.w, obj.h).data;
    obj.drawFrm();
  }
  
  obj.drawFrm = function(timeStamp) {
    if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
    if ((timeStamp - obj.lastTimeStamp) > 700) {
      obj.lastTimeStamp = timeStamp;

      obj.ctx.fillStyle="black";
      obj.ctx.rect(0, 0, obj.w, obj.h);
      obj.ctx.fill();
      var d = Math.max(obj.w, obj.h) / obj.sliceCnt;
      while (obj.y < obj.h) {
        while (obj.x < obj.w) {
          // draw
          obj.ctx.beginPath();
          var r = Math.floor(d / 2);
          var cx = cx1 = Math.floor(obj.x) + r;
          var cy = cy1 = Math.floor(obj.y) + r;
          if (cx >= obj.w) cx1 = obj.w - 1;
          if (cy >= obj.h) cy1 = obj.h - 1;
          var pos = 4 * (cy1 * obj.w + cx1);
          obj.ctx.fillStyle="rgb(" + obj.imgData[pos++] + "," + obj.imgData[pos++] + "," + obj.imgData[pos++] + ")";
          obj.ctx.arc(cx, cy, r, 0, 2 * Math.PI);
          obj.ctx.fill();

          obj.x += d;
        }
      
        obj.x = 0;
        obj.y += d;
      }
      obj.y = 0;
      obj.sliceCnt += obj.plusMinus;
      if (obj.sliceCnt <= 10) obj.plusMinus = 1;
      if (obj.sliceCnt >= 150) obj.plusMinus = -1;
    }
    
    requestAnimationFrame(obj.drawFrm);
  }
  
}


