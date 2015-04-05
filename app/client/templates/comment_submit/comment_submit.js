/*****************************************************************************/
/* CommentSubmit: Event Handlers */
/*****************************************************************************/
Template.CommentSubmit.events({
	'submit form': function(event, tmpl) {
		event.preventDefault();

		var body = tmpl.find('[name=body]').value;
		var comment = {
			postId: tmpl.data._id,
			body: body
		};

		var errors = {};
		if (!comment.body) {
			errors.body = 'Please write some content';
			return Session.set('commentSubmitErrors', errors);
		}

		Meteor.call('/app/comment/insert', comment, function(error, result) {
			if (error) {
				throwError(error.reason);
			} else {
				Session.set('commentSubmitErrors', {});				
				tmpl.find('[name=body]').value = '';
			}
		});
	}
});

/*****************************************************************************/
/* CommentSubmit: Helpers */
/*****************************************************************************/
Template.CommentSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('commentSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
	}
});

/*****************************************************************************/
/* CommentSubmit: Lifecycle Hooks */
/*****************************************************************************/
Template.CommentSubmit.created = function () {
	Session.set('commentSubmitErrors', {});
};

Template.CommentSubmit.rendered = function () {
};

Template.CommentSubmit.destroyed = function () {
};
