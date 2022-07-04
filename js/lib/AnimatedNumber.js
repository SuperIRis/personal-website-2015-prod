;(function(){
	"use strict";
	function AnimatedNumber(domElement){
		this.domElement = domElement;
	}
	AnimatedNumber.prototype.init = function(){
		this.originalNumberString = this.domElement.innerHTML;
		this.originalNumber = Number(this.domElement.innerHTML.replace(/\D/g, ""));
		this.start();
	};
	AnimatedNumber.prototype.intervalExec = function(){
		var that = this;
		this.tempNumber++;
		if(this.domElement.className.indexOf("appearing")===-1){
			this.domElement.className = this.domElement.className+" appearing";
		}
		else{
			that.domElement.className = that.domElement.className.replace("appearing", "");
		}
		setTimeout(function(){
			//that.domElement.className = that.domElement.className.replace("appearing", "");
		}, 190);
		
		this.domElement.innerHTML = this.tempNumber;
		if(this.tempNumber>this.originalNumber){
			this.domElement.innerHTML = this.originalNumberString;
			clearInterval(this.interval);
		}
	};
	AnimatedNumber.prototype.start = function(){
		this.tempNumber = 0;
		this.interval = setInterval(this.intervalExec.bind(this), 200);
		this.domElement.innerHTML = "0";
	};
	module.exports = AnimatedNumber;
})();