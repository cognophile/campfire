app.controller('BlogSearchController', ["$scope", "AuthService", '$location', "PostFactoryService", 'Flash', "BlogService",
        function ($scope, authService, $location, postFactoryService, Flash, blogService) 
        {
          $scope.currentUser = authService.currentUser;
          $scope.blog = {};
          $scope.posts = blogService.GetAll();          
          $scope.taggedPosts = {};
          $scope.selectedPost = {};
          $scope.subpage = '';

          $scope.SetSubpage = function(subpage) {
            $scope.subpage = subpage;
          };

          /**
           * Search for a blog by its author and render the blog view
           * 
           * @author: cognophile
           * @return: void
           */
          $scope.SearchByUser = function(username) {
            $scope.blog.posts = $scope.posts.filter(function (post) { 
              return post.author === username;
            });

            $scope.blog.author = username;
            $scope.SetSubpage('view');
          };

          /**
           * Search for posts by associated tags
           * 
           * @author: cognophile
           * @return: void
           */
          $scope.SearchByTag = function(searchQuery) {
            var message, status = '';

            $scope.taggedPosts = $scope.posts.filter(function (post) { 
              var preparedQuery = searchQuery.trim().toLowerCase();

              if (post.tags.includes(preparedQuery)) {
                return post;
              }              
            });

            if ($scope.taggedPosts.length) {
              status = 'success';
              message = '<strong>Found some!</strong> We found the below posts under that tag!';
            }
            else {
              status = 'warning';
              message = '<strong>Oops!</strong> We couldn\'t find any tagged posts. <a id="blog-link" href="#!/blog">Write one!</a>';
            }

            Flash.create(status, message);
          };

          /**
           * View the selected post for reading
           * 
           * @author: cognophile
           * @return: void
           */
          $scope.ViewPost = function(post) {
            $scope.selectedPost = post;
            $scope.selectedPost.statistics.views++;
            $scope.SetSubpage('read');
          };

          /**
           * Return to the blog search subpage
           * 
           * @author: cognophile
           * @return: void
           */
          $scope.GoBack = function() {
            $scope.SetSubpage('search');
          };

          $scope.SetSubpage('search');
        }
    ]
);