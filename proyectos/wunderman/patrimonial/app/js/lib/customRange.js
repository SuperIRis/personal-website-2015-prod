// JavaScript Document
window.superIrisSlider = new function (){
	this.attrID = "sliderEngine";
	this.attrFillID = "sliderFillClass";
	this.attrForeID = "sliderForeClass";
	this.createSlider = function ($ID, $fillClass, $foregroundClass, $inputID){
		
		var div = document.getElementById($ID);
		var attr = div.getAttribute(this.attrID);
		if (attr == null){
			attr = div.setAttribute(this.attrID, "superIrisCustomSlide");
			div.setAttribute(this.attrFillID, $fillClass );
			div.setAttribute(this.attrForeID, $foregroundClass);
			//
			var fill = document.createElement("DIV");
			var fore = document.createElement("DIV");
			var input = document.createElement("INPUT");
			input.setAttribute("type","range");
			if( $inputID !== null){
				input.setAttribute("id",$inputID);
			}
			fill.setAttribute("class",$fillClass);
			fore.setAttribute("class",$foregroundClass);
			fill.innerHTML ="&nbsp;";
			fore.innerHTML ="&nbsp;";
			div.appendChild(fore);
			div.appendChild(fill);
			div.appendChild(input);
		}
		
	}
	this.formatSlider = function ($width, $ID){
		
			var div = document.getElementById($ID);
			div.style.position = "relative";
			div.style.width = $width+"px";
			div.onchange = this.onSlideChange;
			
			var ran= div.getElementsByTagName("INPUT")[0];
			
			ran.style.width = "100%";
			ran.style.position= "absolute";
			ran.style.top = 0;
			ran.style.zIndex = 50;
			//
			var classesNames = this.getSliderClassesName (div);
			var fillClass = classesNames.fill;
			var foreClass = classesNames.fore;
			//
			var divBar = div.getElementsByClassName(fillClass)[0];
			var divFore =div.getElementsByClassName(foreClass)[0];
			divBar.style.float = "left";
			divFore.style.float = "right";
			divBar.style.zIndex = 20;
			divFore.style.zIndex = 10;
			
			var targ = [divBar,divFore ];
			for(var j=0; j < targ.length; j++){
				var e = targ[j];
				e.style.width = "100%";
				e.style.position = "absolute";
				//e.style.top = 0;
			}
			this.updateSlide(ran);
		
		
	}
	this.getSliderClassesName = function  ($element){
		var fill = $element.getAttribute (this.attrFillID);
		var fore = $element.getAttribute (this.attrForeID );
		return {fill:fill, fore:fore};
	}
	this.onSlideChange = function ($event){
		var tar = $event.target;
		window.superIrisSlider.updateSlide(tar);
	}
	this.updateSlide = function ($slide){
		var div = $slide.parentElement;
		var parWidth = div.style.width;
		var numberPattern = /\d+/g;
		var totalWidth= Number (parWidth.match(numberPattern)[0]);
		//
		var classesNames = this.getSliderClassesName (div);
		var fillClass = classesNames.fill;
		var foreClass = classesNames.fore;
		//
		var divBar = div.getElementsByClassName(fillClass)[0];
		var divFore =div.getElementsByClassName(foreClass)[0];
		var barWidth = ($slide.value*totalWidth)/$slide.max;
		divBar.style.width= barWidth+"px";
	}
	this.getInput = function ($divID){
		var div = document.getElementById($divID);		
		var range = div.getElementsByTagName("INPUT")[0];
		return range;
	}
}