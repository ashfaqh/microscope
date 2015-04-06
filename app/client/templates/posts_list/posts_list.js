/*****************************************************************************/
/* PostsList: Event Handlers */
/*****************************************************************************/
Template.PostsList.events({
});

/*****************************************************************************/
/* PostsList: Helpers */
/*****************************************************************************/
Template.PostsList.helpers({
/*	posts: function() {
		return Posts.find({}, {sort: {submitted: -1}});
	} */
});

/*****************************************************************************/
/* PostsList: Lifecycle Hooks */
/*****************************************************************************/
Template.PostsList.created = function () {
};

Template.PostsList.rendered = function () {
	this.find('.wrapper')._uihooks = {
		insertElement: function(node, next) {
			$(node)
				.hide()
				.insertBefore(next)
				.fadeIn();
		},

		moveElement: function(node, next) {
			var $node = $(node), $next = $(next);
			var oldTop = $node.offset().top;
			var height = $node.outerHeight(true);

			// find all elements between next and node
			var $inbetween = $next.nextUntil(node);
			if ($inbetween.length === 0) {
				$inbetween = $node.nextUntil(next);
			}

			// put node in place
			$node.insertBefore($next);

			// measure new top
			var newTop = $node.offset().top;

			//move node to where it was before
			$node
				.removeClass('animate')
				.css('top', oldTop - newTop);

			//push every other element down or up to put them back
			$inbetween
				.removeClass('animate')
				.css('top', oldTop < newTop ? height : -1 * height);

			// force a redraw
			$node.offset();

			//reset everything to 0, animated
			$node.addClass('animate').css('top', 0);
			$inbetween.addClass('animate').css('top', 0);
		}
	};
};

Template.PostsList.destroyed = function () {
};
