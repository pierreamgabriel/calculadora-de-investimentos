const dialog = require("@nativescript/core/ui/dialogs");

const info = {
    src: "",
    link: ""
};

exports.info = info;

function createads() {
	const URL = "https://github.com/virgopublishers/banners/raw/main/calculadora.js"
	
	fetch(URL)
    .then(res => res.json())
    .then((data) => {
    
     info.src = data[data[0].target].src.toString();
	 info.link = data[data[0].target].link.toString();	
		
                });

}

exports.createads = createads;

function format(value) {
  const decimalPart = value.toFixed(2).split('.')[1]
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
	
	const text_1 = "O rendimento líquido aproximado do seu investimento será de ";
	const text_2 = ". Se o valor não condizer com a realidade, verifique as informações fornecidas. A quantia deve ser em número inteiro, sem pontos, vírgulas ou centavos, exemplo: 5539. A porcentagem do CDI também deve ser número inteiro, exemplo: 120. As taxas (Selic, IPCA, juros) devem conter no máximo duas casas decimais, exemplo: 5.25.";
	
	if(isNaN(result)) {
		dialog.confirm({title:"Alerta", message: "Alguma informação está faltando ou não está no formato correto. A quantia deve ser número inteiro, sem pontos, vírgulas ou centavos, exemplo: 5284. A porcentagem do CDI deve ser fornecida em número inteiro, exemplo: 135. As taxas (Selic, IPCA, juros) devem conter no máximo duas casas decimais, exemplo: 5.25.", okButtonText:"OK"});
	}
	else if(parseInt(months) < 2 || !parseInt(months)) {
		dialog.confirm({title:"Alerta", message: "O número de meses precisa ser de no mínimo 2.", okButtonText:"OK"});
	} else if(index === 0 || index === 1) {
		
		if(parseInt(months) <= 6) {
		const result_6 = format(result - (result * (22.5/100)));
			
		const options = {title:"Resultado", message:text_1 + result_6 + text_2, okButtonText:"OK"};
		dialog.confirm(options);
			
		} else if(parseInt(months) > 6 && parseInt(months) <= 12) {
		const result_12 = format(result - (result * (20/100)));
			
		const options = {title:"Resultado", message:text_1 + result_12 + text_2, okButtonText:"OK"};
		dialog.confirm(options);
			
		} else if (parseInt(months) > 12 && parseInt(months) <= 24) {
		const result_24 = format(result - (result * (17.5/100)));	
			
		const options = {title:"Resultado", message:text_1 + result_24 + text_2, okButtonText:"OK"};
		dialog.confirm(options);	
			
		} else if (parseInt(months) > 24) {
		const result_25 = format(result - (result * (15/100)));	
		
		const options = {title:"Resultado", message:text_1 + result_25 + text_2, okButtonText:"OK"};
		dialog.confirm(options);		
		}
	} else if (index === 2 || index === 3) {
		const taxfree = format(result);
		
		const options = {title:"Resultado", message:text_1 + taxfree + text_2, okButtonText:"OK"};
		dialog.confirm(options);
	}
	
}
exports.process = process;
