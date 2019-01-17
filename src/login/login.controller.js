app.controller('LoginController', ["$scope", "$window", "AuthService", '$location',
        function ($scope, $window, authService, $location) 
        {
            /**
             * Modify project CSS variables for theme according to session user preferences
             * 
             * @author: cognophile
             * @return: void
             */
            var loadUserThemePreferences = function(user) {
                document.body.style.setProperty("--primary-theme-color", user.preferences.theme.primary);
                document.body.style.setProperty("--secondary-theme-color", user.preferences.theme.secondary);
                document.body.style.setProperty("--text-theme-color", user.preferences.theme.text);
                document.body.style.setProperty("--background-theme-color", user.preferences.theme.text);
            }
 
            /** 
             * Log a user into the application
             * 
             * @author: cognophile
             * @return: void
             */
            $scope.RequestLogin = function() {
                try {             
                    var isValid = authService.Authenticate($scope.username, $scope.password);
                    
                    if (isValid) {
                        loadUserThemePreferences(authService.currentUser);
                        $location.path('/dashboard');
                    }
                    else {
                        notify("Oops!", "Looks like those credentials might be wrong. Try again!");
                        return false;
                    }
                } catch (ex) {
                    console.log('LoginController/RequestLogin: Error - ', ex);
                    notify("Oops!", "Looks like we encountered an error. Check the console and try again!");
                }                
            }
            
            /** 
             * Retrieve users from storage
             * 
             * @author: cognophile
             * @return: Array
             */
            $scope.GetUsers = function() {
                return authService.GetUsers();
            }
        }
    ]
);