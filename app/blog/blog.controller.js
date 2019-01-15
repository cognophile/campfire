app.controller('BlogController', ["$scope", "AuthService", "$location", "$localStorage", "$route", "BlogService",
        function ($scope, authService, $location, $localStorage, $route, blogService)
        {
          $scope.currentUser = authService.currentUser;
          $scope.allPosts = blogService.GetAll();
          $scope.userPosts = blogService.GetOneByUser($scope.currentUser);
          $scope.currentPost = {};
          $scope.subpage = '';

          /**
           * Open the edit post subpage
           * 
           * @author: cognophile
           * @param: object[post]
           * @return: void
           */
          $scope.EditPost = function(post) {
            $scope.currentPost = post;
            $scope.SetSubpage('edit');
          }
            
          /**
           * Request to delete a post
           * 
           * @author: cognophile
           * @param: object[post]
           * @return: boolean
           */
          $scope.DeletePost = function(post) {
            if (!confirm('Are you sure you wish to delete this post?')) {
              return false;
            }

            var isDeleted = blogService.Delete(post);
              
            if (!isDeleted) {
              notify('Oops!', 'Can\'t delete this post.');
              return false;
            }
            
            $scope.allPosts = blogService.GetAll();
            $scope.userPosts = blogService.GetOneByUser($scope.currentUser);
            $route.reload();

            return true;
          }

          /**
           * Set the view subpage variable to the given argument
           * 
           * @author: cognophile
           * @param: string
           * @return: void
           */
          $scope.SetSubpage = function(subpage) {
            $scope.subpage = subpage;
          }

          $scope.SetSubpage('list');
      }
    ]
);