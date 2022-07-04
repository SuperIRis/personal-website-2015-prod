/* global $*/
/* global alert*/
;(function(){
	"use strict";
	var WaitForImages = require("../vendor/jquery.waitforimages.min.js"); // jshint ignore:line
	var AnimatedLoader = {};
	var backendTries = 0;
	AnimatedLoader.ajaxLoad = function(url, callback){
		$.ajax({
			type: "GET",
			url: url,
			error:function(error,options, message){
				console.log(error, "--->",message, options);
				backendTries++;
				if(backendTries<=5){
					setTimeout(function(){AnimatedLoader.ajaxLoad(url, callback);}, 200);
				}
				else{
					backendTries = 0;
					alert("Ha habido un error en el servidor, intenta de nuevo por favor");
				}
			},
			success: function(data) {
				//console.log(data);
				backendTries = 0;
				/*if (data.status =="success"){

				}
				else{
				$(document).trigger("backend:save_error");
				}*/
				if(typeof(callback)!=="undefined"){
					callback(data);
				}
			}
		});
	};
	AnimatedLoader.showLoader = function(){
		$("#loader").removeClass("unshown");
		$("body").addClass("scroll-block");
		setTimeout(function(){
			AnimatedLoader.animation.start();
		},700);
	};
	AnimatedLoader.hideLoader = function(){
		$("body").removeClass("scroll-block");
		AnimatedLoader.animation.stop();
		setTimeout(function(){
			$("#loader").addClass("unshown");
		},700);
	};
	AnimatedLoader.onSectionDOMReady = function(e){
		AnimatedLoader.loadReady = true;
		AnimatedLoader.loadData = e;
		if(AnimatedLoader.animationReady){
			AnimatedLoader.onLoadReady();
		}
	};
	AnimatedLoader.onLoadReady = function(e){
		
		//cargar el contenido antes de quitar el loader, hasta ahorita sólo ha cargado el html como texto
		setTimeout(function(){
			var tempElement = $("<div>").html(AnimatedLoader.loadData);
			$("#main-container").html(tempElement.find("#main-container").html());
			$("#main-container").waitForImages(function(){

				if(AnimatedLoader.animationReady){
					


					var title = AnimatedLoader.url.substr(0,AnimatedLoader.url.indexOf("."));
					var scripts = tempElement.find("script");
					var newTitle;

					AnimatedLoader.checkScripts(scripts, function(){
						switch(title){
							case "acerca":
								newTitle="SuperIRis :: Acerca de mí";
							break;
							case "proyecto":
							case "proyectos":
								newTitle="SuperIRis :: Portafolios";
							break;
							case "contacto":
								newTitle="SuperIRis :: Contacto";
							break;
							default:
								newTitle="SuperIRis";
							}


						

						document.title = newTitle;
						if(window.history.pushState){
							window.history.pushState(newTitle, newTitle, AnimatedLoader.url);
						}
						

						setTimeout(function(){
							tempElement.remove();
							AnimatedLoader.hideLoader();
							window.loadPage(title.toLowerCase(), true);
						},200);
					});
					
				}
			});
		}, 1000);
		
		
	};
	AnimatedLoader.checkScripts = function(scripts, callback){
		var script, loadedScripts = 0, scriptsToLoad=0;
		for(var i = 0, limit = scripts.length; i<limit; i++){
			script = scripts[i].src.substr(scripts[i].src.lastIndexOf("/")+1);
			switch(script){
				case "jquery.min.js":
					if(typeof $ === "undefined"){
						scriptsToLoad++;
						AnimatedLoader.loadScript(scripts[i].src,onLoadedScript);
					}
					break;
				case "snap.svg-min.js":
					if(typeof Snap === "undefined"){
						scriptsToLoad++;
						AnimatedLoader.loadScript(scripts[i].src,onLoadedScript);
					}
					break;
				case "circles.min.js":
					if(typeof Circles === "undefined"){
						scriptsToLoad++;
						AnimatedLoader.loadScript(scripts[i].src,onLoadedScript);
					}
					break;
				case "js?v=3.exp&signed_in=true":
					if(typeof google === "undefined"){
						scriptsToLoad++;
						AnimatedLoader.loadScript("https://maps.googleapis.com/maps/api/js?v=3.exp&callback=initializeMap&key=AIzaSyBNAwmEPIfIlqyIh-2_7e9S2AfeXPnaYy4",onLoadedScript);
					}
				break;
				case "bundle.js":
				case "":
					break;
				default:
					console.warn("Se desconoce el script:", script);
			}
		}
		if(scriptsToLoad===0){
			callback();
		}
		function onLoadedScript(){
			loadedScripts++;
			if(loadedScripts===scriptsToLoad){
				callback();
			}
		}
	};
	AnimatedLoader.loadScript = function(script, callback){
		//console.log("cargar", script);
		$.getScript(script, callback);
	};
	AnimatedLoader.loadSection = function(url){
		if(!AnimatedLoader.animation){
			return console.error("AnimatedLoader hasn't been initiated");
		}
		AnimatedLoader.url = url;
		AnimatedLoader.loadData = "";
		AnimatedLoader.loadReady = false;
		AnimatedLoader.animationReady = false;
		AnimatedLoader.showLoader();

		AnimatedLoader.ajaxLoad(url, AnimatedLoader.onSectionDOMReady);
		$(".selected").removeClass("selected");

		setTimeout(function(){
			AnimatedLoader.animationReady = true;
			if(AnimatedLoader.loadReady){
				AnimatedLoader.onLoadReady();
			}
			
			$("a[href='"+url+"']").addClass("selected");	
			$("body").removeClass("project-detail-body");
			$(".main-header").removeClass("project-header");
			$("#main-footer").removeClass("project-footer");
			$("#main-wrapper").removeClass();
			$("#main-header").removeClass().addClass("main-header");
			$("#pusher").removeClass("push");
			$("#main-container").removeClass();
			if(url==="acerca.html"){
				$("#main-container").removeClass().addClass("aboutme-container container");
			}
			else if(url.indexOf("proyecto.html")!==-1){
				$("a[href='proyectos.html']").addClass("selected");	
				$("#main-container").addClass("project-container").addClass("container");
				$("#main-wrapper").addClass("wrapper project-wrapper");
				$("body").addClass("project-detail-body");
				$(".main-header").addClass("project-header");
				$("#main-footer").addClass("project-footer");
			}
			else if(url==="/"){
				$("#main-container").removeClass().addClass("main-container");
			}
			else if(url==="contacto.html"){
				$("#main-wrapper").removeClass().addClass("wrapper");
				$("#main-container").addClass("container contact-container");
				$("#pusher").addClass("push");
			}
			if($("#mobile-menu").hasClass("active")){
				$("#mobile-menu").click();
				$(".mobile-menu-on").removeClass("mobile-menu-on");
			}

		}, 1000);
		
		
		
	};
	AnimatedLoader.stop = function(){
		AnimatedLoader.animation.stop();
	};
	AnimatedLoader.init = function(animation){
		AnimatedLoader.animation = animation;
		AnimatedLoader.animation.start();
		if(!AnimatedLoader.animation){
			return console.error("AnimatedLoader needs an animation from AnimatedJsonSprite");
		}
	};


	module.exports = AnimatedLoader;
})();


