HomeController = RouteController.extend({
  layoutTemplate: 'MasterLayout',

  waitOn: function() {
  	this.subscribe('posts');
  },

  action: function() {
    this.render('Home');
  }
});
