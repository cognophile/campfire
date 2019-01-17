app.service('CommentFactoryService', ['$rootScope',
    function($rootScope) 
    {
      /**
       * Create a blog post object
       * 
       * @author: cognophile
       * @return JSON Object
       */
      this.Create = function(id, author, body) 
      {
        return new Comment(id, author, body, new Date(), 0);
      }
    }
  ]
);