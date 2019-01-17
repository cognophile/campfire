app.service('UserFactoryService', ['$rootScope',
    function($rootScope) {
      /**
       * Create an configurable user object
       * 
       * @author: cognophile
       * @return JSON Object
       */
      this.CreateEditedUser = function(username, firstname, surname, password, address, preferences, profileImage) 
      {
        return new User(
            username, firstname, surname,
            this.HashPassword(password),
            address, profileImage,
            new Date(), preferences
        );
      }

      /**
       * Create a default user object
       * 
       * @author: cognophile
       * @return JSON Object
       */
      this.CreateDefaultUser = function(username, firstname, surname, password, address) 
      {
        return new User(
            username, firstname, surname, 
            this.HashPassword(password), 
            address, 
            'https://www.w3schools.com/html/img_girl.jpg', 
            new Date(),
            {
              theme: {
                primary: '#4A1087',
                secondary: '#651FAF',
                text: '#FFFFFF',
                background: '#FFFFFF'
              }
            }
          );    
      }
 
      this.HashPassword = function (password) {
        return btoa(password);
      }
    }
  ]
);