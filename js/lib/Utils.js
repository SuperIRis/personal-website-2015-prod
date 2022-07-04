/* global ga*/
;(function(){
	"use strict";
	var Utils = {};	
	Utils.shuffle = function(array) {
		var counter = array.length, temp, index;

		while (counter > 0) {
			index = Math.floor(Math.random() * counter);
			counter--;
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	};
	Utils.randomBoolean = function(){
		return Math.random()<0.5;
	};
	Utils.randomFromArray = function(array){
		return array[Math.floor(Math.random()*array.length)];
	};
	Utils.getProjectByStringID = function(stringID, projects){
		for (var i = 0, limit = projects.length; i<limit; i++){
			if(projects[i].stringID===stringID){
				if(i>0){
					projects[i].lastProject = projects[i-1];
				}
				else{
					projects[i].lastProject = projects[projects.length-1];	
				}
				if(i===projects.length-1){
					projects[i].nextProject = projects[0];
				}
				else{
					projects[i].nextProject = projects[i+1];
				}
				
				return projects[i];
			}
		}
		return false;
	};
	Utils.trackView = function(page){
		if(typeof ga !=="undefined"){
			ga("send", "pageview", page);
		}
	};
	Utils.trackEvent = function(cat, action, label){
		if(typeof ga !=="undefined"){
			ga("send", "event", cat, action, label);
		}
	};
	
	module.exports = Utils;
})();


