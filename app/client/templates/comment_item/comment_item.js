/*****************************************************************************/
/* CommentItem: Event Handlers */
/*****************************************************************************/
Template.CommentItem.events({
});

/*****************************************************************************/
/* CommentItem: Helpers */
/*****************************************************************************/
Template.CommentItem.helpers({
	submittedText: function() {
		return this.submitted.toString();
	}
});

/*****************************************************************************/
/* CommentItem: Lifecycle Hooks */
/*****************************************************************************/
Template.CommentItem.created = function () {
};

Template.CommentItem.rendered = function () {
};

Template.CommentItem.destroyed = function () {
};
