window.PatCalReady = function (){
	//console.log ("Pat Calc Ready");
	var sliders=6;
		for(var i=1; i <= sliders; i++){
			superIrisSlider.createSlider ("sliderContainer_"+i, "calcSliderFill", "calcSliderForeground","calcSlide_"+i);				 			superIrisSlider.formatSlider (190, "sliderContainer_"+i);
		}
		
}
window.startPatCalc = function (){
	var drop= document.getElementById("calcProfileDrop");
	var inp= document.getElementById("calcAmountInput");
	if( isNaN (Number(inp.value)) || inp.value < 1000000){
		alert("Debe elegir una cantidad mayor a 1,000,000 MXN");
		return;
	}
	window.calcSim = new PatCal (Number(drop.value),Number(inp.value));
	window.showPatCalcPage(2);
}
window.showPatCalcPage = function ($ID){
	var disclaimer = document.getElementById("wrapperIntro");
	var config = document.getElementById("wrapperConfig");
	var calc = document.getElementById("wrapper");
	disclaimer.style.display = "none";
	config.style.display = "none";
	calc.style.display = "none";
	if($ID == 0){
		disclaimer.style.display = "block";
	}else if($ID == 1){
		config.style.display = "block";
	}else{
		calc.style.display = "block";
	}
}
window.initPatCal = function (){
	if($(document).ready){
		window.initCalcInstance ();
	}else{
		$(document).ready(initGraphics);
	}
}
window.initCalcInstance = function (){
	var profile = document.getElementById("calcRiskSelect").value;
	var amount = document.getElementById("calcRiskAmountInput").value;
	window.calcSim = new PatCal (Number(profile),Number(amount));
	var intro= document.getElementById("calcInit");
	var menu=document.getElementById("calcToolBar");
	var graphics=document.getElementById("calcGraphics");
	intro.style.display = "none";
	menu.style.display = "inline-block";
	graphics.style.display = "inline-block";
}
window.PatCal = function (profile, amount){
	this.profileType = profile;
	this.amount = amount;
	this.verbose = true;
	this.NOT_ASSIGNED = "Sin asignar";
	this.currentSliderValues = [];
	this.sliderIDPrefix = "calcSlide_";
	this.trace = function (msg){
		if(this.verbose)console.log (msg);
	}
	this.traceT = function (msg){
		if(this.verbose){
			console.log (" ");
			console.log ("####################\t\t"+msg+"\t\t#####################################");
			
		}
	}
	this.processData ();
	this.configureUI ();
	//
	
	//this.refreshData(false);
	this.onSliderChange ();
};
window.PatCal.prototype.destroy = function (){
	
}
window.PatCal.prototype.showAlert= function ($show, $ID, $elementID){
	var txt = "";
	var alertDiv= document.getElementById("calcAlert");
	var target = document.getElementById("calcAlertTextP");
	
	if($ID == 1){
		txt = window.patCalData.DISCLAIMER;
	}else if ($elementID != null){
		var e = document.getElementById($elementID);
		txt = e.innerHTML;
	}
	target.innerHTML = txt;
	if($show){
		alertDiv.style.display = "block";
	}else{
		alertDiv.style.display = "none";
	}
}
window.PatCal.prototype.showTab= function ($tab, $cont, $callb){
	var cont= document.getElementById($cont);
	var lis= cont.getElementsByTagName('LI');
	for(var j = 0; j < lis.length; j++){
		var li = lis[j];
		if(j==0){
			li.className = "tabInit";
		}else if(j < lis.length-1){
			li.className = "tabMiddle";
		}else{
			li.className = "tabEnd";
		}
	}
	li= lis[$tab];
	if($tab==0){
		li.className = "tabInitSec pSelected";
	}else if($tab < lis.length-1){
		li.className = "tabMiddleSec pSelected";
	}else{
		li.className = "tabEndSec pSelected";
	}
	if($callb != null)$callb($tab);
}
window.PatCal.prototype.onTab1 = function($tab){
	var pref = "calcGraphicDiv_";
	for(var i=1; i <=3; i++ ){
		var div=document.getElementById(pref+i);
		div.style.display = "none";
	}
	div = document.getElementById(pref+($tab+1));
	div.style.display = "block"
}
window.PatCal.prototype.configureUI = function (){
	
	for (var i = 1; i <= 6; i++){
		var current = document.getElementById(this.sliderIDPrefix+i);
		current.min = 0;
		current.value = 0;
		current.max = patCalData.valoresTacticosMaximos[this.profileType-1];
		superIrisSlider.formatSlider (190, current.parentElement.getAttribute ("id"));
		
		this.currentSliderValues[i]= current.value;
		current.onchange = this.delegate (this,this.onSliderChange);
	}
}
window.PatCal.prototype.tacticValues = [0,0,0,0,0,0];
window.PatCal.prototype.onSliderChange = function (){
	//console.log("-",document.getElementById("calcSlide_1").value);
	var total = 0;
	var max = patCalData.valoresTacticosMaximos[this.profileType-1];
	//debe refrescarse: window.patCalData.portafolioModelo
	var sliderChangedIndex = 0;
	for (var i = 1; i <= 6; i++){
		var current = document.getElementById(this.sliderIDPrefix+i);
		if(Number (current.value) != this.currentSliderValues[i]){
			sliderChangedIndex = i;
		}
		var currentValue = Number (current.value);
		if (total < max)this.tacticValues [i-1]= currentValue;
		total += currentValue;
	}
	//console.log("total::",total," max::" , max, "moviste el: ",sliderChangedIndex);
	if (total > max){
		this.returnSliderStatus (sliderChangedIndex);
	}else{
		this.refreshSliderStatus ();
		
	}
	this.refreshData();
}
window.PatCal.prototype.selectedTactic = 0;
window.PatCal.prototype.selectTactic = function ($tabID){
	this.selectedTactic = $tabID;
	var ul= document.getElementById("calcTacticNamesUl");
	var ul2= document.getElementById("calcTacticValuesUl");
	var lis = ul.getElementsByTagName("LI");
	var lis2 = ul2.getElementsByTagName("LI");
	for(var i = 0; i < lis.length; i++){
		var e= lis[i];
		var e2 = lis2[i];
		var slide = document.getElementById("sliderContainer_"+(i+1));
		e.setAttribute ("class","");
		e2.setAttribute ("class","");
		slide.style.display = "none";
	}
	lis[$tabID].setAttribute ("class","selectedCalcTableRow");
	lis2[$tabID].setAttribute ("class","selectedCalcTableRow");
	slide = document.getElementById("sliderContainer_"+($tabID+1));
	slide.style.display = "block";
	//-->
	this.refreshSliderAmount();
}
window.PatCal.prototype.refreshData = function ($processData){
	if($processData == null)$processData = true;
	//
	this.trace ("REFRESH DATA:"+$processData);
	if($processData){
		this.trace ("PROCESS DATA");
		this.processData ();
	}
	
	//this.createColumnChart ("calcGraphic_2");
	//---------------------->
	//COLUMNA IZQUIERDA CON VALORES TACTICOS
	var ul = document.getElementById("calcTacticValuesUl");
	var	lis = ul.getElementsByTagName("LI");
	var max = patCalData.valoresTacticosMaximos[this.profileType-1];
	var total = 0;
	for (var i = 0; i<this.tacticValues.length; i++){
		var li= lis[i];
		li.innerHTML = this.tacticValues[i]+"%";
		total += this.tacticValues[i];
	}
	//Leyenda de máximo abajo del panel izquierdo
	var maxText = document.getElementById("calcRateLimit");
	maxText.innerHTML = max+"%";
	//Leyenda de porcentaje faltante
	var missing = document.getElementById("calcPendingTacticValues");
	var dif =max - total;
	if(dif < 0)dif = 0;
	missing.innerHTML = "Le falta por asignar <span class='calcPendingValue'>"+(dif)+"%</span> de "+max+"%";
	
	this.selectTactic (this.selectedTactic);
	
	//----------------------->
	//
	this.createProductDistribution("calcGraphic_1");
	this.createDonut ("calcGraphic_2");
	this.createFixedPortfolio("calcFixedListTable");
	this.createColumnChart2("calcGraphic_3");
}
window.PatCal.prototype.refreshSliderAmount = function (){
	//VALORES DEBAJO DEL SLIDER
	var finalSelected = document.getElementById("calcFinalRate");
	var currentSlider = document.getElementById(this.sliderIDPrefix+(this.selectedTactic+1));
	finalSelected.innerHTML = currentSlider.value+"%";
}
window.PatCal.prototype.refreshSliderStatus = function (){
	//inicio de perfiles en la tabla de profatolio
	var profilesInit = 3;
	for (var i = 1; i <= 6; i++){
		var current = document.getElementById(this.sliderIDPrefix+i);
		this.currentSliderValues[i]= Number (current.value);
		patCalData.portafolioModelo[patCalData.valoresTacticosInit+i-1][this.profileType+profilesInit-1]= Number (current.value);
	}
	this.trace ("Datos tácticos modificados:::::::::");
	this.trace (patCalData.portafolioModelo);
}
window.PatCal.prototype.returnSliderStatus = function (lastIndex){
	var total = 0;
	var max = patCalData.valoresTacticosMaximos[this.profileType-1];
	for (var i = 1; i <= 6; i++){
		var current = document.getElementById(this.sliderIDPrefix+i);
		if(i != lastIndex )total += Number (current.value);
	}
	var current = document.getElementById(this.sliderIDPrefix+lastIndex);
	//console.log("MAX::", max,total);
	current.value = max-total;
	this.tacticValues [lastIndex-1]= current.value;
	this.refreshSliderStatus ();
	/*for (var i = 1; i <= 6; i++){
		var current = document.getElementById(this.sliderIDPrefix+i);
		current.value = this.currentSliderValues[i];
	}*/
}
//
window.PatCal.prototype.createHistoricBehaviorTable = function (){
	window.patCalData.calculoHistorico=[];
	//la columna "histórico" cambia de valor dependiendo del perfil elegido.
	window.patCalData.calculoHistoricoPerfilActual = [["","Histórico","Interés"]]
	//CALCULO HISTÓRICO DE PERFIL ACTUAL SELECCIONADO------------------------------------------------------>
	//Se resta -1 considerando que la matrix incluye el header de la tabla(en la orientación misma del excel)
	var historicPeriods = patCalData.historicoPorPerfil.length -1;
	for (var i=0; i <historicPeriods; i++){
		var periodName = (patCalData.historicoPorPerfil[i+1][0] );
		//Se obtiene histórico y con cada ieración retorna el siguiente periodo: 12 meses, 3 años...etc
		//Se suma +1 considerando que la matrix incluye el header de la tabla (en la orientación misma del excel)
		//this.profileType no recibe resta considerando que la primera colunma es la del periodo y después vienen los datos. (por tanto salta el 0 naturalmente 		ya que el primer perfil es 1 no 0)
		var historicPerProfile = (patCalData.historicoPorPerfil[i+1][this.profileType] );
		//Considerar que la fórmula cambia con respecto al excel porque excel multiplica %
		var profileHistoric = this.amount+(this.amount*(historicPerProfile*.01));
		var interest = profileHistoric - this.amount;
		//alert("Nombre::"+periodName+"\nBase:"+historicPerProfile+"\nhistorico:: "+profileHistoric+" interés:: "+interest);
		var row = [periodName, profileHistoric, interest];
		window.patCalData.calculoHistoricoPerfilActual.push(row);
	}
	this.trace("/////////////////////////////////////////////////////////////////");
	this.trace("window.patCalData.calculoHistoricoPerfilActual");
	this.trace(window.patCalData.calculoHistoricoPerfilActual);
	////------------>ACABA CÁLCULO PERFIL ACTUAL------------------------------------------------------------>
	//
	//--------------->INICIA CÁLCULO HISTÓRICO PARA GRÁFICA -------------------------------------------------->
	window.patCalData.calculoHistorico = [];
	
	var indexNameGlobal =  patCalData.calculoHistoricoBase[0][patCalData.HISTORIC_BASE_INDEX_GLOBAL_MARKET];
	var indexNameCetes =  patCalData.calculoHistoricoBase[0][patCalData.HISTORIC_BASE_INDEX_CETES];
	var indexNameInflation =  patCalData.calculoHistoricoBase[0][patCalData.HISTORIC_BASE_INDEX_INFLATION];
	var valuesCetes = [indexNameCetes];
	var valuesGlobal = [indexNameGlobal];
	var valuesInflation = [indexNameInflation];
	//alert(indexNameGlobal+"-"+indexNameCetes+"-"+indexNameInflation);
	for (i=0; i <historicPeriods; i++){
		var periodName = (patCalData.historicoPorPerfil[i+1][0] );
		//Se suma i+1 porque la tabla patCalData.calculoHistoricoBase posee header
		//VALORES ESTÁTICOS RECUPERADOS DE LA TABLA::
		var globalMarketBase= patCalData.calculoHistoricoBase[i+1][patCalData.HISTORIC_BASE_INDEX_GLOBAL_MARKET];
		var cetesBase= patCalData.calculoHistoricoBase[i+1][patCalData.HISTORIC_BASE_INDEX_CETES];
		var inflationBase= patCalData.calculoHistoricoBase[i+1][patCalData.HISTORIC_BASE_INDEX_INFLATION];
		//alert("PERIODO::"+periodName+"\nBASE:"+ globalMarketBase+"\nCETES:"+cetesBase+"\nInflation Base: "+inflationBase);
		//---------------------->
		//VALORES DINÁMICOS CALCULADOS DE ACUERDO CON EL EXCEL:
		var globalMarketVal = this.amount+(this.amount*(globalMarketBase*.01));
		var cetesVal = this.amount+(this.amount*(cetesBase*.01));
		var inflationVal = this.amount+(this.amount*(inflationBase*.01));
		//alert("PERIODO::"+periodName+"\nglobal:"+ globalMarketVal+"\nCETES:"+cetesVal+"\nInflation: "+inflationVal);
		valuesCetes.push(cetesVal);
		valuesGlobal.push(globalMarketVal);
		valuesInflation.push(inflationVal);
	}
	//UNA VEZ REALIZADAS LAS LISTAS COMPLETAS, SE PREFIERE ITERAR POR SEPARADO PARA BARAJAR DE ACUERDO CON  EL ORDEN DE LA GRÁFICA, Y CON ESTO FACILITAR LA LECTURA.
	for (i=0; i <historicPeriods; i++){
		var periodName = (patCalData.historicoPorPerfil[i+1][0] );
		//VALORES DE ESTIMACIÓN POR PRODUCTO,1=historico 2=interés
		var row = [periodName, patCalData.calculoHistoricoPerfilActual[i+1][1], patCalData.calculoHistoricoPerfilActual[i+1][2], 0,0,0,0 ];
		window.patCalData.calculoHistorico.push(row);
		//GLOBAL
		row=[periodName+" "+valuesGlobal[0], 0, 0, valuesGlobal[i+1],0, 0,0];
		window.patCalData.calculoHistorico.push(row);
		//CETES
		row=[periodName+" "+valuesCetes[0], 0,0,0,valuesCetes[i+1], 0,0,0];
		window.patCalData.calculoHistorico.push(row);
		//INFLACION
		row=[periodName+" "+valuesInflation[0], 0,0,0,0,valuesInflation[i+1],0,0];
		window.patCalData.calculoHistorico.push(row);
		//ESPACIO VACÍO
		row=["_", 0,0,0,0,0,0];
		window.patCalData.calculoHistorico.push(row);
	}
	this.trace("///////////////////////////////////////////////////////////////////////");
	this.trace("window.patCalData.calculoHistorico");
	this.trace(window.patCalData.calculoHistorico);
	//--------------->ACABA CÁLCULO HISTÓRICO PARA GRÁFICA -------------------------------------------------->
	
}
//Itera en la lista de producto para obtener etiquetas, los valores se obtienen de this.tacticValues, generados por los input range.
//Esta función retornará valores válidos hasta que termine de ejecutarse la función onSlideChange, particularmente si existe un ajuste cuando esta función invoca this.returnSliderStatus que corrige el límite de procentaje táctico permitido tanto en valores como en sliders.
window.PatCal.prototype.getTacticPortfolio = function (){
	var fixedLimit = 8;
	var limit = 6+fixedLimit;
	var profileInitIndex= 3;
	var toolLabelIndex= 0;
	var productLabelIndex= 1;
	var result = [];
	//Se cuenta a partir de donde terminan los productos fijos, pero la lista de valores al venir de los inut range, sí comienza desde cero y se resta: this.tacticValues[i-fixedLimit]
	for(var i = fixedLimit; i <= limit; i++){
		var value = this.tacticValues[i-fixedLimit]
		var productLabel = patCalData.portafolioModelo[i][toolLabelIndex];
		var toolLabel = patCalData.portafolioModelo[i][productLabelIndex];
		var value = patCalData.portafolioModelo[i][profileInitIndex+this.profileType-1];
		if(value > 0){
			result.push ({label: productLabel, toolLabel:toolLabel, value:value });
		}
	}
	
	/*var t= "";
	for(i=0; i< result.length; i++){
		var e = result[i];
		t += "value: "+e.value+" label: "+e.label+" tool Label: "+e.toolLabel+"\n" ;
	}
	alert(t);*/
	return result;
	
}
window.PatCal.prototype.getFixedPortfolio = function (){
	var fixedLimit = 8;
	var profileInitIndex= 3;
	var toolLabelIndex= 0;
	var productLabelIndex= 1;
	var result = [];
	for(var i = 0; i < fixedLimit; i++){
		
		var productLabel = patCalData.portafolioModelo[i][toolLabelIndex];
		var toolLabel = patCalData.portafolioModelo[i][productLabelIndex];
		var value = patCalData.portafolioModelo[i][profileInitIndex+this.profileType-1];
		if(value > 0){
			result.push ({label: productLabel, toolLabel:toolLabel, value:value });
		}
	}
	return result;
	/*var t= "";
	for(i=0; i< result.length; i++){
		var e = result[i];
		t += "value: "+e.value+" label: "+e.label+" tool Label: "+e.toolLabel+"\n" ;
	}
	alert(t);*/
}
//Crea lista de productos fijos, de acuerdo con el último requerimiento, sólo se enlistan los que son mayores a 0%;
window.PatCal.prototype.createFixedPortfolio = function (divName){
	
	var div = document.getElementById(divName);
	div.innerHTML = "";
	var table = '<table class= "simTable" id="fixedPortfolioDiv">';
	var count = 0;
	var fixedList = this.getFixedPortfolio();
	for(var i = 0; i < fixedList.length; i++){
		var e= fixedList[i];
		if(e.value > 0){
			count ++;
			table += "<tr>";
			table += "<td>"+e.toolLabel+"</td>";
			table += "<td>"+e.value+"%</td>";
			var lowerLabel = e.toolLabel.toLowerCase ();
			if(lowerLabel.indexOf ("gold") != -1){
				var url= "";
				if(lowerLabel.indexOf ("gold1") != -1){
					url = "2-1_portafolios-gold1.html";
				}else if(lowerLabel.indexOf ("gold2") != -1){
					url = "2-2_portafolios-gold2.html";
				}else if(lowerLabel.indexOf ("gold3") != -1){
					url = "2-3_portafolios-gold3.html";
				}else if(lowerLabel.indexOf ("gold4") != -1){
					url = "2-4_portafolios-gold4.html";
				}else if(lowerLabel.indexOf ("gold5") != -1){
					url = "2-5_portafolios-gold5.html";
				}
				table += '<td><a class="calcTableLinks" href="'+url+'">Ver composición</a></td>';
			}else{
				table += '<td> </td>';
			}
			
			table += "</tr>";
		}
	}
	
	for (var j= count; j < 5; j++){
		table += "<tr><td>&nbsp;</td><td></td><td></td></tr>";
	}
	
	table += "</table>";
	div.innerHTML = table;
}
window.PatCal.prototype.columnChart2 = null;
window.PatCal.prototype.createColumnChart2 = function (divName){
	var data = {
				"type": "serial",
				"theme": "light",
				"titles":[],
				"hideBalloonTime":0,
				"legend": {
					"horizontalGap": 0,
					"maxColumns": 3,
					"position": "top",
					enabled:false,
					/*"useGraphSettings": true,*/
					"markerSize":15
				},
				"dataProvider": [],
				"valueAxes": [{
					"stackType": "regular",
					"axisAlpha": 0.3,
					"gridAlpha": 0
				}],
				"colors":["#4b5d85","#569cc0","#8a9424","#983d69","#d6c41a","#dfdfdf"],
				"graphs": [{
					"balloonText": "",
					"fillAlphas": 1, 
					"labelText": "[[value]]",
					"lineAlpha": 0.3,
					"title": "Monto Inicial",
					"type": "column",
					"color": "#000000",
					"valueField": "inicial"
				},
				{
					"balloonText": "",
					"fillAlphas": 1,
					"labelText": "",
					"lineAlpha": 0.3,
					"title": "Interés",
					"type": "column",
					"color": "#000000",
					"valueField": "interes"
				},
				{
					"balloonText": "",
					"fillAlphas": 1,
					"labelText": "[[value]]",
					"lineAlpha": 0.3,
					"title": "Mercado global",
					"type": "column",
					"color": "#000000",
					"valueField": "global"
				},
				{
					"balloonText": "",
					"fillAlphas": 1,
					"labelText": "",
					"lineAlpha": 0.3,
					"title": "Cetes",
					"type": "column",
					"color": "#000000",
					"valueField": "cetes"
				},
				{
					"balloonText": "",
					"fillAlphas": 0.8,
					"labelText": "",
					"lineAlpha": 0.3,
					"title": "Inflación",
					"type": "column",
					"color": "#000000",
					"valueField": "inflacion"
				},
				{
					"balloonText": "",
					"fillAlphas": 0,
					"labelText": "",
					"lineAlpha": 0.3,
					"title": "",
					"type": "column",
					"valueField": "_"
				}
				],
				"categoryField": "tiempo",
				"categoryAxis": {
					"gridPosition": "start",
					"axisAlpha": 0,
					"gridAlpha": 0,
					"position": "left"
				},
				"export": {
					"enabled": false
				 }
	};
	data.dataProvider = [];
	//var labels=["12 Meses", "3 Años","4 Años"]
	
	for(var x = 0; x < window.patCalData.calculoHistorico.length;x++){
		//console.log ("rate: ",toolRate);
		var obj = {};
		obj["tiempo"]= window.patCalData.calculoHistorico[x][0];
		obj["inicial"]= window.patCalData.calculoHistorico[x][1]
		obj["interes"]= window.patCalData.calculoHistorico[x][2]
		obj["global"]= window.patCalData.calculoHistorico[x][3]
		obj["cetes"]= window.patCalData.calculoHistorico[x][4]
		obj["inflacion"]= window.patCalData.calculoHistorico[x][5]
		obj["_"]= window.patCalData.calculoHistorico[x][6]
		data.dataProvider.push (obj);
	}
	var chart = AmCharts.makeChart( divName, data);
	this.columnChart2 = chart;
}

