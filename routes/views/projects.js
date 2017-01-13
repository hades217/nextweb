var keystone = require('keystone');

var Projects = keystone.list('Projects');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// locals.section = 'members';

	view.query('projects', Projects.model.find().sort('name'), 'members');

	view.render('site/projects');

}
