"use strict";
/* global $*/
;(function(){
	var Home = {};
	var AnimatedJsonSprite = require("../lib/AnimatedJsonSprite.js");
	var PROJECTS = require("../../data/projects.js");
	var ScrollMonitor = require("../vendor/scrollMonitor.js");
	var AnimatedLoader = require("../lib/AnimatedLoader.js");
	var Utils = require("../lib/Utils.js");
	var body = $("html, body");
	var projectsWatcher;
	

	function onScrollHomeDown(e){
		body.animate({scrollTop:$(document).height()}, "500", "swing");
	}
	function parseProjects(){
		//find home projects
		var projects = PROJECTS.projects;
		Home.projects = [];
		for(var i =0; i<projects.length; i++){
			if(projects[i].images && projects[i].images.home){
				Home.projects.push(projects[i]);
			}
		}
		
	}
	function setProjects(){
		var jProjects = $("#projects-preview-list").find("li");
		Home.loadedProjects = 0;
		for(var i = 0; i<jProjects.length; i++){
			$(jProjects[i]).find(".project-title").html(Home.projects[i].name);
			$(jProjects[i]).find(".project-tech").html(Home.projects[i].tech);
			$(jProjects[i]).find("a").attr("href", "proyecto.html#"+Home.projects[i].stringID);
			$("<img/>").attr("data-index", i).attr("src", "images/projects/"+Home.projects[i].images.home).load(onImageLoaded);
			$(jProjects[i]).find("a").on("click", onTrack);
		}

	}
	function onTrack(e){
		Utils.trackEvent("home-project", "click", $(e.currentTarget).find(".project-title").html());
	}
	function onImageLoaded(e) {
		var jProjects = $("#projects-preview-list").find("li");
		$(e.currentTarget).remove();
		$(jProjects[$(e.currentTarget).attr("data-index")]).find(".project-preview-item").css("background-image", "url('images/projects/"+Home.projects[$(e.currentTarget).attr("data-index")].images.home+"')");
		$(jProjects[$(e.currentTarget).attr("data-index")]).removeClass("loading");
		Home.loadedProjects++;
		if(Home.loadedProjects === jProjects.length){
			setScrollMonitor();
		}
	}
	function setScrollMonitor(){
		projectsWatcher = ScrollMonitor.create($("#projects-preview-list")[0], -10);
		projectsWatcher.enterViewport(function(){
			$("#projects-preview-list").removeClass("unshown");
		});
		projectsWatcher.exitViewport(function(){
			$("#projects-preview-list").addClass("unshown");
		});
	}

	function onOpenSection(e){
		e.preventDefault();
		Home.homeMe.stop();
		
		AnimatedLoader.loadSection($(e.currentTarget).attr("href"));
	}
	
	Home.init = function(){
		//var homeSprites = ["playa"];
		var homeSprites = ["libro", "normal", "ds"];
		var currentSprite = homeSprites[Math.floor(Math.random()*homeSprites.length)];
		Home.homeMe = new AnimatedJsonSprite("spritesheets/homes-"+currentSprite+".png", document.getElementById("me"), {loop:true, frameRate:40});
		Home.homeMe.start();
		$("#home-down-btn").on("click", onScrollHomeDown);
		$("#main-menu, #projects-preview-list").on("click", "a", onOpenSection);
		$("#intro-container").css("height", $(window).height()-86);
		parseProjects();
		setProjects();
	};
	Home.destroy = function(){
		$("#home-down-btn").off();
		$("#main-menu").off();
		Home.homeMe = null;
		$("#me").html("");
	};
	module.exports = Home;
})();




