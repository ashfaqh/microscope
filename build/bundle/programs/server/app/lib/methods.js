(function(){/*****************************************************************************/
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
            commentsCount: 0,
            upvoters: [],
            votes: 0
         });

         var postId = Posts.insert(post);
         return {
            _id: postId
         };
   },

   '/app/post/update': function(postId, postAttributes) {

         check(postId, String);
         check(postAttributes, {
            url: String,
            title: String
         });

         var postWithSameLink = Posts.findOne({url: postAttributes.url});
         if (postWithSameLink) {
            throw Meteor.Error('invalid-url', 'URL entered already exist');
         }

         var currentPost = Posts.findOne({_id: postId});
         if (currentPost) {
            Posts.update(postId, {$set: postAttributes});
            return {
               _id: postId
            };
         } else {
            throw Meteor.Error('invalid-post', 'Post to be updated does not exist');
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

         Comments.insert(comment, function(error, result) {

            Posts.update(currentPost._id, {$inc: {commentsCount: 1}});

            comment._id = result;
            createCommentNotification(comment);

            return comment._Id;

         });
   },

   '/app/post/upvote': function(postId) {

         check(postId, String);
         check(this.userId, String);

         var affected = Posts.update({
            _id: postId,
            upvoters: {$ne: this.userId}
         }, {
            $addToSet: {upvoters: this.userId},
            $inc: {votes: 1}            
         });

         if (! affected) {
            throw Meteor.Error('invalid', 'You were not able to upvote that post');
         }
   }

});

})();
