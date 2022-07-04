"use strict";
;(function(){
	var Graphs = {};
	var Utils = require("./utils.js");
	var createdGraphs = [];


	Graphs.init = function(){
		Utils.get("../../data/graphData.json", function(data){
			Graphs.data = data.data;
			Graphs.ready = true;
		});
	};

	Graphs.loadPieGraph = function(section, graph, div, colors){
		if(!Graphs.ready){
			return console.error("No se ha cargado el JSON de gráficas");
		}
		var originalColors =["#589ab8","#b9ab00","#889323","#d65613", "#97999b","#a0a8bc","#00bdf2","#004785","#003e75","#00a7d6","#686e77","#adbd00","#8490ac","#e4e5e7","#ed8b00"];
		colors = colors ? colors.concat(originalColors) : originalColors;
		var chart = AmCharts.makeChart( div, {
		  "type": "pie",
		  "theme": "light",
		  "dataProvider": Graphs.data[section][graph],
		  "valueField": "value",
		  "titleField": "asset",
		   "balloon":{
		   "fixedPosition":true
		  },
		  "colors":colors,
		  "percentPrecision":0
		} );
		createdGraphs.push(chart);
	};


	Graphs.load3DPieGraph = function(section, graph, div, colors){
		if(!Graphs.ready){
			return console.error("No se ha cargado el JSON de gráficas");
		}
		var originalColors =["#589ab8","#b9ab00","#889323","#d65613", "#97999b","#a0a8bc","#00bdf2","#004785","#003e75","#00a7d6","#686e77","#adbd00","#8490ac","#e4e5e7","#ed8b00"];
		colors = colors ? colors.concat(originalColors) : originalColors;
		var chart = AmCharts.makeChart( div, {
		  "type": "pie",
		  "theme": "light",
		  "dataProvider":  Graphs.data[section][graph],
		  "valueField": "value",
		  "titleField": "asset",
		  "outlineAlpha": 0.4,
		  "depth3D": 15,
		  "colors":colors,
		  "angle": 30
		} );
		createdGraphs.push(chart);
	};

	
	Graphs.loadDBarGraph = function(section, graph, div, colors){
		if(!Graphs.ready){
			return console.error("No se ha cargado el JSON de gráficas");
		}
		colors = colors ? colors : ["#810b43", "#b39620","#97999b","#a0a8bc","#00bdf2","#004785","#003e75","#00a7d6","#686e77","#adbd00","#8490ac","#e4e5e7","#ed8b00"];

		// d-barchart1
		var chart = AmCharts.makeChart(div, {
		    "theme": "light",
		    "type": "serial",
		    "dataProvider": Graphs.data[section][graph],
		    "valueAxes": [{
		        "unit": "%",
		        "position": "left",
		        "title": "",
		    }],
		    "startDuration": 1,
		    "graphs": [{
		        "fillAlphas": 0.9,
		        "lineAlpha": 0.2,
		        "type": "column",
		        "valueField": "value2"
		    }, {
		        "fillAlphas": 0.9,
		        "lineAlpha": 0.2,
		        "type": "column",
		        "clustered":false,
		        "columnWidth":0.5,
		        "valueField": "value1"
		    }],
		    "plotAreaFillAlphas": 0.1,
		    "categoryField": "investments",
		    "categoryAxis": {
		        "gridPosition": "start"
		    },
		    "colors":colors
		});
		createdGraphs.push(chart);
	};

	Graphs.loadBarGraph = function(section, graph, div){
		if(!Graphs.ready){
			return console.error("No se ha cargado el JSON de gráficas");
		}

		var chart = AmCharts.makeChart( div, {
		  "type": "serial",
		  "addClassNames": true,
		  "theme": "light",
		  "autoMargins": false,
		  "marginLeft": 100,
		  "marginRight": 8,
		  "marginTop": 10,
		  "marginBottom": 26,
		  "balloon": {
		    "adjustBorderColor": false,
		    "horizontalPadding": 10,
		    "verticalPadding": 8,
		    "color": "#ffffff"
		  },

		  "dataProvider": Graphs.data[section][graph],
		  "valueAxes": [ {
		  	"unit": "%",
		    "axisAlpha": 0,
		    "position": "left"
		  } ],
		  "startDuration": 1,
		  "graphs": [ {
		    "alphaField": "alpha",
		    "fillAlphas": 1,
		    "title": "Income",
		    "type": "column",
		    "valueField": "value",
		    "colorField": "color",
		    "dashLengthField": "dashLengthColumn"
		  }, {
		    "id": div,
		    "bullet": "round",
		    "lineThickness": 3,
		    "bulletSize": 7,
		    "bulletBorderAlpha": 1,
		    "bulletColor": "#FFFFFF",
		    "useLineColorForBulletBorder": true,
		    "bulletBorderThickness": 3,
		    "fillAlphas": 0,
		    "lineAlpha": 1,
		    "title": "Expenses",
		    "valueField": "expenses",
		    "dashLengthField": "dashLengthLine"
		  } ],
		  "categoryField": "asset",
		  "categoryAxis": {
		    "gridPosition": "start",
		    "axisAlpha": 0,
		    "tickLength": 0
		  }
		  
		} );
		createdGraphs.push(chart);
	};
	
	
	Graphs.destroyCreated = function(){
		for(var i = 0; i<createdGraphs.length; i++){
			createdGraphs[i].clear();
		}
		createdGraphs.length = 0;
	};


	module.exports = Graphs;
})();
