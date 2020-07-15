if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

function objFire() {
  this.prev = null;
  this.next = null;
  this.draw = function() {};  
}

specialEffects.fireworks = function(el) {
  var cnv_bg = document.createElement("CANVAS");
  cnv_bg.style.position = "relative";
  cnv_bg.style.width = el.style.width;
  cnv_bg.style.height = el.style.height;
  cnv_bg.id = "cnv_bg";
  cnv_bg.width = cnv_bg.style.width.replace("px","");
  cnv_bg.height = cnv_bg.style.height.replace("px","");
  el.appendChild(cnv_bg);

  var ctx_bg = cnv_bg.getContext("2d");
  var w = cnv_bg.width;
  var h = cnv_bg.height;

  this.fireworks.w = w;
  this.fireworks.h = h;
  this.fireworks.ctx_bg = ctx_bg;
  
  this.fireworks.listChain = {
    start : new objFire(),
    end : new objFire()
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
  //console.log(this);
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

  if (Math.floor(Math.random() * 40) == 0) {
    var newFire = new objFire();
    newFire.cx = Math.random() * obj.w;
    newFire.cy = Math.random() * obj.h;
    newFire.r = Math.random() * 15 + 5;
    newFire.rgb = "rgb(" + (Math.random() * 256) + "," + (Math.random() * 256) + "," + (Math.random() * 256) + ")";
    newFire.speed = Math.random() * obj.w / 150 + 1;
    newFire.lifeCnt = 0;
    newFire.lifeLimit = Math.random() * 100 + 20;
    newFire.radiusSpan = Math.random() * 20 + 15;
    newFire.draw = function() {
      for (var i = 0; i < this.radiusSpan; i++) {
        var x = this.cx + this.lifeCnt * this.speed * Math.cos(2 * Math.PI * i / this.radiusSpan);
        var y = this.cy + this.lifeCnt * this.speed * Math.sin(2 * Math.PI * i / this.radiusSpan);
        ctx_bg.beginPath();
        ctx_bg.fillStyle = this.rgb;
        ctx_bg.arc(x, y, this.r, 0, 2 * Math.PI);
        ctx_bg.fill();
      }
      if (++this.lifeCnt > this.lifeLimit) {
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
