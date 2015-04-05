/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({

   '/app/post/insert': function(postAttributes) {

         if (this.isSimulation) {
            return;
         }

         check(Meteor.userId(), String);
         check(postAttributes, {
            url: String,
            title: String,
            commentsCount: Number
         });

         var errors = validatePost(postAttributes);
         if (errors.url || errors.title) {
            throw Meteor.Error('invalid-post', 'You must enter a title and url for the post');
         }

         var postWithSameLink = Posts.findOne({url: postAttributes.url});
         if (postWithSameLink) {
            return {
               postExists: true,
               _id: postWithSameLink._id
            }
         }

         var user = Meteor.user();
         var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount: 0
         });

         var postId = Posts.insert(post);
         return {
            _id: postId
         };
   },

   '/app/post/update': function(postId, postAttributes) {

         //check(postId, String);
         //check(postAttributes.userId, String);
         check(postAttributes, {
            url: String,
            title: String
         });

         var postWithSameLink = Posts.findOne({_id: postId});
         if (postWithSameLink) {
            Posts.update(postId, {$set: postAttributes});
            return {
               _id: postId
            };
         } else {
            throw Meteor.Error('url-changed', 'URL should not be changed in update mode');
         }
   },

   '/app/post/delete': function(postId) {
      check(postId, String);
      Posts.remove(postId);
   },

   '/app/comment/insert': function(commentAttributes) {

         check(this.userId, String);
         check(commentAttributes, {
            postId: String,
            body: String
         });

         var user = Meteor.user();
         var currentPost = Posts.findOne({_id: commentAttributes.postId});

         if (!currentPost) {
            throw Meteor.Error('invalid-comment', 'You must comment on a post');
         }

         var comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
         });

         var commentId = Comments.insert(comment);

         currentPost.commentsCount += 1;
         Posts.update(currentPost._id, {$inc: {commentsCount: 1}});

         return commentId;
   }
});
