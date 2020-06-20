if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.afterimage = function(el) {
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

  this.afterimage.w = w;
  this.afterimage.h = h;
  this.afterimage.ctx_bg = ctx_bg;
  
  this.afterimage.cx = 0;
  this.afterimage.cy = Math.random() * h;
  this.afterimage.r = Math.random() * ((w > h) ? (h / 7) : (w / 7));
  this.afterimage.rgb = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")"; 
  this.afterimage.gco = (Math.random() < 0.5) ? 'source-over':'lighter';
  
  this.afterimage.drawFrm();
};
  
specialEffects.afterimage.drawFrm = function() {
  var obj = specialEffects.afterimage;
  var ctx_bg = obj.ctx_bg;

  // ---------
  // bg canvas
  // ---------
  ctx_bg.globalCompositeOperation = 'source-over';
  ctx_bg.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx_bg.fillRect(0, 0, obj.w, obj.h);

  ctx_bg.globalCompositeOperation = obj.gco;
  ctx_bg.beginPath();
  ctx_bg.fillStyle = obj.rgb;
  ctx_bg.arc(obj.cx, obj.cy, obj.r, 0, 2 * Math.PI);
  ctx_bg.fill();
  
  obj.cx++;
  
  if (obj.cx > obj.w) {
    obj.cx = 0;
    obj.cy = Math.random() * obj.h;
    obj.r = Math.random() * ((obj.w > obj.h) ? (obj.h / 7) : (obj.w / 7));
    obj.rgb = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")";
    obj.gco = (Math.random() < 0.5) ? 'source-over':'lighter';
  }
  
  requestAnimationFrame(specialEffects.afterimage.drawFrm);
}
