if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.lighterOverlay = function(el, shapeCnt, bgColor) {
  console.log(el.style);
  var cnv_bg = document.createElement("CANVAS");
  cnv_bg.style.position = "relative";
  cnv_bg.style.width = el.style.width;
  cnv_bg.style.height = el.style.height;
  cnv_bg.id = "cnv_bg";
  el.appendChild(cnv_bg);

  var ctx_bg = cnv_bg.getContext("2d");
  var w = cnv_bg.width;
  var h = cnv_bg.height;

  // ---------
  // bg canvas
  // ---------
  ctx_bg.fillStyle = bgColor;
  ctx_bg.fillRect(0, 0, w, h);

  this.lighterOverlay.w = w;
  this.lighterOverlay.h = h;
  this.lighterOverlay.shapeCnt = shapeCnt;
  this.lighterOverlay.ctx_bg = ctx_bg;

  this.lighterOverlay.drawFrm();
};
  
specialEffects.lighterOverlay.drawFrm = function() {
  var w = specialEffects.lighterOverlay.w;
  var h = specialEffects.lighterOverlay.h;
  var ctx_bg = specialEffects.lighterOverlay.ctx_bg;

  var cx = Math.random() * w;
  var cy = Math.random() * h;
  var r = Math.random() * ((w > h) ? (h / 10) : (w / 10));
  var rgb = "rgba(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")";

  ctx_bg.globalCompositeOperation = 'lighter';
  ctx_bg.beginPath();
  ctx_bg.fillStyle = rgb;
  ctx_bg.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx_bg.fill();	

  if (--specialEffects.lighterOverlay.shapeCnt > 0)
    setTimeout(specialEffects.lighterOverlay.drawFrm, 500);
}
