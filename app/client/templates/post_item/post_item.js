/*****************************************************************************/
/* PostItem: Event Handlers */
/*****************************************************************************/
Template.PostItem.events({
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
	}
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
