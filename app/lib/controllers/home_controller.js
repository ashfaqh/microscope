HomeController = RouteController.extend({
  //layoutTemplate: 'MasterLayout',

  increment: 5,
  sort: {submitted: -1},

  postLimit: function() {
  	return parseInt(this.params.postLimit) || this.increment;
  },

  findOptions: function() {
  	return {sort: this.sort, limit: this.postLimit()};
  },

  subscriptions: function() {
  	this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },

  posts: function() {
  	return Posts.find({}, this.findOptions());
  },

  data: function() {
  	var hasMore = this.posts().count() === this.postLimit();
  	var nextPath = this.route.path({postLimit: this.postLimit() + this.increment});
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

NewPostController = HomeController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.route.newPosts.path({postLimit: this.postLimit() + this.increment});
  }
});

BestPostController = HomeController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.route.bestPosts.path({postLimit: this.postLimit() + this.increment});
  }
});