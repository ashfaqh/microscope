/*****************************************************************************/
/* PostItem: Event Handlers */
/*****************************************************************************/
Template.PostItem.events({
	'click .upvotable': function(event, tmpl) {
		event.preventDefault();
		Meteor.call('/app/post/upvote', this._id, function(error, result) {
			if (error) {
				throwError(error.reason);
			}
		});
	}
});

/*****************************************************************************/
/* PostItem: Helpers */
/*****************************************************************************/
Template.PostItem.helpers({
	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},
	ownPost: function() {
		return (this.userId === Meteor.userId());
	},
	upvotedClass: function() {
		var userId = Meteor.userId();
		if (userId && !_.include(this.upvoters, userId)) {
			return 'btn-primary upvotable';
		} else {
			return 'disabled';
		}
	}
/*	commentsCount: function() {
		return Comments.find({postId: this._id}).count();
	} */
});

/*****************************************************************************/
/* PostItem: Lifecycle Hooks */
/*****************************************************************************/
Template.PostItem.created = function () {
};

Template.PostItem.rendered = function () {
};

Template.PostItem.destroyed = function () {
};
