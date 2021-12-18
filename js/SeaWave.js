if (typeof specialEffects === 'undefined' || !specialEffects) {
    specialEffects = {};
  }
  
  specialEffects.seaWave = function(el) {
    console.log(el.style);
    
    var cnv = document.createElement("CANVAS");
    cnv.style.position = "relative";
    cnv.style.width = el.style.width;
    cnv.style.height = el.style.height;
    cnv.id = "cnv";
    cnv.width = cnv.style.width.replace("px","");
    cnv.height = cnv.style.height.replace("px","");
    el.appendChild(cnv);
  
    const obj = this.seaWave; 
    obj.ctx = cnv.getContext("2d");
    obj.w = cnv.width;
    obj.h = cnv.height;
    obj.cnt = getRndInt(3, 10);
    obj.divs = [];
    
    obj.init = ()=>{
      const step = 1 / obj.cnt;
    
      while(obj.divs.length < obj.cnt) {
        let div = {
          relY : obj.divs.length * step,
          dy : (Math.random() < 0.5) ? 1 : -1
        }
        obj.divs.push(div);
      }
    }

    obj.drawFrm = (timeStamp)=>{
      if (!obj.lastTimeStamp) obj.lastTimeStamp = timeStamp;
      if ((timeStamp - obj.lastTimeStamp) > 30) {
        obj.lastTimeStamp = timeStamp;
        
        obj.ctx.fillStyle = "white";
        obj.ctx.fillRect(0, 0, obj.w, obj.h);
        let grd = obj.ctx.createLinearGradient(0, 0, 0, obj.h);
        grd.addColorStop(0, "rgba(0,0,255,1)");
        obj.divs.forEach((div, i)=>{
          grd.addColorStop(div.relY , (i % 2 == 0) ? "rgba(0,0,255,0.5)" : "rgba(0,0,255,1)");          
        });
        obj.ctx.fillStyle = grd;
        obj.ctx.fillRect(0, 0, obj.w, obj.h);
      }
    
      requestAnimationFrame(obj.drawFrm);
    }

    obj.init();
    obj.drawFrm();
  }
  
  