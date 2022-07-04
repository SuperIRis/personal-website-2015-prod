/* global $*/
"use strict";
;(function(){

	if(module && module.exports){
		module.exports.init = function(){
			window.PatCalReady ();
		};
		module.exports.destroy = function(){
			if(window.calcSim != null){
				window.calcSim.destroy();
			}
			//window.PatCal = null;
		};
	}


})();