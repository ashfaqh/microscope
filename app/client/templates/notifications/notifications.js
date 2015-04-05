/*****************************************************************************/
/* Notifications: Event Handlers */
/*****************************************************************************/
Template.Notifications.events({
});

Template.NotificationItem.events({
	'click a': function() {
		Notifications.update(this._id, {$set: {read: true}}, function(error, result) {
			if (error) {
				throwError(error.reason);
			}
		});
	}
});

/*****************************************************************************/
/* Notifications: Helpers */
/*****************************************************************************/
Template.Notifications.helpers({
	notificationCount: function() {
		return Notifications.find().count();
	},
	notifications: function() {
		return Notifications.find();	
	}
});

Template.NotificationItem.helpers({
	notificationPostPath: function() {
		return Router.routes.postPage.path({_id: this.postId});
	}
});

/*****************************************************************************/
/* Notifications: Lifecycle Hooks */
/*****************************************************************************/
Template.Notifications.created = function () {
};

Template.Notifications.rendered = function () {
};

Template.Notifications.destroyed = function () {
};
