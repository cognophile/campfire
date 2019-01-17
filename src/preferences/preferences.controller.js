app.controller('PreferencesController', ["$scope", "AuthService",
        function ($scope, authService) 
        {
            $scope.currentUser = authService.currentUser;
          
            /**
             * Determine whether the argument contains a numeric character
             * 
             * @see: https://stackoverflow.com/a/28813213
             * @param: string
             * @return: boolean
             */
            var containsNumbers = function(str) {
                return (/\d/.test(str));
            }

            /**
             * Edit the user's prmary theme preferences
             * 
             * @author: cognophile
             * @return: void
             */
            $scope.EditThemePrimary = function() {
                var primary = prompt('Please enter a primary colour or HEX code');
                primary = primary.toUpperCase();

                // If the input is HEX value
                if (containsNumeric(primary)) {
                    if (!primary.includes('#')) {
                        primary = '#' + primary;
                    }
                }

                authService.currentUser.preferences.theme.primary = primary;
                document.body.style.setProperty("--primary-theme-color", authService.currentUser.preferences.theme.primary);
            } 

            /**
             * Edit the user's secondary theme preferences
             * 
             * @author: cognophile
             * @return: void
             */
            $scope.EditThemeSecondary = function() {
                var secondary = prompt('Please enter a secondary colour or HEX code');
                secondary = secondary.toUpperCase();

                // If the input is HEX value
                if (containsNumbers(secondary)) {
                    if (!secondary.includes('#')) {
                        secondary = '#' + secondary;
                    }
                }
                
                authService.currentUser.preferences.theme.secondary = secondary;
                document.body.style.setProperty("--secondary-theme-color", authService.currentUser.preferences.theme.secondary);
            }

            /**
             * Edit the user's text theme preferences
             * 
             * @author: cognophile
             * @return: void
             */
            $scope.EditThemeText = function() {
                var text = prompt('Please enter a text colour or HEX code');
                text = text.toUpperCase();

                // If the input is HEX value
                if (containsNumbers(text)) {
                    if (!text.includes('#')) {
                        text = '#' + text;
                    }
                }
                
                authService.currentUser.preferences.theme.text = text;
                document.body.style.setProperty("--text-theme-color", authService.currentUser.preferences.theme.text);
            }

            /**
             * Edit the user's theme background preferences
             * 
             * @author: cognophile
             * @return: void
             */
            $scope.EditThemeBackground = function() {
                var background = prompt('Please enter a background colour or HEX code');
                background = background.toUpperCase();

                // If the input is HEX value
                if (containsNumbers(background)) {
                    if (!background.includes('#')) {
                        background = '#' + background;
                    }
                }
                
                authService.currentUser.preferences.theme.background = background;
                document.body.style.setProperty("--background-theme-color", authService.currentUser.preferences.theme.background);
            }
        }
    ]
);