window.PatCal.prototype.createColumnChart = function (divName){
	var data = {
				"type": "serial",
				"theme": "light",
				"legend": {
					"horizontalGap": 0,
					"maxColumns": 1,
					"position": "right",
					/*"useGraphSettings": true,*/
					"markerSize": 10
				},
				"dataProvider": [/*{
					"year": 2005,
					"europe": 2.8,
					"namerica": 2.9,
					"asia": 2.4,
					"lamerica": 0.3,
					"meast": 0.3,
					"africa": 0.1
				}*/],
				"valueAxes": [{
					"stackType": "regular",
					"axisAlpha": 0.3,
					"gridAlpha": 0
				}],
				"graphs": [{
					"balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
					"fillAlphas": 0.8,
					"labelText": "[[value]]",
					"lineAlpha": 0.3,
					"title": "Monto Inicial",
					"type": "column",
					"color": "#000000",
					"valueField": "Monto Inicial"
				}, {
					"balloonText": "<b>[[title]]</b><br><span style='font-size:14px'>[[category]]: <b>[[value]]</b></span>",
					"fillAlphas": 0.8,
					"labelText": "[[value]]",
					"lineAlpha": 0.3,
					"title": "Interés",
					"type": "column",
					"color": "#000000",
					"valueField": "Interés"
				}],
				"categoryField": "tiempo",
				"categoryAxis": {
					"gridPosition": "start",
					"axisAlpha": 0,
					"gridAlpha": 0,
					"position": "left"
				},
				"export": {
					"enabled": true
				 }
	};
	data.dataProvider = [];
	var labels=["12 Meses", "3 Años","4 Años"]
	for(var x = 0; x < patCalData.interesesGrafica1.length;x++){
		//console.log ("rate: ",toolRate);
		var obj = {};
		obj["tiempo"]= labels[x];
		obj["Monto Inicial"]= patCalData.interesesGrafica1[x][2]
		obj["Interés"]= patCalData.interesesGrafica1[x][1]
		data.dataProvider.push (obj);
	}
	var chart = AmCharts.makeChart( divName, data);
	this.columnChart1 = chart;
}
window.PatCal.prototype.getDistributionPerProductData = function (){
	var fixedList = this.getFixedPortfolio();
	var tacticList = this.getTacticPortfolio();
	var result = [];
	var totalValue= 0;
	var t= "";
	for(var i = 0; i < fixedList.length; i++){
		var e = fixedList[i];
		totalValue+=e.value;
		result.push({producto: e.toolLabel , porcentaje:e.value });
		t +="- "+e.toolLabel+" value: "+e.value+"\n";
	}
	t +="------------------------\n";
	for (i = 0; i < tacticList.length; i++){
		e= tacticList[i];
		totalValue +=e.value;
		result.push({producto: e.toolLabel , porcentaje:e.value });
		t +="- "+e.toolLabel+" value: "+e.value+"\n";
	}
	if (totalValue < 100){
		result.push({producto: this.NOT_ASSIGNED , porcentaje:(100-totalValue) });
	}
	//alert(t);
	return result;
}

