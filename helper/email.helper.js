const nodemailer = require('nodemailer');
const Promise = require('promise');

let helper = {};

helper.sendEmail = sendEmail;
helper.createToSupplierEmail = createToSupplierEmail;

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

	var emailHtml = "<!DOCTYPE html><html style=\"height:100%;width:100%;\"><head><title>Avallie</title><meta charset=\"utf-8\"><link href=\"https://fonts.googleapis.com/css?family=Roboto\" rel=\"stylesheet\"></head><body><div style=\"background: linear-gradient(135deg,#50b7a6,#155AAF); background-color: #51c889; background-attachment: fixed; background-repeat: no-repeat; padding: 40pt 40pt 0 40pt; height:100%;width:100%; box-sizing:border-box;font-family:'Roboto', sans-serif;margin:0;padding:0;left:0;top:0;\"><table style=\"background: white; width: 100%; min-height: 100%; padding: 56pt; color: #333; clear: both;\" ><thead><tr><td style=\"padding: 0 40pt\" align=\"right\"><img src=\"cid:unique@kreata.ee\" height=\"150pt\"/></td><td bgcolor=\"#2a6796\" width=\"4\"></td><td style=\"padding: 0 40pt\"><h1 style=\"margin-top:0;color:#2a6796;display:inline-block;margin-top: 16pt;\" align=\"left\">SOLICITAÇÃO<br/>DE ORÇAMENTO</h1></td></tr><tr><td align=\"center\" colspan=\"3\" style=\"font-weight: bold\"><h1 style=\"font-size: 32pt;margin-top: 16pt;\">" + supplier.socialReason + ",</h1><p style=\"margin-top: 8pt;font-size:17pt;\">você acaba de receber uma nova<br/>solicitação de Orçamento:</p></td></tr></thead><tbody>" + htmlProducts +  "<tr><td><table style=\"font-size: 17pt;\" class=\"info\"><tr><td><label style=\"color: #4782ae; font-weight: bold; display: inline-block; margin-top: 16pt;\">Prazo de entrega</label><p style=\"margin-top: 8pt;font-size:17pt;color: #666;\">"+deadLine+"</p></td></tr>\<tr><td><label style=\"color: #4782ae; font-weight: bold; display: inline-block; margin-top: 16pt;\">Endereço de entrega</label><p style=\"margin-top: 8pt;font-size:17pt;color: #666;\">"+ address.address + ", " + address.number + "</p></td></tr></table></td></tr></tbody><tfoot><tr style=\"font-weight: bold;\"><td colspan=\"3\"><table style=\"left:0;right:0;margin:auto;\"><tr><td>&nbsp;</td></tr><tr><td align=\"center\"><p style=\"margin-top: 8pt;font-size:17pt;\">Para responder essa soliticação, responda para o e-mail comercial@avallie.com ou entre em contato pelo telefone <a style=\"color:#50b7a6;\" href=\"tel:+5541991574276\">(41) 99157 4276</a></p></td></tr><tr><td align=\"center\"><div style=\"background-color: #3b86e2; height: 3pt;width: 100pt; display: inline-block; margin: 20pt 0;\">&nbsp;</div></td></tr><tr><td align=\"center\"><p style=\"margin-top: 8pt;font-size:17pt;\">Caso tenha qualquer dúvida ou sugestão, entre em contato!</p></td></tr></table></td></tr></tfoot></table><ul style=\"display: inline-block; list-style: none; text-align: right; color: #fff; float: right; font-weight: bold; margin: 16pt 0; padding-right: 16pt; border-right: 3pt solid #fff;\"><li style=\"margin: 8pt 0;\"><a style=\"color:#50b7a6;color: #fff; text-decoration: none; white-space: nowrap;\" href=\"http://www.avallie.com\">www.avallie.com</a></li><li style=\"margin: 8pt 0;\"><a style=\"color:#50b7a6;color: #fff; text-decoration: none; white-space: nowrap;\"href=\"mail:comercial@avallie.com\">comercial@avallie.com</a></li><li style=\"margin: 8pt 0;\"><a style=\"color:#50b7a6;color: #fff; text-decoration: none; white-space: nowrap;\"href=\"http://facebook.com/avallie\">compartilhe</a></li></ul><div style=\"height: 16pt;clear:both;\">&nbsp;</div></div></body></html>";

	emailHtml = emailHtml.slice(0, emailHtml.length);

	return emailHtml;
}

function getProductsHtml(products) {
	var productsHtml = "";
	for (let i = 1; i < products.length; i++) {
		var productHtml = "<tr><td colspan=\"3\"><table style=\"font-size: 17pt;\"><tr><td><label style=\"color: #4782ae; font-weight: bold; display: inline-block; margin-top: 16pt;\">Material</label><p style=\"margin-top: 8pt;font-size:17pt;color: #666;\">"+ products[i].name + "</p></td></tr><tr><td><label style=\"color: #4782ae; font-weight: bold; display: inline-block; margin-top: 16pt;\">Quantidade</label><p style=\"margin-top: 8pt;font-size:17pt;color: #666;\">" + products[i].amount + " " + products[i].unity + "</p></td></tr><tr><td><label style=\"color: #4782ae; font-weight: bold; display: inline-block; margin-top: 16pt;\">Marca</label><p style=\"margin-top: 8pt;font-size:17pt;color: #666;\">  " + products[i].manufacturer + "</p></td></tr><tr><td><label style=\"color: #4782ae; font-weight: bold; display: inline-block; margin-top: 16pt;\">Observações</label><p style=\"margin-top: 8pt;font-size:17pt;color: #666;\">" + products[i].observation + "</p></td></tr></table></td></tr>";
		
		productsHtml += productHtml;
	}

	return productsHtml;
}

