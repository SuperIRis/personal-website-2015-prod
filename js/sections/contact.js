/* global $*/
/* global Snap*/
/* global google*/
/* global alert*/
;(function(){
	"use strict";
	var Contact = {};
	var AnimatedLoader = require("../lib/AnimatedLoader.js");
	var Utils = require("../lib/Utils.js");
	var map, whereIAm;
	var backendTries = 0;
	function svgAnimate(f){
		var computerScreen = f.select("#svg-screen"),
			arms = f.select("#svg-arms"),
			initialScreenColor="#fff",
			alternateScreenColor="#ccc",
			i=0;
		
		setInterval(function(){
			i++;
			computerScreen.animate({fill:i%2===0 ? initialScreenColor : alternateScreenColor}, 200);
			if(i%7===0){
				arms.removeClass("arms-down");
				arms.addClass("arms-up");
			}
			else{
				arms.removeClass("arms-up");
				arms.addClass("arms-down");
			}

		}, 700);
	}
	function setAvailability(f){
		var availability = 10-Math.round(Number($("#availability-percentage").attr("value"))/10);
		var papers = f.select("#papers");
		
		var i = 1;
		while(papers.select("rect:nth-child("+i+")")){
			papers.select("rect:nth-child("+i+")").addClass("paper-out");
			i++;
		}
		i=1;
		var papersInterval = setInterval(function(){
			if(!papers.select("rect:nth-child("+(i+10)+")") || i>availability){
				clearInterval(papersInterval);
				return;
			}
			papers.select("rect:nth-child("+i+")").removeClass("paper-out");
			papers.select("rect:nth-child("+i+")").addClass("paper-in");
			papers.select("rect:nth-child("+(i+10)+")").removeClass("paper-out");
			papers.select("rect:nth-child("+(i+10)+")").addClass("paper-in");
			i++;
		}, 200);
	}
	function resizeMap(){
		map.setCenter(whereIAm);
	}
	function addMarker(whereMarkerIs){
		var	icon = new google.maps.MarkerImage("images/marker-ams.png", null, null, null, new google.maps.Size(144,192));
		Contact.marker = new google.maps.Marker({
						position:whereMarkerIs,
						map:map,
						flat:true,
						title:"SuperIRis",
						icon:icon,
						optimized:false,
						animation: google.maps.Animation.DROP
					});
	}
	function onOpenSection(e){
		console.log("open section!");
		e.preventDefault();
		AnimatedLoader.loadSection($(e.currentTarget).attr("href"));
	}
	function sendMail (data, callback){
		$.ajax({
			type: "POST",
			data:data,
			url: "process/sendmail.php",
			error:function(error,options, message){
				console.log(error, "--->",message, options);
				/*callback();
				return;*/
				backendTries++;
				if(backendTries<=5){
					setTimeout(function(){sendMail(data, callback);}, 200);
				}
				else{
					backendTries = 0;
					alert("Ha habido un error en el servidor, intenta de nuevo por favor");
				}
			},
			success: function(data) {
				//console.log(data);
				backendTries = 0;
				
				if(typeof(callback)!=="undefined"){
					callback(data);
				}
			}
		});
	}
	Contact.obfuscateMailTo = function(){
		// Email obfuscator script 2.1 by Tim Williams, University of Arizona
		// Random encryption key feature by Andrew Moulden, Site Engineering Ltd
		var coded = "MbyS@JOtlGQGQJ.ZbL",
			key = "stZ5MUTquSkAXVl2Q4J7RxnPF3OgBmdfyWrHjEIoDN1CzpcLhv80Ga9Y6beKiw",
			shift=coded.length,
			link="",
			ltr;
		for (var i=0; i<coded.length; i++) {
			if (key.indexOf(coded.charAt(i))===-1) {
			  ltr = coded.charAt(i);
			  link += (ltr);
			}
			else {     
			  ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length;
			  link += (key.charAt(ltr));
			}
		}
		$("#contact-mail").attr("href", "mailto:"+link);
	};
	Contact.setFreelanceStatusSVG = function(){
		if(typeof Snap !== "function"){
			console.error("No se encuentra la librería de Snap.svg");
			return;
		}
		var s = new Snap("#me-working-status");
		Snap.load("images/freelance-status.svg", function(f){
			if(!Contact.snapLoaded){
				svgAnimate(f);
				setAvailability(f);
				s.append(f);
				Contact.snapLoaded = true;
			}
			
		});
	};
	Contact.setMap = function(){
		/*if(typeof map !== "undefined"){
			 console.warn("Map already created");
		}*/
		var whereMarkerIs = new google.maps.LatLng(52.383182, 4.863051700000037),
			features = [{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#e3e3e3"}]},{"featureType":"landscape.natural","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#cccccc"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#FFFFFF"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]}],
			CUSTOM_STYLE_MAP = "custom_style",
			
			styledMapOptions = {
				name: "Custom Style"
			},
			customMapType = new google.maps.StyledMapType(features, styledMapOptions),
			mapOptions;
		whereIAm = new google.maps.LatLng(52.403182, 4.863051700000037);
		mapOptions = {
				zoom:10,
				center:whereIAm,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, CUSTOM_STYLE_MAP]
				},
				mapTypeId: CUSTOM_STYLE_MAP,
				disableDefaultUI: true,
				draggable:false,
				backgroundColor:"#fff",
				disableDoubleClickZoom:true,
				scrollwheel: false,
				maxZoom:15
			};
		map = new google.maps.Map(document.getElementById("map"), mapOptions);
		map.mapTypes.set(CUSTOM_STYLE_MAP, customMapType);
		setTimeout(function(){
			addMarker(whereMarkerIs);
		}, 2000);
		

	};
	function onSendForm(e){
		e.preventDefault();
		var error = 0;
		$(".error").remove();
		if($("#robot-checkbox").is(":checked")){
			$("#robot-checkbox").parent().append("<span class='error'>// Lo siento, los correos de robots sólo se reciben entre 4:00 y 4:01 AM</span>");
			error++;
		}
		$("[type='email']").each(function(){
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    		var test = $(this).parent().find("label");
    		if(!re.test($(this).val())){
				$("<span class='error'>// Este no es un correo de verdad...</span>").insertAfter(test);
    			error++;
    		}
		});
		$("[required]").each(function(){
			if($(this).val().length<2){
				var test = $(this).parent().find("label");
				$("<span class='error'>// Son pocos datos, ¡llénalos todos!</span>").insertAfter(test);
				error++;
			}
		});
		
		if(error===0){
			sendMail({
				"contactname":$("#contact-name").val(),
				"contactemail":$("#contact-email").val(),
				"contactmessage":$("#contact-message").val()
			}, function(){
				$("#c-form").fadeOut(function(){
					$("#c-form").replaceWith("<div class='form-sent'>¡Listo! Mientras te contesto, un xkcd <p><img src='http://imgs.xkcd.com/comics/keyboard_problems.png' alt='' /></p></div>");
				});

			});
		}
		Utils.trackEvent("contact-form", "send", "errors:"+error);
		
	}
	Contact.init = function(ajaxLoaded){
		Contact.obfuscateMailTo();
		Contact.setFreelanceStatusSVG();
		if(!ajaxLoaded){
			google.maps.event.addDomListener(window, "load", function(){
				Contact.setMap();
			});
		}
		else{
			$("#main-container").prepend(Contact.mapContainer);
			Contact.setMap();
			
		}
		google.maps.event.addDomListener(window, "resize", resizeMap);
		$("#main-menu").on("click", "a", onOpenSection);
		$("#c-form").on("submit", onSendForm);
		$("input").on("change", function(){
			$(".error").remove();
		});
	};
	Contact.destroy = function(){
		google.maps.event.clearListeners(window, "resize");
		google.maps.event.clearListeners(window, "load");
		$("#main-menu").off("click", "a");
		Contact.mapContainer = $("#map").detach();
		Contact.snapLoaded = false;
	};
	module.exports = Contact;

})();