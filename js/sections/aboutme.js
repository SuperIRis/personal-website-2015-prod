/* global $*/
/* global Circles*/
/* global Snap*/

;(function(){
	"use strict";

	var Aboutme = {};
	
	var ScrollMonitor = require("../vendor/scrollMonitor.js");
	var AnimatedLoader = require("../lib/AnimatedLoader.js");
	var AnimatedNumber = require("../lib/AnimatedNumber.js");
	var percentageColors = ["#9ac21e", "#ffd43d", "#00ccd3"];
	var circles = [], config;
	var graphsWatchers = [];
	//var statsWatcher = ScrollMonitor.create($("#stats")[0]);
	var animatedStats=[];
	var svgInterval, randomFactsInterval;
	function svgAnimate(f){
		
		var leftEye = f.select("#left-eye");
		var rightEye = f.select("#right-eye");
		var leftEyeClosed = f.select("#left-eye-closed");
		var rightEyeClosed = f.select("#right-eye-closed");
		if(!leftEye || !rightEye || !leftEyeClosed || !rightEyeClosed){
			return console.error("No se encuentran los elementos en el svg\n", leftEye, rightEye, leftEyeClosed, rightEyeClosed);
		}
		leftEyeClosed.addClass("hidden");
		rightEyeClosed.addClass("hidden");
		svgInterval = setInterval(function(){
			leftEye.addClass("hidden");
			rightEye.addClass("hidden");
			leftEyeClosed.removeClass("hidden");
			rightEyeClosed.removeClass("hidden");
			setTimeout(function(){
				leftEye.removeClass("hidden");
				rightEye.removeClass("hidden");
				leftEyeClosed.addClass("hidden");
				rightEyeClosed.addClass("hidden");
			}, 300);
		}, 4000);
	}
	function getIdByPercentage(percentage){
		if(percentage>90){
			return 0;
		}
		else if(percentage > 60){
			return 1;
		}
		else{
			return 2;
		}
	}
	
	function setAnimateStats(){
		var statsNumbers = $(".stats-number");
		for(var j = 0, limit2 = statsNumbers.length; j<limit2; j++){
			animatedStats.push(new AnimatedNumber(statsNumbers[j]));
			animatedStats[animatedStats.length-1].init();
		}
	}
	
	function createGraph(jElement){
		//for(var i = 0, limit = graphs.length; i<limit; i++){
			if(!jElement.data("circle-graph")){
				jElement.data("circle-graph", true);
				config = {
					id:			jElement[0].id,
					value: 		jElement.attr("data-percentage"),
					radius: 	25,
					duration: 	1000,
					/* jshint ignore:start */
					text: 		function(value){return "";},
					/* jshint ignore:end */
					textClass: 	"circle-graph-"+getIdByPercentage(jElement.attr("data-percentage")),
					width: 		5,
					colors: 	["#e1e1e1", percentageColors[getIdByPercentage(jElement.attr("data-percentage"))]]
				};

				circles.push(Circles.create(config));
			}
			
		//}
	}
	function animateRandomFacts(){
		var factToGo, factToAppear;
		randomFactsInterval = setInterval(function(){			
			factToAppear = $("#random-facts").find(".active").next().length===0 ? $("#random-facts").find("li:nth-child(1)") :  $("#random-facts").find(".active").next();
			factToGo = $("#random-facts").find(".active").addClass("unshown").removeClass("active");
			factToAppear.removeClass("hidden").addClass("active").addClass("unshown");
			setTimeout(function(){
				factToGo.addClass("hidden");
				factToAppear.removeClass("unshown");
			}, 400);
		},5000);
	}
	
	function graphEntering(e, domElement){

		createGraph($(domElement).find("figure"));
	}
	/*statsWatcher.enterViewport(function(){
		animateStats();
	});*/
	function onOpenSection(e){
		e.preventDefault();
		AnimatedLoader.loadSection($(e.currentTarget).attr("href"));
	}
	
	Aboutme.setSVG = function(){
		if(typeof Snap !== "function"){
			console.error("No se encuentra la librería de Snap.svg");
			return;
		}
		console.log("snap!");
			var svg = new Snap("#me-about");
		
			Snap.load("images/aboutme-me.svg", function(f){
				if(!Aboutme.snapLoaded){
					svgAnimate(f);
					svg.append(f);
					Aboutme.snapLoaded = true;
					console.log("snap loaded");
				}
				
				
			});
		
		
	};
	Aboutme.init = function(){
		setAnimateStats();
		//createGraphs();
		animateRandomFacts();
		Aboutme.setSVG();
		for (var i=0; i<$("#programming-skills li").length; i++){
			graphsWatchers.push(ScrollMonitor.create($("#programming-skills li")[i], -10));
			graphsWatchers[graphsWatchers.length-1].enterViewport(graphEntering);
		}
		$("#main-menu").on("click", "a", onOpenSection);
	};
	Aboutme.destroy = function(){
		for(var i = 0; i<graphsWatchers.length; i++){
			graphsWatchers[i].destroy();
		}
		graphsWatchers.length = 0;
		/*Aboutme.svg.remove();
		$("<figure id='me-about' class='me-about'></figure>").insertBefore("#random-facts");*/
		Aboutme.snapLoaded = false;
		clearInterval(svgInterval);
		clearInterval(randomFactsInterval);
	};

	module.exports = Aboutme;
})();

