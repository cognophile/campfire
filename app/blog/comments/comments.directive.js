app.directive('postComments', [
  '$localStorage', 'AuthService', 'PostCommentFactoryService', 'Flash', 'BlogService',
  function($localStorage, authService, commentFactoryService, Flash, blogService) {
    var directive = {}; 

    directive.templateUrl = 'app/blog/comments/comments.view.html';

    directive.scope = {
      post: '=',
      posts: '=?',
      comments: '=',
      currentUser: '=?'
    };

    directive.controller = function ($scope, $element, $attrs) {
      $scope.currentUser = authService.currentUser;
      $scope.posts = blogService.GetAll();

      /**
       * Add a comment to the post 
       * 
       * @author: cognophile
       * @param: string 
       * @return boolean|void
       */
      $scope.AddComment = function(commentBody) {
        if (!authService.IsUserLoggedIn()) {
          notify('Oops!', 'You must be registered and logged in to comment!');
          return false;
        }

        var newId = 0;

        if ($scope.post.comments.length) {
          var latestComment = $scope.post.comments.reduce((max, comment) => max.id > comment.id ? max : comment);
          var previousId = latestComment.id;
          newId = previousId + 1;
        }
        else {
          newId = 1;
        }

        var newComment = commentFactoryService.Create(newId, authService.currentUser.username, commentBody);

        $scope.post.comments.push(newComment);

        blogService.Delete($scope.post);
        $scope.posts.push($scope.post);
        blogService.Save($scope.posts);

        $scope.commentBody = '';
        $scope.commentsForm.$setUntouched();

        var message = '<strong>Posted!</strong> Your comment has been saved!';
        Flash.create('success', message);
      }

      /**
       * Delete a comment from the post
       * 
       * @author: cognophile
       * @param: object [Comment]
       * @return: boolean|void
       */
      $scope.DeleteComment = function(comment) {
        var confirmed = confirm('Are you sure you wish to delete this comment?');

        if (!confirmed) {
          return false;
        }

        var index = $scope.post.comments.indexOf(comment);
        if (index !== -1) {
          $scope.post.comments.splice(index, 1);

          blogService.Delete($scope.post);
          $scope.posts.push($scope.post);
          blogService.Save($scope.posts);
        }
        else {
          notify('Oops!', 'Can\'t delete this comment.');
          return false;
        }

        return false;
      }

      /**
       * Cast a positive vote upon the post
       * 
       * @author: cognophile
       * @param: object [Comment]
       * @return: void
       */
      $scope.Upvote = function(comment) {
        comment.score++;
      }

      /**
       * Cast a negitive vote upon the post
       * 
       * @author: cognophile
       * @param: object [Comment]
       * @return: void
       */
      $scope.Downvote = function(comment) {
        comment.score--;
      }
    };

    return directive;
  },
]);
