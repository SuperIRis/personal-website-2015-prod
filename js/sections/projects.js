"use strict";
/* global $*/
;(function(){
	var Projects = {};
	var PROJECTS = require("../../data/projects.js");
	var AnimatedLoader = require("../lib/AnimatedLoader.js");
	//var Utils = require("../lib/Utils.js");
	function arrangeProjectsInOrder(){
		var inRow=0;
		Projects.list = [];
		//console.log(PROJECTS.projects[0].importance);
		for(var i = 0; i< PROJECTS.projects.length; i++){
			inRow+=PROJECTS.projects[i].importance;
			if(inRow>4){
				inRow = 0;
				Projects.list.push(selectProject(1, i));
				i--;
			}
			else{
				if(inRow===4){
					inRow = 0;
				}
				Projects.list.push(PROJECTS.projects[i]);
			}
		}
	}
	function selectProject(importance, index){
		for(var i = index, limit = PROJECTS.projects.length; i<limit; i++){
			if(importance === PROJECTS.projects[i].importance){
				return PROJECTS.projects.splice(i,1)[0];
			}
			
		}
	}
	function onGoToProject(e){
		e.preventDefault();
		e.stopPropagation();
		e.currentTarget = $(e.currentTarget).find("a")[0];
		onOpenSection(e);
	}
	function onOpenSection(e){
		e.preventDefault();
		AnimatedLoader.loadSection($(e.currentTarget).attr("href"));
	}
	function setProjects(){
		//$(".project").detach();
		var originalProject = $(".project:first-child").detach();
		var project;
		var projectsList = $("#projects-list").html("").detach();
		for(var i =0; i<Projects.list.length; i++){
			project = originalProject.clone();
			project.find("h1").html(Projects.list[i].client);
			project.find("h2").html(Projects.list[i].name);
			project.find("h3").html(Projects.list[i].tech);
			project.find(".extra-info").html(Projects.list[i].participation);
			project.find("a").attr("href", "proyecto.html#"+Projects.list[i].stringID);
			project.find("s2").removeClass("s2");
			project.find("s1").removeClass("s1");
			project.addClass("s"+Projects.list[i].importance);
			
			if(Projects.list[i].images.thumb){
				project.css("background-image", "url(images/projects/"+Projects.list[i].images.thumb+")");
			}
			projectsList.append(project);
		}
		$("#main-container").prepend(projectsList);
		//$(".project:first-child").detach();
		
	}

	Projects.init = function(){
		arrangeProjectsInOrder();
		setProjects();
		$("#main-menu").on("click", "a", onOpenSection);
		$("#projects-list").on("click", "li", onGoToProject);
	};
	Projects.destroy = function(){
		$("#projects-list").off("click", "a");
		$("#main-menu").off("click", "a");
	};
	module.exports = Projects;
})();




