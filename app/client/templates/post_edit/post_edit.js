/*****************************************************************************/
/* PostEdit: Event Handlers */
/*****************************************************************************/
Template.PostEdit.events({
	'submit form': function(event, tmpl) {
		event.preventDefault();

		var currentPostId = this._id;
		var postAttribute = {
			url: tmpl.find('[name=url]').value,
			title: tmpl.find('[name=title]').value
		};

		Meteor.call('/app/post/update', currentPostId, postAttribute, function(error, result) {
			if (error) {
				return throwError(error.reason);
			} else {
				if (result.postExists) {
					throwError('This url has already been posted');
				} else {
					Router.go('postPage', {_id: result._id});
				}
			}

		});
	},

	'click .delete': function(event, tmpl) {
		event.preventDefault();
		var currentPostId = this._id;
		if (confirm('Do you want to delete this post?')) {
			Meteor.call('/app/post/delete', currentPostId);
			Router.go('home');
		}
	}
});

/*****************************************************************************/
/* PostEdit: Helpers */
/*****************************************************************************/
Template.PostEdit.helpers({
});

/*****************************************************************************/
/* PostEdit: Lifecycle Hooks */
/*****************************************************************************/
Template.PostEdit.created = function () {
};

Template.PostEdit.rendered = function () {
};

Template.PostEdit.destroyed = function () {
};
