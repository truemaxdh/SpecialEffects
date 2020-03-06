SpecialEffects.ScratchMosaic = function(el, msg, font, color, subMsg, subFont, cubColor, bgColor, fwColor) {
  
  var cnv_bg = document.createElement("CANVAS");
  cnv_bg.style.position = "absolute";
  cnv_bg.style.left = "0";
  cnv_bg.style.top = "0";
  cnv_bg.style.width = el.width + "px";
  cnv_bg.style.heght = el.height + "px";
  cnv_bg.id = "cnv_bg";
  el.appendChild(cnv_bg);

  var cnv_fw = document.createElement("CANVAS");
  cnv_fw.style.position = "absolute";
  cnv_fw.style.left = "0";
  cnv_fw.style.top = "0";
  cnv_fw.style.width = el.width + "px";
  cnv_fw.style.heght = el.height + "px";
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

  this.ScratchMosaic.w = w;
  this.ScratchMosaic.h = h;
  this.ScratchMosaic.ctx_bg = ctx_bg;
  this.ScratchMosaic.ctx_fw = ctx_fw;

  requestAnimationFrame(this.ScratchMosaic.frame);
};
  
SpecialEffects.ScratchMosaic.frame = function() {
  var w = this.ScratchMosaic.w;
  var h = this.ScratchMosaic.h;
  var ctx_bg = this.ScratchMosaic.ctx_bg;
  var ctx_fw = this.ScratchMosaic.ctx_fw;

  for (var i = 0; i < 10; i++) {
    var x = Math.random() * (w - 20);
    var y = Math.random() * h;

    ctx_fw.globalCompositeOperation = 'destination-out';
    ctx_fw.fillStyle = "rgba(0, 0, 0, 1)";
    ctx_fw.fillRect(x,y,20,1);	
  }

  requestAnimationFrame(this.ScratchMosaic.frame);
}

    
