const frameModule = require("@nativescript/core/ui/frame");

exports.goTo = function(id) {
id = id.object.id;
switch (id) {
    case "cdi":
frameModule.Frame.topmost().navigate("cdi")   
    break;
    case "cdi_juros":
frameModule.Frame.topmost().navigate("cdi-juros")   
    break;
    case "prefixado":
frameModule.Frame.topmost().navigate("prefixado")   
    break;
    case "ipca":
frameModule.Frame.topmost().navigate("ipca")   
    break; 
}    
}

