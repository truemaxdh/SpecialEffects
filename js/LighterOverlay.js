if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.lighterOverlay = function(el) {
  console.log(el.style);

  const obj = this.lighterOverlay;
  obj.objName = "lighterOverlay";
  this.runningObj = obj;

  const cnv_bg = ReplaceCanvas(el);
  cnv_bg.style.position = "relative";

  const w = cnv_bg.width;
  const h = cnv_bg.height;
  this.lighterOverlay.w = w;
  this.lighterOverlay.h = h;
  this.lighterOverlay.shapeCnt = Math.random() * 50 + 50;
  
  this.lighterOverlay.ctx_bg = cnv_bg.getContext("2d");
  this.lighterOverlay.ctx_bg.fillStyle = "black";
  this.lighterOverlay.ctx_bg.fillRect(0, 0, w, h);
  
  this.lighterOverlay.drawFrm();
};
  

specialEffects.lighterOverlay.drawFrm = function(timeStamp) {
  const obj = specialEffects.lighterOverlay;
  if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
  if ((timeStamp - obj.lastTimeStamp) > 200) {
    obj.lastTimeStamp = timeStamp;
    if (--obj.shapeCnt <= 0) return;

    const w = specialEffects.lighterOverlay.w;
    const h = specialEffects.lighterOverlay.h;
    const ctx_bg = specialEffects.lighterOverlay.ctx_bg;

    const cx = Math.random() * w;
    const cy = Math.random() * h;
    const r = Math.random() * ((w > h) ? (h / 7) : (w / 7));
    const rgb = "rgba(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")";

    ctx_bg.globalCompositeOperation = 'lighter';
    ctx_bg.beginPath();
    ctx_bg.fillStyle = rgb;
    ctx_bg.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx_bg.fill();	
  }
   
  if (specialEffects.runningObj.objName == obj.objName) {
    requestAnimationFrame(obj.drawFrm);
  }
}
