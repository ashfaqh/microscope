/*****************************************************************************/
/* PostSubmit: Event Handlers */
/*****************************************************************************/
Template.PostSubmit.events({
	'submit form': function(event, tmpl) {
		event.preventDefault();

		var post = {
			url: tmpl.find('[name=url]').value,
			title: tmpl.find('[name=title]').value
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
});

/*****************************************************************************/
/* PostSubmit: Lifecycle Hooks */
/*****************************************************************************/
Template.PostSubmit.created = function () {
};

Template.PostSubmit.rendered = function () {

};

Template.PostSubmit.destroyed = function () {
};
