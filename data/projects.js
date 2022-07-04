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




