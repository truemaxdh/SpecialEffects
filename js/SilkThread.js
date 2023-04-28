if (typeof specialEffects === 'undefined' || !specialEffects) {
  specialEffects = {};
}

specialEffects.silkThread = function(el) {
    console.log(el.style);
    
    const obj = this.silkThread;
    obj.objName = "silkThread";
    this.runningObj = obj;
    
    obj.el = el;
    obj.conf = {
        canv: null,
        ctx: null,
        bgColor: '#222',
        rndX: null,
        rndY: null,
        rndColor: null
    };

    obj.init = ()=>{
        obj.conf.rndColor = [
            new SoftRandom(64, 255, 128, 5),
            new SoftRandom(64, 255, 128, 5),
            new SoftRandom(64, 255, 128, 5)
        ];

        window.removeEventListener('resize', obj.onResize);
        window.addEventListener('resize', obj.onResize, false);
        obj.onResize(null);

        requestAnimationFrame(obj.tick);
    };

    obj.onResize = function(e) {
        obj.conf.canv = ReplaceCanvas(obj.el);
        obj.conf.ctx = obj.conf.canv.getContext('2d');
        obj.conf.ctx.lineCap = obj.conf.ctx.lineJoin = 'round';
        obj.conf.rndX = new SoftRandom(0, obj.conf.canv.width, obj.conf.canv.width / 2, 24);
        
        // 1d mountain
        // obj.conf.rndY = new SoftRandom(0, obj.conf.canv.height, obj.conf.canv.height / 2, 3);

        // 2d silk thread
        obj.conf.rndY = new SoftRandom(0, obj.conf.canv.height, obj.conf.canv.height / 2, 24);
    };
  
    obj.tick = (cur_time)=>{
        // 1d mountain
        // if (obj.conf.rndX.lastVal() >= obj.conf.scrW) {
        //     obj.conf.rndX.val = 0;
        // }
        // obj.conf.ctx.beginPath();
        // obj.conf.ctx.lineWidth = 3;
        // obj.conf.ctx.strokeStyle = "white";
        // obj.conf.ctx.moveTo(obj.conf.rndX.val, obj.conf.rndY.lastVal());
        // obj.conf.ctx.lineTo(++obj.conf.rndX.val, obj.conf.rndY.nextVal());

        // 2d silk thread
        obj.conf.ctx.beginPath();
        obj.conf.ctx.lineWidth = 0.5;
        obj.conf.ctx.strokeStyle = obj.convertRGBtoHex(obj.conf.rndColor);
        obj.conf.ctx.moveTo(obj.conf.rndX.lastVal(), obj.conf.rndY.lastVal());
        obj.conf.ctx.lineTo(obj.conf.rndX.nextVal(), obj.conf.rndY.nextVal());
        
        obj.conf.ctx.stroke();
        
        if (specialEffects.runningObj.objName == obj.objName)
            requestAnimationFrame(obj.tick);
    };

    obj.convertRGBtoHex = (rndColor)=>{
        [r, g, b] = [rndColor[0].nextVal(), rndColor[1].nextVal(), rndColor[2].nextVal()];
        [r, g, b] = [Math.floor(r), Math.floor(g), Math.floor(b)]
        
        const r1 = r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16);
        const g1 = g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16);
        const b1 = b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16);
        //console.log("#" + r1 + g1 + b1);
        return "#" + r1 + g1 + b1;
    };

    obj.init();
  }