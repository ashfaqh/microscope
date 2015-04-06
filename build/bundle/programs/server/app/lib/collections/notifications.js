(function(){Notifications = new Mongo.Collection('notifications');


if (Meteor.isServer) {
  Notifications.allow({
    insert: function (userId, doc) {
      return false;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return (userId == doc.userId) &&
      fieldNames.length == 1 && fieldNames[0] == 'read';
    },

    remove: function (userId, doc) {
      return false;
    }
  });

  Notifications.deny({
    insert: function (userId, doc) {
      return true;
    },

/*    update: function (userId, doc, fieldNames, modifier) {
      return true;
    }, */

    remove: function (userId, doc) {
      return true;
    }
  });
}

createCommentNotification = function(comment) {
  var post = Posts.findOne({_id: comment.postId});

  console.log(comment.userId + post.userId);

  if (comment.userId != post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: comment.postId,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
}

})();
