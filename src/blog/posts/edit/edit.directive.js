app.directive('editPost', [
  '$localStorage', '$window', 'Flash', 'BlogService',
  function($localStorage, $window, Flash, blogService) {
    var directive = {}; 

    directive.templateUrl = 'app/blog/posts/edit/edit.view.html';

    directive.scope = {
      post: '=',
      posts: '=',
      user: '='
    };

    directive.controller = function ($scope, $element, $attrs) {
      $scope.posts = blogService.GetAll();

      /**
       * Convert the tags string to a cleansed array
       * 
       * @author: cognophile
       * @param: CSV string
       * @return: array|boolean
       */
      var getTagsArray = function(tagsString) {
        var preparedString = tagsString.trim().toLowerCase();

        if (preparedString.trim().split(' ').length > 1 && preparedString.indexOf(',') === -1) {
          return false;
        }

        if (preparedString.indexOf(',') > -1) {
          return preparedString.split(',');
        }

        return [preparedString];
      }

      /**
       * Return to the blog post listing page
       * 
       * @author: cognophile
       * @return: void
       */
      $scope.LoadPostList = function() {
        $window.location.reload();
      };

      /**
       * Patch the selected post with an edit and re-store
       * 
       * @author: cognophile
       * @return: void
       */
      $scope.EditPost = function() {    
        var patchedPosts = {};
        var postsExcludingEdited = {};
        var message = '';

        postsExcludingEdited = $scope.posts.filter(function (current) { 
          return current.author != $scope.user.username || current.id != $scope.post.id;
        });

        $scope.post.updated = new Date();
        $scope.post.tags = getTagsArray($scope.post.tags);

        if ($scope.post.tags === false) {
          message = "<strong>Oops!</strong> Looks like your tags aren't formatted correctly. Please enter them as so: 'food, art, music'";
          Flash.create('danger', message);
          return;
        }

        patchedPosts = postsExcludingEdited;
        patchedPosts.push($scope.post);

        $scope.posts = patchedPosts;
        blogService.Save($scope.posts);
        
        message = '<strong>Edited!</strong> Your post has been updated!';
        Flash.create('success', message);
      };    
    };

    return directive;
  },
]);
