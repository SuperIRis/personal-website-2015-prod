(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{"./lib/AnimatedJsonSprite.js":3,"./lib/AnimatedLoader.js":4,"./lib/Utils.js":6,"./sections/aboutme.js":7,"./sections/contact.js":8,"./sections/home.js":9,"./sections/project.js":10,"./sections/projects.js":11}],2:[function(require,module,exports){
module.exports = {
	"projects":[
		{
			"id":1,
			"stringID":"batalla300",
			"name":"Batalla 300",
			"client":"Warner",
			"via":"Element",
			"type":"Advergaming",
			"tech":"nodejs + twitter api",
			"year":"2014",
			"importance":2,
			"images":{
				"home":"home-warner-batalla300.jpg",
				"thumb":"projects-warner-batalla300.jpg",
				"detail":[
					"projects-warner-batalla300-1.jpg",
					"projects-warner-batalla300-2.jpg",
					"projects-warner-batalla300-3.jpg"
				]
			},
			"video":"",
			"urls":["http://batalla300.element.com.mx"],
			"participation":"Desarrollo en NodeJS para backend e implementación Javascript del sitio.",
			"about":"La segunda parte de la película 300 estaba cerca de estrenarse en México y querían generar expectativa entre la comunidad. Dado que el argumento de la película se desarrollaba en batallas navales de griegos contra persas, se propuso un juego al estilo “battleship” a través de Twitter en contra del ejército persa (los “villanos” de la película).",			
			"technically":"El proyecto se desarrolló en NodeJS con MySQL y la API de Twitter. A través de ésta, se creaba un stream que monitoreaba en todo momento cualquier mención al hashtag #Batalla300 y la guardaba en base de datos. Un demonio corriendo cada 30 segundos descargaba todos los tweets nuevos y contestaba de acuerdo con el caso a través de literalmente un ejército de cuentas de soldados, capitanes, comandantes y demás militares persas. Cada turno lo iniciaba el usuario intentando hundir los barcos del enemigo dentro de un mapa variable (3x3 o 4x4 espacios según el nivel), en cierto número de tiros. De lograrlo, avanzaba al siguiente nivel y así sucesivamente hasta llegar con Artemisa, el personaje antagónico de la película.",
			"curious":"Originalmente no estábamos seguros de que la idea fuera realizable, en teoría lo era pero con APIs externas es difícil estar seguro hasta no hacer pruebas. Tuvimos que hacer varios ajustes debido a las políticas de Twitter y fue un gran riesgo dado que el tiempo estaba muy limitado y el tiempo de pruebas fue corto, pero resultó en un gran proyecto muy divertido de hacer, que generó casi 20,000 tweets de juego. El juego ganó un bronce en los IAB por mejor Advergaming.",
			"list":[
				{"icon":"trophy", "info":"Bronce por Advergaming en los IAB"},
				{"icon":"twitter", "info":"Tuvimos muchos soldados caídos en batalla. Levantamos varias cuentas para compensar las bloqueadas por Twitter"},
				{"icon":"smile-o", "info":"Warner nos invitó a ver la película antes de su estreno en cines"}
			]
		},
		{
			"id":3,
			"stringID":"inspireka",
			"name":"Mundo Inspireka",
			"client":"Sonrics",
			"via":"Element",
			"type":"Advergaming",
			"tech":"html5 + javascript",
			"year":"2015",
			"importance":1,
			"images":{
				"home":"home-sonrics-inspireka.jpg",
				"thumb":"projects-sonrics-inspireka.jpg",
				"detail":[
					"projects-sonrics-inspireka-1.jpg",
					"projects-sonrics-inspireka-2.jpg",
					"projects-sonrics-inspireka-3.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/F88z4-s3FJE",
			"urls":["http://sonrics.com.mx/mundoinspireka"],
			"participation":"Desarrollo del juego en Javascript con PhaserJS. Creación de concepto y diseño de niveles.",
			"about":"El sitio de Sonrics alberga varios juegos con el tema de sus productos principales. Al convertirse Inspireka en una línea de varios dulces, surgió la necesidad de generar una nueva sección con su propio juego. El cliente deseaba que resaltáramos las cualidades de cada uno de los dulces, reforzando la idea de construcción y creación.\n La idea entonces se enfocó en utilizar cada dulce como un bloque de construcción con el cual Fink (la mascota de Inspireka), se abriera camino para atravesar los niveles.",
			"technically":"Utilicé el framework de PhaserJS y la herramienta de Tilemap para crear cada uno de los niveles, en base a un spritesheet.",
			"curious":"La parte más difícil fue el diseño de los niveles. Es el primer juego de niveles tipo puzzle que realizo y tenía que hacerlos de forma que fueran posibles de resolver, pero no demasiado obvios.",
			"list":[
				{"icon":"smile-o", "info":"Probé cada dulce de la línea de Inspireka"},
				{"icon":"lightbulb-o", "info":"Los niveles fueron diseñados con Tiled, es increíble"},
				{"icon":"gamepad", "info":"El modo de juego está basado en Mario VS DK"},
				{"icon":"child", "info":"Mis sobrinos amaron el juego"}
			]
		},
		{
			"id":6,
			"stringID":"mustang50",
			"name":"Mustang 50 años",
			"client":"Ford",
			"via":"Element",
			"type":"Aplicación web",
			"tech":"html5 + javascript + nodejs + twitter api",
			"year":"2014",
			"importance":1,
			"images":{
				"thumb":"projects-ford-mustang50.jpg",
				"detail":[
					"projects-ford-mustang50-1.jpg",
					"projects-ford-mustang50-2.jpg",
					"projects-ford-mustang50-3.jpg",
					"projects-ford-mustang50-4.jpg"
				]

			},
			"video":"https://www.youtube.com/embed/nbuzxBZuElY",
			"urls":[],
			"participation":"Desarrollo del backend en NodeJS / MongoDB y el frontend en HTML5 / CSS / JS.",
			"about":"En el aniversario de Mustang, hicieron un evento en Acapulco donde se proyectaba en pantallas gigantes este micrositio que mostraba en tiempo real todos los tweets con los términos relacionados con el evento. A su vez, el sitio estuvo vivo un tiempo más en línea, de esta forma podías buscar por username de Twitter en la base de datos.",
			"technically":"Se utilizó el Stream API de Twitter para guardar todos los tweets conforme el usuario los generaba. Posteriormente mediante Express y Socket.io se transmitía la información al frontend, reemplazando una foto de perfil aleatoria con la nueva.",
			"curious":"El desarrollo fue muy rápido porque teníamos poco tiempo. Todo el proyecto se completó en alrededor de 5 días.",
			"list":[
				{"icon":"photo", "info":"Probamos con más de cinco fotos para elegir la mejor"},
				{"icon":"github-alt", "info":"El código para el foto mosaico está en mi Github"}
				
			]
		},
		{
			"id":4,
			"stringID":"minitoons",
			"name":"Minitoons",
			"client":"Metlife",
			"via":"Wunderman",
			"type":"Aplicación web",
			"tech":"html5 + javascript",
			"year":"2013",
			"importance":1,
			"images":{
				"thumb":"projects-metlife-minitoons.jpg",
				"detail":[
					"projects-metlife-minitoons-1.jpg",
					"projects-metlife-minitoons-2.jpg",
					"projects-metlife-minitoons-3.jpg",
					"projects-metlife-minitoons-4.jpg",
					"projects-metlife-minitoons-5.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/G4__MYjhEJo",
			"urls":[],
			"participation":"Desarrollo en PHP y Javascript de la interfaz (no el generador).",
			"about":"Pretendíamos desarrollar una app para generar avatares al estilo de Peanuts. Esto con el objetivo de utilizarlas como foto de perfil y/o de portada, pudiendo escoger todos los aspectos incluyendo ropa, fondos, color de piel, cabello y rasgos faciales.",
			"technically":"Esta app está pensada para tres idiomas: inglés, español y portugués. Se cargaron los textos dinámicamente mediante PHP, junto con MySQL. El proceso de generar el avatar fue manejado con canvas y Javascript, con la ayuda de jQuery. Hice una pequeña interfaz de backoffice con un listado del registro de usuarios y sus avatares.",
			"curious":"El desarrollo se complicó muchísimo porque el cliente requirió soporte para IE8. Hubo que hacer un fallback en AS3 para compensar la falta de canvas en este browser, pero dadas las limitaciones para cierta longitud en base64, hubo que invertirle mucho más tiempo del esperado.",
			"list":[
				{"icon":"internet-explorer", "info":"Para hacerlo compatible con IE8, se hizo un fallback en AS3"},
				{"icon":"smile-o", "info":"Fue increíble trabajar con los personajes de Peanuts"}
			]
		},
		{
			"id":2,
			"stringID":"rescatextreme",
			"name":"Rescate Xtreme",
			"client":"Speed Stick",
			"via":"Element",
			"type":"Advergaming",
			"tech":"html5 + javascript",
			"year":"2015",
			"importance":2,
			"images":{
				"home":"home-speedstick-rescatextreme.jpg",
				"thumb":"projects-speedstick-rescatextreme.jpg",
				"detail":[
					"projects-speedstick-rescatextreme-1.jpg",
					"projects-speedstick-rescatextreme-2.jpg",
					"projects-speedstick-rescatextreme-3.jpg",
					"projects-speedstick-rescatextreme-4.jpg",
					"projects-speedstick-rescatextreme-5.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/Q3SmLlu4qTg",
			"urls":["http://rescatextreme.com"],
			"participation":"Propuesta del concepto de juego, desarrollo del juego en Javascript con PhaserJS, maquetado y programación del sitio a nivel frontend.",
			"about":"Speed Stick pretendía desarrollar un juego para atraer usuarios jóvenes para familiarizarse con la marca. Como es usual, querían que funcionara en la mayor cantidad de plataformas posibles y de una forma que no se le complicara al usuario. Propusimos un juego en HTML5 tipo runner que encajaba muy bien con la campaña general de la marca en el momento. El juego no tiene fin, de modo que cada usuario avanza hasta donde su habilidad le permite, la velocidad y la cantidad de enemigos que aparecen aumenta progresivamente, mientras que todos los elementos (items, huecos en el escenario, enemigos) se generan de modo aleatorio, lo que convierte al juego en un reto de habilidad con un toque de suerte.",
			"technically":"Utilicé el framework de PhaserJS. Optimicé el juego para su uso en móviles y tabletas, de modo que corre bien en una gran cantidad de dispositivos, aunque obviamente, en algunos con poca capacidad puede no tener un rendimiento óptimo.",
			"curious":"El juego inicialmente estaba pensado para funcionar solamente en México, pero tuvo tanto éxito que se extendió a toda Latinoamérica con diferentes premios dependiendo del país. Conseguimos más de 40,000 usuarios recurrentes.",
			"list":[
					{"icon":"thumbs-o-down", "info":"Atrapamos a muchos usuarios intentando hacer trampa"},
					{"icon":"television", "info":"El juego fue anunciado por televisión nacional"}
			]
		},
		{
			"id":5,
			"stringID":"sonrics",
			"name":"Sonrics",
			"client":"Sonrics",
			"via":"Element",
			"type":"Sitio web",
			"tech":"html5 + css + js",
			"year":"2012",
			"importance":1,
			"images":{
				"thumb":"projects-sonrics.jpg",
				"detail":[
					"projects-sonrics-1.jpg",
					"projects-sonrics-2.jpg",
					"projects-sonrics-3.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/YKi-4Tg6OPE",
			"urls":["http://sonrics.com.mx"],
			"participation":"Maquetado en HTML5 y CSS con efectos en Javascript.",
			"about":"El sitio de Sonrics estaba enfocado en mostrar todos sus productos, de una manera atractiva para los niños. Se hicieron una serie de ilustraciones, que representaban mundos donde vivían ciertas líneas de productos, en los que podías ver toda la información de cada uno de ellos. Hice una navegación horizontal con un efecto de planos para darle profundidad y mayor impacto visual.",
			"technically":"Está desarrollado con Javascript y jQuery, programando todos los efectos manualmente (sin plugins), lo que dio mucha libertad para lograr el efecto visual exacto que se pretendía lograr.",
			"curious":"El sitio tenía varios juegos en HTML5, pero esos los desarrollaron de manera externa. Posteriormente se agregó un mundo más, el mundo de Inspireka, donde sí hicimos nosotros el juego.",
			"list":[
				{"icon":"paint-brush", "info":"Las ilustraciones son por parte del talentoso @Rafahu"},
				{"icon":"smile-o", "info":"Nos regalaron un ejemplar de cada dulce y probé casi todos"},
				{"icon":"code", "info":"Libre de plugins"},
				{"icon":"lightbulb-o", "info":"Junto con el director de arte ideamos los conceptos de cada mundo"}
			]
		},
		{
			"id":6,
			"stringID":"piojo",
			"name":"Piojo Escúchanos",
			"client":"Telcel",
			"via":"Element",
			"type":"Aplicación web",
			"tech":"nodejs + mongodb + html5 + javascript",
			"year":"2014",
			"importance":2,
			"images":{
				"thumb":"projects-telcel-piojoescuchanos.jpg",
				"detail":[
					"projects-telcel-piojoescuchanos-1.jpg",
					"projects-telcel-piojoescuchanos-2.jpg",
					"projects-telcel-piojoescuchanos-3.jpg",
					"projects-telcel-piojoescuchanos-4.jpg",
					"projects-telcel-piojoescuchanos-5.jpg",
					"projects-telcel-piojoescuchanos-6.jpg"
				]
			},
			"video":"",
			"urls":[],
			"participation":"Desarrollo de backend con NodeJS y MongoDB, desarrollo frontend incluyendo maquetado y animaciones.",
			"about":"Para el mundial 2014, hicimos este proyecto totalmente enfocado en Twitter y en brindar al usuario datos relevantes en tiempo real que enriquecieran la experiencia de vivir el torneo. Mediante el API de Twitter, el sistema evaluaba en tiempo real las palabras utilizadas para medir el humor de la afición, así como la cantidad de personas celebrando cada gol, los jugadores más mencionados, las reacciones más comunes, etc. A su vez, un especialista narraba el partido a través de la app, mostrando los puntos sobresalientes mientras el partido transcurría.",
			"technically":"El proyecto estuvo vivo mientras México se mantenía en el torneo. Se generaron módulos nuevos y funcionalidades conforme avanzaban los partidos, para darle a la afición cada vez más contenidos y análisis. Todo en la app estaba disponible para redes sociales individualmente, para que los usuarios pudieran compartir cada dato por separado.",
			"curious":"La interfaz era diferente en los partidos que el resto del tiempo. En los partidos mostraba datos del juego, mientras que el resto del tiempo mostraba predicciones de los usuarios, memes y menciones.",
			"list":[
				{"icon":"television", "info":"Cada partido nos reunimos en la sala de juntas para monitorear la transmisión."},
				{"icon":"soccer-ball-o", "info":"Miles de usuarios vitoreaban cada gol."},
				{"icon":"users", "info":"Me aprendí los nombres de todos los jugadores de la selección."}
			]
		},
		{
			"id":7,
			"stringID":"urbanfonts",
			"name":"Urban Fonts",
			"client":"Nike",
			"via":"JWT",
			"type":"Aplicación web",
			"tech":"html5 + javascript + google maps",
			"year":"2012",
			"importance":1,
			"images":{
				"thumb":"projects-nike-urbanfonts.jpg",
				"detail":[
					"projects-nike-urbanfonts-1.jpg",
					"projects-nike-urbanfonts-2.jpg",
					"projects-nike-urbanfonts-3.jpg",
					"projects-nike-urbanfonts-4.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/fY5aRCo7P1A",
			"urls":[],
			"participation":"Desarrollo en HTML5 y Javascript del micrositio excluyendo funcionalidad de póster.",
			"about":"Nike, en su objetivo de hacer una cultura de corredores urbanos, lanzó este sitio que de acuerdo con tu ubicación, le asignaba una tipografía al usuario. A través de un mensaje escrito por él, podía generar un póster mediante canvas y posteriormente descargarlo, junto con la tipografía, además de dejarlo en un pin en el mapa para que otros usuarios se inspiraran.",
			"technically":"Este proyecto lo trabajé en conjunto con un buen amigo, que se encargó del módulo del póster en canvas. Por mi parte, hice el maquetado, el desarrollo de la interfaz con el mapa, la carga de markers y las animaciones.",
			"curious":"Trabajé con gente muy talentosa en la elaboración de este sitio, fue una gran experiencia que me permitió crecer y aprender mucho en su momento.",
			"list":[
				
			]
		},
		{
			"id":11,
			"stringID":"doritosinferno",
			"name":"Inferno",
			"client":"Doritos",
			"via":"Element",
			"type":"Sitio web",
			"tech":"flash + as3",
			"year":"2012",
			"importance":1,
			"images":{
				"thumb":"projects-doritosinferno.jpg",
				"detail":[
					"projects-doritos-inferno-1.jpg",
					"projects-doritos-inferno-2.jpg",
					"projects-doritos-inferno-3.jpg",
					"projects-doritos-inferno-4.jpg",
					"projects-doritos-inferno-5.jpg",
					"projects-doritos-inferno-6.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/ldho-VJ5QFY",
			"urls":[],
			"participation":"Propuesta de funcionalidades, desarrollo en AS3 y Flash.",
			"about":"El concepto de Doritos Inferno y el elevador era parte de la campaña que se planteó para el nuevo sabor de Doritos. La esencia del sitio era un infierno sexy, con chicas seductoras y un viaje hacia el inframundo. Se hicieron tres niveles antes de llegar a él: en el primero, se analizaba la cuenta de Facebook del usuario y se evaluaba para darle como resultado uno de los pecados capitales; en el segundo una chica stalker mostraba cómo tenía ubicados todos los movimientos del usuario en un mapa y llena de alfileres la foto de su pareja; por último el tercero permitía descargar material gráfico mediante una experiencia voyeurista. Al final, al llegar al infierno, la única forma de salvarse era vendiendo el alma de tres de tus amigos (compartiendo la experiencia).",
			"technically":"Se utilizaron videos cargados mediante AS3 y el API de Facebook. El análisis inicial de la cuenta fue elaborado, ya que tomaba en cuenta gustos, actividad, pareja, cantidad de amigos, palabras utilizadas en los posteos, etc. para decidir un pecado que quedara de acuerdo con el usuario.",
			"curious":"Este sitio ganó plata en los premios IAB como Mejor Sitio Web.",
			"list":[
				{"icon":"lock", "info":"No diré el pecado que me diagnosticó el sistema"},
				{"icon":"smile-o", "info":"Hicimos una versión de broma especial para el FBID de mi jefe"}
			]
		},
		{
			"id":9,
			"stringID":"element",
			"name":"Sitio Element",
			"client":"Element",
			"via":"Element",
			"type":"Sitio web",
			"tech":"html5 + css + js",
			"year":"2015",
			"importance":1,
			"images":{
				"thumb":"projects-element.jpg",
				"detail":[
					"projects-element-element-1.jpg",
					"projects-element-element-2.jpg",
					"projects-element-element-3.jpg",
					"projects-element-element-4.jpg",
					"projects-element-element-5.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/Dkiya_FJ5Js",
			"urls":["http://element.com.mx"],
			"participation":"Desarrollo frontend.",
			"about":"Element quería rediseñar su sitio para mostrar una imagen actual, tecnológica y resaltar los proyectos y logros recientes.",
			"technically":"Lo hice todo a mano, con Browserify, SASS y jQuery. Los proyectos se obtienen mediante un JSON externo, para hacer más fácil la administración. Posteriormente se implementó el sitio en inglés, lo cual se resolvió a nivel de frontend. Programé un plugin de jQuery para l18n que carga los contenidos de JSON externos que contienen los textos.",
			"curious":"El sitio tiene un easter egg en la consola, que utilizamos para las entrevistas de los programadores aspirantes a trabajar en Element.",
			"list":[
				{"icon":"code", "info":"Libre de plugins"},
				{"icon":"smile-o", "info":"Siempre es bonito desarrollar el sitio de la empresa en que trabajas :)"}
			]
		},
		{
			"id":10,
			"stringID":"televisagracias",
			"name":"Gracias 2014",
			"client":"Televisa",
			"via":"Element",
			"type":"Aplicación web",
			"tech":"html5 + css + js + backbone",
			"year":"2014",
			"importance":1,
			"images":{
				"thumb":"projects-televisa-gracias.jpg",
				"detail":[
					"projects-televisa-gracias-1.jpg",
					"projects-televisa-gracias-2.jpg",
					"projects-televisa-gracias-3.jpg",
					"projects-televisa-gracias-4.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/ipt_Lv3KuYw",
			"urls":[],
			"participation":"Desarrollo frontend.",
			"about":"Televisa quería generar una experiencia interactiva que integrara a sus estrellas con los usuarios. Se hizo un video donde se integraron los mejores momentos del año del usuario, intercalados con escenas de diversos programas de televisión.",
			"technically":"Las fotos se escogían mediante Facebook y se asignaban a celebraciones específicas:  los viajes (se escogía la foto más reciente del usuario donde estuviera fuera de su ciudad de origen), los amigos (se escogía la foto con más tags), los cambios (se mostraban las fotos de perfil que el usuario tuvo en el año) y las celebraciones (se mostraban las fotos tomadas en fechas célebres como primero de enero, cumpleaños del usuario, etc).",
			"curious":"Dado que en móvil no puede integrarse vídeo inline, se hizo una recopilación de fotos del video que se animaban para dar paso a las fotos del usuario.",
			"list":[
				{"icon":"facebook", "info":"Facebook nos rechazó los permisos que requeríamos un par de veces, hasta que los convencimos."}
			]
		},
		{
			"id":12,
			"stringID":"snob",
			"name":"Sitio Snob",
			"client":"Snob",
			"via":"Play Interactive",
			"type":"Sitio Wordpress",
			"tech":"html + css + wordpress",
			"year":"2013",
			"importance":1,
			"images":{
				"thumb":"projects-snob.jpg",
				"detail":[
					"projects-snob-snob-1.jpg",
					"projects-snob-snob-2.jpg",
					"projects-snob-snob-3.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/sIzZN-oqDXs",
			"urls":[],
			"participation":"Desarrollo frontend + integración Wordpress.",
			"about":"Snob quería un sitio sencillo, con un administrador en Wordpress que fuera sencillo de utilizar. Se implementaron varias animaciones que resaltaban la elegancia y modernidad del restaruante.",
			"technically":"Se maquetó con LESS, Bootstrap y las animaciones y efectos se programaron en Javascript.",
			"curious":"No he podido probar un pastel de Snob todavía :(",
			"list":[
			]
		},
		{
			"id":8,
			"stringID":"pelapop",
			"name":"Pelapop",
			"client":"Nestlé",
			"via":"Element",
			"type":"Juego AS3",
			"tech":"flash + as3",
			"year":"2012",
			"importance":1,
			"images":{
				"thumb":"projects-nestle-pelapop.jpg",
				"detail":[
					"projects-nestle-pelapop-1.jpg",
					"projects-nestle-pelapop-2.jpg",
					"projects-nestle-pelapop-3.jpg",
					"projects-nestle-pelapop-4.jpg",
					"projects-nestle-pelapop-5.jpg"
				]
			},
			"video":"https://www.youtube.com/embed/GktXS4Aff-Y",
			"urls":[],
			"participation":"Desarrollo AS3.",
			"about":"Para el lanzamiento de la paleta Pelapop, hicimos un sitio que consistía en un juego y un intro interactivo que ilustraba cómo se debía comer el producto: 'Muerde, pela y disfruta'. Hicimos también un nivel bonus de minijuego, tipo memoria o Fabuloso Fred, con pequeños clips de video.",
			"technically":"Utilicé el framework de Box2D para la física, haciendo una dinámica similar a la de Angry Birds donde mediante el salto del chimpancé y el ángulo de la tabla se generaba una trayectoria para la paleta que tenía que caer en manos de otro chimpancé.",
			"curious":"El juego tuvo tanto éxito, que nos contactaron de Nestlé España para pedirnos los archivos originales para poder utilizarlo (allá la paleta tiene otro nombre). Además de incluirlo en su sitio, lo compilaron como app de iOS y lo subieron a la iTunes Store.",
			"list":[
				{"icon":"map-marker", "info":"Los productos españoles están bajo el nombre 'Pirulo Jungly'"},
				{"icon":"smile-o", "info":"Comimos muchas paletas en el proceso"}
			]
		}


	]
}





},{}],3:[function(require,module,exports){
;(function(){
	"use strict";
	var ajaxLoad = function(url, callback){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = ensureState;
		function ensureState(){
			if(xhr.readyState === 4 && xhr.status===200){
				callback(xhr);
			}
		}
		xhr.open("GET", url, true);
		xhr.send();
	};

	//
	//
	//
	var AnimatedJsonSprite = function(spriteURL, div, settings){
		this.spriteURL = spriteURL;
		this.jsonURL = spriteURL.replace("png", "json");
		this.div = div;
		
		this.currentStep = 0;
		div.style.backgroundImage = "url("+spriteURL+")";
		
		this.containerHeight = this.div.offsetHeight;
		this.containerWidth = this.div.offsetWidth;
		this.animationStarted = false;
		this.settings = {
			loop:false,
			loopStartStep:0,
			loopEndStep:0,
			frameRate:40,
			scale:1
		};

		for(var a in settings){
			if(this.settings.hasOwnProperty(a)){
				this.settings[a] = settings[a];
			}
		}

		ajaxLoad(this.jsonURL, this._onSpriteReady.bind(this));

	};

	AnimatedJsonSprite.prototype.start = function(){
		if(!this.image || !this.image.complete){
			this._onLoad = this.start;
			return;
		}
		if(this.animationStarted){
			return;
		}

		this.animationStarted = true;
		if(this.currentStep<this.steps || this.settings.loop){
			this._animateToEnd();
		}
	};
	AnimatedJsonSprite.prototype.stop = function(restart){
		this.meantToStop = true;
		this.animationStarted = false;
		this.restart = restart ? restart : false;
		//this.currentStep = 0;
	};

	AnimatedJsonSprite.prototype.hoverIn = function(until){
		if(!this.image.complete){
			this._onLoad = this.hoverIn;
			return;
		}
		if(this.animationStarted){
			return;
		}
		this.animationStarted = true;
		clearInterval(this.mainInterval);
		this.stepToStopForward = !isNaN(until) && until < this.steps ? until : this.steps;
		this._animateToEnd();
	};
	AnimatedJsonSprite.prototype.hoverOut = function(from, until){
		if(!this.image.complete){
			this._onLoad = this.hoverOut;
			return;
		}
		if(this.endAnimationStarted){
			return;
		}
		this.endAnimationStarted = true;
		clearInterval(this.mainInterval);
		until = !isNaN(until) && until > 0 && until <= this.steps ? until : 0;
		this.stepToStopForward = this.steps;
		this.currentStep = !isNaN(from) && from > 0 && from <= this.steps ? from : this.currentStep;

		if(this.currentStep < until){
			console.log("current step < until");
			this.forceReset = true;
			this._animateToEnd();
		}
		else{
			this._animateToStart();
		}

		
	};
	AnimatedJsonSprite.prototype._onSpriteReady = function(e){
		var tempSpriteIndex/*, tempy=0, horizontalSteps=0, totalWidth, missingPixels*/;
		this.json = JSON.parse(e.response);
		this.spritesData = [];
		//converting object to array
		for(var a in this.json.frames){
			tempSpriteIndex = Number(a.substr(-4));
			this.spritesData[tempSpriteIndex] = this.json.frames[a];
		}
		/*for(var i = 0; i<this.spritesData.length; i++){
			if(tempy!=this.spritesData[i].frame.y){
				break;
			}
			horizontalSteps++;
			tempy = this.spritesData[i].frame.y;

		}
		totalWidth = this.json.meta.size.w;
		missingPixels = totalWidth - (this.spritesData[0].sourceSize.w*horizontalSteps);
		//missingPercentage = ((totalWidth*100)/(this.spritesData[0].sourceSize.w*horizontalSteps))/horizontalSteps;
		missingPercentage = Math.ceil(((missingPixels*100)/totalWidth)*horizontalSteps);
		*/
		this.steps = this.spritesData.length-1;
		if(this.settings.loopEndStep===0 && this.settings.loop){
			this.settings.loopEndStep = this.steps;
		}
		//
		this.image = new Image();
		var _this = this;
		this.image.onload = function(){
			_this._onLoad();
		};
		this.image.src = this.spriteURL;
		if(this.image.complete){
			this._onLoad();
		}
		this.div.style.width = (this.spritesData[0].sourceSize.w*this.settings.scale)+"px";
		this.div.style.height = (this.spritesData[0].sourceSize.h*this.settings.scale)+"px";
		//this.div.style.backgroundSize = (((horizontalSteps*100)+missingPercentage)*1)+"%";
	};
	AnimatedJsonSprite.prototype._onLoad = function(){};

	AnimatedJsonSprite.prototype._animateToEnd = function(){
		var moveForwardBinded = this._moveForward.bind(this);
		this.mainInterval = setInterval(moveForwardBinded, this.settings.frameRate);
	};
	AnimatedJsonSprite.prototype._animateToStart = function(){
		var moveBackwardsBinded = this._moveBackwards.bind(this);
		this.mainInterval = setInterval(moveBackwardsBinded, this.settings.frameRate);
	};
	AnimatedJsonSprite.prototype.reset = function(to){
		//return
		to = to ? to : 0;
		this.currentStep = to;
		this.animationStarted = false;
		this.endAnimationStarted = false;
		//this.div.style.backgroundPosition="0 -"+((this.containerHeight*this.currentStep))+"px";
	};

	AnimatedJsonSprite.prototype._moveBackwards = function(){
		var position = {};
		position.x = this.spritesData[this.currentStep].frame.x*this.settings.scale;
		position.y = this.spritesData[this.currentStep].frame.y*this.settings.scale;
		this.div.style.backgroundPosition="-"+position.x+"px -"+position.y+"px";
		if(this.currentStep<=0 || this.currentStep>=this.stepToStopBackwards){
			clearInterval(this.mainInterval);
			this.reset(0);
		}
		this.currentStep--;
	};

	AnimatedJsonSprite.prototype._moveForward = function(){
		var position = {};
		position.x = this.spritesData[this.currentStep].frame.x*this.settings.scale;
		position.y = this.spritesData[this.currentStep].frame.y*this.settings.scale;
		this.div.style.backgroundPosition="-"+position.x+"px -"+position.y+"px";
		if(this.meantToStop && this.currentStep>=this.steps){
			clearInterval(this.mainInterval);
			this.meantToStop=false;
			this.currentStep = 0;
			if(this.restart){
				this.restart = false;
				this.reset(0);
			}
		}
		else if(this.currentStep>=this.stepToStopForward || (this.settings.loop && this.currentStep>=this.settings.loopEndStep) && !this.meantToStop){
			clearInterval(this.mainInterval);		
			if(this.settings.loop){
				this.reset(this.settings.loopStartStep);
				this.start();
			}
			else if(this.forceReset){
				this.forceReset = false;
				this.reset();
			}
		}
		this.currentStep++;
		
	};
	module.exports = AnimatedJsonSprite;

})();




 

},{}],4:[function(require,module,exports){
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



},{"../vendor/jquery.waitforimages.min.js":12}],5:[function(require,module,exports){
;(function(){
	"use strict";
	function AnimatedNumber(domElement){
		this.domElement = domElement;
	}
	AnimatedNumber.prototype.init = function(){
		this.originalNumberString = this.domElement.innerHTML;
		this.originalNumber = Number(this.domElement.innerHTML.replace(/\D/g, ""));
		this.start();
	};
	AnimatedNumber.prototype.intervalExec = function(){
		var that = this;
		this.tempNumber++;
		if(this.domElement.className.indexOf("appearing")===-1){
			this.domElement.className = this.domElement.className+" appearing";
		}
		else{
			that.domElement.className = that.domElement.className.replace("appearing", "");
		}
		setTimeout(function(){
			//that.domElement.className = that.domElement.className.replace("appearing", "");
		}, 190);
		
		this.domElement.innerHTML = this.tempNumber;
		if(this.tempNumber>this.originalNumber){
			this.domElement.innerHTML = this.originalNumberString;
			clearInterval(this.interval);
		}
	};
	AnimatedNumber.prototype.start = function(){
		this.tempNumber = 0;
		this.interval = setInterval(this.intervalExec.bind(this), 200);
		this.domElement.innerHTML = "0";
	};
	module.exports = AnimatedNumber;
})();
},{}],6:[function(require,module,exports){
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



},{}],7:[function(require,module,exports){
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
		
			var svg = new Snap("#me-about");
			Snap.load("images/aboutme-me.svg", function(f){
				if(!Aboutme.snapLoaded){
					svgAnimate(f);
					svg.append(f);
					Aboutme.snapLoaded = true;
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


},{"../lib/AnimatedLoader.js":4,"../lib/AnimatedNumber.js":5,"../vendor/scrollMonitor.js":13}],8:[function(require,module,exports){
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
				zoom:11,
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
},{"../lib/AnimatedLoader.js":4,"../lib/Utils.js":6}],9:[function(require,module,exports){
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





},{"../../data/projects.js":2,"../lib/AnimatedJsonSprite.js":3,"../lib/AnimatedLoader.js":4,"../lib/Utils.js":6,"../vendor/scrollMonitor.js":13}],10:[function(require,module,exports){
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



},{"../../data/projects.js":2,"../lib/AnimatedLoader.js":4,"../lib/Utils.js":6}],11:[function(require,module,exports){
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





},{"../../data/projects.js":2,"../lib/AnimatedLoader.js":4}],12:[function(require,module,exports){
/*! waitForImages jQuery Plugin 2015-06-02 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){var b="waitForImages";a.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"],hasImageAttributes:["srcset"]},a.expr[":"]["has-src"]=function(b){return a(b).is('img[src][src!=""]')},a.expr[":"].uncached=function(b){return a(b).is(":has-src")?!b.complete:!1},a.fn.waitForImages=function(){var c,d,e,f=0,g=0,h=a.Deferred();if(a.isPlainObject(arguments[0])?(e=arguments[0].waitForAll,d=arguments[0].each,c=arguments[0].finished):1===arguments.length&&"boolean"===a.type(arguments[0])?e=arguments[0]:(c=arguments[0],d=arguments[1],e=arguments[2]),c=c||a.noop,d=d||a.noop,e=!!e,!a.isFunction(c)||!a.isFunction(d))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var i=a(this),j=[],k=a.waitForImages.hasImageProperties||[],l=a.waitForImages.hasImageAttributes||[],m=/url\(\s*(['"]?)(.*?)\1\s*\)/g;e?i.find("*").addBack().each(function(){var b=a(this);b.is("img:has-src")&&j.push({src:b.attr("src"),element:b[0]}),a.each(k,function(a,c){var d,e=b.css(c);if(!e)return!0;for(;d=m.exec(e);)j.push({src:d[2],element:b[0]})}),a.each(l,function(c,d){var e,f=b.attr(d);return f?(e=f.split(","),void a.each(e,function(c,d){d=a.trim(d).split(" ")[0],j.push({src:d,element:b[0]})})):!0})}):i.find("img:has-src").each(function(){j.push({src:this.src,element:this})}),f=j.length,g=0,0===f&&(c.call(i[0]),h.resolveWith(i[0])),a.each(j,function(e,j){var k=new Image,l="load."+b+" error."+b;a(k).one(l,function m(b){var e=[g,f,"load"==b.type];return g++,d.apply(j.element,e),h.notifyWith(j.element,e),a(this).off(l,m),g==f?(c.call(i[0]),h.resolveWith(i[0]),!1):void 0}),k.src=j.src})}),h.promise()}});

},{}],13:[function(require,module,exports){
(function( factory ) {
	if (typeof define !== 'undefined' && define.amd) {
		define([], factory);
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory();
	} else {
		window.scrollMonitor = factory();
	}
})(function() {

	var scrollTop = function() {
		return window.pageYOffset ||
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
	};

	var exports = {};

	var watchers = [];

	var VISIBILITYCHANGE = 'visibilityChange';
	var ENTERVIEWPORT = 'enterViewport';
	var FULLYENTERVIEWPORT = 'fullyEnterViewport';
	var EXITVIEWPORT = 'exitViewport';
	var PARTIALLYEXITVIEWPORT = 'partiallyExitViewport';
	var LOCATIONCHANGE = 'locationChange';
	var STATECHANGE = 'stateChange';

	var eventTypes = [
		VISIBILITYCHANGE,
		ENTERVIEWPORT,
		FULLYENTERVIEWPORT,
		EXITVIEWPORT,
		PARTIALLYEXITVIEWPORT,
		LOCATIONCHANGE,
		STATECHANGE
	];

	var defaultOffsets = {top: 0, bottom: 0};

	var getViewportHeight = function() {
		return window.innerHeight || document.documentElement.clientHeight;
	};

	var getDocumentHeight = function() {
		// jQuery approach
		// whichever is greatest
		return Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.documentElement.clientHeight
		);
	};

	exports.viewportTop = null;
	exports.viewportBottom = null;
	exports.documentHeight = null;
	exports.viewportHeight = getViewportHeight();

	var previousDocumentHeight;
	var latestEvent;

	var calculateViewportI;
	function calculateViewport() {
		exports.viewportTop = scrollTop();
		exports.viewportBottom = exports.viewportTop + exports.viewportHeight;
		exports.documentHeight = getDocumentHeight();
		if (exports.documentHeight !== previousDocumentHeight) {
			calculateViewportI = watchers.length;
			while( calculateViewportI-- ) {
				watchers[calculateViewportI].recalculateLocation();
			}
			previousDocumentHeight = exports.documentHeight;
		}
	}

	function recalculateWatchLocationsAndTrigger() {
		exports.viewportHeight = getViewportHeight();
		calculateViewport();
		updateAndTriggerWatchers();
	}

	var recalculateAndTriggerTimer;
	function debouncedRecalcuateAndTrigger() {
		clearTimeout(recalculateAndTriggerTimer);
		recalculateAndTriggerTimer = setTimeout( recalculateWatchLocationsAndTrigger, 100 );
	}

	var updateAndTriggerWatchersI;
	function updateAndTriggerWatchers() {
		// update all watchers then trigger the events so one can rely on another being up to date.
		updateAndTriggerWatchersI = watchers.length;
		while( updateAndTriggerWatchersI-- ) {
			watchers[updateAndTriggerWatchersI].update();
		}

		updateAndTriggerWatchersI = watchers.length;
		while( updateAndTriggerWatchersI-- ) {
			watchers[updateAndTriggerWatchersI].triggerCallbacks();
		}

	}

	function ElementWatcher( watchItem, offsets ) {
		var self = this;

		this.watchItem = watchItem;

		if (!offsets) {
			this.offsets = defaultOffsets;
		} else if (offsets === +offsets) {
			this.offsets = {top: offsets, bottom: offsets};
		} else {
			this.offsets = {
				top: offsets.top || defaultOffsets.top,
				bottom: offsets.bottom || defaultOffsets.bottom
			};
		}

		this.callbacks = {}; // {callback: function, isOne: true }

		for (var i = 0, j = eventTypes.length; i < j; i++) {
			self.callbacks[eventTypes[i]] = [];
		}

		this.locked = false;

		var wasInViewport;
		var wasFullyInViewport;
		var wasAboveViewport;
		var wasBelowViewport;

		var listenerToTriggerListI;
		var listener;
		function triggerCallbackArray( listeners ) {
			if (listeners.length === 0) {
				return;
			}
			listenerToTriggerListI = listeners.length;
			while( listenerToTriggerListI-- ) {
				listener = listeners[listenerToTriggerListI];
				listener.callback.call( self, latestEvent, watchItem );
				if (listener.isOne) {
					listeners.splice(listenerToTriggerListI, 1);
				}
			}
		}
		this.triggerCallbacks = function triggerCallbacks() {

			if (this.isInViewport && !wasInViewport) {
				triggerCallbackArray( this.callbacks[ENTERVIEWPORT] );
			}
			if (this.isFullyInViewport && !wasFullyInViewport) {
				triggerCallbackArray( this.callbacks[FULLYENTERVIEWPORT] );
			}


			if (this.isAboveViewport !== wasAboveViewport &&
				this.isBelowViewport !== wasBelowViewport) {

				triggerCallbackArray( this.callbacks[VISIBILITYCHANGE] );

				// if you skip completely past this element
				if (!wasFullyInViewport && !this.isFullyInViewport) {
					triggerCallbackArray( this.callbacks[FULLYENTERVIEWPORT] );
					triggerCallbackArray( this.callbacks[PARTIALLYEXITVIEWPORT] );
				}
				if (!wasInViewport && !this.isInViewport) {
					triggerCallbackArray( this.callbacks[ENTERVIEWPORT] );
					triggerCallbackArray( this.callbacks[EXITVIEWPORT] );
				}
			}

			if (!this.isFullyInViewport && wasFullyInViewport) {
				triggerCallbackArray( this.callbacks[PARTIALLYEXITVIEWPORT] );
			}
			if (!this.isInViewport && wasInViewport) {
				triggerCallbackArray( this.callbacks[EXITVIEWPORT] );
			}
			if (this.isInViewport !== wasInViewport) {
				triggerCallbackArray( this.callbacks[VISIBILITYCHANGE] );
			}
			switch( true ) {
				case wasInViewport !== this.isInViewport:
				case wasFullyInViewport !== this.isFullyInViewport:
				case wasAboveViewport !== this.isAboveViewport:
				case wasBelowViewport !== this.isBelowViewport:
					triggerCallbackArray( this.callbacks[STATECHANGE] );
			}

			wasInViewport = this.isInViewport;
			wasFullyInViewport = this.isFullyInViewport;
			wasAboveViewport = this.isAboveViewport;
			wasBelowViewport = this.isBelowViewport;

		};

		this.recalculateLocation = function() {
			if (this.locked) {
				return;
			}
			var previousTop = this.top;
			var previousBottom = this.bottom;
			if (this.watchItem.nodeName) { // a dom element
				var cachedDisplay = this.watchItem.style.display;
				if (cachedDisplay === 'none') {
					this.watchItem.style.display = '';
				}

				var boundingRect = this.watchItem.getBoundingClientRect();
				this.top = boundingRect.top + exports.viewportTop;
				this.bottom = boundingRect.bottom + exports.viewportTop;

				if (cachedDisplay === 'none') {
					this.watchItem.style.display = cachedDisplay;
				}

			} else if (this.watchItem === +this.watchItem) { // number
				if (this.watchItem > 0) {
					this.top = this.bottom = this.watchItem;
				} else {
					this.top = this.bottom = exports.documentHeight - this.watchItem;
				}

			} else { // an object with a top and bottom property
				this.top = this.watchItem.top;
				this.bottom = this.watchItem.bottom;
			}

			this.top -= this.offsets.top;
			this.bottom += this.offsets.bottom;
			this.height = this.bottom - this.top;

			if ( (previousTop !== undefined || previousBottom !== undefined) && (this.top !== previousTop || this.bottom !== previousBottom) ) {
				triggerCallbackArray( this.callbacks[LOCATIONCHANGE] );
			}
		};

		this.recalculateLocation();
		this.update();

		wasInViewport = this.isInViewport;
		wasFullyInViewport = this.isFullyInViewport;
		wasAboveViewport = this.isAboveViewport;
		wasBelowViewport = this.isBelowViewport;
	}

	ElementWatcher.prototype = {
		on: function( event, callback, isOne ) {

			// trigger the event if it applies to the element right now.
			switch( true ) {
				case event === VISIBILITYCHANGE && !this.isInViewport && this.isAboveViewport:
				case event === ENTERVIEWPORT && this.isInViewport:
				case event === FULLYENTERVIEWPORT && this.isFullyInViewport:
				case event === EXITVIEWPORT && this.isAboveViewport && !this.isInViewport:
				case event === PARTIALLYEXITVIEWPORT && this.isAboveViewport:
					callback.call( this, latestEvent, this.watchItem );
					if (isOne) {
						return;
					}
			}

			if (this.callbacks[event]) {
				this.callbacks[event].push({callback: callback, isOne: isOne||false});
			} else {
				throw new Error('Tried to add a scroll monitor listener of type '+event+'. Your options are: '+eventTypes.join(', '));
			}
		},
		off: function( event, callback ) {
			if (this.callbacks[event]) {
				for (var i = 0, item; item = this.callbacks[event][i]; i++) {
					if (item.callback === callback) {
						this.callbacks[event].splice(i, 1);
						break;
					}
				}
			} else {
				throw new Error('Tried to remove a scroll monitor listener of type '+event+'. Your options are: '+eventTypes.join(', '));
			}
		},
		one: function( event, callback ) {
			this.on( event, callback, true);
		},
		recalculateSize: function() {
			this.height = this.watchItem.offsetHeight + this.offsets.top + this.offsets.bottom;
			this.bottom = this.top + this.height;
		},
		update: function() {
			this.isAboveViewport = this.top < exports.viewportTop;
			this.isBelowViewport = this.bottom > exports.viewportBottom;

			this.isInViewport = (this.top <= exports.viewportBottom && this.bottom >= exports.viewportTop);
			this.isFullyInViewport = (this.top >= exports.viewportTop && this.bottom <= exports.viewportBottom) ||
								 (this.isAboveViewport && this.isBelowViewport);

		},
		destroy: function() {
			var index = watchers.indexOf(this),
				self  = this;
			watchers.splice(index, 1);
			for (var i = 0, j = eventTypes.length; i < j; i++) {
				self.callbacks[eventTypes[i]].length = 0;
			}
		},
		// prevent recalculating the element location
		lock: function() {
			this.locked = true;
		},
		unlock: function() {
			this.locked = false;
		}
	};

	var eventHandlerFactory = function (type) {
		return function( callback, isOne ) {
			this.on.call(this, type, callback, isOne);
		};
	};

	for (var i = 0, j = eventTypes.length; i < j; i++) {
		var type =  eventTypes[i];
		ElementWatcher.prototype[type] = eventHandlerFactory(type);
	}

	try {
		calculateViewport();
	} catch (e) {
		try {
			window.$(calculateViewport);
		} catch (e) {
			throw new Error('If you must put scrollMonitor in the <head>, you must use jQuery.');
		}
	}

	function scrollMonitorListener(event) {
		latestEvent = event;
		calculateViewport();
		updateAndTriggerWatchers();
	}

	if (window.addEventListener) {
		window.addEventListener('scroll', scrollMonitorListener);
		window.addEventListener('resize', debouncedRecalcuateAndTrigger);
	} else {
		// Old IE support
		window.attachEvent('onscroll', scrollMonitorListener);
		window.attachEvent('onresize', debouncedRecalcuateAndTrigger);
	}

	exports.beget = exports.create = function( element, offsets ) {
		if (typeof element === 'string') {
			element = document.querySelector(element);
		} else if (element && element.length > 0) {
			element = element[0];
		}

		var watcher = new ElementWatcher( element, offsets );
		watchers.push(watcher);
		watcher.update();
		return watcher;
	};

	exports.update = function() {
		latestEvent = null;
		calculateViewport();
		updateAndTriggerWatchers();
	};
	exports.recalculateLocations = function() {
		exports.documentHeight = 0;
		exports.update();
	};

	return exports;
});

},{}]},{},[1]);
