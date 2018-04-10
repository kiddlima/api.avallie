const nodemailer = require('nodemailer');
const Promise = require('promise')

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
function sendEmail(mailOptions){
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

function createToSupplierEmail(supplier, products, deadLine, address){
	console.log("Supplier " + supplier)
	console.log("Products " + products.length);
	console.log("Prazo" + deadLine);
	console.log("Address" + address);
    var emailHtml = 
    "<!DOCTYPE html> \
<html> \
<head> \
	<title>Avallie</title> \
	<meta charset=\"utf-8\"> \
	<link href=\"https://fonts.googleapis.com/css?family=Roboto\" rel=\"stylesheet\"> \
	<style type=\"text/css\">\
	*{box-sizing:border-box;font-family:'Roboto', sans-serif;margin:0;padding:0;left:0;top:0;}\
		html,body{height:100%;width:100%;}\
		body{\
			background: linear-gradient(135deg,#50b7a6,#155AAF);\
			background-color: #51c889;\
			background-attachment: fixed;\
			background-repeat: no-repeat;\
			padding: 40pt 40pt 0 40pt;\
		}\
		.content{\
			background: white;\
			width: 100%;\
			min-height: 100%;\
			padding: 56pt;\
			color: #333;\
			clear: both;\
		}\
		h1, h2{margin-top: 16pt;}\
		p{margin-top: 8pt;font-size:17pt;}\
		.info{\
			font-size: 17pt;\
		}\
		.info label{\
			color: #4782ae;\
			font-weight: bold;\
			display: inline-block;\
			margin-top: 16pt;\
		}\
		.info p{\
			color: #666;\
		}\
		a{color:#50b7a6;}\
		.contact{\
			display: inline-block;\
			list-style: none;\
			text-align: right;\
			color: #fff;\
			float: right;\
			font-weight: bold;\
			margin: 16pt 0;\
			padding-right: 16pt;\
			border-right: 3pt solid #fff;\
		}\
		.contact li{\
			margin: 8pt 0;\
		}\
		.contact a{\
			color: #fff;\
			text-decoration: none;\
			white-space: nowrap;\
		}\
	</style>\
</head>\
<body>\
<table class=\"content\">\
	<thead>\
		<tr>\
			<td style=\"padding: 0 40pt\" align=\"right\">\
				<img src=\"/media/avallie logotipo.png\" height=\"150pt\" />\
			</td>\
			<td bgcolor=\"#2a6796\" width=\"4\"></td>\
			<td style=\"padding: 0 40pt\">\
				<h1 style=\"margin-top:0;color:#2a6796;display:inline-block;\" align=\"left\">SOLICITAÇÃO<br/>DE ORÇAMENTO</h1>\
			</td>\
		</tr>\
		<tr>\
			<td align=\"center\" colspan=\"3\" style=\"font-weight: bold\">\
				<h1 style=\"font-size: 32pt;\">" + supplier.name + ",</h1>\
				<p>você acaba de receber uma nova<br/>solicitação de Orçamento:</p>\
			</td>\
		</tr>\
	</thead>\
	<tbody>\
		<tr>\
            " + getProductsHtml();
			+	"\
		</tr>\
		<tr>\
			<td>\
				<table class=\"info\">\
					<tr><td><label>Prazo de entrega</label><p>"+ deadLine +"</p></td></tr>\
					<tr><td><label>Endereço de entrega</label><p>"+ address.address + ", " + address.number  + "</p></td></tr>\
				</table>\
			</td>\
		</tr>\
	</tbody>\
	<tfoot>\
		<tr style=\"font-weight: bold;\">\
			<td colspan=\"3\">\
				<table style=\"left:0;right:0;margin:auto;\">\
					<tr><td>&nbsp;</td></tr>\
					<tr><td align=\center\"><p>Para responder essa soliticação, responda para o e-mail comercial@avallie.com ou entre em contato pelo telefone <a href=\"tel:+5541991574276\">(41) 99157 4276</a></p></td></tr>\
					<tr><td align=\"center\"><div  style=\"background-color: #3b86e2; height: 3pt;width: 100pt; display: inline-block; margin: 20pt 0;\">&nbsp;</div></td></tr>\
					<tr><td align=\"center\"><p>Caso tenha qualquer dúvida ou sugestão, entre em contato!</p></td></tr>\
				</table>\
			</td>\
		</tr>\
	</tfoot>\
</table>\
<ul class=\"contact\">\
	<li><a href=\"http://www.avallie.com\">www.avallie.com</a></li>\
	<li><a href=\"mail:comercial@avallie.com\">comercial@avallie.com</a></li>\
	<li><a href=\"http://facebook.com/avallie\">compartilhe <img src=\"/media/facebook-icon.png\" height=\"27pt\" style=\"vertical-align: middle;\" /></a></li>\
</ul>\
<div style=\"height: 16pt;clear:both;\">&nbsp;</div>\
</body>\
</html>";
}

function getProductsHtml(products){
    var productsHtml = "";
    for(let i = 0; i < products.length; i++){
        var productHtml = "<td colspan=\"3\">\
				<table class=\"info\">\
					<tr><td><label>Material</label><p>"+ products[i].name +"</p></td></tr>\
					<tr><td><label>Quantidade</label><p>" + products[i].amount + " " + products[i].unity + "</p></td></tr>\
                    <tr><td><label>Marca</label><p>" + products[i].manufacturer + "</p></td></tr>\
					<tr><td><label>Observações</label><p>" + products[i].observation + "</p></td></tr>\
				</table>\
			</td>";

        productHtml += productHtml;
    }

    return productsHtml;
}

