var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('AccessDenied');
    }
  } else {
    this.next();
  }
}

Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.onBeforeAction('dataNotFound', {only: 'postpage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});


Router.route('posts/:_id', {
  name: 'postPage',
  controller: 'PostPageController',
  action: 'action',
  where: 'client'
});

Router.route('post_submit', {
  name: 'postSubmit',
  controller: 'PostSubmitController',
  action: 'action',
  where: 'client'
});

Router.route('posts/:_id/edit', {
  name: 'postEdit',
  controller: 'PostEditController',
  action: 'action',
  where: 'client'
});