if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.scratchMosaic = function(el, msg, font, color, subMsg, subFont, subColor, bgColor, fwColor) {
  console.log(el);
  var cnv_bg = document.createElement("CANVAS");
  cnv_bg.style.position = "absolute";
  cnv_bg.style.left = el.style.left + "px";
  cnv_bg.style.top = el.style.top + "px";
  cnv_bg.style.width = el.style.width + "px";
  cnv_bg.style.heght = el.style.height + "px";
  cnv_bg.id = "cnv_bg";
  el.appendChild(cnv_bg);

  var cnv_fw = document.createElement("CANVAS");
  cnv_fw.style.position = "absolute";
  cnv_fw.style.left = el.style.left + "px";
  cnv_fw.style.top = el.style.top + "px";
  cnv_fw.style.width = el.style.width + "px";
  cnv_fw.style.heght = el.style.height + "px";
  cnv_fw.id = "cnv_fw";
  el.appendChild(cnv_fw);

  var ctx_bg = cnv_bg.getContext("2d");
  var ctx_fw = cnv_fw.getContext("2d");
  var w = cnv_bg.width;
  var h = cnv_bg.height;

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

  requestAnimationFrame(specialEffects.scratchMosaic.drawFrm);
}

    
