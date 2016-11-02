var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

var htmlRegex = /(<([^>]+)>)/ig;

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
var smtpConfig = {
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'mailer@live-to-create.com',
        pass: 'mailermailer'
    }
};
var mailer = nodemailer.createTransport(smtpConfig);

router.get('/', function(req, res) {
    res.render('index');
});


var services = [
	'Landing Page',
	'Интернет магазин',
	'Мобильное приложение Android',
	'Мобильное приложение iOS',
	'CRM система',
	'Автоматизация создания документов',
	'Брендирование',
	'Сайт компании'
];
router.post('/service', function(req, res) {
	var id = req.body.id;
	var email = req.body.email;

	if (validateEmail(email)) {
		var text = '<b>Как поможет ' + services[id] + '?</b><br>Email: ' + email.replace(htmlRegex, "") + '<br>';
		mailer.sendMail({
            from: 'L2C mailer <mailer@live-to-create.com>',
            to: 'reide740@gmail.com info@live-to-create.com info@live-to-create.ru avdeevfmx333@rambler.ru',
            subject: 'Как поможет...',
            html: text,
            text: text
        }, function(error, info) {
            if (error) {
                console.log(error);
                res.send({ err: 'sender' });
            } else {
                res.send({});
            }
        });
	} else {
		res.send({ err : 'email' });
	}
});


router.post('/addition', function(req, res) {
	var email = req.body.email;

	if (validateEmail(email)) {
		var text = 'Не нашёл решение проблемы<br>Email: ' + email.replace(htmlRegex, "") + '<br>';
		mailer.sendMail({
            from: 'L2C mailer <mailer@live-to-create.com>',
            to: 'reide740@gmail.com info@live-to-create.com info@live-to-create.ru avdeevfmx333@rambler.ru',
            subject: 'Не нашёл решение проблемы...',
            html: text,
            text: text
        }, function(error, info) {
            if (error) {
                console.log(error);
                res.send({ err: 'sender' });
            } else {
                res.send({});
            }
        });
	} else {
		res.send({ err : 'email' });
	}
});


router.post('/application', function(req, res) {
	var email = req.body.email;
	var phone = req.body.phone;
	var comment = req.body.comment;

	if (validateEmail(email)) {
		var text = 'Email: ' + email.replace(htmlRegex, "") + '<br>Номер телефона: ' + phone.replace(htmlRegex, "") + '<br>Комментарий: ' + comment.replace(htmlRegex, "") + '<br>';

		mailer.sendMail({
            from: 'L2C mailer <mailer@live-to-create.com>',
            to: 'reide740@gmail.com info@live-to-create.com info@live-to-create.ru avdeevfmx333@rambler.ru',
            subject: 'Подаю заявку...',
            html: text,
            text: text
        }, function(error, info) {
            if (error) {
                console.log(error);
                res.send({ err: 'sender' });
            } else {
                res.send({});
            }
        });
	} else {
		res.send({ err : 'email' });
	}
});


module.exports = router;
