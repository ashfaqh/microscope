/*****************************************************************************/
/* PostSubmit: Event Handlers */
/*****************************************************************************/
Template.PostSubmit.events({
	'submit form': function(event, tmpl) {
		event.preventDefault();

		var post = {
			url: tmpl.find('[name=url]').value,
			title: tmpl.find('[name=title]').value,
			commentsCount: 0
		}

		var errors = validatePost(post);
		if (errors.url || errors.title) {
			return Session.set('postSubmitErrors', errors);
		}

		//post._id = Posts.insert(post);
		Meteor.call('/app/post/insert', post, function(error, result) {
			if (error) {
				return throwError(error.reason);
			}

			if (result.postExists) {
				return throwError('The url has already been posted');
			}

			Router.go('postPage', {_id: result._id});
		});
	}
});

/*****************************************************************************/
/* PostSubmit: Helpers */
/*****************************************************************************/
Template.PostSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field) {
		return Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});

/*****************************************************************************/
/* PostSubmit: Lifecycle Hooks */
/*****************************************************************************/
Template.PostSubmit.created = function () {
	Session.set('postSubmitErrors', {});
};

Template.PostSubmit.rendered = function () {

};

Template.PostSubmit.destroyed = function () {
};
