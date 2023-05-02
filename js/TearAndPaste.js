if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.tearAndPaste = function(el) {
  console.log(el.style);
  
  const obj = this.tearAndPaste;
  obj.objName = "tearAndPaste";
  this.runningObj = obj;

  const cnv = ReplaceCanvas(el);
  cnv.style.position = "relative";
  
  obj.ctx = cnv.getContext("2d");
  obj.w = cnv.width;
  obj.h = cnv.height;
  obj.lastTimeStamp = null;
  obj.imgOri = new Image();
  //obj.imgOri.src = "images/wallpaperbetter.jpg";
  obj.imgOri.src = "https://truemaxdh.github.io/SpecialEffects/images/wallpaperbetter.jpg";
  obj.imgOri.crossOrigin = 'Anonymous';
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
    obj.ctx.fillStyle="beige";
    obj.ctx.rect(0, 0, obj.w, obj.h);
    obj.ctx.fill();
    
    obj.drawFrm();
  }
  
  obj.drawFrm = function(timeStamp) {
    if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
    if ((timeStamp - obj.lastTimeStamp) > 10) {
      obj.lastTimeStamp = timeStamp;

      const cx = getRndInt(0, obj.w);
      const cy = getRndInt(0, obj.h);
      const r = Math.random() * Math.min(obj.w, obj.h) * 0.03;
      let pos = 4 * (cy * obj.w + cx);
      obj.ctx.beginPath();
      obj.ctx.fillStyle = getRGBStr(obj.imgData[pos++], obj.imgData[pos++], obj.imgData[pos]);
      obj.ctx.rect(cx - r, cy - r, 2 * r, 2 * r);
      obj.ctx.fill();
    }
    
    if (specialEffects.runningObj.objName == obj.objName)
      requestAnimationFrame(obj.drawFrm);
  }
  
}


