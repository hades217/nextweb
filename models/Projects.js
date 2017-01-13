var _ = require('lodash');
var keystone = require('keystone');
var moment = require('moment');
var Types = keystone.Field.Types;

/**
 * Projects Model
 * =============
 */

var Projects = new keystone.List('Projects', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true }
});

Projects.add({
	name: { type: String, required: true, initial: true },
	description: { type: Types.Html , wysiwyg: true},
	status:{type: Types.Select, options:'众筹中,项目策划中,项目提出,运营中,已归档,组建公司,寻找合伙人'},
	budget:{type:Number},
	recievedMoney :{type:Number},
	backers:{type:Number},
	unit:{type:Types.Select, options:'$,￥'},
	partners:{type:String},
	headingImg: { type: Types.CloudinaryImage },
	publisher:{type:String},
	publishedDate: { type: Types.Date, index: true },

	state: { type: Types.Select, options: 'draft, scheduled, active, past', noedit: true },

	startDate: { type: Types.Date, index: true },
	endDate: { type: Types.Date, index: true }
});




// Relationships
// ------------------------------

Projects.relationship({ ref: 'User', refPath: 'projects', path: 'members' });


// Pre Save
// ------------------------------

Projects.schema.pre('save', function(next) {
	var projects = this;
	// no published date, it's a draft meetup
	if (!projects.publishedDate) {
		projects.state = 'draft';
	}
	// meetup date plus one day is after today, it's a past meetup
	else if (moment().isAfter(moment(projects.startDate).add('day', 1))) {
		projects.state = 'past';
	}
	// publish date is after today, it's an active meetup
	else if (moment().isAfter(projects.publishedDate)) {
		projects.state = 'active';
	}
	// publish date is before today, it's a scheduled meetup
	else if (moment().isBefore(moment(projects.publishedDate))) {
		projects.state = 'scheduled';
	}
	next();
});




// Methods
// ------------------------------
//
// Meetup.schema.methods.refreshRSVPs = function(callback) {
// 	var meetup = this;
// 	keystone.list('RSVP').model.count()
// 		.where('meetup').in([meetup.id])
// 		.where('attending', true)
// 		.exec(function(err, count) {
// 			if (err) return callback(err);
// 			meetup.totalRSVPs = count;
// 			meetup.save(callback);
// 		});
// }
//
// Meetup.schema.methods.notifyAttendees = function(req, res, next) {
// 	var meetup = this;
// 	keystone.list('User').model.find().where('notifications.meetups', true).exec(function(err, attendees) {
// 		if (err) return next(err);
// 		if (!attendees.length) {
// 			next();
// 		} else {
// 			attendees.forEach(function(attendee) {
// 				new keystone.Email('new-meetup').send({
// 					attendee: attendee,
// 					meetup: meetup,
// 					subject: 'New meetup: ' + meetup.name,
// 					to: attendee.email,
// 					from: {
// 						name: 'NEXT Startup Club',
// 						email: 'lightmanwang@gmail.com'
// 					}
// 				}, next);
// 			});
// 		}
// 	});
// }
//
// Meetup.schema.set('toJSON', {
// 	transform: function(doc, rtn, options) {
// 		return _.pick(doc, '_id', 'name', 'startDate', 'endDate', 'place', 'map', 'description', 'rsvpsAvailable', 'remainingRSVPs');
// 	}
// });
//

/**
 * Registration
 * ============
 */

Projects.defaultSort = '-startDate';
Projects.defaultColumns = 'name, state|10%, startDate|15%, publishedDate|15%';
Projects.register();
