var dialog = require("@nativescript/core/ui/dialogs");
var admob = require("nativescript-admob");


function ads() {
	
	setTimeout(() => { admob.createBanner({
    testing: false, 
    size: admob.AD_SIZE.SMART_BANNER, 
    androidBannerId: "ca-app-pub-6111006882674275/6561219208",
    margins: {
      bottom: 0
    },
    keywords: ["renda fixa", "investir ações", "bolsa valores", "mercado financeiro", "fundo imobiliário", "cdb"]
  })}, 1500); 
	
}

exports.ads = ads;

function preloadAdMob() {
	
	admob.preloadInterstitial({
    testing: false,
    androidInterstitialId: "ca-app-pub-6111006882674275/7522122673"
  });
}

exports.preloadAdMob = preloadAdMob;

function showad() {
	
	admob.showInterstitial();
}

exports.showad = showad;

function format(value) {
  var decimalPart = value.toFixed(2).split('.')[1]
  return (
    'R$ ' +
      value
      .toString()
      .split('.')[0]
      .split('')
      .reverse()
      .map((number, index, array) => {
        return (index + 1) % 3 === 0 && array[index + 1]
          ? `.${number}`
          : number;
      })
      .reverse()
      .join('')
      + ',' + decimalPart
  )
}

function process(result, months, index) {
	
	var text_1 = "O rendimento líquido aproximado do seu investimento será de ";
	var text_2 = ". Se o valor não condizer com a realidade, verifique as informações fornecidas. A quantia deve ser em número inteiro, sem pontos, vírgulas ou centavos, exemplo: 5539. A porcentagem do CDI também deve ser número inteiro, exemplo: 120. As taxas (Selic, IPCA, juros) devem conter no máximo duas casas decimais, exemplo: 5.25.";
	
	if(isNaN(result)) {
		dialog.confirm({title:"Alerta", message: "Alguma informação está faltando ou não está no formato correto. A quantia deve ser número inteiro, sem pontos, vírgulas ou centavos, exemplo: 5284. A porcentagem do CDI deve ser fornecida em número inteiro, exemplo: 135. As taxas (Selic, IPCA, juros) devem conter no máximo duas casas decimais, exemplo: 5.25.", okButtonText:"OK"});
	}
	else if(parseInt(months) < 2 || !parseInt(months)) {
		dialog.confirm({title:"Alerta", message: "O número de meses precisa ser de no mínimo 2.", okButtonText:"OK"});
	} else if(index === 0 || index === 1) {
		
		if(parseInt(months) <= 6) {
		var result_6 = format(result - (result * (22.5/100)));
			
		var options = {title:"Resultado", message:text_1 + result_6 + text_2, okButtonText:"OK"};
		dialog.confirm(options);
			
		} else if(parseInt(months) > 6 && parseInt(months) <= 12) {
		var result_12 = format(result - (result * (20/100)));
			
		var options = {title:"Resultado", message:text_1 + result_12 + text_2, okButtonText:"OK"};
		dialog.confirm(options);
			
		} else if (parseInt(months) > 12 && parseInt(months) <= 24) {
		var result_24 = format(result - (result * (17.5/100)));	
			
		var options = {title:"Resultado", message:text_1 + result_24 + text_2, okButtonText:"OK"};
		dialog.confirm(options);	
			
		} else if (parseInt(months) > 24) {
		var result_25 = format(result - (result * (15/100)));	
		
		var options = {title:"Resultado", message:text_1 + result_25 + text_2, okButtonText:"OK"};
		dialog.confirm(options);		
		}
		showad();
	} else if (index === 2 || index === 3) {
		var taxfree = format(result);
		
		var options = {title:"Resultado", message:text_1 + taxfree + text_2, okButtonText:"OK"};
		dialog.confirm(options);
		showad();
	}
	
}
exports.process = process;
