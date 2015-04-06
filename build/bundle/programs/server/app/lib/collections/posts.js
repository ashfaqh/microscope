(function(){Posts = new Mongo.Collection('posts');


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

    update: function (userId, doc, fieldNames, modifier) {
      var errors = validatePost(modifier.$set);
      return errors.title || errors.url;    
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}

validatePost = function(post) {
  var errors = {};

  if (!post.title) {
    errors.title = 'Please fill in a title';
  }

  if (!post.url) {
    errors.url = 'Please fill in a url';
  }

  return errors;

}

})();
