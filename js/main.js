/* global $*/
;(function(){
	"use strict";
	var page = window.location.pathname.substr(1).replace(/.html/g, "");
	var AnimatedJsonSprite = require("./lib/AnimatedJsonSprite.js");
	var AnimatedLoader = require("./lib/AnimatedLoader.js");
	var Aboutme = require("./sections/aboutme.js");
	var Contact = require("./sections/contact.js");
	var Home = require("./sections/home.js");
	var Projects = require("./sections/projects.js");
	var Project = require("./sections/project.js");
	var Utils = require("./lib/Utils.js");


	var current;
	//var ScrollMonitor = require("./vendor/scrollMonitor.js");
	function onToggleMobileMenu(e){
		$(e.currentTarget).toggleClass("active");
		$("#main-container").toggleClass("mobile-menu-on");
		$("#main-footer").toggleClass("mobile-menu-on");
	}
	function onOpenPopup(e){
		
		e.preventDefault();
		var url, width=500, height=400, top, left;
		if($(e.currentTarget).attr("href")){
			url = $(e.currentTarget).attr("href");
		}
		if($(e.currentTarget).attr("data-popup")==="twitter"){
			width = 550;
			height=320;
		}
		top = ($(window).height()/2)-(height/2);
		left = ($(window).width()/2)-(width/2);
		window.open(url, $(e.currentTarget).attr("data-popup"), "width="+width+", height="+height+", left="+left+", top="+top);
	}
	
	
	window.loadPage = function(page){
		var ajaxLoaded = false;
		if(current){
			current.destroy();
			ajaxLoaded = true;
		}
		switch(page){
			case "index":
			case "/":
			case "":
				Home.init(ajaxLoaded);
				current = Home;
				break;
			case "acerca":
				Aboutme.init(ajaxLoaded);
				current = Aboutme;
				break;
			case "contacto":

				Contact.init(ajaxLoaded);
				current = Contact;
				break;
			case "proyectos":
				Projects.init(ajaxLoaded);
				current = Projects;
				break;
			case "proyecto":
				Project.init(ajaxLoaded);
				current = Project;
				break;
			default:
				if(page.indexOf("proyecto#")!==-1){
					Project.init();
					current = Project;
				}
				else{
					console.warn("Se desconoce el html:", page);
				}
				
		}
	};
	AnimatedLoader.init(new AnimatedJsonSprite("spritesheets/loader.png", document.getElementById("loader-me"), {loop:true, frameRate:40, loopStartStep:4, loopEndStep:22}));
	window.initializeMap = function(){/*needed for async load of gm, not used*/};
	window.loadPage(page);
	$("#mobile-menu").on("click", onToggleMobileMenu);
	$("[data-popup]").on("click", onOpenPopup);
	$(".preload").removeClass("preload");
	$("[data-track]").on("click", function(){
		Utils.trackEvent("external-link","click", $(this).attr("data-track"));
	});
	$(window).load(function(){
		$("#loader").addClass("unshown");
		AnimatedLoader.stop();
	});
})();

