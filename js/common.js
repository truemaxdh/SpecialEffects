const getRndInt = function(base, variation) {
	return Math.floor(base + Math.random() * variation);
}

const prune = function(val, min, max) {
	if (val < min) val = min;
	if (val > max) val = max;
	return val;
}

const getRndColor = function(baseR, baseG, baseB, variation) {
	return getRGBStr(
		prune(getRndInt(baseR, variation), 0, 255),
		prune(getRndInt(baseG, variation), 0, 255),
		prune(getRndInt(baseB, variation), 0, 255)
	);
}

const getRGBStr = function(intR, intG, intB) {
	return "rgb(" + prune(intR, 0, 255) + "," + prune(intG, 0, 255) + "," + prune(intB, 0, 255) + ")";
}

/**
 * 
 * @param {array} mass : [mass1, mass2] 
 * @param {array} velocity : [velocity1, velocity2]
 * 
 * return : {array} [newVelocity1, newVelocity2]
 */
const elasticCollision = function(mass, velocity) {
	let newVelo1 = ((mass[0] - mass[1]) * velocity[0] + 2 * mass[1] * velocity[1]) / (mass[0] + mass[1]);
	let newVelo2 = (2 * mass[0] * velocity[0] + (mass[1] - mass[0]) * velocity[1]) / (mass[0] + mass[1]);
	return [newVelo1, newVelo2];
}

/**
 * 
 * @param {MovingObj} obj1 
 * @param {MovingObj} obj2
 * @param {Number} minDist
 */
const roughlySeparate = function(obj1, obj2, minDist) {
	let dist = obj1.center.calcDist(obj2.center);
	if (dist < minDist) {
		// split
		let halfDiff = (minDist - dist) / 2;
		if (obj1.center.v1 < obj2.center.v1) {
			obj1.center.v1 -= halfDiff;
			obj2.center.v1 += halfDiff;
		} else {
			obj1.center.v1 += halfDiff;
			obj2.center.v1 -= halfDiff;
		}

		if (obj1.center.v2 < obj2.center.v2) {
			obj1.center.v2 -= halfDiff;
			obj2.center.v2 += halfDiff;
		} else {
			obj1.center.v2 += halfDiff;
			obj2.center.v2 -= halfDiff;
		}
	}	
}

class Vector2D {
	constructor(v1, v2) {
		this.v1 = v1;
		this.v2 = v2;
	}
		
	clone() {
		return new Vector2D(this.v1, this.v2);
	}
	
	magnitude() {
		return Math.hypot(this.v1, this.v2);
	}
	
	unitVector() {
		let mag = this.magnitude();
		return this.clone().multiply1D(1 / mag);
	}
	
	theta() {
		return Math.atan2(this.v2, this.v1);
	}
	
	rotate(theta) {
		let mag = this.magnitude();
		let newTheta = this.theta() + theta;
		this.v1 = Math.cos(newTheta) * mag;
		this.v2 = Math.sin(newTheta) * mag;
		return this;
	}
	
	add(v) {
		this.v1 += v.v1;
		this.v2 += v.v2;
		return this;
	}
	
	subtract(v) {
		this.v1 -= v.v1;
		this.v2 -= v.v2;
		return this;
	}
	
	multiply1D(n) {
		this.v1 *= n;
		this.v2 *= n;
		return this;
	}
	
	calcDist(v) {
		return Math.hypot(this.v1 - v.v1, this.v2 - v.v2);
	}
}

/**
 * 
 * @param {min value} min 
 * @param {max value} max 
 * @param {start value} start 
 * @param {max amplitude} maxAmp 
 */
function SoftRandom(min, max, start, maxAmp) {
	this.min = min;
	this.max = max;
	this.val = start;
	this.maxAmp = maxAmp;
	this.dirDeg = 0;
	this.ampDeg = 0;
	this.lastVal = ()=>this.val;
	this.nextVal = ()=>{
		this.dirDeg += Math.random() * Math.PI * 0.25;
		this.ampDeg += Math.random() * Math.PI * 0.1;
		if (this.dirDeg >= (Math.PI * 2)) this.dirDeg -= Math.PI * 2;
		if (this.ampDeg >= (Math.PI * 2)) this.dirDeg -= Math.PI * 2;
		this.val += Math.sin(this.dirDeg) * Math.abs(Math.sin(this.ampDeg)) * this.maxAmp;
		if (this.val < this.min) this.val = this.min;
		if (this.val > this.max) this.val = this.max;
		return this.val;
	}
}

/**
 * 
 * @param {parent element of canvas} el 
 * @returns new canvas
 */
function ReplaceCanvas(el) {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
	//let elH = document.body.clientHeight - el.offsetTop;
	let elH = document.body.clientHeight;
	el.style.width = "100%";
	el.style.height = elH + "px";

	let canv = document.createElement("CANVAS");
	canv.id = "cnv";
	canv.width  = el.clientWidth;
	canv.height  = el.clientHeight;
	canv.style.width  = el.clientWidth + "px";
	canv.style.height  = el.clientHeight + "px";
	el.appendChild(canv);
	
	window.scrollTo(0, el.offsetTop);
	return canv;
}
