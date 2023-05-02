if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.fierySun = function(el) {
  console.log(el.style);
  
  const obj = this.fierySun;
  obj.objName = "fierySun";
  this.runningObj = obj;

  const cnv = ReplaceCanvas(el);
  cnv.style.position = "relative";
  
  this.fierySun.ctx = cnv.getContext("2d");
  this.fierySun.w = cnv.width;
  this.fierySun.h = cnv.height;
  this.fierySun.r = Math.min(cnv.width, cnv.height) * (0.2 + Math.random() * 0.8);
  this.fierySun.cx = cnv.width * Math.random();
  this.fierySun.cy = cnv.height * Math.random();
  this.fierySun.div = Math.floor(12 + 58 * Math.random()) * 2;
  this.fierySun.bgr = {r:255, g:0, b:0};
  this.fierySun.lastTimeStamp = null;
  this.fierySun.getNewC = function(c) {
    c += Math.random() * 3 - 1;
    if (c < 0) c = 0;
    if (c > 255) c = 255;
    return c;
  }
  this.fierySun.drawFrm();
}

specialEffects.fierySun.drawFrm = function(timeStamp) {
  var obj = specialEffects.fierySun
  if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
  if ((timeStamp - obj.lastTimeStamp) > 150) {
    obj.lastTimeStamp = timeStamp;
    obj.ctx.fillStyle = "DeepSkyBlue";
    obj.ctx.fillRect(0, 0, obj.w, obj.h);
    obj.bgr.b = obj.getNewC(obj.bgr.b);
    obj.bgr.g = obj.getNewC(obj.bgr.g);
    obj.bgr.r = obj.getNewC(obj.bgr.r);
   
    obj.ctx.fillStyle = "rgb(" + obj.bgr.r + "," + obj.bgr.g + "," + obj.bgr.b + ")";
    obj.ctx.beginPath();
    
    for (var i = 0; i < obj.div; i++) {
      var rad = i * 2 * Math.PI / obj.div;
      var tmp_r = obj.r - (Math.random() * 5 - 2);
      var x = obj.cx + tmp_r * Math.cos(rad);
      var y = obj.cy + tmp_r * Math.sin(rad);

      // draw
      if (i == 0) {
        obj.ctx.moveTo(x, y);
      } else {
        obj.ctx.lineTo(x, y);
      }

    }
    obj.ctx.fill();
  }

  if (specialEffects.runningObj.objName == obj.objName)
    requestAnimationFrame(obj.drawFrm);
}
