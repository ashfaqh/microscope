/*****************************************************************************/
/* Errors: Event Handlers */
/*****************************************************************************/
Template.Errors.events({
});

/*****************************************************************************/
/* Errors: Helpers */
/*****************************************************************************/
Template.Errors.helpers({
	errors: function() {
		return Errors.find();
	},
	throwError: function(message) {
		Errors.insert({message: message});
	}
});

/*****************************************************************************/
/* Errors: Lifecycle Hooks */
/*****************************************************************************/
Template.Errors.created = function () {
};

Template.Errors.rendered = function () {
};

Template.Errors.destroyed = function () {
};