const fromObject = require("@nativescript/core/data/observable").fromObject;
const frameModule = require("@nativescript/core/ui/frame");
const process = require("./functions.js").process;
const info = require("./functions.js").info;
const utils = require("@nativescript/core/utils/utils");

const investments = ["CDB", "Debênture", "LCI/LCA/CRI/CRA", "Debênture Incentivada"];
const choices = new fromObject({
  selic: "",
	investments: investments,
	selectedIndex: "0",
	rates: "",
	months: "",
	amount: "",
	src: info.src,
	link: info.link
});   

exports.loaded = function(args) {
    let page;
    page = args.object;
    page.bindingContext = choices;
		
};

function openlink() {
	utils.openUrl(info.link);
}

exports.openlink = openlink;

function calculate() {
	choices.selic = choices.selic.replace(/[^0-9,.]/g, "").replace(",", ".");
	choices.rates = choices.rates.replace(/[^0-9,.]/g, "").replace(",", ".");
	choices.months = choices.months.replace(/\D/g, "");
	choices.amount = choices.amount.replace(/\D/g, "");
	const result = (parseInt(choices.amount) * Math.pow(1 + ((parseFloat(choices.selic) - 0.10) + parseFloat(choices.rates))/100, parseInt(choices.months)/12)) - parseInt(choices.amount);
	
	process(result, choices.months, choices.selectedIndex);
	
}
exports.calculate = calculate;

exports.backEvent = function(args) {
  args.cancel = true; 
  frameModule.Frame.topmost().navigate({moduleName:"main-page",clearHistory: true }); 
  choices.selic = "";
  choices.rates = "";	
  choices.months = "";
  choices.amount = "";	
  choices.selectedIndex = "0";	
}
function goBack(){
frameModule.Frame.topmost().navigate({moduleName:"main-page",clearHistory: true });
  choices.selic = "";
  choices.rates = "";	
  choices.months = "";
  choices.amount = "";
  choices.selectedIndex = "0";	
}
exports.goBack = goBack;

function dismissSoftInput() {
    utils.ad.dismissSoftInput();
}
exports.dismissSoftInput = dismissSoftInput;


