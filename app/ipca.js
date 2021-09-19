var fromObject = require("@nativescript/core/data/observable").fromObject;
var frameModule = require("@nativescript/core/ui/frame");
var process = require("./functions.js").process;
var ads = require("./functions.js").ads;
var preloadAdMob = require("./functions.js").preloadAdMob;
var utils = require("@nativescript/core/utils/utils");

var investments = ["CDB", "Debênture", "LCI/LCA/CRI/CRA", "Debênture Incentivada"];
var choices = new fromObject({
	investments: investments,
	selectedIndex: "0",
	ipca: "",
	rates: "",
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
	choices.ipca = choices.ipca.replace(/[^0-9,.]/g, "").replace(",", ".");
	choices.rates = choices.rates.replace(/[^0-9,.]/g, "").replace(",", ".");
	choices.months = choices.months.replace(/[^0-9]/g, "");
	choices.amount = choices.amount.replace(/[^0-9]/g, "");
	var result = (parseInt(choices.amount) * Math.pow(1 + (parseFloat(choices.ipca) + parseFloat(choices.rates))/100, parseInt(choices.months)/12)) - parseInt(choices.amount);
	
	process(result, choices.months, choices.selectedIndex);
	
}
exports.calculate = calculate;

exports.backEvent = function(args) {
  args.cancel = true; 
  frameModule.topmost().navigate({moduleName:"main-page",clearHistory: true }); 
  choices.ipca = "";
  choices.rates = "";	
  choices.months = "";
  choices.amount = "";	
  choices.selectedIndex = "0";	
 
}
function goBack(){
frameModule.topmost().navigate({moduleName:"main-page",clearHistory: true }); 
  choices.ipca = "";
  choices.rates = "";	
  choices.months = "";
  choices.amount = "";	
  choices.selectedIndex = "0";	
}
exports.goBack = goBack;

function dismissSoftInput(args) {
    utils.ad.dismissSoftInput();
}
exports.dismissSoftInput = dismissSoftInput;