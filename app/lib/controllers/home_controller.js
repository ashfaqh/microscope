HomeController = RouteController.extend({
  //layoutTemplate: 'MasterLayout',

  increment: 5,

  postLimit: function() {
  	return parseInt(this.params.postLimit) || this.increment;
  },

  findOptions: function() {
  	return {sort: {submitted: -1}, limit: this.postLimit()};
  },

  waitOn: function() {
  	this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },

  posts: function() {
  	return Posts.find({}, this.findOptions());
  },

  data: function() {
  	var hasMore = this.posts().count() === this.postLimit();
  	var nextPath = this.route.path({postLimit: this.postLimit() + this.postLimit()});
  	return {
  		posts: this.posts(),
  		ready: this.postsSub.ready,
  		nextPath: hasMore ? nextPath : null
  	};
  },

  action: function() {
    this.render('Home');
  }
});
