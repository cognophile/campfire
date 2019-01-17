app.service('PostFactoryService', ['$rootScope',
    function($rootScope) 
    {
      /**
       * Create a blog post object
       * 
       * @author: cognophile
       * @return JSON Object
       */
      this.Create = function(id, author, title, body, tags, published) 
      {
        return new Post(id, author, title, body, new Date(), new Date(), published, [], tags, { views: 0 });
      }

      /**
       * Create multiple test-data blog post objects 
       * 
       * @author: cognophile
       * @return JSON Object
       */ 
      this.GetInitialPosts = function () 
      {
        return {
          posts: [
            new Post (
              1, 
              'wolfal', 
              'My first post', 
              'This is the body of my post. Here, I\'m going to tell you a story...', 
              new Date(), 
              new Date(), 
              true, 
              [
                new Comment(1, 'barneby99', 
                  'Hey, this is a great post!', new Date(), 5),
                new Comment(2, 'dragonbreeder14', 
                  'Agreed - superb!', new Date(), 0)
              ],
              [
                'food', 
                'art'
              ],
              { 
                views: 0 
              }
            ), 
            
            new Post (
              2, 
              'wolfal', 
              'My Second post', 
              'This is the body of my post. Here, I\'m going to tell you an even better story...', 
              new Date(), 
              new Date(), 
              false, 
              [
              ],
              [
              ],
              { 
                views: 0 
              }
            ),

            new Post (
              3, 
              'wolfal', 
              'My Third post', 
              'Honest, this one will be the best yet!', 
              new Date(), 
              new Date(), 
              false, 
              [
              ],
              [
              ],
              { 
                views: 0 
              }
            ),  

            new Post (
              1, 
              'barneby99', 
              'Barneby bear is my name', 
              'I\m a bear and I love to sing my song. Watch me sing: https://www.youtube.com/watch?v=t53D7kG7phA', 
              new Date(), 
              new Date(), 
              false, 
              [
              ],
              [
              ],
              { 
                views: 0 
              }
            ),  
            
          ]
        }
      }    
    }
  ]
);