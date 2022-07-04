"use strict";
/* global $*/
;(function(){
	var Project = {};
	var PROJECTS = require("../../data/projects.js");
	var Utils = require("../lib/Utils.js");
	var AnimatedLoader = require("../lib/AnimatedLoader.js");
	var player, videoId, showingVideo;
	//var Utils = require("../lib/Utils.js");

	function onExtraInfoClick(e){
		if($(e.currentTarget).is(":disabled")){
			return;
		}
		//console.log($(e.currentTarget).attr("disabled"));
		$(e.currentTarget).attr("disabled", "disabled");
		if($("#extra-info-sec").hasClass("unshown")){
			$("#info-overlay").removeClass("hidden");
			changeExtraBtnTxtToMinus();
			setTimeout(function(){
				$("#info-overlay").removeClass("unshown");
			}, 100);
			//if($(window).width()>700){
				setTimeout(function(){
					$("#extra-info-sec").removeClass("unshown");
					$(e.currentTarget).removeAttr("disabled");
				}, 500);
			//}
			//else{
			//	$("#extra-info-sec").removeClass("unshown");
			//}
		}
		else{
			$("#extra-info-sec").addClass("unshown");
			
			changeMinusBtnTxtToExtra();
			setTimeout(function(){
				$("#info-overlay").addClass("unshown");
			},500);
			setTimeout(function(){
				$("#info-overlay").addClass("hidden");
				$(e.currentTarget).removeAttr("disabled");
			}, 1000);
		}	
		

	}
	function changeExtraBtnTxtToMinus(){
		setTimeout(function(){
			$("#extra-info-sec-btn").html("MXTRA INFO");
		}, 500);
		setTimeout(function(){
			$("#extra-info-sec-btn").html("METRA INFO");
		}, 650);
		setTimeout(function(){
			$("#extra-info-sec-btn").html("MENRA INFO");
		}, 800);
		setTimeout(function(){
			$("#extra-info-sec-btn").html("MENOA INFO");
		}, 950);
		setTimeout(function(){
			$("#extra-info-sec-btn").html("MENOS INFO");
		}, 1100);
	}
	function changeMinusBtnTxtToExtra(){
		setTimeout(function(){
			$("#extra-info-sec-btn").html("EXTRA INFO");
		}, 1100);
		setTimeout(function(){
			$("#extra-info-sec-btn").html("MXTRA INFO");
		}, 950);
		setTimeout(function(){
			$("#extra-info-sec-btn").html("METRA INFO");
		}, 800);
		setTimeout(function(){
			$("#extra-info-sec-btn").html("MENRA INFO");
		}, 650);
		setTimeout(function(){
			$("#extra-info-sec-btn").html("MENOA INFO");
		}, 500);
		
	}
	function slideImages(){
		var currentImage = 0;
		//$("#video-container").addClass("unshown");
		
		Project.sliderInterval = setInterval(function(){
			currentImage++;
			if(currentImage===Project.info.images.detail.length){
				currentImage=0;
			}
			$("#main-container").addClass("dark");
			setTimeout(function(){
				$("#main-container").removeClass("dark");
				$("#video-container").css("background-image","url(images/projects/"+Project.info.images.detail[currentImage]+")");
			}, 1000);
		}, 8000);
	}
	function onGoToProject(e){
		AnimatedLoader.loadSection("proyecto.html#"+$(e.currentTarget).attr("data-id"));
	}
	function onCloseProjects(e){
		$(e.currentTarget).attr("href", "proyectos.html");
		onOpenSection(e);
	}
	function onOpenSection(e){
		e.preventDefault();
		
		AnimatedLoader.loadSection($(e.currentTarget).attr("href"));
	}
	function loadYT(callback){
		if(!player){
			$.getScript( "https://www.youtube.com/iframe_api", function( data, textStatus, jqxhr ) {
			  if(typeof callback === "function"){
			  	callback();

			  }
			  console.log("loaded yt")
			});
		}
		else{
			player.destroy();
			window.onYouTubeIframeAPIReady();
			//player.loadVideoById(videoId);
		}
		
	}
	function onPlayerReady(event) {
	  event.target.playVideo();
	  event.target.mute();
	}
	function onPlayerStateChange(event){
		if (event.data == YT.PlayerState.PLAYING && !showingVideo) {
			showingVideo = true;
			//quitar imagen, mostrar video
			$("#fake-video-container").addClass("unshown");

		}
		else if(event.data==YT.PlayerState.ENDED){
			player.playVideo();
		}

	}
	window.onYouTubeIframeAPIReady = function() {
		console.log("iframe ready", videoId)
	  player = new YT.Player('video-container', {
	    height: '315',
	    width: '420',
	    videoId: videoId,
	    playerVars: { 'rel': 0, 'controls': 0 },
	    events: {

	      'onReady': onPlayerReady,
	      'onStateChange':onPlayerStateChange
	    }
	  });

	}

	Project.init = function(){
		var typeLink = $("#project-type").find("a").detach();
		var dataListItem = $("#project-list").find("li").detach();
		var dataList = $("#project-list").detach();
		var imageListItem = $("#project-gallery").find("li").detach();
		var imageList = $("#project-gallery").detach();
		var dataListItemTemp;
		var imageListItemTemp;
		
		$("#extra-info-sec-btn").on("click", onExtraInfoClick);
		$("#next-btn, #last-btn").on("click", onGoToProject);
		$("#close-btn").on("click", onCloseProjects);
		$("#main-menu").on("click", "a", onOpenSection);
		Project.id = window.location.hash;
		
		Project.info = Utils.getProjectByStringID(Project.id.substr(1), PROJECTS.projects);
		if(!Project.info){
			window.location = "/";
		}
		else{
			$("#last-btn").attr("data-id", Project.info.lastProject.stringID).find(".title").html(Project.info.lastProject.name);
			$("#next-btn").attr("data-id", Project.info.nextProject.stringID).find(".title").html(Project.info.nextProject.name);
			$("#project-name").html(Project.info.name);

			$("#project-type").html(Project.info.type);
			if(Project.info.urls[0]){
				typeLink.attr("href", Project.info.urls[0]);
				$("#project-type").append(typeLink);
			}
			$("#project-year").html("Año: "+Project.info.year);
			$("#project-via").html("Vía: "+Project.info.via);
			$("#project-participation").html("Lo que yo hice: "+Project.info.participation);
			$("#project-about").html(Project.info.about.replace(/\n/g, "</p><p>"));
			$("#project-technically").html(Project.info.technically);
			$("#project-curious").html(Project.info.curious);
			for(var i = 0; i<Project.info.list.length; i++){
				dataListItemTemp = dataListItem.clone();
				dataListItemTemp.find("i").addClass("fa-"+Project.info.list[i].icon);
				dataListItemTemp.append(Project.info.list[i].info);
				dataList.append(dataListItemTemp);
			}
			$("#project-list-container").append(dataList);
			for (var j = 0; j<Project.info.images.detail.length; j++){
				imageListItemTemp = imageListItem.clone();
				imageListItemTemp.find("img").attr("src", "images/projects/"+Project.info.images.detail[j]);
				imageList.append(imageListItemTemp);
			}
			$("#project-gallery-container").append(imageList);
			if(Project.info.video && Project.info.video.length>5){
				videoId = Project.info.video.substr(Project.info.video.indexOf("embed/")+6);
				loadYT();
				$("#fake-video-container").attr("src", "images/projects/"+Project.info.images.detail[0]+"").show();

				//$("#project-video").attr("src", Project.info.video+"?autoplay=1&controls=0&loop=1&rel=0&showinfo=0&wmode=transparent");
			}
			else{
				$("#project-video").remove();
				$("#fake-video-container").hide();
				$("#video-container").addClass("video-container");
				if($(window).width()>=770){
					slideImages();
				}
			}
			
			$("#video-container").css("background-image", "url(images/projects/"+Project.info.images.detail[0]+")");
			
			Utils.trackView("Proyecto-"+Project.info.client+"-"+Project.info.name);
		}
	};
	Project.destroy = function(){
		$("#extra-info-sec-btn").off();
		$("#next-btn, #last-btn").off();
		$("#close-btn").off();
		$("#main-menu").off("click", "a");
		clearInterval(Project.sliderInterval);
	};
	module.exports = Project;
})();


