/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
  /*
   * Example:
   *
   * '/app/items/insert': function (item) {
   *  if (this.isSimulation) {
   *    // do some client stuff while waiting for
   *    // result from server.
   *    return;
   *  }
   *
   *  // server method logic
   * }
   */

   '/app/post/insert': function(postAttributes) {

         if (this.isSimulation) {
            return;
         }

         check(Meteor.userId(), String);
         check(postAttributes, {
            url: String,
            title: String
         });

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
            submitted: new Date()
         });

         var postId = Posts.insert(post);
         return {
            _id: postId
         };
   },

   '/app/post/update': function(postId, postAttributes) {

         check(postId, String);
         //check(Meteor.userId(), String);
         check(postAttributes, {
            url: String,
            title: String
         });

         var postWithSameLink = Posts.findOne({url: postAttributes.url});
         if (postWithSameLink) {
            return {
               postExists: true,
               _id: postWithSameLink._id
            };
         }

         Posts.update(postId, {$set: postAttributes});
         return {
            _id: postId
         };
   },

   '/app/post/delete': function(postId) {
      check(postId, String);
      Posts.remove(postId);
   }

});
