/* global $*/
/* global alert */
"use strict";
;(function(){
	//require('./lib/jquery.event.swipe.js')(jQuery);
	var sim = require("./modules/calc.js");
	var utils = require("./modules/utils.js");
	var graphs = require("./modules/graphs.js");
	var ajaxTries = 0;
	var currentSection = "home.html";
	var sectionLabels = {
		"home.html":"Home",
		"1_nuestra-propuesta.html":"Nuestra propuesta",
		"2_portafolios-gold.html":"Portafolios Gold",
		"3_beneficios.html":"Beneficios",
		"4_productos-bancarios.html":"Productos Bancarios",
		"5_campana.html":"Campaña",
		"5_campana-video.html":"Campaña",
		"1-4_productos-inversion.html":"Productos de inversión",
		"1-5_simulador.html":"Simulador",
		"2-1_portafolios-gold1.html":"Portafolios Gold 1+",
		"2-2_portafolios-gold2.html":"Portafolios Gold 2+",
		"2-3_portafolios-gold3.html":"Portafolios Gold 3+",
		"2-4_portafolios-gold4.html":"Portafolios Gold 4+",
		"2-5_portafolios-gold5.html":"Portafolios Gold 5+",
		"3-3_privilegios.html":"Privilegios"
	};
	var history = [currentSection];
	var restaurants = {
		"cdmx":["alfreedo-di-roma","au-pied-de-cochon-polanco","au-pied-de-cochon-santa-fe","bistro-bardotdf","bonito-condesa","bonito-san-a_ngel","cantineta_del_beco","comensal","cortez","el_escorial","jaguar","la-loggia","la-traineradf","la-u_nica","la-vie-en-rose","livorno","l_osteria_del-becco","mexsi-bocu","mistral","olives","ol_becco","porter","syrah","the-palm-polanco","the-palm-santa-fe","bistro_estoril","estoril"],
		"gdl":["la-trainera","la_tequila","ofelia-bistro","santo-mar","tonys-asian"],
		"aca":["kookaburra"],
		"mty":["bistro-bardot","chino-latino","curry-sultan","habita-mty","la-felix"]
	};
	//"kaah-siis",
	
	function loadPartial(url, callback){
		utils.get(url, callback);
	}

	function onHeadLoaded(content){
		var domElement = $(content);
		$("#section-main-container").prepend(domElement);
		loadPartial("partials/footer.html", onFooterLoaded);
	}
	function onFooterLoaded(content){
		var domElement = $(content);
		$("#section-main-container").append(domElement);
		prepareForAnimation();
		animateAll();
		loadActions(currentSection);
	}
	function onHomeLoaded(content){
		var domElement = $(content);
		$("#section-container").html(domElement);
		loadPartial("partials/header.html", onHeadLoaded);
		
	}

	function prepareForAnimation(){

		$(".anim-left").addClass("animated animated-left");
		$(".anim-right").addClass("animated animated-right");
		$(".anim-fade").addClass("animated animated-fade");
		
	}
	function animateAll(){
		$(".animated-fade").each(function(index){
			(function(ele){setTimeout(function(){
				ele.removeClass("anim-fade");
			},200*(index+1));})($(this));
		});
		$(".animated-left").each(function(index){
			(function(ele){setTimeout(function(){
				ele.removeClass("anim-left");
			},200*(index+1));})($(this));
		});
		setTimeout(function(){
			$(".animated-right").each(function(index){
				(function(ele){setTimeout(function(){
					ele.removeClass("anim-right");
				},200*index);})($(this));
			});
		},200);
		
	}
	function goTo(section, dataOrigin){
		currentSection = section;
		if(dataOrigin === "home.html"){
			history.length = 1;
		}
		utils.get("partials/"+section, onSectionLoaded);
	}
	function onSectionLoaded(content){
		var domElement = $(content);
		if(currentSection === history[0] || history.length === 0){
			$("#videoconferences-link-container").removeClass("hidden");
			$("#back-link-btn").addClass("hidden");
			$("#main-logo").removeClass("hidden");
			
		}
		else{
			$("#videoconferences-link-container").addClass("hidden");
			$("#main-logo").addClass("hidden");
			$("#back-link-btn").removeClass("hidden");
			$("#back-link-btn").html(sectionLabels[history[history.length-1]]);
			$("#back-link-btn").attr("href", history[history.length-1]);
		}

		history.push(currentSection);
		$(".animated-left").addClass("anim-left");
		$(".animated-right").addClass("anim-right");
		$(".animated-fade").addClass("anim-fade");
		setTimeout(function(){
			$("#section-container").html(domElement);
			loadActions(currentSection);
			prepareForAnimation();
			animateAll();
			
		},600);
		if($("#main-footer").find("a[href='"+currentSection+"']").length >0 || currentSection === "home.html"){
			$("#main-footer").find(".selected").removeClass("selected");
			$("#main-footer").find("a[href='"+currentSection+"']").addClass("selected");
		}
		if(window.ga){
			ga("send", "pageview", currentSection);
		}
		
	}

	
	$(document).on("click touchstart", "a", function(event){
		if($(this).attr("data-freelink")){
			$(this).removeAttr("data-freelink");
			$("#modalBoxAlert").fadeOut();
			return;
		}
		event.preventDefault();

		if($(this).attr("id")==="back-link-btn"){
			if(history.length>1){
				history.splice(history.length-2,2);
			}
			
		}
		if($(this).attr("href").indexOf("http")!== -1){
			$("#modalBoxAlert").fadeIn();
			$("#open-external-btn").attr({"href": $(this).attr("href"), "data-freelink":"link"});
		}
		else if($(this).attr("href")!=="#"){
			goTo($(this).attr("href"), $(this).attr("data-origin"));
		}
		
	});
	$(".close-modal-btn").on("click touchstart", function(){
		$("#modalBoxAlert").fadeOut();
	});
	function loadActions(section){
		//console.log("load actions from", section);
		var graphsLoaded_1_1;
		var graphsLoaded_1_3;
		var graphsLoaded_2_1_1;
		var graphsLoaded_2_2_1;
		var graphsLoaded_2_3_1;
		var graphsLoaded_2_4_1;
		var graphsLoaded_2_5_1;
		var dragend;
		//destruir todo lo de todas las secciones
		graphs.destroyCreated();
		//
		if(dragend){
			dragend.destroy();
		}
		sim.destroy();
		if(section==="1-1_estrategia-portafolios.html"){
			$("#our-proposal-tab-left").off().on("click", function(){
				$(".ourproposal-container .selected").removeClass("selected");
				$("#our-proposal-tab-left").addClass("selected");
				$("#first-tab").addClass("selected");
				$("#first-tab-intro").removeClass("hidden");
				$("#second-tab-intro").addClass("hidden");

			});
			$("#our-proposal-tab-right").off().on("click", function(){
				$(".ourproposal-container .selected").removeClass("selected");
				$("#our-proposal-tab-right").addClass("selected");
				$("#second-tab").addClass("selected");
				$("#second-tab-intro").removeClass("hidden");
				$("#first-tab-intro").addClass("hidden");
				if(!graphsLoaded_1_1){
					graphs.loadPieGraph("portfolioGoldAll", "pie1", "piechart0");
					graphs.loadPieGraph("portfolioGoldAll", "pie2", "piechart1");
					graphs.loadPieGraph("portfolioGoldAll", "pie3", "piechart2");
					graphs.loadPieGraph("portfolioGoldAll", "pie4", "piechart3");
					graphs.loadPieGraph("portfolioGoldAll", "pie5", "piechart4");
					graphsLoaded_1_1 = true;
					
				}
			});
		}
		else if(section==="1-2_diversificacion-portafolios.html"){
			$("#diversification-market-btn").off().on("click", function(){
				$("#diversification-market-info").fadeIn();
			});
			$("#diversification-market-info .close-btn").off().on("click", function(){
				$("#diversification-market-info").fadeOut();
			});

		}
		else if(section==="1-3_panorama.html"){
			
			graphs.loadDBarGraph("panoramaMarket", "dbar", "d-barchart1");
			
			

			$("#panorama-tab-left-tab").off().on("click", function(){
				$(".panorama-container .selected").removeClass("selected");
				$("#panorama-tab-left").addClass("selected");
				$("#panorama-tab-left-tab").addClass("selected");
			});
			$("#panorama-tab-right-tab").off().on("click", function(){
				$(".panorama-container .selected").removeClass("selected");
				$("#panorama-tab-right").addClass("selected");
				$("#panorama-tab-right-tab").addClass("selected");
				if(!graphsLoaded_1_3){
					graphs.loadDBarGraph("panoramaMarket", "dbar", "d-barchart2");
					graphsLoaded_1_3 = true;
				}
			});
		}
		else if(section==="1-4-3_plan-patrimonial.html"){

			$("#patrimonial-swipecontainer").off("click", ".legal-bottom").on("click", ".legal-bottom", function(){
				$("#patrimonialp-info").fadeIn();
			});
			$("#patrimonial-swipecontainer").off("click", ".close-btn").on("click", ".close-btn", function(){
				$("#patrimonialp-info").fadeOut();
			});

			dragend = new Dragend($("#patrimonial-swipecontainer")[0],{
				 afterInitialize: function() {
			          $("#patrimonial-swipecontainer")[0].style.visibility = "visible";
			        },
			    onSwipeEnd:function(f,e){
			    	$("#patrimonialp-dotnav .selected").removeClass("selected");
			    	$("#patrimonialp-dotnav a:nth-child("+($(e).index()+1)+")").addClass("selected");
			    }
			});
			$("#patrimonialp-dotnav .dot-2").off().on("click touchstart", function(){
				$("#patrimonial-swipecontainer").dragend({
		          scrollToPage: 2
		        });
		        $("#patrimonialp-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			$("#patrimonialp-dotnav .dot-1").off().on("click touchstart", function(){
				$("#patrimonial-swipecontainer").dragend({
		          scrollToPage: 1
		        });
		        $("#patrimonialp-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			
		}
		else if(section==="1-4-4_credito-patrimonial.html"){

			dragend = new Dragend($("#patrimonial-swipecontainer")[0],{
				 afterInitialize: function() {
			          $("#patrimonial-swipecontainer")[0].style.visibility = "visible";
			        },
			    onSwipeEnd:function(f,e){
			    	$("#patrimonialc-dotnav .selected").removeClass("selected");
			    	$("#patrimonialc-dotnav a:nth-child("+($(e).index()+1)+")").addClass("selected");
			    }
			});
			$("#patrimonialc-dotnav .dot-3").off().on("click touchstart", function(e){
				e.preventDefault();
				$("#patrimonial-swipecontainer").dragend({
		          scrollToPage: 3
		        });
		        $("#patrimonialc-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			$("#patrimonialc-dotnav .dot-2").off().on("click touchstart", function(){
				$("#patrimonial-swipecontainer").dragend({
		          scrollToPage: 2
		        });
		        $("#patrimonialc-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			$("#patrimonialc-dotnav .dot-1").off().on("click touchstart", function(){
				$("#patrimonial-swipecontainer").dragend({
		          scrollToPage: 1
		        });
		        $("#patrimonialc-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			
		}
		else if(section === "1-5_simulador.html"){
			$("#calcAmountInput").off().on("input", function(){
				if($(this).val().length>15){
					$(this).val($(this).val().substr(0,15));
				}
			});
			sim.init();
		}
		else if(section==="2-1-1_composicion-rendimientosg1.html"){
			graphs.load3DPieGraph("portfolioGold1", "pie1","cmgpiechart1", ["#d75713", "#889613", "#ed8b00", "#e4e5e7", "#8490ac", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c", "#adbd00"]);
			graphs.load3DPieGraph("portfolioGold1", "pie2","cmgpiechart2", ["#d75713", "#889613", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c"]);

			$("#cr-product-btn").off().on("click", function(){ 
				$("#cr-product-info").fadeIn();
			});
			$("#cr-product-info .close-btn").off().on("click", function(){
				$("#cr-product-info").fadeOut();
			});
			$("#cr-class-btn").off().on("click", function(){ 
				$("#cr-class-info").fadeIn();
			});
			$("#cr-class-info .close-btn").off().on("click", function(){
				$("#cr-class-info").fadeOut();
			});
			$("#compositionrevenue-tab-left-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-left").addClass("selected");
				$("#compositionrevenue-tab-left-tab").addClass("selected");
			});
			$("#compositionrevenue-tab-right-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-right").addClass("selected");
				$("#compositionrevenue-tab-right-tab").addClass("selected");
				if(!graphsLoaded_2_1_1){
					graphs.loadBarGraph("portfolioGold1", "bar","cmgbarchart");
					graphsLoaded_2_1_1 = true;
				}
			});
		}
		else if(section==="2-2-1_composicion-rendimientosg2.html"){
			
			graphs.load3DPieGraph("portfolioGold2", "pie1","cmg2piechart1", ["#d75713", "#889613", "#ed8b00", "#e4e5e7", "#8490ac", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c", "#adbd00"]);
			graphs.load3DPieGraph("portfolioGold2", "pie2","cmg2piechart2", ["#d75713", "#889613", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c"]);

			$("#cr-product-btn").off().on("click", function(){ 
				$("#cr-product-info").fadeIn();
			});
			$("#cr-product-info .close-btn").off().on("click", function(){
				$("#cr-product-info").fadeOut();
			});
			$("#cr-class-btn").off().on("click", function(){ 
				$("#cr-class-info").fadeIn();
			});
			$("#cr-class-info .close-btn").off().on("click", function(){
				$("#cr-class-info").fadeOut();
			});
			$("#compositionrevenue-tab-left-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-left").addClass("selected");
				$("#compositionrevenue-tab-left-tab").addClass("selected");
			});
			$("#compositionrevenue-tab-right-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-right").addClass("selected");
				$("#compositionrevenue-tab-right-tab").addClass("selected");
				if(!graphsLoaded_2_2_1){
					graphs.loadBarGraph("portfolioGold2", "bar","cmg2barchart");
					graphsLoaded_2_2_1 = true;
				}
			});
		}
		else if(section==="2-3-1_composicion-rendimientosg3.html"){
			
			graphs.load3DPieGraph("portfolioGold3", "pie1","cmg3piechart1", ["#d75713", "#889613", "#ed8b00", "#e4e5e7", "#8490ac", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c", "#adbd00"]);
			graphs.load3DPieGraph("portfolioGold3", "pie2","cmg3piechart2", ["#d75713", "#889613", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c"]);
			$("#cr-product-btn").off().on("click", function(){ 
				$("#cr-product-info").fadeIn();
			});
			$("#cr-product-info .close-btn").off().on("click", function(){
				$("#cr-product-info").fadeOut();
			});
			$("#cr-class-btn").off().on("click", function(){ 
				$("#cr-class-info").fadeIn();
			});
			$("#cr-class-info .close-btn").off().on("click", function(){
				$("#cr-class-info").fadeOut();
			});
			$("#compositionrevenue-tab-left-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-left").addClass("selected");
				$("#compositionrevenue-tab-left-tab").addClass("selected");
			});
			$("#compositionrevenue-tab-right-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-right").addClass("selected");
				$("#compositionrevenue-tab-right-tab").addClass("selected");
				if(!graphsLoaded_2_3_1){
					graphs.loadBarGraph("portfolioGold3", "bar","cmg3barchart");
					graphsLoaded_2_3_1 = true;
				}
			});
		}
		else if(section==="2-4-1_composicion-rendimientosg4.html"){
			
			graphs.load3DPieGraph("portfolioGold4", "pie1","cmg4piechart1", ["#d75713", "#889613", "#ed8b00", "#e4e5e7", "#8490ac", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c", "#adbd00"]);
			graphs.load3DPieGraph("portfolioGold4", "pie2","cmg4piechart2", ["#d75713", "#889613", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c"]);
			$("#cr-product-btn").off().on("click", function(){ 
				$("#cr-product-info").fadeIn();
			});
			$("#cr-product-info .close-btn").off().on("click", function(){
				$("#cr-product-info").fadeOut();
			});
			$("#cr-class-btn").off().on("click", function(){ 
				$("#cr-class-info").fadeIn();
			});
			$("#cr-class-info .close-btn").off().on("click", function(){
				$("#cr-class-info").fadeOut();
			});
			$("#compositionrevenue-tab-left-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-left").addClass("selected");
				$("#compositionrevenue-tab-left-tab").addClass("selected");
			});
			$("#compositionrevenue-tab-right-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-right").addClass("selected");
				$("#compositionrevenue-tab-right-tab").addClass("selected");
				if(!graphsLoaded_2_4_1){
					graphs.loadBarGraph("portfolioGold4", "bar","cmg4barchart");
					graphsLoaded_2_4_1 = true;
				}
			});
		}
		else if(section==="2-5-1_composicion-rendimientosg5.html"){
			
			graphs.load3DPieGraph("portfolioGold5", "pie1","cmg5piechart1", ["#d75713", "#889613", "#ed8b00", "#e4e5e7", "#8490ac", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c", "#adbd00"]);
			graphs.load3DPieGraph("portfolioGold5", "pie2","cmg5piechart2", ["#d75713", "#889613", "#559cc0", "#4b5d85", "#d5c41a", "#882f5c"]);

			$("#cr-product-btn").off().on("click", function(){ 
				$("#cr-product-info").fadeIn();
			});
			$("#cr-product-info .close-btn").off().on("click", function(){
				$("#cr-product-info").fadeOut();
			});
			$("#cr-class-btn").off().on("click", function(){ 
				$("#cr-class-info").fadeIn();
			});
			$("#cr-class-info .close-btn").off().on("click", function(){
				$("#cr-class-info").fadeOut();
			});
			$("#compositionrevenue-tab-left-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-left").addClass("selected");
				$("#compositionrevenue-tab-left-tab").addClass("selected");
			});
			$("#compositionrevenue-tab-right-tab").off().on("click", function(){
				$(".compositionrevenue-container .selected").removeClass("selected");
				$("#compositionrevenue-tab-right").addClass("selected");
				$("#compositionrevenue-tab-right-tab").addClass("selected");
				if(!graphsLoaded_2_5_1){
					graphs.loadBarGraph("portfolioGold5", "bar","cmg5barchart");
					graphsLoaded_2_5_1 = true;
				}
			});
		}
		else if(section==="3-5_acceso-global.html"){
			$("#globala-btn").off().on("click", function(){
				$("#globala-info").fadeIn();
			});
			$("#globala-info .close-btn").off().on("click", function(){
				$("#globala-info").fadeOut();
			});

		}
		else if(section==="3-3-2_restaurantes.html"){
			$("#restaurant-options li").hide();

			$("#city-selector").off().on("change", function(){
				var city = $("#city-selector").val();
				var restaurantItem;
				$("#restaurant-options li").hide();
				for(var i = 0, limit = restaurants[city].length; i<limit; i++){
					restaurantItem = $("."+restaurants[city][i]);
					if(restaurantItem.length>0){
						restaurantItem.show();
					}
				}
			});
			$("#city-selector").trigger("change");
		}
		else if(section==="3-3-3_experiencias.html"){

			
			dragend = new Dragend($("#experiences-swipecontainer")[0],{
				 afterInitialize: function() {
			          $("#experiences-swipecontainer")[0].style.visibility = "visible";
			        },
			    onSwipeEnd:function(f,e){
			    	$("#experiences-dotnav .selected").removeClass("selected");
			    	$("#experiences-dotnav a:nth-child("+($(e).index()+1)+")").addClass("selected");
			    }
			});
			$("#experiences-dotnav .dot-2").off().on("click touchstart", function(){
				$("#experiences-swipecontainer").dragend({
		          scrollToPage: 2
		        });
		        $("#experiences-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			$("#experiences-dotnav .dot-1").off().on("click touchstart", function(){
				$("#experiences-swipecontainer").dragend({
		          scrollToPage: 1
		        });
		        $("#experiences-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			
		}
		else if(section==="4-2_credito-hipotecario.html"){
			$("#mortgage-btn").off().on("click", function(){
				$("#mortgage-info").fadeIn();
			});
			$("#mortgage-info .close-btn").off().on("click", function(){
				$("#mortgage-info").fadeOut();
			});

		}
		else if(section==="4-3_tarjeta-prestige.html"){
			$("#prestige-btn").off().on("click", function(){
				$("#prestige-info").fadeIn();
			});
			$("#prestige-info .close-btn").off().on("click", function(){
				$("#prestige-info").fadeOut();
			});

		}
		
		else if(section==="4-4_seguros.html"){

			$("#insurance-swipecontainer").off("click", ".insuranceh-legals").on("click", ".insuranceh-legals", function(){
				
				$("#insuranceh-info").fadeIn();
			});
			
			$("#insurance-swipecontainer").off("click", ".insurancec-legals").on("click", ".insurancec-legals", function(){
				
				$("#insurancec-info").fadeIn();
			});
			$("#insurance-swipecontainer").off("click", ".close-btn").on("click", ".close-btn", function(){
				$("#insurancec-info").fadeOut();
				$("#insuranceh-info").fadeOut();
			});

			dragend = new Dragend($("#insurance-swipecontainer")[0],{
				 afterInitialize: function() {
			          $("#insurance-swipecontainer")[0].style.visibility = "visible";
			        },
			    onSwipeEnd:function(f,e){
			    	$("#insurance-dotnav .selected").removeClass("selected");
			    	$("#insurance-dotnav a:nth-child("+($(e).index()+1)+")").addClass("selected");
			    }
			});
			$("#insurance-dotnav .dot-2").off().on("click touchstart", function(){
				$("#insurance-swipecontainer").dragend({
		          scrollToPage: 2
		        });
		        $("#insurance-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			$("#insurance-dotnav .dot-1").off().on("click touchstart", function(){
				$("#insurance-swipecontainer").dragend({
		          scrollToPage: 1
		        });
		        $("#insurance-dotnav .selected").removeClass("selected");
		        $(this).addClass("selected");
			});
			
		}
		else if(section==="5_campana-video.html"){

			$("#campaign-video").off().on("click", function(){
				this.paused ? this.play() : this.pause();
			});
			

		}


	}
	graphs.init();
	loadPartial("partials/home.html", onHomeLoaded);
	//loadPartial("partials/5_campana-video.html", onHomeLoaded);
	//currentSection = "5_campana-video.html";

})();




