const nodemailer = require('nodemailer');
const Promise = require('promise');

let helper = {};

helper.sendEmail = sendEmail;
helper.createToSupplierEmail = createToSupplierEmail;
helper.createToUserEmail = createToUserEmail;

module.exports = helper;

let transporter = nodemailer.createTransport({
	host: 'smtp.umbler.com',
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: "comercial@avallie.com", // generated ethereal user
		pass: "4v4lli3comercial"  // generated ethereal password
	}
});
	
// send mail with defined transport object
function sendEmail(mailOptions) {
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			} else {
				resolve("Mensagem enviada" + info.messageId);
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
			}
		});
	});	
}

function createToSupplierEmail(supplier, products, deadLine, address) {
	var htmlProducts = getProductsHtml(products);

	var emailHtml = "<!DOCTYPE html><html><head><title>Avallie</title><meta charset=\"utf-8\"><link href=\"https://fonts.googleapis.com/css?family=Roboto\" rel=\"stylesheet\"></head><body style=\"font-family:'Roboto', sans-serif;background: linear-gradient(135deg,#50b7a6,#155AAF);background-color: #51c889;background-attachment: fixed;background-repeat: no-repeat;padding: 40pt 16pt 0 16pt;\"><body style=\"font-family:'Roboto', sans-serif;background: linear-gradient(135deg,#50b7a6,#155AAF);background-color: #51c889;background-attachment: fixed;background-repeat: no-repeat;padding: 40pt 16pt 0 16pt;\"><table style=\"background: white;min-width: 100%;min-height: 100%;padding: 56pt 16pt 56pt 16pt;color:#333;clear: both;\"><thead><tr><td style=\"padding: 0 16pt\" align=\"center\"><img src=\"cid:unique@kreata.ee\" height=\"150pt\" /></td></tr><tr><td align=\"center\" style=\"font-weight:bold\"><h1>"+supplier.socialReason+",</h1><p>você acaba de receber uma nova<br/>solicitação de Orçamento:</p></td></tr></thead><tbody align=\"center\">"+htmlProducts+"<tr><td><table style=\"color:#666;\">\<tr><td><label style=\"color:#4782ae;font-weight:bold;display:inline-block;margin-top:16pt;\">Prazo de entrega</label><p>"+deadLine+"</p></td></tr>					<tr><td><label style=\"color:#4782ae;font-weight:bold;display:inline-block;margin-top:16pt;\">Endereço de entrega</label><p>"+ address.address + ", " + address.number +"</p></td></tr></table></td></tr></tbody><tfoot align=\"center\">\<tr style=\"font-weight: bold;\">\<td><table style=\"left:0;right:0;margin:auto;\"><tr><td>&nbsp;</td></tr><tr><td align=\"center\"><p>Para responder essa soliticação, responda para o e-mail comercial@avallie.com ou entre em contato pelo telefone <a href=\"tel:+5541991574276\" style=\"color:#50b7a6;\">(41) 99157 4276</a></p></td></tr>\<tr><td align=\"center\"><div  style=\"background-color: #3b86e2; height: 3pt;width: 100pt; display: inline-block; margin: 20pt 0;\">&nbsp;</div></td></tr><tr><td align=\"center\"><p>Caso tenha qualquer dúvida ou sugestão, entre em contato!</p></td></tr>\</table></td></tr></tfoot></table><ul style=\"display: inline-block;list-style: none;text-align: right;color: #fff;float: right;font-weight: bold;margin: 16pt 0;padding-right: 16pt;border-right: 3pt solid #fff;\"><li style=\"margin: 8pt 0;\"><a href=\"http://www.avallie.com\" style=\"color: #fff;text-decoration: none;white-space: nowrap;\">www.avallie.com</a></li><li style=\"margin: 8pt 0;\"><a href=\"mail:comercial@avallie.com\" style=\"color: #fff;text-decoration: none;white-space: nowrap;\">comercial@avallie.com</a></li><li style=\"margin: 8pt 0;\"><a href=\"http://facebook.com/avallie\" style=\"color: #fff;text-decoration: none;white-space: nowrap;\">compartilhe <img src=\"/media/facebook-icon.png\" height=\"27pt\" style=\"vertical-align: middle;\" /></a></li></ul><div style=\"height: 16pt;clear:both;\">&nbsp;</div></body></html>";

	emailHtml = emailHtml.slice(0, emailHtml.length);

	return emailHtml;
}

