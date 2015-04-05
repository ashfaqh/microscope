/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('posts', function (/* args */) {
  return Posts.find();
});

Meteor.publish('comments', function (postId) {
	check(postId, String);
	return Comments.find({postId: postId});
});

Meteor.publish('notifications', function (userId) {
	check(userId, String);
  	return Notifications.find({userId: userId, read: false});
});