window.PatCal.prototype.createProductDistribution = function (divName){
	var div = document.getElementById(divName);
	div.innerHTML = "";
	var data = this.getDistributionPerProductData ();
	var chosenColors = {};
	chosenColors[this.NOT_ASSIGNED] = "#dfdfdf";
	var colors = this.getColorList (data,"producto", chosenColors);
		var chart = AmCharts.makeChart( divName, {
		  "type": "pie",
		  "theme": "light",
		  "dataProvider": data,
		  "colors": colors,
		  "valueField": "porcentaje",
		  "titleField": "producto",
		  "radius": "35%",
		  "outlineAlpha": 0.4,
		  "depth3D": 8,
		  "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
		  "angle": 35,
		  "export": {
			"enabled": false
		  }
		} );
	
}
window.PatCal.prototype.createDonut = function (divName){
	var div = document.getElementById(divName);
	div.innerHTML = "";
	var data = {
	  	"type": "pie",
	  	"theme": "light",
	  	"dataProvider": [],
	  	"titleField": "title",
	  	"valueField": "value",
	  	"labelRadius": 25,
	
	  	"radius": "35%",
		//Valor para convertirlo en dona
	  	"innerRadius": "0%",
	  	"labelText": "[[title]]",
	   	"outlineAlpha": 0.4,
		"depth3D": 8,
		"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
		"angle": 35,
		"export": {
		"enabled": true
	  }
	};
	data.dataProvider = [];
	for(var x = 0; x < patCalData.distribucionEstrategia.length ;x++){
		var toolRate = patCalData.distribucionEstrategia [x][this.profileType-1];
		//console.log ("rate: ",toolRate);
		var obj = {"title":window.patCalData.distribucionEstrategiaEtiquetas[x][0], "value": toolRate};
		data.dataProvider.push (obj);
	}
	var chart = AmCharts.makeChart( divName, data );
	
};
window.PatCal.prototype.createDonut2 = function (divName){
	var div = document.getElementById(divName);
	div.innerHTML = "";
	var data = {
	  "type": "pie",
	  "theme": "light",
	  "dataProvider": [],
	  "titleField": "title",
	  "valueField": "value",
	  "labelRadius": 5,
	
	  "radius": "42%",
	  "innerRadius": "60%",
	  "labelText": "[[title]]",
	  "export": {
		"enabled": true
	  }
	};
	data.dataProvider = [];
	for(var x = 0; x < patCalData.distribucionEstrategia.length ;x++){
		var toolRate = patCalData.distribucionEstrategia [x][this.profileType-1];
		//console.log ("rate: ",toolRate);
		var obj = {"title":window.patCalData.distribucionEstrategiaEtiquetas[x][0], "value": toolRate};
		data.dataProvider.push (obj);
	}
	var chart = AmCharts.makeChart( divName, data );
	this.chartDonut2 = chart;
	
};
window.PatCal.prototype.showChartTooltipActive = -1;
window.PatCal.prototype.showChartTooltip = function ($chart, $toolID, $label){
	
	var tool;
	if($chart == 3){
		tool = document.getElementById("calcGraphic_3Callouts");
		tool.className = "calcGraphic_3Callouts_"+$toolID;
		if (this.showChartTooltipActive == $toolID){
			tool.style.display = "none";
			this.showChartTooltipActive = -1;
		}else{
			tool.style.display = "block";
			this.showChartTooltipActive = $toolID;
		}
		
		
		var ul = tool.getElementsByTagName('UL');
		var lis = ul[0].getElementsByTagName('LI');
		//relación de los botones con la matriz de datos window.patCalData.calculoHistorico
		var dataRelation = [];
		//Inicial
		dataRelation[1]={x:0,y:1};
		//Mercado global
		dataRelation[2]={x:1,y:3};
		//Inflación
		dataRelation[3]={x:2, y:4};
		//interés
		dataRelation[4]={x:0,y:2};
		//CETES
		dataRelation[5]={x:3,y:5};
		////
		var rel = dataRelation[$toolID];
			lis[0].innerHTML = "<strong>"+$label+"</strong><br/>"+this.numberFormat (window.patCalData.calculoHistorico[rel.x][rel.y], ",");
			lis[1].innerHTML = "<strong>"+$label+"</strong><br/>"+this.numberFormat (window.patCalData.calculoHistorico[rel.x+5][rel.y], ",");
			lis[2].innerHTML = "<strong>"+$label+"</strong><br/>"+this.numberFormat (window.patCalData.calculoHistorico[rel.x+10][rel.y], ",");
			/*
			obj["tiempo"]= window.patCalData.calculoHistorico[x][0];
			obj["inicial"]= window.patCalData.calculoHistorico[x][1]
			obj["interes"]= window.patCalData.calculoHistorico[x][2]
			obj["global"]= window.patCalData.calculoHistorico[x][3]
			obj["cetes"]= window.patCalData.calculoHistorico[x][4]
			obj["inflacion"]= window.patCalData.calculoHistorico[x][5]
			obj["_"]= window.patCalData.calculoHistorico[x][6]
			data.dataProvider.push (obj);*/
		
		///
		
	}
}
window.PatCal.prototype.numberFormat = function(_number, _sep){
    _number = typeof _number != "undefined" && _number > 0 ? String(_number) : "";
    _number = _number.replace(new RegExp("^(\\d{" + (_number.length%3? _number.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
    if(typeof _sep != "undefined" && _sep != " ") {
        _number = _number.replace(/\s/g, _sep);
    }
    return "$ "+_number;
}
window.PatCal.prototype.getColorList = function ($dataProvider, $titleField, $colors){
	if($colors == null)$colors = {};
	var result = [];
	var colors = ["#9b3b69","#539bc3","#d6c601","#8a9513","#d8560b", "#FF0F00", "#FF6600", "#FF9E01", "#FCD202", "#F8FF01", "#B0DE09", "#04D215", "#0D8ECF", "#0D52D1", "#2A0CD0", "#8A0CCF", "#CD0D74", "#754DEB", "#DDDDDD", "#999999", "#333333", "#000000", "#57032A", "#CA9726", "#990000", "#4B0C25"];
	var j = 0;
	for (var i=0; i < $dataProvider.length; i++){
		var e = $dataProvider[i];
		if($colors[e[$titleField]] != null){
			//alert("color encontrado para:"+e[$titleField]+" color: "+$colors[e[$titleField]]);
			result.push ($colors[e[$titleField]]);
		}else{
			result.push (colors[j]);
			j++;
			
		}
	}
	return result;
}
window.PatCal.prototype.processHistoricData = function (){
	window.patCalData.historico = {};
	for (var i =0; i < patCalData.datos.length; i++){
		var current = patCalData.datos[i];
		var currentYear = patCalData.datos[i][0].substr (6);
		if(window.patCalData.historico[currentYear]===null){
			window.patCalData.historico[currentYear]=[];
		}
		
		
	}
}
window.PatCal.prototype.processStaticData = function (){
	if(window.PatCalStaticDataProcessed == "ready")return;
	
	this.processHistoricData ();
	patCalData.rendimientos = math.transpose(patCalData.rendimientos);
	patCalData.rendimientos = patCalData.rendimientos.slice (1,patCalData.rendimientos.length);
	
	
	//SOLO UNA VEZ (la matriz girada es estática, no cambia con los valores)
	window.patCalData.calculoClaseActivoPortEstrategico = math.transpose(window.patCalData.calculoClaseActivoPortEstrategico);
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++PORCENTAJE TÁCTICO PERMITIDO------------>
	//Indice en eje X donde comienzan los valores tácticos
	var tacticInit = patCalData.valoresTacticosInit;
	//Indice donde inician los perfiles
	var profilesInit = 3;
	patCalData.valoresTacticosMaximos = [];
	for (var i=0; i < patCalData.PROFILES_NUMBER; i++){
		patCalData.valoresTacticosMaximos[i]=0;
		for (var j =tacticInit; j < patCalData.portafolioModelo.length; j++ ){
			patCalData.valoresTacticosMaximos[i]+= patCalData.portafolioModelo[j][i+profilesInit];
		}
	}
	this.traceT("Valores tácticos máximos por perfil");
	this.trace(patCalData.valoresTacticosMaximos);
	
	window.PatCalStaticDataProcessed = "ready";
}
window.PatCal.prototype.processData = function (){
	this.processStaticData ();
	patCalData.rendimientosPorPerfil;
	patCalData.interesesGrafica1;
	//Si cada array representa un row de la tabla de excel, entonces la posición de inicio de los perfiles sin strin es 3;
	var porfolioModelProfilesInit = 3;
	//Conociento la posición ahora se procede a realizar un corte de matrix, para no girar la matrix y resolverlo con un slice (3), se prefiere copiar de manera customizada para ahorrar rendimiento y evitar recorrer la matrix 3 veces (giro, corte, giro de vuelta). Por lo tanto se hace un Corte sobre las Y de la matrix actual.
	// X inicia en 0 porque se ha copiado la tabla sin row header, de lo contrario deberia comenzar en 1;
	patCalData.portafolioModeloValoresNum =  this.cutMatrix (patCalData.portafolioModelo, 0, null, porfolioModelProfilesInit, null);
	this.traceT("Portafolo Valores Num");
	this.trace(patCalData.portafolioModeloValoresNum);
	patCalData.rendimientosPorPerfil = math.multiply (patCalData.rendimientos, patCalData.portafolioModeloValoresNum);
	//Descomentar línea de abajo para girar la matriz para que se lea en la consola como se lee en el excel, en la práctica no es necesario porque se prefiere poseer un array por row (row de acuerdo con el documento excel recibido)(en este caso 3 rows yr1= patCalData.rendimientosPorPerfil[0], yr3= patCalData.rendimientosPorPerfil[1], etc...)
	//patCalData.rendimientosPorPerfil = math.transpose(patCalData.rendimientosPorPerfil);
	//
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++GRAFICA DE BARRAS 1--------------------->
	var currentP = [];
	var interest = [];
	var initial = [];
	//posición en la matriz devuelta
	//Columna del perfil seleccionado
	var currentPPosition = this.profileType-1;
	for(var i = 0; i < patCalData.rendimientosPorPerfil.length; i++){
		//Es necesario considerar los signos de % del campo original de excel
		var percentVal = patCalData.rendimientosPorPerfil[i][ currentPPosition ] * .01;
		//Nuevamente considerar el signo %  de este campo multiplicar *.1
		var newResult = this.amount*(1+(percentVal*.01));
		currentP.push(newResult);
		interest.push(newResult-this.amount);
		initial.push(this.amount);
	}
	patCalData.interesesGrafica1 = [currentP,interest,initial];
	//Se gira para que quede con la misma lógica de array por row.
	patCalData.interesesGrafica1 = math.transpose(patCalData.interesesGrafica1);
	this.traceT("Tabla gráfica 1");
	this.trace(	patCalData.interesesGrafica1);
	//
	//++++++++++++[Termina gráfica de barras]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//	
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++CALCULO PARA CLASE ACTIVO--------------------->
	//
	//se suman todas las coincidencias por herramienta (DCP, GOLD2, GOLD3, etc) en window.patCalData.portafolioModeloValoresNum
	//No importa si en esa matrix las herramientas cambian de posición en Y ya que se busca coincidencia de STRING y no de posición.
	//La posición de cada perfil en X, sí debe ser exacta a la de excel.
	//La configuración esperada es que cada herramienta sea un row conteniendo los 5 perfiles.
	this.traceT ("Portafolio Modelo");
	this.trace (window.patCalData.portafolioModelo);
	this.traceT ("Cálculo clase activo matriz base");
	this.trace (window.patCalData.calculoClaseActivoBase);
	var profilesPosition = 0;
	window.patCalData.calculoClaseActivo = window.patCalData.calculoClaseActivoBase.slice(0);
	//console.log ("testeo::",window.patCalData.calculoClaseActivo );
	//current tool funciona sobre las X
	for (var currentTool = 0; currentTool < window.patCalData.calculoClaseActivo.length; currentTool++){
		//recorre las Y
		var toolNamePosition = 0;
		var currentToolName=  window.patCalData.calculoClaseActivo [currentTool][toolNamePosition];
		//console.log("nombre::",currentToolName);
		for (var currentProfile = 0; currentProfile < window.patCalData.PROFILES_NUMBER; currentProfile++){
		  //window.patCal.prototype.addRowValuesIf = function (matrix, compareRow, expected, row, startIn, stopIn)
			//Ystart se envía en 0 porque se copia desde el row 0 de Portafolio modelo dado que no hay row header.
			window.patCalData.calculoClaseActivo[currentTool][currentProfile+1]=(
			//this.addRowValuesIf (matrix, 	  					     needle,           xStart,      yAddStart,      yStart, yEnd);
			
			this.addRowValuesIf (window.patCalData.portafolioModelo, currentToolName, 0, currentProfile+3, 0,	    null));
		}
	}
	this.traceT ("Cálculo clase activo");
	this.trace (window.patCalData.calculoClaseActivo);
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++CALCULO PARA DISTRIBUCIÓN ESTRATEGICA--------------------->
	//
	
	// se corta la matrix de cálculo clase activo para quitar la columna 1 que trae etiquetas y que impide la multiplicación de matriz
	window.patCalData.calculoClaseActivoNum = this.cutMatrix(window.patCalData.calculoClaseActivo,0, null, 1, null);
	window.patCalData.distribucionEstrategia = math.multiply (window.patCalData.calculoClaseActivoPortEstrategico, window.patCalData.calculoClaseActivoNum );
	//Convierte valores en porcentaje del excel
	window.PatCal.prototype.iterateMatrix (window.patCalData.distribucionEstrategia,0,null,0,null,this.multiplyDistribucionEstrategia )
	this.traceT ("Cálculo ditribución estratégica");
	this.trace (window.patCalData.distribucionEstrategia);
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////PROCESA COMPORTAMIENTO HISTÓRICO
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.createHistoricBehaviorTable ();
};
window.PatCal.prototype.multiplyDistribucionEstrategia = function(x,y,value){
	//console.log("X",x,"Y",y);
	window.patCalData.distribucionEstrategia[x][y] = window.patCalData.distribucionEstrategia[x][y] * .01;
}
//iterador de matrices, se invoca la función pasada como agumento con los parámetros: funct (x, y, valorActual)
window.PatCal.prototype.iterateMatrix  = function(matrix, xStart, xEnd, yStart, yEnd, funct){	
	if(!xStart)xStart = 0;
	if(!yStart)yStart = 0;
	if(!xEnd)xEnd = matrix.length;
	for(var x = xStart; x < xEnd; x++){
		var currentX = [];
		if(!yEnd)yEnd = matrix[x].length;
		for (var y = yStart; y < yEnd; y++){
			funct (x,y,matrix[x][y]);
		}
	}
}
//Corta una porción de una matriz  en secuencia rectangular y la devuelve sin alterar la original.
window.PatCal.prototype.cutMatrix  = function(matrix, xStart, xEnd, yStart, yEnd){
	var result = [];	
	if(!xStart)xStart = 0;
	if(!yStart)yStart = 0;
	if(!xEnd)xEnd = matrix.length;
	for(var x = xStart; x < xEnd; x++){
		var currentX = [];
		if(!yEnd)yEnd = matrix[x].length;
		for (var y = yStart; y < yEnd; y++){
			currentX.push(matrix[x][y]);
		}
		result.push(currentX);
	}
	//console.log ("DATOS::",xStart, xEnd, yStart, yEnd);
	return result;
}
//SUMA VALORES DE UN ROW EN UNA MATRIZ con la siguiente lógica:
//Funciona exactamente igual que excel con la diferencia en que aquí se determina inicio y comienzo del rango en diferentes parámetros, osea:
//				
//
window.PatCal.prototype.addRowValuesIf = function (matrix, needle, xStart, yAddStart, yStart, yEnd){
	var result = 0;	
	if(!xStart)xStart = 0;
	if(!yStart)yStart = 0;
	var xEnd = matrix.length;
	for(var x = xStart; x < xEnd; x++){
		if(!yEnd)yEnd = matrix[x].length;
		for (var y = yStart; y < yEnd; y++){
			if(matrix[x][y] == needle){
				result += Number (matrix[x][yAddStart]);
			}
		}
	}
	//console.log ("DATOS::",xStart, xEnd, yStart, yEnd);
	return result;
}
//SUMA VALORES DE UN ROW EN UNA MATRIZ con la siguiente lógica:
//startIn se desplaza en X y rowPos  efectúa una sumatoria en Y, así que si addRowValues (matrix, 2, 3, 5), se representa así:
//	addRowValues (matrix, 2, 3, 5) =  matrix[2][3] + matrix[2][4] + matrix[2][5]
//	osea:
//	matrix = [	[arr1	]		[arr2	]		[row	]			[arr4	]
//				[arr1 v0]		[arr2 v0]		[arr3 v0]			[arr4 v0]
//				[arr1 v1]		[arr2 v1]		[arr3 v1]			[arr4 v1]
//				[arr1 v2]		[arr2 v2]		[arr3 v2]			[arr4 v2]
//				[arr1 v3]		[arr2 v3]		[startIn]+			[arr4 v3]
//				[arr1 v4]		[arr2 v4]		[arr3 v4] +			[arr4 v4]
//				[arr1 v5]		[arr2 v5]		[stopIn]  +			[arr4 v5]
//				[arr1 v6]		[arr2 v6]		[arr3 v6]			[arr4 v6]  ]
//				
//
window.PatCal.prototype.addRowValues = function(matrix, row, startIn, stopIn)  {
	if(!startIn)startIn = 0;
	var row = matrix[row];
	if(!stopIn)stopIn = row.length -1;
	var result = 0;
	for(var i = startIn; i <= stopIn; i++){
		var currentRow = row[i];
		result += currentRow;
	}
	return result;
};
window.PatCal.prototype.delegate = function ($scope, $function){
		var ar = Array.prototype.slice.call(arguments,2);
        var _func = function() {
        	var _newArgs = Array.prototype.slice.call(arguments).concat (ar);
       		 $function.apply($scope, _newArgs);
        };
        return _func
}
//SUMA VALORES DE UN ROW EN UNA MATRIZ con la siguiente lógica:
//startIn se desplaza en X y rowPos  efectúa una sumatoria de la porción, así que si addRowValues (matrix, 3, 5, 2, matrix.length), se representa así:
//
//	matrix = [	[arr1	]		[arr2	]		[startIn]			[stop In]
//				[arr1 v0]		[arr2 v0]		[arr3 v0]			[arr4 v0]
//				[arr1 v1]		[arr2 v1]		[arr3 v1]			[arr4 v1]
//				[arr1 v2]		[arr2 v2]		[arr3 v2]			[arr4 v2]
//				[arr1 v3]		[arr2 v3]		[rowStart]+			[arr4 v3]
//				[arr1 v4]		[arr2 v4]		[arr3 v4] +			[arr4 v4]
//				[arr1 v5]		[arr2 v5]		[rowEnd]  +			[arr4 v5]
//				[arr1 v6]		[arr2 v6]		[arr3 v6]			[arr4 v6]  ]
//				
//
/*
window.PatCal.prototype.addMatrixPortion  = function(matrix, rowStart, rowEnd, startIn, stopIn){
	if(!startIn)startIn = 0;
	if(!stopIn)stopIn = matrix.length -1;
	var result = 0;
	for(var i = startIn; i <= stopIn; i++){
		var currentRow = matrix[rowStart];
	}
}*/