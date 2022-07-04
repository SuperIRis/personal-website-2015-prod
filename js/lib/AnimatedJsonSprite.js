;(function(){
	"use strict";
	var ajaxLoad = function(url, callback){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = ensureState;
		function ensureState(){
			if(xhr.readyState === 4 && xhr.status===200){
				callback(xhr);
			}
		}
		xhr.open("GET", url, true);
		xhr.send();
	};

	//
	//
	//
	var AnimatedJsonSprite = function(spriteURL, div, settings){
		this.spriteURL = spriteURL;
		this.jsonURL = spriteURL.replace("png", "json");
		this.div = div;
		
		this.currentStep = 0;
		div.style.backgroundImage = "url("+spriteURL+")";
		
		this.containerHeight = this.div.offsetHeight;
		this.containerWidth = this.div.offsetWidth;
		this.animationStarted = false;
		this.settings = {
			loop:false,
			loopStartStep:0,
			loopEndStep:0,
			frameRate:40,
			scale:1
		};

		for(var a in settings){
			if(this.settings.hasOwnProperty(a)){
				this.settings[a] = settings[a];
			}
		}

		ajaxLoad(this.jsonURL, this._onSpriteReady.bind(this));

	};

	AnimatedJsonSprite.prototype.start = function(){
		if(!this.image || !this.image.complete){
			this._onLoad = this.start;
			return;
		}
		if(this.animationStarted){
			return;
		}

		this.animationStarted = true;
		if(this.currentStep<this.steps || this.settings.loop){
			this._animateToEnd();
		}
	};
	AnimatedJsonSprite.prototype.stop = function(restart){
		this.meantToStop = true;
		this.animationStarted = false;
		this.restart = restart ? restart : false;
		//this.currentStep = 0;
	};

	AnimatedJsonSprite.prototype.hoverIn = function(until){
		if(!this.image.complete){
			this._onLoad = this.hoverIn;
			return;
		}
		if(this.animationStarted){
			return;
		}
		this.animationStarted = true;
		clearInterval(this.mainInterval);
		this.stepToStopForward = !isNaN(until) && until < this.steps ? until : this.steps;
		this._animateToEnd();
	};
	AnimatedJsonSprite.prototype.hoverOut = function(from, until){
		if(!this.image.complete){
			this._onLoad = this.hoverOut;
			return;
		}
		if(this.endAnimationStarted){
			return;
		}
		this.endAnimationStarted = true;
		clearInterval(this.mainInterval);
		until = !isNaN(until) && until > 0 && until <= this.steps ? until : 0;
		this.stepToStopForward = this.steps;
		this.currentStep = !isNaN(from) && from > 0 && from <= this.steps ? from : this.currentStep;

		if(this.currentStep < until){
			console.log("current step < until");
			this.forceReset = true;
			this._animateToEnd();
		}
		else{
			this._animateToStart();
		}

		
	};
	AnimatedJsonSprite.prototype._onSpriteReady = function(e){
		var tempSpriteIndex/*, tempy=0, horizontalSteps=0, totalWidth, missingPixels*/;
		this.json = JSON.parse(e.response);
		this.spritesData = [];
		//converting object to array
		for(var a in this.json.frames){
			tempSpriteIndex = Number(a.substr(-4));
			this.spritesData[tempSpriteIndex] = this.json.frames[a];
		}
		/*for(var i = 0; i<this.spritesData.length; i++){
			if(tempy!=this.spritesData[i].frame.y){
				break;
			}
			horizontalSteps++;
			tempy = this.spritesData[i].frame.y;

		}
		totalWidth = this.json.meta.size.w;
		missingPixels = totalWidth - (this.spritesData[0].sourceSize.w*horizontalSteps);
		//missingPercentage = ((totalWidth*100)/(this.spritesData[0].sourceSize.w*horizontalSteps))/horizontalSteps;
		missingPercentage = Math.ceil(((missingPixels*100)/totalWidth)*horizontalSteps);
		*/
		this.steps = this.spritesData.length-1;
		if(this.settings.loopEndStep===0 && this.settings.loop){
			this.settings.loopEndStep = this.steps;
		}
		//
		this.image = new Image();
		var _this = this;
		this.image.onload = function(){
			_this._onLoad();
		};
		this.image.src = this.spriteURL;
		if(this.image.complete){
			this._onLoad();
		}
		this.div.style.width = (this.spritesData[0].sourceSize.w*this.settings.scale)+"px";
		this.div.style.height = (this.spritesData[0].sourceSize.h*this.settings.scale)+"px";
		//this.div.style.backgroundSize = (((horizontalSteps*100)+missingPercentage)*1)+"%";
	};
	AnimatedJsonSprite.prototype._onLoad = function(){};

	AnimatedJsonSprite.prototype._animateToEnd = function(){
		var moveForwardBinded = this._moveForward.bind(this);
		this.mainInterval = setInterval(moveForwardBinded, this.settings.frameRate);
	};
	AnimatedJsonSprite.prototype._animateToStart = function(){
		var moveBackwardsBinded = this._moveBackwards.bind(this);
		this.mainInterval = setInterval(moveBackwardsBinded, this.settings.frameRate);
	};
	AnimatedJsonSprite.prototype.reset = function(to){
		//return
		to = to ? to : 0;
		this.currentStep = to;
		this.animationStarted = false;
		this.endAnimationStarted = false;
		//this.div.style.backgroundPosition="0 -"+((this.containerHeight*this.currentStep))+"px";
	};

	AnimatedJsonSprite.prototype._moveBackwards = function(){
		var position = {};
		position.x = this.spritesData[this.currentStep].frame.x*this.settings.scale;
		position.y = this.spritesData[this.currentStep].frame.y*this.settings.scale;
		this.div.style.backgroundPosition="-"+position.x+"px -"+position.y+"px";
		if(this.currentStep<=0 || this.currentStep>=this.stepToStopBackwards){
			clearInterval(this.mainInterval);
			this.reset(0);
		}
		this.currentStep--;
	};

	AnimatedJsonSprite.prototype._moveForward = function(){
		var position = {};
		position.x = this.spritesData[this.currentStep].frame.x*this.settings.scale;
		position.y = this.spritesData[this.currentStep].frame.y*this.settings.scale;
		this.div.style.backgroundPosition="-"+position.x+"px -"+position.y+"px";
		if(this.meantToStop && this.currentStep>=this.steps){
			clearInterval(this.mainInterval);
			this.meantToStop=false;
			this.currentStep = 0;
			if(this.restart){
				this.restart = false;
				this.reset(0);
			}
		}
		else if(this.currentStep>=this.stepToStopForward || (this.settings.loop && this.currentStep>=this.settings.loopEndStep) && !this.meantToStop){
			clearInterval(this.mainInterval);		
			if(this.settings.loop){
				this.reset(this.settings.loopStartStep);
				this.start();
			}
			else if(this.forceReset){
				this.forceReset = false;
				this.reset();
			}
		}
		this.currentStep++;
		
	};
	module.exports = AnimatedJsonSprite;

})();




 
