Posts = new Mongo.Collection('posts');


 if (Meteor.isServer) {
  Posts.allow({
    insert: function (userId, doc) {
      return !! userId;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return !! userId;
    },

    remove: function (userId, doc) {
      return !! userId;
    }
  });

  Posts.deny({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return (_.without(fieldNames, 'url', 'title').length > 0);
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