function getProductsHtml(products) {
	var productsHtml = "";
	for (let i = 1; i < products.length; i++) {
		var productHtml = "<tr><td><table style=\"color:#666;\"><tr><td><label style=\"color:#4782ae;font-weight:bold;display:inline-block;margin-top:16pt;\">Material</label><p>"+products[i].name+"</p></td></tr><tr><td><label style=\"color:#4782ae;font-weight:bold;display:inline-block;margin-top:16pt;\">Quantidade</label><p>"+products[i].amount + " " + products[i].unity+"</p></td></tr><tr><td><label style=\"color:#4782ae;font-weight:bold;display:inline-block;margin-top:16pt;\">Marca</label><p>"+ products[i].manufacturer +"</p></td></tr><tr><td><label style=\"color:#4782ae;font-weight:bold;display:inline-block;margin-top:16pt;\">Observações</label><p>"+ products[i].observation+"</p></td></tr></table></td></tr>";		
		
		productsHtml += productHtml;
	}

	return productsHtml;
}

function createToUserEmail(user, suppliersAmount, productsName){
	return "<!DOCTYPE html><html><head><title>Avallie</title><meta charset=\"utf-8\">\<link href=\"https://fonts.googleapis.com/css?family=Roboto\" rel=\"stylesheet\"></head><body style=\"font-family:'Roboto', sans-serif;background: linear-gradient(135deg,#50b7a6,#155AAF);background-color: #51c889;background-attachment: fixed;background-repeat: no-repeat;padding: 40pt 16pt 0 16pt;\"><body style=\"font-family:'Roboto', sans-serif;background: linear-gradient(135deg,#50b7a6,#155AAF);background-color: #51c889;background-attachment: fixed;background-repeat: no-repeat;padding: 40pt 16pt 0 16pt;\"><table style=\"background: white;min-width: 100%;min-height: 100%;padding: 56pt 16pt 56pt 16pt;color:#333;clear: both;\"><thead><tr><td style=\"padding: 0 16pt\" align=\"center\"><img src=\"cid:unique@kreata.ee\" height=\"150pt\" /></td></tr><tr><td align=\"center\" style=\"font-weight:bold;\"><h1>"+user+"</h1><p>sua solicitação de orçamento para os produtos:</p><p style=\"color:#2a6796\">"+productsName+"</p><p>foi enviada para "+suppliersAmount+" fornecedores.<br/>Agora é só aguardar! Em menos de 24 horas terá seu orçamento.</p></td></tr></thead><tbody></tbody></table><ul style=\"display: inline-block;list-style: none;text-align: right;color: #fff;float: right;font-weight: bold;margin: 16pt 0;padding-right: 16pt;border-right: 3pt solid #fff;\"><li style=\"margin: 8pt 0;\"><a href=\"http://www.avallie.com\" style=\"color: #fff;text-decoration: none;white-space: nowrap;\">www.avallie.com</a></li><li style=\"margin: 8pt 0;\"><a href=\"mail:comercial@avallie.com\" style=\"color: #fff;text-decoration: none;white-space: nowrap;\">comercial@avallie.com</a></li><li style=\"margin: 8pt 0;\"><a href=\"http://facebook.com/avallie\" style=\"color: #fff;text-decoration: none;white-space: nowrap;\">compartilhe <img src=\"/media/facebook-icon.png\" height=\"27pt\" style=\"vertical-align: middle;\" /></a></li></ul><div style=\"height: 16pt;clear:both;\">&nbsp;</div></body></html>";
}

