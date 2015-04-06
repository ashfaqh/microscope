/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('posts', function (options) {
	check(options, {
		sort: Object,
		limit: Number
	});
 	return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
	check(id, String);
	return Posts.find({_id: id});
});

Meteor.publish('comments', function (postId) {
	check(postId, String);
	return Comments.find({postId: postId});
});

Meteor.publish('notifications', function (userId) {
	check(userId, String);
  	return Notifications.find({userId: userId, read: false});
});