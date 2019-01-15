app.service('BlogService', [
        '$rootScope', '$localStorage', 'BlogPostFactoryService',
        function($rootScope, $localStorage, blogPostFactoryService) {
            
            // Private Properties 
            var self = this;
            self.posts = null;

            var GetLatest = function() {
              if ($localStorage.blog) {
                self.posts = $localStorage.blog.posts;
              } 
            }

            /**
             * Prepare the storage medium for blog data
             * 
             * @author: cognophile
             * @return: void
             */
            self.PrepareStorage = function() {
                if ($localStorage.blog) {
                    self.posts = $localStorage.blog.posts;
                } else {
                    $localStorage.blog = blogPostFactoryService.GetInitialPosts();
                    self.posts = $localStorage.blog.posts;
                }
            }

            /**
             * Return the all blog posts
             * 
             * @author: cognophile
             * @return: Array
             */
            self.GetAll = function() {
              GetLatest();

              if (self.posts.length) {
                return self.posts;
              }

              return [];
            }

            /**
             * Return the posts created by the given user
             * 
             * @param: User [object]
             * @author: cognophile
             * @return: object
             */
            self.GetOneByUser = function(user) {
              GetLatest();

              return self.posts.filter(function (post) { 
                return post.author === user.username;
              });
            }

            /**
             * Update the stored blog data
             * 
             * @param: Array[Post]
             * @author: cognophile
             * @return: void
             */
            self.Save = function(posts) {
              GetLatest();

              self.posts = posts;
              $localStorage.blog.posts = self.posts;
            }

            /**
             * Delete the stored post
             * 
             * @param: Post [object]
             * @author: cognophile
             * @return: boolean
             */
            self.Delete = function(post) {
              GetLatest();

              var index = self.posts.indexOf(post);
              
              if (index !== -1) {
                self.posts.splice(index, 1);
                self.Save(self.posts);
                return true;
              } 
              else {
                return false;
              }
            }

            return self;
        }
    ]
);

