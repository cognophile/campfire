app.directive('createPost', [
  '$localStorage', '$window', 'BlogPostFactoryService', 'AuthService', 'Flash', 'BlogService',
  function($localStorage, $window, blogPostFactoryService, authService, Flash, blogService) {
    var directive = {}; 

    directive.templateUrl = 'app/blog/posts/create/create.view.html';

    directive.scope = {
      user: '=',
      posts: '='
    };

    directive.controller = function ($scope, $element, $attrs) {
      $scope.posts = blogService.GetAll();

      /**
       * Retrieve the next numeric post ID according to the most recent
       * 
       * @author: cognophile
       * @return: integer 
       */
      var getNewPostId = function() {
        var userPosts = $scope.posts.filter(function (post) { 
          return post.author === $scope.user.username;
        });

        var latestPost = userPosts.reduce((max, post) => max.id > post.id ? max : post);

        var previousId = latestPost.id;
        return previousId + 1;
      }

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
       * Create a new post object, store it, and reset the form
       * 
       * @author: cognophile
       * @return: void
       */
      $scope.CreatePost = function() {

        var newId = getNewPostId();
        var tags = getTagsArray($scope.form.tags);
        var message = '';

        if (tags === false) {
          message = "<strong>Oops!</strong> Looks like your tags aren't formatted correctly. Please enter them as so: 'food, art, music'";
          Flash.create('danger', message);
          return;
        }

        var post = blogPostFactoryService.Create(
          newId, 
          $scope.user.username, 
          $scope.form.title, 
          $scope.form.body, 
          tags,
          $scope.form.published
        );

        $scope.posts.push(post);
        blogService.Save($scope.posts);

        $scope.form.title = '';
        $scope.form.body = '';
        $scope.form.tags = '';
        $scope.form.published = false;
        $scope.postForm.$setUntouched();

        message = '<strong>Posted!</strong> Your post has been saved!';
        Flash.create('success', message);
     };

      /**
       * Return to the blog post listing page
       * 
       * @author: cognophile
       * @return: void
       */
      $scope.LoadPostList = function() {
        $window.location.reload();
      };
    };

    return directive;
  },
]);
