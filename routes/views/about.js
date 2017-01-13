var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'about';
	locals.page.title = 'About NEXT Startup Club';

	locals.organisers = [
		{ name: '企飞点', image: '/images/qifeidian.jpg', twitter: '',       title: 'Founder' },
		// { name: 'Thinkmill', image: '/images/organiser-thinkmill.jpg',     twitter: 'thethinkmill', title: 'Site coordinator' },
		{ name: '领跑',     image: '/images/linkedpower.png',     twitter: '',   title: 'Founder' },
		{ name: 'Universapp',    image: '/images/logo_ua_black.png',    twitter: '',   title: 'Founder' },
		{ name: '出国啦', image: '/images/chuguola.jpg', twitter: '', title: 'Founder' }
	];

	view.render('site/about');

};
