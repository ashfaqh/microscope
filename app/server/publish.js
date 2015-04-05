/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('posts', function (/* args */) {
  return Posts.find();
});