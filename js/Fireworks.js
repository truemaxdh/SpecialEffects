if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.fireworks = function(el) {
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

  this.fireworks.w = w;
  this.fireworks.h = h;
  this.fireworks.ctx_bg = ctx_bg;
  
  this.fireworks.objFire = function() {
    this.prev = null;
    this.next = null;
    this.draw = function() {};
  }
  
  this.fireworks.listChain = {
    start : this.fireworks.objFire,
    end : this.fireworks.objFire
  }
  
  this.fireworks.listChain.start.next = this.fireworks.listChain.end;
  this.fireworks.listChain.end.prev = this.fireworks.listChain.start;
  
  /*this.fireworks.cx = 0;
  this.fireworks.cy = Math.random() * h;
  this.fireworks.r = Math.random() * ((w > h) ? (h / 7) : (w / 7));
  this.fireworks.rgb = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")"; 
  this.fireworks.gco = (Math.random() < 0.5) ? 'source-over':'lighter';
  this.fireworks.speed = Math.random() * w / 20 + 1;
  */
  this.fireworks.drawFrm();
};
  
specialEffects.fireworks.drawFrm = function() {
  var obj = specialEffects.fireworks;
  var ctx_bg = obj.ctx_bg;

  // ---------
  // bg canvas
  // ---------
  ctx_bg.globalCompositeOperation = 'source-over';
  ctx_bg.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx_bg.fillRect(0, 0, obj.w, obj.h);

  
  ctx_bg.globalCompositeOperation = 'lighter';
  var fire = obj.listChain.start;
  while((fire = fire.next) != null) {
    fire.draw();
  }

  if (Math.floor(Math.random() * 100) == 0) {
    var newFire = new obj.objFire;
    newFire.cx = Math.random() * obj.w;
    newFire.cy = Math.random() * obj.h;
    newFire.rgb = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")";
    newFire.speed = Math.random() * obj.w / 20 + 1;
    newFire.lifeCnt = 0;
    newFire.draw = function() {
      for (var i = 0; i < 10; i++) {
        var x = this.cx + this.lifeCnt * Math.cos(Math.PI * i / 10);
        var y = this.cy + this.lifeCnt * Math.sin(Math.PI * i / 10);
        ctx_bg.fillStyle = this.rgb;
        ctx_bg.arc(x, y, 10, 0, 2 * Math.PI);
        ctx_bg.fill();
      }
      if (++this.lifeCnt > 100) {
        this.prev.next = this.next;
        this.next.prev = this.prev;
      }
    }
    var tmpObj = obj.listChain.end.prev;
    tmpObj.next = newFire;
    newFire.prev = tmpObj;
    newFire.next = obj.listChain.end;
    obj.listChain.end.prev = newFire;
  }

  requestAnimationFrame(specialEffects.fireworks.drawFrm);
}
