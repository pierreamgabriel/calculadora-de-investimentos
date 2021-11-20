var frameModule = require("@nativescript/core/ui/frame");

exports.goTo = function(id) {
id = id.object.id;
switch (id) {
    case "cdi":
frameModule.topmost().navigate("cdi")   
    break;
    case "cdi_juros":
frameModule.topmost().navigate("cdi-juros")   
    break;
    case "prefixado":
frameModule.topmost().navigate("prefixado")   
    break;
    case "ipca":
frameModule.topmost().navigate("ipca")   
    break; 
}    
}

