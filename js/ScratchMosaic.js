if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.scratchMosaic = function(el, msg, font, color, subMsg, subFont, subColor, bgColor, fwColor) {
  const obj = this.scratchMosaic;
  obj.objName = "scratchMosaic";
  this.runningObj = obj;

  var cnv_bg = document.createElement("CANVAS");
  cnv_bg.style.position = "relative";
  //cnv_bg.style.left = el.style.left;
  //cnv_bg.style.top = el.style.top;
  cnv_bg.style.width = el.style.width;
  cnv_bg.style.height = el.style.height;
  cnv_bg.id = "cnv_bg";
  var _w = Number(cnv_bg.style.width.replace("px",""));
  var _h = Number(cnv_bg.style.height.replace("px",""));
  var _scale = Math.min(320 / _w, 240 / _h);
  var w = _w * _scale;
  var h = _h * _scale;
  cnv_bg.width = w;
  cnv_bg.height = h;
  el.appendChild(cnv_bg);

  var cnv_fw = document.createElement("CANVAS");
  cnv_fw.style.position = "relative";
  //cnv_fw.style.left = el.style.left;
  cnv_fw.style.top = "-" + el.style.height;
  cnv_fw.style.width = el.style.width;
  cnv_fw.style.height = el.style.height;
  cnv_fw.width = w;
  cnv_fw.height = h;
  cnv_fw.id = "cnv_fw";
  el.appendChild(cnv_fw);

  var ctx_bg = cnv_bg.getContext("2d");
  var ctx_fw = cnv_fw.getContext("2d");
  
  // ---------
  // bg canvas
  // ---------
  ctx_bg.fillStyle = bgColor;
  ctx_bg.fillRect(0, 0, w, h);

  // msg
  ctx_bg.font = font;
  ctx_bg.fillStyle = color;
  ctx_bg.textAlign = "center";
  ctx_bg.fillText(msg, w / 2, h / 2);

  // subMsg
  ctx_bg.font = subFont;
  ctx_bg.fillStyle = subColor;
  ctx_bg.fillText(subMsg, w / 2, h * 0.65);

  // ---------
  // fw canvas
  // ---------
  ctx_fw.fillStyle = fwColor;
  ctx_fw.fillRect(0, 0, w, h);

  this.scratchMosaic.w = w;
  this.scratchMosaic.h = h;
  this.scratchMosaic.ctx_bg = ctx_bg;
  this.scratchMosaic.ctx_fw = ctx_fw;

  requestAnimationFrame(this.scratchMosaic.drawFrm);
};
  
specialEffects.scratchMosaic.drawFrm = function() {
  const obj = specialEffects.scratchMosaic;
  var w = specialEffects.scratchMosaic.w;
  var h = specialEffects.scratchMosaic.h;
  var ctx_bg = specialEffects.scratchMosaic.ctx_bg;
  var ctx_fw = specialEffects.scratchMosaic.ctx_fw;

  for (var i = 0; i < 10; i++) {
    var x = Math.random() * (w - 20);
    var y = Math.random() * h;

    ctx_fw.globalCompositeOperation = 'destination-out';
    ctx_fw.fillStyle = "rgba(0, 0, 0, 1)";
    ctx_fw.fillRect(x,y,20,1);	
  }

  if (specialEffects.runningObj.objName == obj.objName)
    requestAnimationFrame(obj.drawFrm);
}

    
