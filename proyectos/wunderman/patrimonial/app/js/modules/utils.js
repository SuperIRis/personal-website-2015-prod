"use strict";
;(function(){
	var Utils = {};
	var ajaxTries;
	Utils.get = function(url,callback){
		$.ajax({
            type: "GET",
            url: url,
            error:function(error,options, message){
                 console.error(error, "--->",message, options);
                 ajaxTries++;
                 if(ajaxTries<=5){
                      setTimeout(function(){get(url, callback);}, 200);
                 }
                 else{
                      ajaxTries = 0;
                      alert("Ha habido un error en el servidor, intenta de nuevo por favor");
                 }
            },
            success: function(data) {
                 ajaxTries = 0;
                 if(typeof(callback) === "function"){
                      callback(data);
                 }
            }
       });
	}

	module.exports = Utils;
})();