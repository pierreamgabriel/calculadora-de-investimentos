var fromObject = require("@nativescript/core/data/observable").fromObject;
var frameModule = require("@nativescript/core/ui/frame");
var process = require("./functions.js").process;
var ads = require("./functions.js").ads;
var preloadAdMob = require("./functions.js").preloadAdMob;
var utils = require("@nativescript/core/utils/utils");

var investments = ["CDB", "Debênture", "LCI/LCA/CRI/CRA", "Debênture Incentivada"];
var choices = new fromObject({
    selic: "",
	investments: investments,                                                                          
	selectedIndex: "0",
	percentage: "",
	months: "",
	amount: ""
});   

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = choices;
	
	ads();
	preloadAdMob();
		
};

function calculate() {
	choices.selic = choices.selic.replace(/[^0-9,.]/g, "").replace(",", ".");
	choices.percentage = choices.percentage.replace(/[^0-9]/g, "");
	choices.months = choices.months.replace(/[^0-9]/g, "");
	choices.amount = choices.amount.replace(/[^0-9]/g, "");
	var result = (parseInt(choices.amount) * Math.pow(1 + ((parseFloat(choices.selic) - 0.10) * (parseInt(choices.percentage)/100)/100), parseInt(choices.months)/12)) - parseInt(choices.amount);
	
	process(result, choices.months, choices.selectedIndex);
	
}
exports.calculate = calculate;

exports.backEvent = function(args) {
  args.cancel = true;	
  frameModule.topmost().navigate({moduleName:"main-page",clearHistory: true }); 
  choices.selic = "";
  choices.percentage = "";	
  choices.months = "";
  choices.amount = "";	
  choices.selectedIndex = "0";	
}
function goBack(){
  frameModule.topmost().navigate({moduleName:"main-page",clearHistory: true });
  choices.selic = "";
  choices.percentage = "";	
  choices.months = "";
  choices.amount = "";	
  choices.selectedIndex = "0";	
}
exports.goBack = goBack;

function dismissSoftInput(args) {
    utils.ad.dismissSoftInput();
}
exports.dismissSoftInput = dismissSoftInput;